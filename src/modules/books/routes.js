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
	],
};