import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/book-categories',
	meta: {
		roles: [roles.super_admin, roles.books_admin],
	},
	children: [
		{
			path: 'book-categories',
			component: () => import('./pages/list-categories/categories-index.vue'),
			name: 'book-categories',
		},
	],
};