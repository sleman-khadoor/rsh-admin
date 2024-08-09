import PartnersService from './service';
function getState() {
	return {
		loading: false,
		selectedPartner: null,
		partners: [],
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
		selectedPartner(state) {
			return state.selectedPartner;
		},
		partners(state) {
			return state.partners;
		},
		meta(state) {
			return state.meta;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setSelectedPartner(state, value) {
			state.selectedPartner = value;
		},
		setPartners(state, value) {
			state.partners = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deletePartner(state, id) {
			state.partners = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchPartners({ commit }, queryParams) {
			commit('setLoading', true);
			try {
				const  response  = await PartnersService.getPartners(queryParams);
				commit('setPartners', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createPartner({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await PartnersService.createPartner(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editPartner({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await PartnersService.editPartner(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deletePartner({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await PartnersService.deletePartner(slug);
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