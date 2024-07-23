import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/news',
	children: [
		{
			path: 'news',
			component: () => import('./pages/list-news/news-index.vue'),
			name: 'news',
		},
	],
};