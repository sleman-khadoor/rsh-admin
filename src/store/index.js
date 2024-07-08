import { createStore } from 'vuex';
import User from './modules/user';
import Authors from '../modules/authors/store'
import BookCategories from '../modules/book-categories/store'
import BlogCategories from '../modules/blog-categories/store'
import Blogs from '../modules/blogs/store'

const store = createStore({
	modules: {
		User,
		Authors,
		BookCategories,
		BlogCategories,
		Blogs
	}
});

export { store }