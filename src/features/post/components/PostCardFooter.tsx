import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import type { Post } from "@/features/post/types";
import { useTogglePostVote } from "@/features/vote/hooks/useTogglePostVote";
import { CommentButton, VoteControls } from "@/shared/components/common";

const PostCardFooter = ({ post }: { post: Post }) => {
    const { isAuthenticated } = useAuth();
    const { togglePostVoteMutation, isLoading } = useTogglePostVote(post.id);

    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-3">
            <VoteControls
                disabled={isLoading || !isAuthenticated}
                score={post.score}
                userVote={post.user_vote}
                upvoteOnClick={(e) => {
                    e.stopPropagation();
                    togglePostVoteMutation({ type: "UPVOTE" });
                }}
                downvoteOnClick={(e) => {
                    e.stopPropagation();
                    togglePostVoteMutation({ type: "DOWNVOTE" });
                }}
            />

            <CommentButton
                count={post.comment_count}
                onClick={() => navigate(`/posts/${post.id}`)}
            />
        </div>
    );
};

export default PostCardFooter;
