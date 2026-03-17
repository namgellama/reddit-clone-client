import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";
import type { VoteRequest } from "../types";

const voteApi = {
    // Toggle post vote
    togglePostVote: async (postId: string, data: VoteRequest) => {
        const response = await api.post(API_ENDPOINT.post.vote(postId), data);
        return response.data;
    },
};

export default voteApi;
