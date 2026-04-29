import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postCache } from "@/features/post/constants";
import type { Post } from "@/features/post/types";
import type { ApiError } from "@/shared/types/api-error";
import type { PaginatedResponse } from "@/shared/types/response";
import { handleErrorResponse } from "@/shared/utils/handleErrorResponse";
import voteApi from "../api";
import type { VoteRequest, VoteResponse } from "../types";

export const useTogglePostVote = (postId: string) => {
    const queryClient = useQueryClient();

    const { mutateAsync: togglePostVoteMutation, isPending: isLoading } =
        useMutation<VoteResponse, ApiError, VoteRequest>({
            mutationFn: (data: VoteRequest) =>
                voteApi.togglePostVote(postId, data),
            onSuccess: (updatedVote) => {
                // Update post list cache
                queryClient.setQueriesData<PaginatedResponse<Post>>(
                    { queryKey: ["posts", "list"] },
                    (oldData) => {
                        if (!oldData) return oldData;

                        return {
                            ...oldData,
                            data: oldData.data.map(
                                (
                                    post, // use "data" not "items"
                                ) =>
                                    post.id === postId
                                        ? {
                                              ...post,
                                              score: updatedVote.score,
                                              user_vote: updatedVote.vote_type,
                                          }
                                        : post,
                            ),
                        };
                    },
                );

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
