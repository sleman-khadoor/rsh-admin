import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/users',
	meta: {
		roles: [roles.super_admin, roles.users_admin],
	},
	children: [
		{
			path: 'users',
			component: () => import('./pages/list-users/users-index.vue'),
			name: 'users',
		},
	],
};