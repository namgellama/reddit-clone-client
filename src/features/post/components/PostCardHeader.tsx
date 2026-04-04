import type { Post } from "@/features/post/types";
import { Avatar, Dot } from "@/shared/components/custom";
import { timeAgo } from "@/shared/utils/timeAgo";

const PostCardHeader = ({ post }: { post: Post }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <Avatar label={post.user.username} />

                <span className="text-xs font-medium">
                    {post.user.username}
                </span>
            </div>
            <Dot />
            <p className="text-xs text-muted-foreground">
                {timeAgo(post.date_posted)}
            </p>
        </div>
    );
};

export default PostCardHeader;
