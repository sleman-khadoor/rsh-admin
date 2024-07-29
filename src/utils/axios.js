import axios from 'axios';
import notify from '@/utils/notify'
import authHelper from './auth-helper';
import { router } from '@/router';

const baseUrl = 'http://127.0.0.1:8000/'
var api = axios.create({
  baseURL: baseUrl + 'api/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${authHelper.getAccessToken()}`,
    locale: 'en'
  }
});
const unauthenticatedAxiosInstance = axios.create({ baseURL: baseUrl + 'api/' });

api.interceptors.response.use(function (response) {

  return response
}, function (error) {
  if (error.response.status !== undefined) {
    if (error.response.status === 401) {
      authHelper.reset();
			router.push('/');
    } else {
      notify(error.response.data)
    }
  }
  return Promise.reject(error)
})

export { api, unauthenticatedAxiosInstance, baseUrl }