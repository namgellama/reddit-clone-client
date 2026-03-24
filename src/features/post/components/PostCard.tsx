import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useTogglePostVote } from "@/features/vote/hooks/useTogglePostVote";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { timeAgo } from "@/shared/utils/timeAgo";
import type { Post } from "../types";
import PostImages from "./PostImages";

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    const { isAuthenticated } = useAuth();
    const { togglePostVoteMutation, isLoading } = useTogglePostVote(post.id);

    return (
        <div className="space-y-2">
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

            <h2 className="text-lg font-medium">{post.title}</h2>
            {post.images.length ? (
                <PostImages images={post.images} />
            ) : (
                <p className="text-sm text-foreground/85">{post.content}</p>
            )}

            <div className="flex items-center gap-3">
                <div
                    className={`w-fit h-8 p-1 ${post.user_vote === "UPVOTE" ? "bg-primary text-white" : post.user_vote === "DOWNVOTE" ? "bg-secondary text-white" : "bg-gray-300/65 text-black"} rounded-full flex items-center justify-center gap-2`}
                >
                    <Button
                        disabled={isLoading || !isAuthenticated}
                        variant="ghost"
                        className={`size-6 p-0 hover:bg-inherit ${post.user_vote !== null ? "hover:text-white" : "hover:text-primary"}`}
                        onClick={() =>
                            togglePostVoteMutation({ type: "UPVOTE" })
                        }
                    >
                        {
                            <ArrowBigUp
                                className="size-[1.15rem]"
                                fill={
                                    post.user_vote === "UPVOTE"
                                        ? "white"
                                        : "none"
                                }
                            />
                        }
                    </Button>
                    {post.score}
                    <Button
                        disabled={isLoading || !isAuthenticated}
                        variant="ghost"
                        className={`size-6 p-0 hover:bg-inherit ${post.user_vote !== null ? "hover:text-white" : "hover:text-secondary"}`}
                        onClick={() =>
                            togglePostVoteMutation({ type: "DOWNVOTE" })
                        }
                    >
                        <ArrowBigDown
                            className="size-[1.15rem] "
                            fill={
                                post.user_vote === "DOWNVOTE" ? "white" : "none"
                            }
                        />
                    </Button>
                </div>
                <Button className="w-fit h-8 bg-gray-300/65 rounded-full flex items-center gap-2  text-black hover:bg-gray-300/80">
                    <MessageCircle className="size-4" />
                    {post.comment_count}
                </Button>
            </div>
        </div>
    );
};

export default PostCard;
