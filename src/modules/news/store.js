import NewsService from './service';
function getState() {
	return {
		loading: false,
		selectedNews: null,
		news: [],
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
		selectedNews(state) {
			return state.selectedNews;
		},
		news(state) {
			return state.news;
		},
		meta(state) {
			return state.meta;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setSelectedNews(state, value) {
			state.selectedNews = value;
		},
		setNews(state, value) {
			state.news = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteNews(state, id) {
			state.news = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchNews({ commit }, queryParams) {
			commit('setLoading', true);
			try {
				const  response  = await NewsService.getNews(queryParams);
				commit('setNews', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createNews({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await NewsService.createNews(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editNews({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await NewsService.editNews(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteNews({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await NewsService.deleteNews(slug);
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