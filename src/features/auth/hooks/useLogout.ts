import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postCache } from "@/features/post/constants";
import type { Post } from "@/features/post/types";
import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import authApi from "../api";

// Logout
export const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: logoutMutation, isPending: isLoading } = useMutation<
        void,
        ApiError,
        void
    >({
        mutationFn: authApi.logout,
        onSuccess: async () => {
            queryClient.setQueryData(postCache.all, (oldPosts: Post[]) =>
                oldPosts?.map((post) => ({ ...post, user_vote: null })),
            );
        },
        onError: (error) => {
            handleErrorResponse(error, "Error logging out");
        },
    });

    return { logoutMutation, isLoading };
};
