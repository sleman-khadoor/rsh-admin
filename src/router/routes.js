import BooksModuleRoutes from '@/modules/books/routes'
const routes = [
	{
		path: '/',
		component: () => import(/* webpackChunkName: "MainLayout" */ '@/layouts/main/app-index.vue'),
		children: [
			BooksModuleRoutes
		],
	},
	// {
	// 	path: '/',
	// 	component: () => import(/* webpackChunkName: "AuthLayout" */ '@/layouts/auth'),
	// 	children: [AuthModuleRoutes],
	// },
	// // Always leave this as last one,
	// // but you can also remove it
	// {
	// 	path: '*',
	// 	component: () => import('@/layouts/404'),
	// },
];

export default routes;