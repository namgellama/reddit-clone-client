import { useMutation } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import type { Response } from "@/shared/types/response";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import authApi from "../api";
import type { VerifyEmailFormFields } from "../validation";

// Sign up - verify email
export const useVerifyEmail = () => {
    const { mutateAsync: verifyEmailMutation, isPending: isLoading } =
        useMutation<Response<void>, ApiError, VerifyEmailFormFields>({
            mutationFn: authApi.verifyEmail,
            onError: (error) => {
                handleErrorResponse(error, "Error verifying email");
            },
        });

    return { verifyEmailMutation, isLoading };
};
