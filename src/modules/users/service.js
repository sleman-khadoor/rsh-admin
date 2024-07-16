import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getUsers(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.USERS, qp).then((res) => res.data);
	}

	static createUser(payload = {}) {
		const data =  api.post(ep.USERS, payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static editUser(slug, payload = {}) {
		const data =  api.post(ep.USERS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static deleteUser(slug) {
		const data =  api.delete(ep.USERS_BY_SLUG(slug)).then((res) => res.data);
		notify(data);
		return data;
	}

	static getRoles(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.ROLES, qp).then((res) => res.data);
	}

	static resetPassword(slug, payload = {}) {
		const data =  api.post(ep.RESET_PASSWORD(slug), payload).then((res) => res.data);
		notify(data);
		return data;
	}
}