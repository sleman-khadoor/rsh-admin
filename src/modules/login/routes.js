// import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	// component: ModuleLayout,
	redirect: '/test',
	children: [
		{
			path: 'test',
			component: () => import('./pages/test-page.vue'),
			name: 'test',
		},
	],
};