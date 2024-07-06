import BooksModuleRoutes from '@/modules/books/routes'
import AuthorsModuleRoutes from '@/modules/authors/routes'
import BookCategoriesModuleRoutes from '@/modules/book-categories/routes'
const routes = [
	{
		path: '/',
		component: () => import(/* webpackChunkName: "MainLayout" */ '@/layouts/main/app-index.vue'),
		children: [
			BooksModuleRoutes,
			AuthorsModuleRoutes,
			BookCategoriesModuleRoutes
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