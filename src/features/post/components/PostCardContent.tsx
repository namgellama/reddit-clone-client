import { PostImages } from "@/features/post/components";
import type { Post } from "@/features/post/types";

const PostCardContent = ({ post }: { post: Post }) => {
    return (
        <>
            <h2 className="text-lg font-medium">{post.title}</h2>
            {post.images.length ? (
                <PostImages images={post.images} />
            ) : (
                <p className="text-sm text-foreground/85">{post.content}</p>
            )}
        </>
    );
};

export default PostCardContent;
