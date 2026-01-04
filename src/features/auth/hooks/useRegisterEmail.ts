import { useMutation } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import type { Response } from "@/shared/types/response";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import toast from "react-hot-toast";
import authApi from "../api";
import type { RegisterEmailFormFields } from "../validation";

// Sign up - register email
export const useRegisterEmail = () => {
    const { mutateAsync: registerEmailMutation, isPending: isLoading } =
        useMutation<Response<void>, ApiError, RegisterEmailFormFields>({
            mutationFn: authApi.registerEmail,
            onSuccess: () => {
                toast.success("OTP has been sent to your email");
            },
            onError: (error) => {
                handleErrorResponse(error, "Error registering email");
            },
        });

    return { registerEmailMutation, isLoading };
};
