import axios, { AxiosInstance } from 'axios';

// Set the base URL for the json-server API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Set the base URL for the login-related API
const loginApi = axios.create({
  baseURL: import.meta.env.VITE_LOGIN_API_BASE_URL,
});

// Logging function
const log = (message: string) => {
  if (import.meta.env.MODE === 'development') {
    console.log(message);
  }
};

// Function to set up interceptors
const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    log('Request intercepted successfully!');
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      log('Received response from interceptor!');
      return response;
    },
    (error) => {
      console.error('Failed to receive response from interceptor.', error);
      return Promise.reject(error);
    }
  );
};

// Apply interceptors to both instances
setupInterceptors(api);
setupInterceptors(loginApi);

export { api, loginApi };
export default api;