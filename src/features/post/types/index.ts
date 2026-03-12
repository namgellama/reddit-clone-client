interface Count {
    comment: number;
    upvote: number;
    downvote: number;
}

interface Author {
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
    user_id: string;
    author: Author;
    count: Count;
}
