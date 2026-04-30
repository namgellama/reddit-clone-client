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

    return (
        <div className="space-y-2">
            <div
                className={isList ? "cursor-pointer" : ""}
                onClick={() => {
                    if (isList) navigate(`/posts/${post.id}`);
                }}
            >
                <PostCardHeader post={post} />
                <PostCardContent post={post} />
            </div>

            <PostCardFooter post={post} />
        </div>
    );
};

export default PostCard;
