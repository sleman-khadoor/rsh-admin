import { createStore } from 'vuex';
import User from './modules/user';
import Books from '../modules/books/store'

export default function () {
	store = createStore({
		modules: {
            User,
			Books,
		},

		// enable strict mode (adds overhead!)
		// for dev mode only
		// strict: process.env.DEBUGGING,
	});

	return store;
}

export var store;