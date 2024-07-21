import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	redirect: '/contacts',
	children: [
		{
			path: 'contacts',
			component: () => import('./pages/list-contacts/contacts-index.vue'),
			name: 'contacts',
		},
	],
};