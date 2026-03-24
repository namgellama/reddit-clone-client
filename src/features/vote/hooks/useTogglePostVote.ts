import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import voteApi from "../api";
import type { VoteRequest, VoteResponse } from "../types";
import type { Post } from "@/features/post/types";
import { postCache } from "@/features/post/constants";

export const useTogglePostVote = (postId: string) => {
    const queryClient = useQueryClient();

    const { mutateAsync: togglePostVoteMutation, isPending: isLoading } =
        useMutation<VoteResponse, ApiError, VoteRequest>({
            mutationFn: (data: VoteRequest) =>
                voteApi.togglePostVote(postId, data),
            onSuccess: (updatedVote) => {
                // Update post list cache
                queryClient.setQueryData(postCache.all, (oldData: Post[]) => {
                    if (!oldData) return oldData;

                    return oldData.map((post) =>
                        post.id === postId
                            ? {
                                  ...post,
                                  score: updatedVote.score,
                                  user_vote: updatedVote.vote_type,
                              }
                            : post,
                    );
                });

                // Update post details cache
                queryClient.setQueryData(
                    [...postCache.details(postId)],
                    (oldPost: Post) => {
                        if (!oldPost) return oldPost;

                        return {
                            ...oldPost,
                            score: updatedVote.score,
                            user_vote: updatedVote.vote_type,
                        };
                    },
                );
            },
            onError: (error) =>
                handleErrorResponse(error, "Error toggling post vote"),
        });

    return { togglePostVoteMutation, isLoading };
};
