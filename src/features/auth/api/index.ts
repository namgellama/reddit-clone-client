import api from "@/shared/lib/api";

import { API_ENDPOINT } from "@/shared/constants/api.constants";

import type { Response } from "@/shared/types/response";
import type { LoginResponse } from "../types/login";

import type {
    LoginFormFields,
    RegisterEmailFormFields,
    RegisterUserFormFields,
    VerifyEmailFormFields,
} from "../validation";

const authApi = {
    // Sign up - register email
    registerEmail: async (data: RegisterEmailFormFields) => {
        const response = await api.post<Response<void>>(
            API_ENDPOINT.auth.registerEmail,
            data
        );
        return response.data;
    },

    // Sign up - verify email
    verifyEmail: async (data: VerifyEmailFormFields) => {
        const response = await api.post<Response<void>>(
            API_ENDPOINT.auth.verifyEmail,
            data
        );
        return response.data;
    },

    // Sign up - register user
    registerUser: async (data: RegisterUserFormFields) => {
        const response = await api.post<Response<void>>(
            API_ENDPOINT.auth.register,
            data
        );
        return response.data;
    },

    // Login
    login: async (data: LoginFormFields) => {
        const response = await api.post<Response<LoginResponse>>(
            API_ENDPOINT.auth.login,
            data
        );
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await api.post<Response<void>>(
            API_ENDPOINT.auth.logout
        );
        return response.data;
    },
};

export default authApi;
