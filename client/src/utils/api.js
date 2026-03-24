// Import Axios for HTTP requests
import axios from 'axios';

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://trial-deploy-psrk.onrender.com/api' 
    : '/api',
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add language and auth headers
api.interceptors.request.use((config) => {
  // Get language preference from localStorage (default to 'en')
  const lang = localStorage.getItem('appLanguage') || 'en';
  
  // Attach language header for backend localization
  config.headers['x-language'] = lang;
  
  // Add authentication token if available
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;