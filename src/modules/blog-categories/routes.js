import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/blog-categories',
	meta: {
		roles: [roles.super_admin, roles.blogs_admin],
	},
	children: [
		{
			path: 'blog-categories',
			component: () => import('./pages/list-categories/categories-index.vue'),
			name: 'blog-categories',
		},
	],
};