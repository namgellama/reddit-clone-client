import { MessageCircle } from "lucide-react";

import { Button } from "../ui/button";

interface Props {
    count: number;
    onClick: () => void;
}

const CommentButton = ({ count, onClick }: Props) => {
    return (
        <Button
            className="w-fit h-8 bg-gray-300/65 rounded-full flex items-center gap-2  text-black hover:bg-gray-300/80"
            onClick={onClick}
        >
            <MessageCircle className="size-4" />
            {count}
        </Button>
    );
};

export default CommentButton;
