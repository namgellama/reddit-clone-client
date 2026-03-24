import { useQuery } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import postApi from "../api";
import { postCache } from "../constants";
import type { Post } from "../types";

// Get post by id
export const useGetPostById = (id: string | undefined) => {
    const {
        data: post,
        isLoading,
        error,
    } = useQuery<Post, ApiError>({
        queryKey: postCache.details(id!),
        queryFn: () => postApi.getPostById(id!),
        enabled: !!id,
    });

    return { post, isLoading, error };
};
