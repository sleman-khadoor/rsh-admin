import CoreService from './service';
function getState() {
	return {
		loading: false,
		unreadNotificationsStatus: {
			contactUs: false,
			serviceRequests: false,
			translation: false,
			proofreading: false,
			literaryAgency: false,
			marketing: false,
			contentWriting: false,
			bookDelivery: false,
			organizingEventsAndConferences: false,
		},
	};
}
export default {
	namespaced: true,
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
		getUnreadNotificationsStatus(state) {
			return state.unreadNotificationsStatus;
		},
    },
    mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setUnreadNotificationsStatus(state, value) {
			state.unreadNotificationsStatus = value;
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
    actions: {
		async showNotification({ commit }) {
			try {
                console.log('nnnnnnnnnnnnnnn');
				const data = await CoreService.getNotifications();
                console.log('nnnnnnnnnnnnnnn', data.data[1].type);
				commit('setUnreadNotificationsStatus', {
                    marketing: data.data.filter((e) => 
                        e.type === 'marketing_service'
                    )[0].count,
					translation: data.data.filter((e) => 
                        e.type === 'translation_service'
                    )[0].count,
                    proofreading: data.data.filter((e) => 
                        e.type === 'proofreading_service'
                    )[0].count,
                    contactUs: data.data.filter((e) => 
                        e.type === 'contact_request'
                    )[0].count,
				});
			} catch (error) {
				console.log(error);
			}
		},
	},
}