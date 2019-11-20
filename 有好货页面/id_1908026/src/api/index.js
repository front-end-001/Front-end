import axios from 'axios';
// import jsonp from '@/assets/js/jsonp';

import api from './api-map.json';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
});

// eslint-disable-next-line import/prefer-default-export
export function getRecommend() {
  return instance.get(api.getRecommend);
}
