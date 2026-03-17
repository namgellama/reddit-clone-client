import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";

const postApi = {
    // Get all posts
    getAllPosts: async () => {
        const response = await api.get(API_ENDPOINT.post.getAll);
        return response.data;
    },

    // Create post
    createPost: async (data: FormData) => {
        const response = await api.post(API_ENDPOINT.post.create, data);
        return response.data;
    },
};

export default postApi;
