import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const URL_BASE = process.env.REACT_APP_BACKEND_URL + '/api/v1/';
export const axiosInstance = axios.create({
  baseURL: URL_BASE,
  timeout: 4000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.common['access'] = token ? `Bearer ${token}` : '';

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
