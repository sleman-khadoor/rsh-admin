import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getNews(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.NEWS, qp).then((res) => res.data);
	}

	static createNews(payload = {}) {
		const data = api.post(ep.NEWS, payload).then((res) => res.data);
		notify(data)
		return data
	}

	static editNews(slug, payload = {}) {
		const data = api.post(ep.NEWS_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}

	static deleteNews(slug) {
		const data = api.delete(ep.NEWS_BY_SLUG(slug)).then((res) => res.data);
		notify(data)
		return data
	}
}