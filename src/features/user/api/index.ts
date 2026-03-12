import type { User } from "@/features/user/types";
import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";

const userApi = {
    // Get me
    getMe: async () => {
        const response = await api.get<User>(API_ENDPOINT.user.getMe);
        return response.data;
    },
};

export default userApi;
