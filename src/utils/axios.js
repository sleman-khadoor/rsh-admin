import store from '@/modules/authors/store';
import axios from 'axios';
import notify from '@/utils/notify'

const baseUrl = 'http://127.0.0.1:8000/'
var api = axios.create({
  baseURL: baseUrl + 'api/',
  headers: {
    'Content-Type': 'multipart/form-data',
    locale: 'en'
  }
});
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response
}, function (error) {
  if (error.response.status !== undefined) {
    if (error.response.status === 401) {
      store.dispatch('user/localyLogOut')
    } else {
      notify(error.response.data)
    }
  }
  return Promise.reject(error)
})

export { api, baseUrl }