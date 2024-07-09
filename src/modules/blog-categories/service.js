import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getBlogCategories(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.BLOG_CATEGORY, qp).then((res) => res.data);
	}

	static createBlogCategory(payload = {}) {
		const data =  api.post(ep.BLOG_CATEGORY, payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static editBlogCategory(slug, payload = {}) {
		const data = api.post(ep.BLOG_CATEGORY_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data);
		return data;
	}

	static deleteBlogCategory(slug) {
		const data = api.delete(ep.BLOG_CATEGORY_BY_SLUG(slug)).then((res) => res.data);
		notify(data);
		return data;
	}
}