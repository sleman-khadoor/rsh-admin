import AuthorsService from './service';
// import AuthorsTable from './components/contracts-table/store';
// import AttachmentsService from '@/modules/attachments/service';

function getState() {
	return {
		loading: false,
		selectedAuthor: null,
		authors: [],
	};
}

export default {
	namespaced: true,
	modules: {
		// AuthorsTable,
	},
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
		selectedAuthor(state) {
			return state.selectedAuthor;
		},
		authors(state) {
            console.log('object store auther', state.authors);
			return state.authors;
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
		deleteAuthor(state, id) {
			state.authors = state.contracts.filter((e) => e.id !== id);
			// state.authors = state.authors;
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchAuthors({ commit }, queryParams) {
			console.log('inside fetch authors');
			commit('setLoading', true);
			try {
				const  response  = await AuthorsService.getAuthors(queryParams);
				commit('setAuthors', response.data);
			} finally {
				commit('setLoading', false);
			}
		},

		async createAuthor({ commit, dispatch}, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await AuthorsService.createAuthor(payload);
				dispatch('fetchAuthors'); // Use dispatch to call fetchAuthors
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

		async editAuthor({ commit, dispatch }, { payload, slug } ) {
			commit('setLoading', true);
			let res = await AuthorsService.editAuthor(slug, payload);
			dispatch('fetchAuthors'); // Use dispatch to call fetchAuthors
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