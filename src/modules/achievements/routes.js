import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'
export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/achievements',
	meta: {
		roles: [roles.super_admin],
	},
	children: [
		{
			path: 'achievements',
			component: () => import('./pages/list-achievements/achievements-index.vue'),
			name: 'achievements',
		},
	],
};