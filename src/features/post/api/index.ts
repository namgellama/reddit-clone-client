import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";
import type { Response } from "@/shared/types/response";
import type { Post } from "../types";

const postApi = {
    // Get all posts
    getAllPosts: async () => {
        const response = await api.get<Response<Post[]>>(
            API_ENDPOINT.post.getAll,
        );
        return response.data.data;
    },
};

export default postApi;
