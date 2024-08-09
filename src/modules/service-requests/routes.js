import ModuleLayout from './module-layout.vue';
import roles from '@/utils/roles.js'

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/contact-requests',
	meta: {
		roles: [roles.super_admin, roles.services_admin],
	},
	children: [
		{
			path: 'service-requests/translation',
			component: () => import('./pages/list-service-requests/translation-requests-index.vue'),
			name: 'translation-requests',
		},
		{
			path: 'service-requests/proofreading',
			component: () => import('./pages/list-service-requests/proofreading-requests-index.vue'),
			name: 'proofreading-requests',
		},
		{
			path: 'service-requests/creative-editing',
			component: () => import('./pages/list-service-requests/creative-editing-requests-index.vue'),
			name: 'creative-editing-requests',
		},
		{
			path: 'service-requests/literary-agency',
			component: () => import('./pages/list-service-requests/literary-agency-requests-index.vue'),
			name: 'literary-agency-requests',
		},
		{
			path: 'service-requests/marketing',
			component: () => import('./pages/list-service-requests/marketing-requests-index.vue'),
			name: 'marketing-requests',
		},
		{
			path: 'service-requests/content-writing',
			component: () => import('./pages/list-service-requests/content-writing-requests-index.vue'),
			name: 'content-writing-requests',
		},
		{
			path: 'service-requests/book-delivery',
			component: () => import('./pages/list-service-requests/book-delivery-requests-index.vue'),
			name: 'book-delivery-requests',
		},
		{
			path: 'service-requests/organizing-events-conferences',
			component: () => import('./pages/list-service-requests/organizing-requests-index.vue'),
			name: 'organizing-events-conferences-requests',
		},
		{
			path: 'service-requests/:serviceType/:slug',
			component: () => import('./pages/list-service-requests/service-request.vue'),
			name: 'service-request',
		},
	],
};
