import { useQuery } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import commentApi from "../api";
import { commentCache } from "../constants";
import type { Comment } from "../types";

export const useGetAllComments = (postId: string) => {
    const {
        data: comments,
        isLoading,
        error,
    } = useQuery<Comment[], ApiError>({
        queryFn: () => commentApi.getAll(postId),
        queryKey: commentCache.all,
    });

    return { comments, isLoading, error };
};
