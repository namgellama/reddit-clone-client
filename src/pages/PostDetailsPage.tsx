import { useParams } from "react-router-dom";

import { PostSkeleton } from "@/features/post/components";
import PostCard from "@/features/post/components/PostCard";
import { useGetPostById } from "@/features/post/hooks/useGetPostById";
import { ErrorMessage } from "@/shared/components/common";
import { CommentList } from "@/features/comment/components";

const PostDetailsPage = () => {
    const { id } = useParams();

    const { post, isLoading, error } = useGetPostById(id);

    if (isLoading) return <PostSkeleton isList={false} />;

    if (error)
        return (
            <ErrorMessage
                message={error.response?.data?.message ?? "Error fetching post"}
            />
        );

    if (!post) return <ErrorMessage message="Post not found" />;

    return (
        <div className="space-y-4">
            <PostCard post={post} isList={false} />
            <CommentList postId={post.id} />
        </div>
    );
};

export default PostDetailsPage;
