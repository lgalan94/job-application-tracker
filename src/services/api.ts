// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token for every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
