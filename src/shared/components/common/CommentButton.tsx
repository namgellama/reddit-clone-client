import { MessageCircle } from "lucide-react";

import { Button } from "../ui/button";

interface Props {
    count?: number;
    onClick: () => void;
    variant?: "post" | "comment";
}

const CommentButton = ({ count, onClick, variant = "post" }: Props) => {
    if (variant === "post")
        return (
            <Button
                className="w-fit h-8 bg-gray-300/65 rounded-full flex items-center gap-2  text-black hover:bg-gray-300/80"
                onClick={onClick}
            >
                <MessageCircle className="size-4" />
                {count}
            </Button>
        );

    return (
        <Button
            variant="ghost"
            className="rounded-full flex items-center gap-2 text-xs text-muted-foreground"
            onClick={onClick}
        >
            <MessageCircle className="size-4" />
            Reply
        </Button>
    );
};

export default CommentButton;
