import type { Post } from "@/features/post/types";
import { timeAgo } from "@/shared/utils/timeAgo";
import { Avatar, AvatarFallback } from "../../../shared/components/ui/avatar";

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

export default PostCardHeader;
