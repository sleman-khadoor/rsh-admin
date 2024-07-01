import { createStore } from 'vuex';
import User from './modules/user';
import Authors from '../modules/authors/store'

const store = createStore({
	modules: {
		User,
		Authors
	}
});

export { store }