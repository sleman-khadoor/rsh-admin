import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/achievements',
	children: [
		{
			path: 'achievements',
			component: () => import('./pages/list-achievements/achievements-index.vue'),
			name: 'achievements',
		},
	],
};