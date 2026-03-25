export interface Comment {
    id: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    post_id: string;
    parent_id: string;
}
