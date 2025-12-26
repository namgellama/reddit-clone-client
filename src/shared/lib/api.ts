import axios, {
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";

export const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

export default api;

export interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

export interface InternalAxiosRequestConfigWithRetry
    extends InternalAxiosRequestConfig {
    _retry?: boolean;
}
