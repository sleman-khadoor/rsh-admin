import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/partners',
	children: [
		{
			path: 'partners',
			component: () => import('./pages/list-partners/partners-index.vue'),
			name: 'partners',
		},
	],
};