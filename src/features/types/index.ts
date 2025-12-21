export interface Post {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    commentsCount: number;
    upvotesCount: number;
    downvotesCount: number;
}
