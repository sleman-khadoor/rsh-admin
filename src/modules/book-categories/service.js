import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getBookCategories(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.BOOK_CATEGORY, qp).then((res) => res.data);
	}

	static createBookCategory(payload = {}) {
		const data = api.post(ep.BOOK_CATEGORY, payload).then((res) => res.data);
		notify(data)
		return data
	}

	static editBookCategory(slug, payload = {}) {
		const data = api.post(ep.BOOK_CATEGORY_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}

	static deleteBookCategory(slug) {
		const data = api.delete(ep.BOOK_CATEGORY_BY_SLUG(slug)).then((res) => res.data);
		notify(data)
		return data
	}
}