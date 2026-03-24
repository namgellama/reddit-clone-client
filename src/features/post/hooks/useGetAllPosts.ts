import { useQuery } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import postApi from "../api";
import { postCache } from "../constants";
import type { Post } from "../types";

// Get all posts
export const useGetAllPosts = () => {
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery<Post[], ApiError>({
        queryKey: postCache.all,
        queryFn: postApi.getAll,
    });

    return { posts, isLoading, error };
};
