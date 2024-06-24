import BooksService from './service';
// import BooksTable from './components/contracts-table/store';
// import AttachmentsService from '@/modules/attachments/service';

function getState() {
	return {
		loading: false,
		selectedBook: null,
		books: [],
	};
}

export default {
	namespaced: true,
	modules: {
		// BooksTable,
	},
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
		selectedBook(state) {
			return state.selectedBook;
		},
		books(state) {
			return state.books;
		},

	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setSelectedBook(state, value) {
			state.selectedBook = value;
		},
		setBooks(state, value) {
			state.books = value;
		},
		deleteBook(state, id) {
			// state.books = state.contracts.filter((e) => e.id !== id);
			state.books = state.books;
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchBooks({ commit }, queryParams) {
			console.log('hiiiiii222222');
			commit('setLoading', true);
			try {
				const { data } = await BooksService.getBooks(queryParams);
				commit('setBooks', data);
			} catch (error) {
				throw error;
			} finally {
				commit('setLoading', false);
			}
		},
		async getBookById({ commit }, id) {
			commit('setLoading', true);
			try {
				let { data } = await BooksService.getBookById(id);
				commit('setSelectedBook', data);
			} catch (err) {
				console.log(err);
			} finally {
				commit('setLoading', false);
			}
		},
		async createBook({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await BooksService.createBook(payload);
				// if(res) {
				// 	payload.attachments.forEach((file) => {
				// 		file.append('attachable_id', res?.data?.id);
				// 		AttachmentsService.createAttachement(file);
				// 	});	
				// }			
			} catch (err) {
				throw err;
			} finally {
				commit('setLoading', false);
			}
			return res;
		},
		async editBook({ commit }, { payload, id }) {
			commit('setLoading', true);
			let res = await BooksService.editBook(id, payload);
			try {
				// payload.attachments.forEach((file) => {
				// 	console.log('object contract inside if', res);
				// 	file.append('attachable_id', res?.data?.id);
				// 	AttachmentsService.createAttachement(file);
				// });	
				return res;
			} catch (err) {
				throw err;
			} finally {
				commit('setLoading', false);
			}
		},
		async deleteBook({ commit }, id) {
			commit('setLoading', true);
			try {
				let res = await BooksService.deleteBook(id);
				return res;
			} catch (err) {
				throw err;
			} finally {
				commit('setLoading', false);
			}
		},
		resetState({ commit }) {
			commit('resetState');
		},
	},
};
