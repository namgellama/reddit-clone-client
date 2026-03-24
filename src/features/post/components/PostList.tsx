import { useGetAllPosts } from "@/features/post/hooks/useGetAllPosts";
import { ErrorMessage } from "@/shared/components/common";
import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import PostCard from "./PostCard";

const PostList = () => {
    const { posts, isLoading, error } = useGetAllPosts();

    if (isLoading) return <Skeleton />;

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
                    <PostCard post={post} />
                    <Separator className="my-2" />
                </div>
            ))}
        </>
    );
};

export default PostList;
