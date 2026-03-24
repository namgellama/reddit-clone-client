import { useNavigate } from "react-router-dom";

import type { Post } from "../types";
import PostCardHeader from "./PostCardHeader";
import PostCardContent from "./PostCardContent";
import PostCardFooter from "./PostCardFooter";

interface Props {
    post: Post;
    isList: boolean;
}

const PostCard = ({ post, isList }: Props) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (!isList) return;

        navigate(`/posts/${post.id}`);
    };

    return (
        <div
            className={`space-y-2 ${isList ? "cursor-pointer" : "cursor-default"}`}
            onClick={handleNavigate}
        >
            <PostCardHeader post={post} />
            <PostCardContent post={post} />
            <PostCardFooter post={post} />
        </div>
    );
};

export default PostCard;
