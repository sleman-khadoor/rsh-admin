import AuthorsService from './service';
function getState() {
	return {
		loading: false,
		selectedAuthor: null,
		authors: [],
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
		selectedAuthor(state) {
			return state.selectedAuthor;
		},
		authors(state) {
			return state.authors;
		},
		meta(state) {
			return state.meta;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setSelectedAuthor(state, value) {
			state.selectedAuthor = value;
		},
		setAuthors(state, value) {
			state.authors = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteAuthor(state, id) {
			state.authors = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchAuthors({ commit }, queryParams) {
			commit('setLoading', true);
			try {
				const  response  = await AuthorsService.getAuthors(queryParams);
				commit('setAuthors', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createAuthor({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await AuthorsService.createAuthor(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editAuthor({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await AuthorsService.editAuthor(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteAuthor({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await AuthorsService.deleteAuthor(slug);
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