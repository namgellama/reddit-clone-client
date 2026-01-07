import { useGetAllPosts } from "@/features/posts/api";
import PostCard from "./PostCard";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ErrorMessage } from "@/shared/components/common";
import { Separator } from "@/shared/components/ui/separator";

const PostList = () => {
    const { posts, error, isLoading } = useGetAllPosts();

    if (isLoading) return <Skeleton />;

    if (error) return <ErrorMessage message="Error fetching posts" />;

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
