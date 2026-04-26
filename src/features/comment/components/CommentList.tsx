import { ErrorMessage } from "@/shared/components/common";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useGetAllComments } from "../hooks/useGetAllComments";
import CommentCard from "./CommentCard";

const CommentList = ({ postId }: { postId: string }) => {
    const { comments, isLoading, error } = useGetAllComments(postId);

    if (isLoading)
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="w-full h-20" />
                ))}
            </div>
        );

    if (error)
        return (
            <ErrorMessage
                message={
                    error?.response?.data?.detail ?? "Error fetching comments"
                }
            />
        );

    if (!comments || comments.length === 0)
        return <p className="text-muted-foreground">No comments yet</p>;

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
