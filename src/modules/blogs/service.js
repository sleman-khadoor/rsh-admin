import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getBlogs(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.AUTHORS, qp).then((res) => res.data);
	}

	static createBlog(payload = {}) {
		const data =  api.post(ep.AUTHORS, payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static editBlog(slug, payload = {}) {
		const data =  api.post(ep.AUTHORS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static deleteBlog(slug) {
		const data =  api.delete(ep.AUTHORS_BY_SLUG(slug)).then((res) => res.data);
		notify(data);
		return data;
	}
}