import { VoteControls } from "@/shared/components/common";
import CommentButton from "@/shared/components/common/CommentButton";
import { Avatar, Dot } from "@/shared/components/custom";
import { timeAgo } from "@/shared/utils/timeAgo";
import type { Comment } from "../types";

const CommentCard = ({ comment }: { comment: Comment }) => {
    return (
        <div>
            <div className="flex items-start gap-2">
                <Avatar label={comment.user.username} />
                <div>
                    <CommentCardHeader comment={comment} />
                    <CommentCardContent comment={comment} />
                    <CommentCardFooter comment={comment} />
                </div>
            </div>
        </div>
    );
};

export default CommentCard;

const CommentCardHeader = ({ comment }: { comment: Comment }) => {
    return (
        <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">{comment.user.username}</p>{" "}
            <Dot />
            <p className="text-xs text-muted-foreground">
                {timeAgo(comment.created_at)}
            </p>
        </div>
    );
};

const CommentCardContent = ({ comment }: { comment: Comment }) => {
    return <p className="text-sm my-2">{comment.content}</p>;
};

const CommentCardFooter = ({ comment }: { comment: Comment }) => {
    return (
        <div className="flex items-center gap-2">
            <VoteControls
                disabled={false}
                score={0}
                userVote={"DOWNVOTE"}
                upvoteOnClick={() => {}}
                downvoteOnClick={() => {}}
                variant="comment"
            />
            <CommentButton onClick={() => {}} variant="comment" />
        </div>
    );
};
