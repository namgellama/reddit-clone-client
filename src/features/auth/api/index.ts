import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";
import type { LoginResponse } from "../types/login";
import type {
    RegisterEmailFormFields,
    RegisterUserFormFields,
} from "../validation";

const authApi = {
    // Sign up - register email
    registerEmail: async (data: RegisterEmailFormFields) => {
        const response = await api.post(API_ENDPOINT.auth.registerEmail, data);
        return response.data;
    },

    // Sign up - verify email
    verifyEmail: async (data: { email: string; otp: string }) => {
        const response = await api.post(API_ENDPOINT.auth.verifyEmail, data);
        return response.data;
    },

    // Sign up - register user
    registerUser: async (data: RegisterUserFormFields) => {
        const response = await api.post(API_ENDPOINT.auth.register, data);
        return response.data;
    },

    // Login
    login: async (data: FormData) => {
        const response = await api.post<LoginResponse>(
            API_ENDPOINT.auth.login,
            data,
        );
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await api.post(API_ENDPOINT.auth.logout);
        return response.data;
    },
};

export default authApi;
