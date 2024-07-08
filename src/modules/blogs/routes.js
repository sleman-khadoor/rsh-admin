import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/blogs',
	children: [
		{
			path: 'blogs',
			component: () => import('./pages/list-blogs/blogs-index.vue'),
			name: 'blogs',
		},
	],
};