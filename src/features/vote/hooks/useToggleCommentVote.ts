import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentCache } from "@/features/comment/constants";
import type { Comment } from "@/features/comment/types";
import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import voteApi from "../api";
import type { VoteRequest, VoteResponse } from "../types";

export const useToggleCommentVote = (postId: string, commentId: string) => {
    const queryClient = useQueryClient();

    const { mutateAsync: toggleCommentVoteMutation, isPending: isLoading } =
        useMutation<VoteResponse, ApiError, VoteRequest>({
            mutationFn: (data: VoteRequest) =>
                voteApi.toggleCommentVote(postId, commentId, data),
            onSuccess: (updatedVote) => {
                // Update comment list cache
                queryClient.setQueryData(
                    commentCache.all,
                    (oldData: Comment[]) => {
                        if (!oldData) return oldData;

                        return oldData.map((comment) =>
                            comment.id === commentId
                                ? {
                                      ...comment,
                                      score: updatedVote.score,
                                      user_vote: updatedVote.vote_type,
                                  }
                                : comment,
                        );
                    },
                );
            },
            onError: (error) =>
                handleErrorResponse(error, "Error toggling comment vote"),
        });

    return { toggleCommentVoteMutation, isLoading };
};
