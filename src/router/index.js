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
							console.log('rolessssss', store.getters['User/user'].roles[0]?.name);
							const userRole = store.getters['User/user'].roles[0]?.name;
							console.log('object here2', userRole);
							if (userRole.includes(roles.blogs_admin)) {
								console.log('rolessssss route');
								next('/blogs');
							} else {
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
    console.log(route);
	let userRole = [];
	let roles = store.getters['User/user'].roles;
	let index = 0;
	for (index in roles) {
		userRole.push(roles[index].name);
	}
	console.log('object roles', userRole);
	let routeRoles = [];

	for (const match of route.matched) {
		console.log('meta is', match.meta.roles);
		if (match.meta?.roles) {
			routeRoles = match.meta.roles;
			console.log('object roles 3', routeRoles);
			break;
		}
	}
	if (routeRoles.length === 0) {
		return true;
	} else {
		if (routeRoles.some((e) => userRole.includes(e))) {
			console.log('object roles 2', true);
			return true;
		} else {
			return false;
		}
	}
	// return true;
}

export var router;
