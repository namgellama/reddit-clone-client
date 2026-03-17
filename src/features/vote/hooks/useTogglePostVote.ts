import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import voteApi from "../api";
import type { VoteRequest, VoteResponse } from "../types";

export const useTogglePostVote = (postId: string) => {
    const queryClient = useQueryClient();

    const { mutateAsync: togglePostVoteMutation, isPending: isLoading } =
        useMutation<VoteResponse, ApiError, VoteRequest>({
            mutationFn: (data: VoteRequest) =>
                voteApi.togglePostVote(postId, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["posts", postId] });
            },
            onError: (error) =>
                handleErrorResponse(error, "Error toggling post vote"),
        });

    return { togglePostVoteMutation, isLoading };
};
