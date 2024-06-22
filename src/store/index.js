import { createStore } from 'vuex'
export default function (/* { ssrContext } */) {
	store = createStore({
		modules: {
            // modules
		},

		// enable strict mode (adds overhead!)
		// for dev mode only
		// strict: process.env.DEBUGGING,
	});

	return store;
}

export var store;