import { useMutation } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import authApi from "../api";

// Logout
export const useLogout = () => {
    const { mutateAsync: logoutMutation, isPending: isLoading } = useMutation<
        void,
        ApiError,
        void
    >({
        mutationFn: authApi.logout,
        onSuccess: async () => {
            window.location.reload();
        },
        onError: (error) => {
            handleErrorResponse(error, "Error logging out");
        },
    });

    return { logoutMutation, isLoading };
};
