
export default {
	path: '/',
	redirect: '/test',
	children: [
		{
			path: 'test',
			component: () => import('./pages/test-page.vue'),
			name: 'test',
		},
	],
};