import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/blogs',
	meta: {
		roles: [roles.super_admin, roles.blogs_admin],
	},
	children: [
		{
			path: 'blogs',
			component: () => import('./pages/list-blogs/blogs-index.vue'),
			name: 'blogs',
		},
	],
};