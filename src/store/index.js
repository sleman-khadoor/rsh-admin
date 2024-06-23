import { createStore } from 'vuex';
import User from './modules/user';
export default function (/* { ssrContext } */) {
	store = createStore({
		modules: {
            User
		},

		// enable strict mode (adds overhead!)
		// for dev mode only
		// strict: process.env.DEBUGGING,
	});

	return store;
}

export var store;