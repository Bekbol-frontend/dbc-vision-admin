import axios from "axios";
import {
  ACCESS_TOKEN_KEY_LOCAL_STORAGE,
  REFRESH_TOKEN_KEY_LOCAL_STORAGE,
  USER_KEY_LOCAL_STORAGE,
} from "../constants";
import { routePages } from "../config/routeConfig";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE);

    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(
          REFRESH_TOKEN_KEY_LOCAL_STORAGE
        );
        const response = await axios.post(
          "https://retailapi.dbcvision.uz/users/refresh-token/",
          {
            refresh: refreshToken,
          }
        );
        console.log(response);
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY_LOCAL_STORAGE, newRefreshToken);

        API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(ACCESS_TOKEN_KEY_LOCAL_STORAGE);
        localStorage.removeItem(REFRESH_TOKEN_KEY_LOCAL_STORAGE);
        localStorage.removeItem(USER_KEY_LOCAL_STORAGE);
        window.location.href = routePages.login;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
