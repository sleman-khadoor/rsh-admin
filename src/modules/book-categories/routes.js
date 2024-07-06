import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/book-categories',
	children: [
		{
			path: 'book-categories',
			component: () => import('./pages/list-categories/categories-index.vue'),
			name: 'book-categories',
		},
	],
};