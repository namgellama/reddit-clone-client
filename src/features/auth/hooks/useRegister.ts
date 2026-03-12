import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import authApi from "../api";
import type { RegisterUserFormFields } from "../validation";

// Sign up - register user
export const useRegister = () => {
    const { mutateAsync: registerMutation, isPending: isLoading } = useMutation<
        void,
        ApiError,
        RegisterUserFormFields
    >({
        mutationFn: authApi.registerUser,
        onSuccess: () => {
            toast.success("User registered successfully");
        },
        onError: (error) => {
            handleErrorResponse(error, "Error registering user");
        },
    });

    return { registerMutation, isLoading };
};
