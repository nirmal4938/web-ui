// ===================================================================================
// src/api/axiosInstance.ts
// Enterprise Ready Axios Instance
// SyncWare SaaS v2
// ===================================================================================

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import { store } from '@/state/store/store';
import { logout } from '@/state/actions/authActions';

interface RetryRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface QueuePromise {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueuePromise[] = [];

/**
 * Resolve queued requests after refresh
 */
const processQueue = (error: unknown = null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

const API_URL = import.meta.env.VITE_PROD_API_BASE_URL || import.meta.env.VITE_DEV_API_BASE_URL;
('http://localhost:5000/api');
console.log('API_URL', API_URL);
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

//////////////////////////////////////////////////////////////////////////////////////
// REQUEST INTERCEPTOR
//////////////////////////////////////////////////////////////////////////////////////

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const reduxToken = store.getState().auth.token;
    const storageToken = localStorage.getItem('token');

    const token = reduxToken || storageToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

//////////////////////////////////////////////////////////////////////////////////////
// RESPONSE INTERCEPTOR
//////////////////////////////////////////////////////////////////////////////////////

axiosInstance.interceptors.response.use(
  response => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequest;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /////////////////////////////////////////////////////////////////////////////
    // Ignore refresh endpoint loop
    /////////////////////////////////////////////////////////////////////////////

    if (originalRequest.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    /////////////////////////////////////////////////////////////////////////////
    // Unauthorized
    /////////////////////////////////////////////////////////////////////////////

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      ///////////////////////////////////////////////////////////////////////////
      // Already Refreshing
      ///////////////////////////////////////////////////////////////////////////

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      ///////////////////////////////////////////////////////////////////////////
      // Start Refresh
      ///////////////////////////////////////////////////////////////////////////

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        /////////////////////////////////////////////////////////////////////////
        // Backend should return accessToken
        /////////////////////////////////////////////////////////////////////////

        const accessToken = refreshResponse.data.accessToken || refreshResponse.data.token;

        if (!accessToken) {
          throw new Error('No access token returned.');
        }

        /////////////////////////////////////////////////////////////////////////
        // Save Token
        /////////////////////////////////////////////////////////////////////////

        localStorage.setItem('token', accessToken);

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        /////////////////////////////////////////////////////////////////////////
        // Refresh Failed
        /////////////////////////////////////////////////////////////////////////

        processQueue(refreshError);

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        try {
          store.dispatch<any>(logout());
        } catch (_) {}

        /////////////////////////////////////////////////////////////////////////
        // Redirect Login
        /////////////////////////////////////////////////////////////////////////

        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    /////////////////////////////////////////////////////////////////////////////
    // Forbidden (Authenticated but Unauthorized)
    /////////////////////////////////////////////////////////////////////////////

    if (error.response?.status === 403) {
      console.warn('Access Denied (403)');
    }

    /////////////////////////////////////////////////////////////////////////////
    // Server Error
    /////////////////////////////////////////////////////////////////////////////

    if (error.response?.status === 500) {
      console.error('Internal Server Error');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
