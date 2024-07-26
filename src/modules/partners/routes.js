import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/partners',
	meta: {
		roles: [roles.super_admin, roles.partners_admin],
	},
	children: [
		{
			path: 'partners',
			component: () => import('./pages/list-partners/partners-index.vue'),
			name: 'partners',
		},
	],
};