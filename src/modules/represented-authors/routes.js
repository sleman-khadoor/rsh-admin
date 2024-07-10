import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/represented-authors',
	children: [
		{
			path: 'represented-authors',
			component: () => import('./pages/list-authors/authors-index.vue'),
			name: 'representeds-authors',
		},
	],
};