import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://mychat-backend-1-8s9u.onrender.com/api',
  // baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

