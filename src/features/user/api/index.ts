import api from "@/shared/lib/api";

import type { User } from "@/features/user/types";
import type { Response } from "@/shared/types/response";
import { API_ENDPOINT } from "@/shared/constants/api.constants";

const userApi = {
    // Get me
    getMe: async () => {
        const response = await api.get<Response<User>>(API_ENDPOINT.user.getMe);
        return response.data;
    },
};

export default userApi;
