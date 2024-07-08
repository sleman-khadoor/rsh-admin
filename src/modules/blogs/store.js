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
            console.log('object store auther', state.blogs);
			return state.blogs;
		},
		meta(state) {
            console.log('object store meta', state.meta);
			return state.meta;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
			console.log('object', state.loading);
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
			console.log('inside fetch blogs', queryParams);
			commit('setLoading', true);
			try {
				const  response  = await BlogsService.getBlogs(queryParams);
				commit('setBlogs', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createBlog({ commit, dispatch}, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await BlogsService.createBlog(payload);
				dispatch('fetchBlogs');			
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editBlog({ commit, dispatch }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await BlogsService.editBlog(slug, payload);
			dispatch('fetchBlogs');
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteBlog({ commit, dispatch }, slug) {
			commit('setLoading', true);
			try {
				let res = await BlogsService.deleteBlog(slug);
				dispatch('fetchBlogs'); 
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