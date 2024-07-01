import api  from 'axios';
import * as ep from './endpoints';

export default class Service {
	static getAuthors(qp = {}) {
		return api.get(ep.AUTHORS, qp).then((res) => res.data);
	}

	static getAuthorById(id) {
		return api.get(ep.AUTHOR_BY_ID(id)).then((res) => res.data);
	}

	static createAuthor(payload = {}) {
		return api.post(ep.AUTHORS, payload).then((res) => res.data);
	}

	static editAuthor(id, payload = {}) {
		return api.put(ep.AUTHORS_BY_ID(id), payload).then((res) => res.data);
	}

	static deleteAuthor(id) {
		return api.delete(ep.AUTHORS_BY_ID(id)).then((res) => res.data);
	}
}