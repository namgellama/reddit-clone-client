import type { VoteType } from "@/features/vote/types";

interface User {
    id: string;
    username: string;
    email: string;
}

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
