import { ArrowBigDown, ArrowBigUp } from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import PostImages from "./PostImages";

import { API_URL } from "@/shared/lib/api";
import { timeAgo } from "@/shared/utils/timeAgo";
import type { Post } from "../types";

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    const images: string[] = [];

    for (const image of post.images) {
        images.push(`${API_URL}${image}`);
    }

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
            {images.length ? (
                <PostImages images={images} />
            ) : (
                <p className="text-sm text-foreground/85">{post.content}</p>
            )}

            <div>
                <div className="w-fit bg-gray-300/65 p-1 rounded-full flex items-center gap-2">
                    <Button
                        variant="ghost"
                        className="size-6 hover:text-primary"
                    >
                        <ArrowBigUp className="size-[1.15rem]" />
                    </Button>
                    {0}
                    <Button variant="ghost" className="size-6 hover:opacity-70">
                        <ArrowBigDown className="size-[1.15rem]" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
