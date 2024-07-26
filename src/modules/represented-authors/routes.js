import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/represented-authors',
	meta: {
		roles: [roles.super_admin, roles.represented_authors_admin],
	},
	children: [
		{
			path: 'represented-authors',
			component: () => import('./pages/list-authors/authors-index.vue'),
			name: 'representeds-authors',
		},
	],
};