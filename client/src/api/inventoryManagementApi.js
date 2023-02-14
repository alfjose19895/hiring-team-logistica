import axios from 'axios';

import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

export const inventoryManagementApi = axios.create({
  baseURL: VITE_API_URL,
});

inventoryManagementApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  return config;
});
