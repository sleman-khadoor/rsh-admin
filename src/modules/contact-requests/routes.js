import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/contact-requests',
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