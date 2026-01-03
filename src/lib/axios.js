import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? 'https://mychat-backend-1-8s9u.onrender.com/api' : "/api",
  withCredentials: true,
});
