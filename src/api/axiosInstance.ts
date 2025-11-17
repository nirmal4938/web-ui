// src/api/axiosInstance.ts
import axios from "axios";
import { store } from "@/state/store/store";
import { logout } from "@/state/actions/authActions";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL:   "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // needed for refresh cookies
});

// ✅ Add access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle 401 errors and try refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and we haven’t retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for refresh to finish
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh token API
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_PROD_URL || "http://localhost:5000/api"}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { token } = refreshResponse.data;

        // Save new token and retry failed requests
        localStorage.setItem("token", token);
        processQueue(null, token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Refresh failed — log out user
        store.dispatch(logout() as any);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
