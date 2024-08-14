function getState() {
	return {
		loading: false,
		user: JSON.parse(localStorage.getItem('user') || '{}') || null,
		expiredPasswordFlag: JSON.parse(localStorage.getItem('expiredPasswordFlag')) || false,
		expiredTokenFlag: localStorage.getItem('expiredPasswordFlag') || 0,
	};
}

export default {
	namespaced: true,
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
		user(state) {			
			return state.user;
		},
		userRoles(state) {
			return state.user?.roles ?? [];
		},
		userDepartments(state) {
			return state.user?.departments ?? [];
		},
		expiredPasswordFlag(state) {
			return state.expiredPasswordFlag;
		},
		expiredTokenFlag(state) {
			return state.expiredTokenFlag;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setUser(state, value) {
			state.user = value;
		},
		setExpiredPasswordFlag(state, value) {
			state.expiredPasswordFlag = value;
		},
		setNewRolesSorted(state, value) {
			var index = state.user.roles.indexOf(value);
			if (index !== -1) {
				state.user.roles.splice(index, 1);
			}
			state.user.roles.unshift(value);
			localStorage.setItem('user', JSON.stringify(state.user))
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		storeUser({ commit }, user) {
			commit('setUser', user);
			localStorage.setItem('user', JSON.stringify(user));
		},
		setExpiredPasswordFlag({ commit }, value) {
			commit('setExpiredPasswordFlag', value);
			localStorage.setItem('expiredPasswordFlag', value);
		},
		activateAnotherRole({commit}, value) {
			commit('setNewRolesSorted', value);
		}
	},
};
