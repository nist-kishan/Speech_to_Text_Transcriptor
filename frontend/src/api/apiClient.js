import axios from "axios";

const ApiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
});

ApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          {
            withCredentials: true,
          }
        );
        return ApiClient(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default ApiClient;
