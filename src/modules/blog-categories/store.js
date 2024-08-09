import categoriesService from './service';

function getState() {
	return {
		loading: false,
		selectedCategory: null,
		categories: [],
		meta: {},
	};
}

export default {
	namespaced: true,
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
		selectedCategory(state) {
			return state.selectedCategory;
		},
		categories(state) {
			return state.categories;
		},
		meta(state) {
			return state.meta;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setSelectedCategory(state, value) {
			state.selectedCategory = value;
		},
		setCategories(state, value) {
			state.categories = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteCategory(state, id) {
			state.categories = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchCategories({ commit }, queryParams) {
			commit('setLoading', true);
			try {
				const  response  = await categoriesService.getBlogCategories(queryParams);
				commit('setCategories', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createCategory({ commit}, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await categoriesService.createBlogCategory(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editCategory({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await categoriesService.editBlogCategory(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteCategory({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await categoriesService.deleteBlogCategory(slug);
				return res;
			} finally {
				commit('setLoading', false);
			}
		},
		resetState({ commit }) {
			commit('resetState');
		},
	},
};