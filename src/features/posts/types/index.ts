export interface Post {
    id: string;
    title: string;
    content: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    commentsCount: number;
    upvotesCount: number;
    downvotesCount: number;
}
