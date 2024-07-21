import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getContacts(qp = {}) {
		console.log(' pagination', qp);
		return api.get(ep.CONTACT, qp).then((res) => res.data);
	}

	static editContact(slug, payload = {}) {
		const data = api.post(ep.CONTACT_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}
}