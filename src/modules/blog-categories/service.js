import { api } from '@/utils/axios';
import * as ep from './endpoints';

export default class Service {
	static getBlogCategories(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.CATEGORY, qp).then((res) => res.data);
	}

	static createBlogCategory(payload = {}) {
		return api.post(ep.CATEGORY, payload).then((res) => res.data);
	}

	static editBlogCategory(slug, payload = {}) {
		return api.post(ep.CATEGORY_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static deleteBlogCategory(slug) {
		return api.delete(ep.CATEGORY_BY_SLUG(slug)).then((res) => res.data);
	}
}