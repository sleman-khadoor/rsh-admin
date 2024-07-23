import AuthService from '@/modules/auth/service';

export default {
	namespaced: true,
	state() {
		return {
			loading: false,
		};
	},
	getters: {
		loading(state) {
			return state.loading;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
	},
	actions: {
		async login({ commit, dispatch }, payload) {
			commit('setLoading', true);
			try {
				const { data } = await AuthService.login(payload);
				console.log('object login data: ', data);
				dispatch('User/storeUser', data.data.user, { root: true });
				// dispatch('User/setExpiredTokenFlag', data.additional.token_expires_at, { root: true });
				console.log('token auth helper', data.data.token);
				commit('Auth/setAccessToken', data.data.token, { root: true });
				// dispatch('User/storeDepartments', data.additional.departments, { root: true });
			} finally {
				commit('setLoading', false);
			}
		},
	},
};
