// import Vue from 'vue';
import { createRouter, createWebHistory} from 'vue-router';
import authHelper from '@/utils/auth-helper';
import { store } from '../store';
import routes from './routes';
// import { const_roles } from '@/utils/authorization-helper';

// Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the router instance.
 */

/*
 * @returns {VueRouter}
 */
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
						// if is logged in, redirect to the home page
						next('/');
					} else {
						if (canAccess(to)) {
                            next();
						} else {
								next('/');
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
    console.log(route);
    return true;
	// let userRole = [];
	// let index = 0;
	// for (index in store.getters['User/userRoles']) {
	// 	userRole.push(store.getters['User/userRoles'][index].name);
	// }
	// console.log('object roles', userRole);
	// let routeRoles = [];

	// for (const match of route.matched) {
	// 	console.log('object roles 2', match);
	// 	if (match.meta?.roles) {
	// 		routeRoles = match.meta.roles;
	// 		console.log('object roles 2', routeRoles);
	// 		break;
	// 	}
	// }
	// if (routeRoles.length === 0) {
	// 	return true;
	// } else {
	// 	if (routeRoles.some((e) => userRole.includes(e))) {
	// 		console.log('object roles 2', true);
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }
}

export var router;
