import ServiceRequestsService from './service';
function getState() {
	return {
		loading: false,
		selectedServiceRequest: null,
		serviceRequests: [],
		meta: {},
		serviceName:null,
	};
}

export default {
	namespaced: true,
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
		selectedServiceRequest(state) {
			return state.selectedServiceRequest;
		},
		serviceRequests(state) {
			return state.serviceRequests;
		},
		meta(state) {
			return state.meta;
		},
		serviceName(state) {
			return state.serviceName;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setSelectedServiceRequest(state, value) {
			state.selectedServiceRequest = value;
		},
		setServiceRequests(state, value) {
			state.serviceRequests = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteServiceRequest(state, id) {
			state.serviceRequests = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
		setServiceName(state, value) {
			state.serviceName = value;
		},
	},
	actions: {
		async fetchServiceRequests({ commit }, queryParams) {
			commit('setLoading', true);
			try {
				const  response  = await ServiceRequestsService.getServiceRequests(queryParams);
				commit('setServiceRequests', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async getServiceRequest({ commit }, slug) {
			commit('setLoading', true);
			try {
				let { data } = await ServiceRequestsService.getServiceRequest(slug);
				commit('setSelectedServiceRequest', data);
			} catch (err) {
				console.log(err);
			} finally {
				commit('setLoading', false);
			}
		},
		
		async createServiceRequest({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await ServiceRequestsService.createServiceRequest(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editServiceRequest({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await ServiceRequestsService.editServiceRequest(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteServiceRequest({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await ServiceRequestsService.deleteServiceRequest(slug);
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