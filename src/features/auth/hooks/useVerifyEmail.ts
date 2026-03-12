import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import authApi from "../api";
import type { VerifyEmailFormFields } from "../validation";

// Sign up - verify email
export const useVerifyEmail = () => {
    const { mutateAsync: verifyEmailMutation, isPending: isLoading } =
        useMutation<void, ApiError, VerifyEmailFormFields>({
            mutationFn: authApi.verifyEmail,
            onSuccess: () => {
                toast.success("Email verified successfully");
            },
            onError: (error) => {
                handleErrorResponse(error, "Error verifying email");
            },
        });

    return { verifyEmailMutation, isLoading };
};
