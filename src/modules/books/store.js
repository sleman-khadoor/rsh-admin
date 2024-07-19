import BooksService from './service';

function getState() {
	return {
		loading: false,
		selectedBook: null,
		selectedReview: null,
		selectedAward: null,
		books: [],
		formats: [],
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
		selectedBook(state) {
			return state.selectedBook;
		},
		selectedReview(state) {
			return state.selectedReview;
		},
		selectedAward(state) {
			return state.selectedAward;
		},
		books(state) {
            console.log('object store auther', state.books);
			return state.books;
		},
		formats(state) {
            console.log('object store auther', state.formats);
			return state.formats;
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
		setSelectedBook(state, value) {
			state.selectedBook = value;
		},
		setSelectedReview(state, value) {
			state.selectedReview = value;
		},
		setSelectedAward(state, value) {
			state.selectedAward = value;
		},
		setBooks(state, value) {
			state.books = value;
		},
		setFormats(state, value) {
			state.formats = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteBook(state, id) {
			state.books = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchBooks({ commit }, queryParams) {
			console.log('inside fetch books', queryParams);
			commit('setLoading', true);
			try {
				const  response  = await BooksService.getBooks(queryParams);
				commit('setBooks', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createBook({ commit }, payload) {
			payload['_method'] = 'POST';
			commit('setLoading', true);
			let res = null;
			try {
				res = await BooksService.createBook(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editBook({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await BooksService.editBook(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteBook({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await BooksService.deleteBook(slug);
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async getBook({ commit }, slug) {
			commit('setLoading', true);
			try {
				let { data } = await BooksService.getBook(slug);
				commit('setSelectedBook', data);
			} catch (err) {
				console.log(err);
			} finally {
				commit('setLoading', false);
			}
		},

		async fetchFormats({ commit }, queryParams) {
			console.log('inside fetch formats', queryParams);
			commit('setLoading', true);
			try {
				const  response  = await BooksService.getFormats(queryParams);
				commit('setFormats', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createReview({ commit }, payload) {
			payload['_method'] = 'POST';
			commit('setLoading', true);
			let res = null;
			try {
				res = await BooksService.createReview(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editReview({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await BooksService.editReview(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteReview({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await BooksService.deleteReview(slug);
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async createAward({ commit }, payload) {
			payload['_method'] = 'POST';
			commit('setLoading', true);
			let res = null;
			try {
				res = await BooksService.createAward(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editAward({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await BooksService.editAward(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteAward({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await BooksService.deleteAward(slug);
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