import { useQuery } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import type { PaginatedResponse } from "@/shared/types/response";
import postApi from "../api";
import { postCache } from "../constants";
import type { Post } from "../types";

// Get all posts
export const useGetAllPosts = ({
    skip,
    limit = 10,
}: {
    skip: number;
    limit: number;
}) => {
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery<PaginatedResponse<Post>, ApiError>({
        queryFn: () => postApi.getAll(skip, limit),
        queryKey: postCache.all(skip, limit),
    });

    return { posts, isLoading, error };
};
