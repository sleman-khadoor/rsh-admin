import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getAuthors(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.AUTHORS, qp).then((res) => res.data);
	}

	static createAuthor(payload = {}) {
		const data = api.post(ep.AUTHORS, payload).then((res) => res.data);
		notify(data)
		return data
	}

	static editAuthor(slug, payload = {}) {
		const data = api.post(ep.AUTHORS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}

	static deleteAuthor(slug) {
		const data = api.delete(ep.AUTHORS_BY_SLUG(slug)).then((res) => res.data);
		notify(data)
		return data
	}
}