import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getBooks(qp = {}) {
		return api.get(ep.BOOKS, qp).then((res) => res.data);
	}

	static createBook(payload = {}) {
		const data =  api.post(ep.BOOKS, payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static getBook(slug, payload = {}) {
		return api.get(ep.BOOKS_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static editBook(slug, payload = {}) {
		const data =  api.post(ep.BOOKS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static deleteBook(slug) {
		const data =  api.delete(ep.BOOKS_BY_SLUG(slug)).then((res) => res.data);
		notify(data);
		return data;
	}

	static getFormats(qp = {}) {
		return api.get(ep.FORMATS, qp).then((res) => res.data);
	}

	static createReview(payload = {}) {
		const data =  api.post(ep.BOOK_REVIEWS, payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static getReview(slug, payload = {}) {
		return api.get(ep.BOOK_REVIEWS_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static editReview(slug, payload = {}) {
		const data =  api.post(ep.BOOK_REVIEWS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static deleteReview(slug) {
		const data =  api.delete(ep.BOOK_REVIEWS_BY_SLUG(slug)).then((res) => res.data);
		notify(data);
		return data;
	}

	static createAward(payload = {}) {
		const data =  api.post(ep.BOOK_AWARDS, payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static getAward(slug, payload = {}) {
		return api.get(ep.BOOK_AWARDS_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static editAward(slug, payload = {}) {
		const data =  api.post(ep.BOOK_AWARDS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static deleteAward(slug) {
		const data =  api.delete(ep.BOOK_AWARDS_BY_SLUG(slug)).then((res) => res.data);
		notify(data);
		return data;
	}
}
