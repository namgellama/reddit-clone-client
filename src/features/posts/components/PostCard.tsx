import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { timeAgo } from "@/shared/utils/timeAgo";
import type { Post } from "../types";

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
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
                    {timeAgo(post.createdAt)}
                </p>
            </div>

            <h2 className="text-lg font-medium">{post.title}</h2>
            <p className="text-sm text-foreground/85">{post.content}</p>
        </div>
    );
};

export default PostCard;
