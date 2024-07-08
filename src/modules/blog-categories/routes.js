import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/blog-categories',
	children: [
		{
			path: 'blog-categories',
			component: () => import('./pages/list-categories/categories-index.vue'),
			name: 'blog-categories',
		},
	],
};