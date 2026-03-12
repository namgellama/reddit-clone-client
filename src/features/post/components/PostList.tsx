import { useGetAllPosts } from "@/features/post/hooks/useGetAllPosts";
import { ErrorMessage } from "@/shared/components/common";
import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import PostCard from "./PostCard";

const PostList = () => {
    const postsQuery = useGetAllPosts();

    if (postsQuery.isLoading) return <Skeleton />;

    if (postsQuery.error)
        return <ErrorMessage message="Error fetching posts" />;

    if (!postsQuery.data || postsQuery.data.length === 0)
        return <p className="text-muted-foreground">No posts yet</p>;

    return (
        <>
            {postsQuery.data.map((post) => (
                <div key={post.id}>
                    <PostCard post={post} />
                    <Separator className="my-2" />
                </div>
            ))}
        </>
    );
};

export default PostList;
