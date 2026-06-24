import axios from 'axios';

// Create an Axios instance with standard configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api', // adjust base URL as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically add auth tokens if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`; // or `Bearer ${token}` based on your backend
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized or other global errors here
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Token might be invalid or expired.');
      // Optional: localStorage.removeItem('token'); window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
