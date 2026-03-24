import { useParams } from "react-router-dom";

import { useGetPostById } from "@/features/post/hooks/useGetPostById";
import {
    ErrorMessage,
    PostCardContent,
    PostCardFooter,
    PostCardHeader,
} from "@/shared/components/common";
import { Skeleton } from "@/shared/components/ui/skeleton";

const PostDetailsPage = () => {
    const { id } = useParams();

    const { post, isLoading, error } = useGetPostById(id);

    if (isLoading) return <Skeleton />;

    if (error)
        return (
            <ErrorMessage
                message={error.response?.data?.message ?? "Error fetching post"}
            />
        );

    if (post)
        return (
            <div className="space-y-2">
                <PostCardHeader post={post} />
                <PostCardContent post={post} />
                <PostCardFooter post={post} />
            </div>
        );

    return null;
};

export default PostDetailsPage;
