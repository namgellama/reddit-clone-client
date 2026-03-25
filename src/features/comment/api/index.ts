import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";

const commentApi = {
    // Get all comments
    getAll: async (postId: string) => {
        const response = await api.get(API_ENDPOINT.comment.getAll(postId));
        return response.data;
    },
};

export default commentApi;
