import { api } from '@/utils/axios';
import * as ep from './endpoints';

export default class Service {
	static getBlogs(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.AUTHORS, qp).then((res) => res.data);
	}

	static createBlog(payload = {}) {
		return api.post(ep.AUTHORS, payload).then((res) => res.data);
	}

	static editBlog(slug, payload = {}) {
		return api.post(ep.AUTHORS_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static deleteBlog(slug) {
		return api.delete(ep.AUTHORS_BY_SLUG(slug)).then((res) => res.data);
	}
}