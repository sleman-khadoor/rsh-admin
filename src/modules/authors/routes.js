import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/authors',
	children: [
		{
			path: 'authors',
			component: () => import('./pages/list-authors/authors-index.vue'),
			name: 'authors',
		},
	],
};