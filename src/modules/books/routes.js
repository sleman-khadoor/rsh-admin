import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/books',
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