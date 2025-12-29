import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import type { Response } from "@/shared/types/response";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import authApi from "../api";

// Logout
export const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: logoutMutation, isPending: isLoading } = useMutation<
        Response<void>,
        ApiError,
        void
    >({
        mutationFn: authApi.logout,
        onSuccess: () => {
            queryClient.clear();
        },
        onError: (error) => {
            handleErrorResponse(error, "Error logging out");
        },
    });

    return { logoutMutation, isLoading };
};
