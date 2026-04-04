import type { User } from "@/features/user/types";
import type { VoteType } from "@/features/vote/types";

export interface Comment {
    id: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    user: User;
    user_id: string;
    post_id: string;
    parent_id: string;
    score: number;
    user_vote: VoteType | null;
}
