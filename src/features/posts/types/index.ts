export interface Post {
    id: string;
    title: string;
    content: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    userId: string;
    commentsCount: number;
    upvotesCount: number;
    downvotesCount: number;
}
