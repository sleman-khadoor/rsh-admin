import UsersService from './service';

function getState() {
	return {
		loading: false,
		selectedUser: null,
		users: [],
		roles: [],
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
		selectedUser(state) {
			return state.selectedUser;
		},
		users(state) {
            console.log('object store users', state.users);
			return state.users;
		},
		roles(state) {
            console.log('object store user', state.users);
			return state.roles;
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
		setSelectedUser(state, value) {
			state.selectedUser = value;
		},
		setUsers(state, value) {
			state.users = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteUser(state, id) {
			state.users = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
		setRoles(state, value) {
			state.roles = value;
		},
	},
	actions: {
		async fetchUsers({ commit }, queryParams) {
			console.log('inside fetch users', queryParams);
			commit('setLoading', true);
			try {
				const  response  = await UsersService.getUsers(queryParams);
				commit('setUsers', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createUser({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await UsersService.createUser(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editUser({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await UsersService.editUser(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteUser({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await UsersService.deleteUser(slug);
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async fetchRoles({ commit }, queryParams) {
			console.log('inside fetch roles', queryParams);
			commit('setLoading', true);
			try {
				const  response  = await UsersService.getRoles(queryParams);
				commit('setRoles', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async resetPassword({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await UsersService.resetPassword(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		resetState({ commit }) {
			commit('resetState');
		},
		
	},
};