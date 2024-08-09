import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getContactRequests(qp = {}) {
		return api.get(ep.CONTACT_REQUEST, qp).then((res) => res.data);
	}

	static createContactRequest(payload = {}) {
		const data = api.post(ep.CONTACT_REQUEST, payload).then((res) => res.data);
		notify(data)
		return data
	}

	static getContactRequest(slug, payload = {}) {
		return api.get(ep.CONTACT_REQUEST_BY_SLUG(slug), payload).then((res) => res.data);
	}

	static editContactRequest(slug, payload = {}) {
		const data = api.post(ep.CONTACT_REQUEST_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}

	static deleteContactRequest(slug) {
		const data = api.delete(ep.CONTACT_REQUEST_BY_SLUG(slug)).then((res) => res.data);
		notify(data)
		return data
	}
}