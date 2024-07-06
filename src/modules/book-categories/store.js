import categoriesService from './service';
// import categoriesTable from './components/contracts-table/store';
// import AttachmentsService from '@/modules/attachments/service';

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
	modules: {
		// categoriesTable,
	},
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
				// if(res) {
				// 	payload.attachments.forEach((file) => {
				// 		file.append('attachable_id', res?.data?.id);
				// 		AttachmentsService.createAttachement(file);
				// 	});	
				// }			
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
				// payload.attachments.forEach((file) => {
				// 	console.log('object contract inside if', res);
				// 	file.append('attachable_id', res?.data?.id);
				// 	AttachmentsService.createAttachement(file);
				// });	
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteCategory({ commit, dispatch }, slug) {
			console.log('hiiii from delete', slug);
			commit('setLoading', true);
			try {
				let res = await categoriesService.deleteCategory(slug);
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