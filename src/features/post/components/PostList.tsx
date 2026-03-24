import { useGetAllPosts } from "@/features/post/hooks/useGetAllPosts";
import { ErrorMessage } from "@/shared/components/common";
import { Separator } from "@/shared/components/ui/separator";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";

const PostList = () => {
    const { posts, isLoading, error } = useGetAllPosts();

    if (isLoading)
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <PostSkeleton key={index} isList={true} />
                ))}
            </div>
        );

    if (error)
        return (
            <ErrorMessage
                message={
                    error?.response?.data?.message ?? "Error fetching posts"
                }
            />
        );

    if (!posts || posts.length === 0)
        return <p className="text-muted-foreground">No posts yet</p>;

    return (
        <>
            {posts.map((post) => (
                <div key={post.id}>
                    <PostCard post={post} isList={true} />
                    <Separator className="my-2" />
                </div>
            ))}
        </>
    );
};

export default PostList;
