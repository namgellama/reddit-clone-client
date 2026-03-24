import { MessageCircle } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useTogglePostVote } from "@/features/vote/hooks/useTogglePostVote";
import { VoteControls } from "@/shared/components/common";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { timeAgo } from "@/shared/utils/timeAgo";
import type { Post } from "../types";
import PostImages from "./PostImages";

const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="space-y-2">
            <PostCardHeader post={post} />
            <PostCardContent post={post} />
            <PostCardFooter post={post} />
        </div>
    );
};

export default PostCard;

const PostCardHeader = ({ post }: { post: Post }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <Avatar className="size-6">
                    <AvatarFallback className="bg-gray-500 text-background uppercase text-xs">
                        G
                    </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">r/golang</span>
            </div>
            <div className="size-0.75 bg-muted-foreground rounded-full"></div>
            <p className="text-xs text-muted-foreground">
                {timeAgo(post.date_posted)}
            </p>
        </div>
    );
};

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

const PostCardFooter = ({ post }: { post: Post }) => {
    const { isAuthenticated } = useAuth();
    const { togglePostVoteMutation, isLoading } = useTogglePostVote(post.id);

    return (
        <div className="flex items-center gap-3">
            <VoteControls
                disabled={isLoading || !isAuthenticated}
                score={post.score}
                userVote={post.user_vote}
                upvoteOnClick={() => togglePostVoteMutation({ type: "UPVOTE" })}
                downvoteOnClick={() =>
                    togglePostVoteMutation({ type: "DOWNVOTE" })
                }
            />

            <Button className="w-fit h-8 bg-gray-300/65 rounded-full flex items-center gap-2  text-black hover:bg-gray-300/80">
                <MessageCircle className="size-4" />
                {post.comment_count}
            </Button>
        </div>
    );
};
