import { useMutation } from "@tanstack/react-query";

import authApi from "@/features/auth/api";
import type { LoginResponse } from "@/features/auth/types/login";
import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";

// Login
export const useLogin = () => {
    const { mutateAsync: loginMutation, isPending: isLoading } = useMutation<
        LoginResponse,
        ApiError,
        FormData
    >({
        mutationFn: authApi.login,
        onError: (error) => {
            handleErrorResponse(error, "Error logging in");
        },
    });

    return { loginMutation, isLoading };
};
