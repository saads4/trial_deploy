import axios from 'axios';

const api = axios.create({
  baseURL: 'https://biosynvanta.onrender.com', 
});

api.interceptors.request.use((config) => {
  // Get the selected language from local storage (default to 'en')
  const lang = localStorage.getItem('appLanguage') || 'en';
  
  // Attach it exactly how your backend LangMiddleware expects it
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