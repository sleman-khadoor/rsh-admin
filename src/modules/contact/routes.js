import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/contacts',
	meta: {
		roles: [roles.super_admin, roles.about_admin],
	},
	children: [
		{
			path: 'contacts',
			component: () => import('./pages/list-contacts/contacts-index.vue'),
			name: 'contacts',
		},
	],
};