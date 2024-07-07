import { api } from '@/utils/axios';
import * as ep from './endpoints';

export default class Service {
	static getAuthors(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.AUTHORS, qp).then((res) => res.data);
	}

	static createAuthor(payload = {}) {
		return api.post(ep.AUTHORS, payload).then((res) => res.data);
	}

	static editAuthor(slug, payload = {}) {
		return api.put(ep.AUTHORS_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static deleteAuthor(slug) {
		return api.delete(ep.AUTHORS_BY_SLUG(slug)).then((res) => res.data);
	}
}