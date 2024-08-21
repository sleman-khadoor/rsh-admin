import { api as axiosInstance, unauthenticatedAxiosInstance } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static login(qp = {}) {
		const data = unauthenticatedAxiosInstance.post(ep.LOGIN, qp)
			.then((res) => {
				return res.data;
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					return error.response.data
				}
			});		
		notify(data);
		return data;
	}
	
	static logout() {
		const data = axiosInstance.post(ep.LOGOUT).then((res) => {
			return res.data;
		});
		return data
	}
}
