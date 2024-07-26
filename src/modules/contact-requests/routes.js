import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/contact-requests',
	meta: {
		roles: [roles.super_admin, roles.contacts_admin],
	},
	children: [
		{
			path: 'contact-requests',
			component: () => import('./pages/list-contact-requests/contact-requests-index.vue'),
			name: 'contact-requests',
		},
		{
			path: 'contact-requests/:slug',
			component: () => import('./pages/list-contact-requests/contact-request.vue'),
			name: 'contact-request',
		},
	],
};