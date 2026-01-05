import { useGetAllPosts } from "@/features/posts/api";
import PostCard from "./PostCard";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ErrorMessage } from "@/shared/components/common";

const PostList = () => {
    const { posts, error, isLoading } = useGetAllPosts();

    if (isLoading) return <Skeleton />;

    if (error) return <ErrorMessage message="Error fetching posts" />;

    if (!posts || posts.length === 0)
        return <p className="text-muted-foreground">No posts yet</p>;

    return (
        <>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </>
    );
};

export default PostList;
