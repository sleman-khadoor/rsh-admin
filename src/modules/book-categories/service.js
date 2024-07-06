import api  from 'axios';
import * as ep from './endpoints';

export default class Service {
	static getBookCategories(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.CATEGORY, qp).then((res) => res.data);
	}

	static createBookCategory(payload = {}) {
		return api.post(ep.CATEGORY, payload).then((res) => res.data);
	}

	static editBookCategory(slug, payload = {}) {
		return api.put(ep.CATEGORY_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static deleteBookCategory(slug) {
		return api.delete(ep.CATEGORY_BY_SLUG(slug)).then((res) => res.data);
	}
}