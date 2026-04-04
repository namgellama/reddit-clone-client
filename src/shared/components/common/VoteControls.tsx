import { ArrowBigDown, ArrowBigUp } from "lucide-react";

import { Button } from "../ui/button";

interface Props {
    disabled: boolean;
    score: number;
    userVote: "UPVOTE" | "DOWNVOTE" | null;
    upvoteOnClick: (e: React.MouseEvent) => void;
    downvoteOnClick: (e: React.MouseEvent) => void;
    variant?: "post" | "comment";
}

const VoteControls = ({
    disabled,
    score,
    userVote,
    upvoteOnClick,
    downvoteOnClick,
    variant = "post",
}: Props) => {
    if (variant === "post")
        return (
            <div
                className={`w-fit h-8 p-1 ${userVote === "UPVOTE" ? "bg-primary text-white" : userVote === "DOWNVOTE" ? "bg-secondary text-white" : "bg-gray-300/65 text-black"} rounded-full flex items-center justify-center gap-2`}
            >
                <Button
                    disabled={disabled}
                    variant="ghost"
                    className={`size-6 p-0 hover:bg-inherit ${userVote !== null ? "hover:text-white" : "hover:text-primary"}`}
                    onClick={upvoteOnClick}
                >
                    {
                        <ArrowBigUp
                            className="size-[1.15rem]"
                            fill={userVote === "UPVOTE" ? "white" : "none"}
                        />
                    }
                </Button>
                {score}
                <Button
                    disabled={disabled}
                    variant="ghost"
                    className={`size-6 p-0 hover:bg-inherit ${userVote !== null ? "hover:text-white" : "hover:text-secondary"}`}
                    onClick={downvoteOnClick}
                >
                    <ArrowBigDown
                        className="size-[1.15rem] "
                        fill={userVote === "DOWNVOTE" ? "white" : "none"}
                    />
                </Button>
            </div>
        );

    return (
        <div className="flex items-center gap-2">
            <Button
                disabled={disabled}
                variant="ghost"
                className={`size-6 rounded-full ${userVote === "UPVOTE" ? "text-primary hover:text-primary" : "hover:text-primary"}`}
                onClick={upvoteOnClick}
            >
                {
                    <ArrowBigUp
                        className="size-[1.15rem]"
                        fill={userVote === "UPVOTE" ? "#f12d23" : "none"}
                    />
                }
            </Button>
            {score}
            <Button
                disabled={disabled}
                variant="ghost"
                className={`size-6 rounded-full ${userVote === "DOWNVOTE" ? "text-secondary hover:text-secondary" : "hover:text-secondary"}`}
                onClick={downvoteOnClick}
            >
                <ArrowBigDown
                    className="size-[1.15rem] "
                    fill={userVote === "DOWNVOTE" ? "#6a5cff" : "none"}
                />
            </Button>
        </div>
    );
};

export default VoteControls;
