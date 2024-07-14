import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/users',
	children: [
		{
			path: 'users',
			component: () => import('./pages/list-users/users-index.vue'),
			name: 'users',
		},
	],
};