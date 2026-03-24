import { useMutation } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import postApi from "../api";
import type { Post } from "../types";

// Create post
export const useCreatePost = () => {
    const { mutateAsync: createPostMutation, isPending: isLoading } =
        useMutation<Omit<Post, "count">, ApiError, FormData>({
            mutationFn: postApi.create,
            onError: (error) => {
                handleErrorResponse(error, "Error creating post");
            },
        });

    return { createPostMutation, isLoading };
};
