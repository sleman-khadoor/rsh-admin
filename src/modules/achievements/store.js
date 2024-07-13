import AchievementsService from './service';
function getState() {
	return {
		loading: false,
		selectedAchievement: null,
		achievements: [],
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
		selectedAchievement(state) {
			return state.selectedAchievement;
		},
		achievements(state) {
            console.log('object store achievement', state.achievements);
			return state.achievements;
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
		setSelectedAchievement(state, value) {
			state.selectedAchievement = value;
		},
		setAchievements(state, value) {
			state.achievements = value;
		},
		setMeta(state, value) {
			state.meta = value;
		},
		deleteAchievement(state, id) {
			state.achievements = state.contracts.filter((e) => e.id !== id);
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		async fetchAchievements({ commit }, queryParams) {
			console.log('inside fetch achievements', queryParams);
			commit('setLoading', true);
			try {
				const  response  = await AchievementsService.getAchievements(queryParams);
				commit('setAchievements', response.data);
				commit('setMeta', response.meta);
			} finally {
				commit('setLoading', false);
			}
		},

		async createAchievement({ commit }, payload) {
			commit('setLoading', true);
			let res = null;
			try {
				res = await AchievementsService.createAchievement(payload);
			} finally {
				commit('setLoading', false);
			}
			return res;
		},

		async editAchievement({ commit }, { payload, slug } ) {
			payload['_method'] = 'PUT';
			commit('setLoading', true);
			let res = await AchievementsService.editAchievement(slug, payload);
			try {
				return res;
			} finally {
				commit('setLoading', false);
			}
		},

		async deleteAchievement({ commit }, slug) {
			commit('setLoading', true);
			try {
				let res = await AchievementsService.deleteAchievement(slug);
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