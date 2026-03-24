import { useNavigate } from "react-router-dom";

import type { Post } from "../types";
import PostCardHeader from "./PostCardHeader";
import PostCardContent from "./PostCardContent";
import PostCardFooter from "./PostCardFooter";

const PostCard = ({ post }: { post: Post }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/posts/${post.id}`);
    };

    return (
        <div className="space-y-2 cursor-pointer" onClick={handleNavigate}>
            <PostCardHeader post={post} />
            <PostCardContent post={post} />
            <PostCardFooter post={post} />
        </div>
    );
};

export default PostCard;
