import ContactsService from './service';
function getState() {
	return {
		loading: false,
		selectedContact: null,
		contacts: [],
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
		selectedContact(state) {
			return state.selectedContact;
		},
		contacts(state) {
            console.log('object store auther', state.contacts);
			return state.contacts;
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
		setSelectedContact(state, value) {
			state.selectedContact = value;
		},
		setContacts(state, value) {
			state.contacts = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteContact(state, id) {
			state.contacts = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchContacts({ commit }, queryParams) {
			console.log('inside fetch contacts', queryParams);
			commit('setLoading', true);
			try {
				const  response  = await ContactsService.getContacts(queryParams);
				commit('setContacts', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async editContact({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await ContactsService.editContact(slug, payload);
			try {
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