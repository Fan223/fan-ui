import axios from 'axios';

// Create an axios instance
const request = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized
          break;
        case 403:
          // Forbidden
          break;
        case 404:
          // Not found
          break;
        case 408:
          // Timeout
          break;
        case 500:
          // Server error
          break;
        default:
          // Unknown error
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default request;
