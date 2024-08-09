import BlogsService from './service';

function getState() {
	return {
		loading: false,
		selectedBlog: null,
		blogs: [],
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
		selectedBlog(state) {
			return state.selectedBlog;
		},
		blogs(state) {
			return state.blogs;
		},
		meta(state) {
			return state.meta;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setSelectedBlog(state, value) {
			state.selectedBlog = value;
		},
		setBlogs(state, value) {
			state.blogs = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteBlog(state, id) {
			state.blogs = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchBlogs({ commit }, queryParams) {
			commit('setLoading', true);
			try {
				const  response  = await BlogsService.getBlogs(queryParams);
				commit('setBlogs', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createBlog({ commit }, payload) {
			payload['_method'] = 'POST';
			commit('setLoading', true);
			let res = null;
			try {
				res = await BlogsService.createBlog(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editBlog({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await BlogsService.editBlog(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteBlog({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await BlogsService.deleteBlog(slug);
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