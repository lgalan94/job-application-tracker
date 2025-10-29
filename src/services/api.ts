// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4002/api", 
});

// ✅ Automatically attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
