import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getAuthors(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.REPRESENTED_AUTHORS, qp).then((res) => res.data);
	}

	static createAuthor(payload = {}) {
		const data = api.post(ep.REPRESENTED_AUTHORS, payload).then((res) => res.data);
		notify(data)
		return data
	}

	static editAuthor(slug, payload = {}) {
		const data = api.post(ep.REPRESENTED_AUTHORS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}

	static deleteAuthor(slug) {
		const data = api.delete(ep.REPRESENTED_AUTHORS_BY_SLUG(slug)).then((res) => res.data);
		notify(data)
		return data
	}
}