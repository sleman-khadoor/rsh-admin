import { api } from '@/utils/axios';
import * as ep from './endpoints';

export default class Service {
	static getNotifications() {
		console.log('nnnnnnnnnnnnnnnnnnnn');
		return api.get(ep.NOTIFICATIONS).then((res) => res.data);
	}
}
