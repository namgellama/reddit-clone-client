import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";
import type { VoteRequest } from "../types";

const voteApi = {
    // Toggle post vote
    togglePostVote: async (postId: string, data: VoteRequest) => {
        const response = await api.post(
            API_ENDPOINT.vote.togglePostVote(postId),
            data,
        );
        return response.data;
    },

    // Toggle comment vote
    toggleCommentVote: async (
        postId: string,
        commentId: string,
        data: VoteRequest,
    ) => {
        const response = await api.post(
            API_ENDPOINT.vote.toggleCommentVote(postId, commentId),
            data,
        );
        return response.data;
    },
};

export default voteApi;
