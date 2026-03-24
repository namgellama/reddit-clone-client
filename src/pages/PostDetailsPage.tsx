import { useParams } from "react-router-dom";

import { PostSkeleton } from "@/features/post/components";
import PostCard from "@/features/post/components/PostCard";
import { useGetPostById } from "@/features/post/hooks/useGetPostById";
import { ErrorMessage } from "@/shared/components/common";

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

    if (post) return <PostCard post={post} isList={false} />;

    return null;
};

export default PostDetailsPage;
