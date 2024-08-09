import ContactRequestsService from './service';
function getState() {
	return {
		loading: false,
		selectedContactRequest: null,
		contactRequests: [],
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
		selectedContactRequest(state) {
			return state.selectedContactRequest;
		},
		contactRequests(state) {
			return state.contactRequests;
		},
		meta(state) {
			return state.meta;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setSelectedContactRequest(state, value) {
			state.selectedContactRequest = value;
		},
		setContactRequests(state, value) {
			state.contactRequests = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteContactRequest(state, id) {
			state.contactRequests = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchContactRequests({ commit }, queryParams) {
			commit('setLoading', true);
			try {
				const  response  = await ContactRequestsService.getContactRequests(queryParams);
				commit('setContactRequests', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async getContactRequest({ commit }, slug) {
			commit('setLoading', true);
			try {
				let { data } = await ContactRequestsService.getContactRequest(slug);
				commit('setSelectedContactRequest', data);
			} catch (err) {
				console.log(err);
			} finally {
				commit('setLoading', false);
			}
		},
		
		async createContactRequest({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await ContactRequestsService.createContactRequest(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editContactRequest({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await ContactRequestsService.editContactRequest(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteContactRequest({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await ContactRequestsService.deleteContactRequest(slug);
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