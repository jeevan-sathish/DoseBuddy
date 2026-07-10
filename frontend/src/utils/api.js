import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token_db");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token_db");

        if (!refreshToken) {
          localStorage.removeItem("access_token_db");
          localStorage.removeItem("refresh_token_db");
          window.location.href = "/";
          return Promise.reject(error);
        }

        const response = await axios.post("http://localhost:8000/refresh", {
          refresh_token: refreshToken,
        });

        const newAccessToken = response.data.access_token_db;

        localStorage.setItem("access_token_db", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token_db");
        localStorage.removeItem("refresh_token_db");

        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
