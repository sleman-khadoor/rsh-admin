import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/news',
	meta: {
		roles: [roles.super_admin, roles.news_admin],
	},
	children: [
		{
			path: 'news',
			component: () => import('./pages/list-news/news-index.vue'),
			name: 'news',
		},
	],
};