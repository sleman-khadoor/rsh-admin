import { createStore } from 'vuex';
import User from './modules/user';
import Authors from '../modules/authors/store'
import BookCategories from '../modules/book-categories/store'
import BlogCategories from '../modules/blog-categories/store'
import Blogs from '../modules/blogs/store'
import RepresentedAuthors from '../modules/represented-authors/store'
import Partners from '../modules/partners/store'
import Achievements from '../modules/achievements/store'
import Users from '../modules/users/store'

const store = createStore({
	modules: {
		User,
		Authors,
		BookCategories,
		BlogCategories,
		Blogs,
		RepresentedAuthors,
		Partners,
		Achievements,
		Users,
	}
});

export { store }