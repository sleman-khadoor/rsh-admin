import api  from 'axios';
import * as ep from './endpoints';

export default class Service {
	static getBooks(qp = {}) {
		return api.get(ep.BOOKS, qp).then((res) => res.data);
	}

	static getBookById(id) {
		return api.get(ep.BOOK_BY_ID(id)).then((res) => res.data);
	}

	static createBook(payload = {}) {
		return api.post(ep.BOOKS, payload).then((res) => res.data);
	}

	static editBook(id, payload = {}) {
		return api.put(ep.BOOKS_BY_ID(id), payload).then((res) => res.data);
	}

	static deleteBook(id) {
		return api.delete(ep.BOOKS_BY_ID(id)).then((res) => res.data);
	}
}
