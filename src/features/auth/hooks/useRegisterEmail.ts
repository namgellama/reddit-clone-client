import { useMutation } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import type { Response } from "@/shared/types/response";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import authApi from "../api";
import type { RegisterEmailFormFields } from "../validation";

// Sign up - register email
export const useRegisterEmail = () => {
    const { mutateAsync: registerEmailMutation, isPending: isLoading } =
        useMutation<Response<void>, ApiError, RegisterEmailFormFields>({
            mutationFn: authApi.registerEmail,
            onError: (error) => {
                handleErrorResponse(error, "Error registering email");
            },
        });

    return { registerEmailMutation, isLoading };
};
