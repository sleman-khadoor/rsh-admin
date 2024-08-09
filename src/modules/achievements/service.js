import { api } from '@/utils/axios';
import * as ep from './endpoints';
import notify from '@/utils/notify';

export default class Service {
	static getAchievements(qp = {}) {
		return api.get(ep.ACHIEVEMENT, qp).then((res) => res.data);
	}

	static createAchievement(payload = {}) {
		const data = api.post(ep.ACHIEVEMENT, payload).then((res) => res.data);
		notify(data)
		return data
	}

	static editAchievement(slug, payload = {}) {
		const data = api.post(ep.ACHIEVEMENT_BY_SLUG(slug), payload).then((res) => res.data);
		notify(data)
		return data
	}

	static deleteAchievement(slug) {
		const data = api.delete(ep.ACHIEVEMENT_BY_SLUG(slug)).then((res) => res.data);
		notify(data)
		return data
	}
}