import { createStore } from 'vuex';
import User from './modules/user';
import Authors from '../modules/authors/store'
import BookCategories from '../modules/book-categories/store'

const store = createStore({
	modules: {
		User,
		Authors,
		BookCategories
	}
});

export { store }