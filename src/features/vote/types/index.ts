export type VoteType = "UPVOTE" | "DOWNVOTE";

export interface VoteResponse {
    vote_type: VoteType | null;
    score: number;
}

export interface VoteRequest {
    type: VoteType;
}
