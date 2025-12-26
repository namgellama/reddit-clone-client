import api from "@/shared/lib/api";

import { API_ENDPOINT } from "@/shared/constants/api.constants";

import type { Response } from "@/shared/types/response";
import type { LoginResponse } from "../types/login";

import type { LoginFormFields } from "../validation";

const authApi = {
    // Login
    login: async (data: LoginFormFields) => {
        const response = await api.post<Response<LoginResponse>>(
            API_ENDPOINT.auth.login,
            data
        );
        return response.data;
    },
};

export default authApi;
