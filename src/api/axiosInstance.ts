import axios from "axios";

// ✅ Base API instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PROD_URL || "http://localhost:5000/api", // Adjust based on backend
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach JWT token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
