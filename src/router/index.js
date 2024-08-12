import { createRouter, createWebHistory} from 'vue-router';
import authHelper from '@/utils/auth-helper';
import { store } from '../store';
import routes from './routes';
import roles from '@/utils/roles'

export default function (/* { store, ssrContext } */) {
	if (router == null) {
		router = createRouter({
			scrollBehavior: () => ({ x: 0, y: 0 }),
			history: createWebHistory(),
			routes,
		});
	}

	const whiteList = ['/login', '/2fa', '/unauth'];

	router.beforeEach((to, from, next) => {
		if (store.getters['User/expiredPasswordFlag'] === true) {
			if (to.path === '/reset-password') {
				next();
			} else {
				next('/reset-password');
			}
		} else {
			store
				.dispatch('Auth/getAccessToken')
				.then(() => {
					if (whiteList.includes(to.path)) {
						next('/');
					} else {
						if (canAccess(to)) {
                            next();
						} else {
							const userRole = store.getters['User/user'].roles[0]?.name;
							if (userRole.includes(roles.blogs_admin)) {
								next('/blogs');
							}else if(userRole.includes(roles.books_admin)){
								next('/books');
							}else if(userRole.includes(roles.services_admin)){
								next('/contact-requests');
							}else if(userRole.includes(roles.news_admin)){
								next('/news');
							}else if(userRole.includes(roles.contacts_admin)){
								next('/represented-authors');
							}else if(userRole.includes(roles.users_admin)){
								next('/users');
							}else {
								next('/');
							}
						}
					}
				}
				).catch(() => {
					if (whiteList.includes(to.path)) {
						next();
					} else {
						authHelper.reset();
						next('/login');
					}
				});
		}
	});

	return router;
}

function canAccess(route) {
	let userRole = [];
	let roles = store.getters['User/user'].roles;
	let index = 0;
	for (index in roles) {
		userRole.push(roles[index].name);
	}
	let routeRoles = [];

	for (const match of route.matched) {
		if (match.meta?.roles) {
			routeRoles = match.meta.roles;
			break;
		}
	}
	if (routeRoles.length === 0) {
		return true;
	} else {
		if (routeRoles.some((e) => userRole.includes(e))) {
			return true;
		} else {
			return false;
		}
	}
}

export var router;
