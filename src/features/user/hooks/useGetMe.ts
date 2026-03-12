import { useQuery } from "@tanstack/react-query";

import userApi from "@/features/user/api";
import type { User } from "@/features/user/types";
import type { ApiError } from "@/shared/types/api-error";

// Get me
export const useGetMe = (enabled: boolean) => {
    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery<User, ApiError, void>({
        queryFn: userApi.getMe,
        queryKey: ["me"],
        enabled: enabled,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
    });

    return { currentUser, isLoading, error };
};
