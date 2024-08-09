import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getBlogs(qp = {}) {
		return api.get(ep.BLOGS, qp).then((res) => res.data);
	}

	static createBlog(payload = {}) {
		const data =  api.post(ep.BLOGS, payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static editBlog(slug, payload = {}) {
		const data =  api.post(ep.BLOGS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static deleteBlog(slug) {
		const data =  api.delete(ep.BLOGS_BY_SLUG(slug)).then((res) => res.data);
		notify(data);
		return data;
	}
}