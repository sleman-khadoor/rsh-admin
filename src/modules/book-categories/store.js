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
			console.log('inside fetch categories', queryParams);
			commit('setLoading', true);
			try {
				const  response  = await categoriesService.getBookCategories(queryParams);
				commit('setCategories', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createCategory({ commit, dispatch}, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await categoriesService.createBookCategory(payload);
				dispatch('fetchCategories');		
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editCategory({ commit, dispatch }, { payload, slug } ) {
			commit('setLoading', true);
			let res = await categoriesService.editBookCategory(slug, payload);
			dispatch('fetchCategories');
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteCategory({ commit, dispatch }, slug) {
			commit('setLoading', true);
			try {
				let res = await categoriesService.deleteBookCategory(slug);
				console.log('hiiii from delete', res);
				dispatch('fetchCategories'); 
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