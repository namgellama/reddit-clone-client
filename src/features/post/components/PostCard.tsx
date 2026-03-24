import {
    PostCardContent,
    PostCardFooter,
    PostCardHeader,
} from "@/shared/components/common";
import type { Post } from "../types";

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
