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
		],
	},
];

export default routes;