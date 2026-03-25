import type { User } from "@/features/user/types";
import type { VoteType } from "@/features/vote/types";

export interface Post {
    id: string;
    title: string;
    content: string;
    images: string[];
    date_posted: Date;
    user: User;
    score: number;
    user_vote: VoteType | null;
    comment_count: 0;
}
