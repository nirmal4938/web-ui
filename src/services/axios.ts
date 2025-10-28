// src/services/axios.ts
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_PROD_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
