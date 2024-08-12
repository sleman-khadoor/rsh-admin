import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/authors',
	meta: {
		roles: [roles.super_admin, roles.books_admin],
	},
	children: [
		{
			path: 'authors',
			component: () => import('./pages/list-authors/authors-index.vue'),
			name: 'authors',
		},
	],
};