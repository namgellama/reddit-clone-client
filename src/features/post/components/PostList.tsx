import { useEffect, useState } from "react";

import { useGetAllPosts } from "@/features/post/hooks/useGetAllPosts";
import { ErrorMessage } from "@/shared/components/common";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import type { Post } from "../types";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";

const PostList = () => {
    const [skip, setSkip] = useState(0);
    const limit = 10;
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    const { posts, isLoading, error } = useGetAllPosts({ skip, limit });

    useEffect(() => {
        if (posts?.data) {
            if (skip === 0) {
                setAllPosts(posts.data);
            } else {
                setAllPosts((prev) => [...prev, ...posts.data]);
            }
        }
    }, [posts, skip]);

    if (isLoading && skip == 0)
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
                    error?.response?.data?.detail ?? "Error fetching posts"
                }
            />
        );

    if (allPosts.length === 0)
        return <p className="text-muted-foreground">No posts yet</p>;

    return (
        <div className="flex flex-col">
            {allPosts.map((post) => (
                <div key={post.id}>
                    <PostCard post={post} isList={true} />
                    <Separator className="my-2" />
                </div>
            ))}
            {posts?.has_more && (
                <Button
                    className="self-center"
                    onClick={() => {
                        setSkip((prev) => prev + limit);
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading.." : "Load More"}
                </Button>
            )}
        </div>
    );
};

export default PostList;
