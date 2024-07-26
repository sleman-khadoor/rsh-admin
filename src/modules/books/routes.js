import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/books',
	meta: {
		roles: [roles.super_admin, roles.books_admin],
	},
	children: [
		{
			path: 'books',
			component: () => import('./pages/list-books/books-index.vue'),
			name: 'books',
		},
		{
			path: 'book-reviews/:slug',
			component: () => import('./pages/list-books/book-reviews.vue'),
			name: 'book-reviews',
		},
		{
			path: 'book-awards/:slug',
			component: () => import('./pages/list-books/book-awards.vue'),
			name: 'book-awards',
		},
	],
};