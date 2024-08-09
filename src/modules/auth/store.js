import Login from './pages/login/store';
import authHelper from '@/utils/auth-helper';
import AuthService from './service';
import { api as axiosInstance } from '@/utils/axios';

function getState() {
	return {
		loading: false,
		accessToken: authHelper.getRefreshToken(),
		refreshToken: authHelper.getAccessToken(),
		gettingAccessTokenPromise: null,
		roles: [],
	};
}

export default {
	namespaced: true,
	modules: {
		Login,
	},
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setTokens(state, tokens) {
			state.accessToken = tokens.accessToken;
			state.refreshToken = tokens.refreshToken;
			authHelper.setAccessToken(state.accessToken);
			authHelper.setRefreshToken(state.refreshToken);
			axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + authHelper.getAccessToken();
		},
		setAccessToken(state, token) {
			state.accessToken = token;
			authHelper.setAccessToken(token);
			axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + authHelper.getAccessToken();
		},
		setRoles(state, roles) {
			state.roles = roles;
			authHelper.setRoles(roles);
		},
		setRefreshToken(state, token) {
			state.refreshToken = token;
			authHelper.setRefreshToken(token);
		},
		setAccessTokenPromise(state, promise) {
			state.gettingAccessTokenPromise = promise;
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		getAccessToken({ dispatch }) {
			const accessToken = authHelper.getAccessToken();
			if (accessToken) {
				return accessToken;
			} else {
				const refreshToken = authHelper.getRefreshToken();
				if (refreshToken) {
					return dispatch('getNewAccessToken')
						.then(() => {
							return authHelper.getAccessToken();
						})
						.catch(() => {
							return Promise.reject('failed to get new accessToken -> unauthenticated');
						});
				} else {
					return Promise.reject('no accessToken nor refreshToken -> unauthenticated');
				}
			}
		},
		async logout({ commit }) {
			commit('setLoading', true);
			try {
				await AuthService.logout();
				commit('resetState');
				return;
			} finally {
				commit('setLoading', false);
			}
		},
		async resetPassword({ commit }, payload) {
			commit('setLoading', true);
			let data = null;
			try {
				data = await AuthService.resetPassword(payload);
				return data.data;
			} finally {
				commit('setLoading', false);
			}
		},
	},
};
