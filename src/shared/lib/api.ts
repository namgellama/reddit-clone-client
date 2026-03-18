import axios, {
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";

import { API_ENDPOINT } from "../constants/api.constants";
import type { LoginResponse } from "@/features/auth/types/login";

export const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;

        if (originalRequest.url?.includes(API_ENDPOINT.auth.refreshToken)) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.post<LoginResponse>(API_ENDPOINT.auth.refreshToken);

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("user");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default api;

export interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

export interface InternalAxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
    _retry?: boolean;
}
