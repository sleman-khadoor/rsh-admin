import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getPartners(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.PARTNER, qp).then((res) => res.data);
	}

	static createPartner(payload = {}) {
		const data = api.post(ep.PARTNER, payload).then((res) => res.data);
		notify(data)
		return data
	}

	static editPartner(slug, payload = {}) {
		const data = api.post(ep.PARTNER_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}

	static deletePartner(slug) {
		const data = api.delete(ep.PARTNER_BY_SLUG(slug)).then((res) => res.data);
		notify(data)
		return data
	}
}