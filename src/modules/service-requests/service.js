import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getServiceRequests(qp = {}) {
		return api.get(ep.SERVICE_REQUEST, qp).then((res) => res.data);
	}

	static createServiceRequest(payload = {}) {
		const data = api.post(ep.SERVICE_REQUEST, payload).then((res) => res.data);
		notify(data)
		return data
	}

	static getServiceRequest(slug, payload = {}) {
		return api.get(ep.SERVICE_REQUEST_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static editServiceRequest(slug, payload = {}) {
		const data = api.post(ep.SERVICE_REQUEST_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}

	static deleteServiceRequest(slug) {
		const data = api.delete(ep.SERVICE_REQUEST_BY_SLUG(slug)).then((res) => res.data);
		notify(data)
		return data
	}
}