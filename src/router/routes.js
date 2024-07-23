import BooksModuleRoutes from '@/modules/books/routes'
import AuthorsModuleRoutes from '@/modules/authors/routes'
import BookCategoriesModuleRoutes from '@/modules/book-categories/routes'
import BlogCategoriesModuleRoutes from '@/modules/blog-categories/routes'
import BlogModuleRoutes from '@/modules/blogs/routes'
import RepresentedModuleRoutes from '@/modules/represented-authors/routes'
import PartnerModuleRoutes from '@/modules/partners/routes'
import AchievementModuleRoutes from '@/modules/achievements/routes'
import UserModuleRoutes from '@/modules/users/routes'
import ContactRequestsModuleRoutes from '@/modules/contact-requests/routes'
import BookModuleRoutes from '@/modules/books/routes'
import ServiceRequestsModuleRoutes from '@/modules/service-requests/routes'
import ContactModuleRoutes from '@/modules/contact/routes'
import NewsModuleRoutes from '@/modules/news/routes'
import AuthModuleRoutes from '@/modules/auth/routes';

const routes = [
	{
		path: '/',
		component: () => import(/* webpackChunkName: "MainLayout" */ '@/layouts/main/app-index.vue'),
		children: [
			BooksModuleRoutes,
			AuthorsModuleRoutes,
			BookCategoriesModuleRoutes,
			BlogCategoriesModuleRoutes,
			BlogModuleRoutes,
			RepresentedModuleRoutes,
			PartnerModuleRoutes,
			AchievementModuleRoutes,
			UserModuleRoutes,
			ContactRequestsModuleRoutes,
			BookModuleRoutes,
			ServiceRequestsModuleRoutes,
			ContactModuleRoutes,
			NewsModuleRoutes,
		],
	},
	{
		path: '/',
		component: () => import(/* webpackChunkName: "AuthLayout" */ '../layouts/auth/auth-index.vue'),
		children: [AuthModuleRoutes],
	},
];

export default routes;