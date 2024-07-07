import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/'
var api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    locale: 'en'
  }
});

export { api, baseUrl }