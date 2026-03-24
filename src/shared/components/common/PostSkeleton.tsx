import { Skeleton } from "../ui/skeleton";

const PostSkeleton = ({ isList }: { isList: boolean }) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Skeleton className="w-52 h-5" />
                <Skeleton className="w-full h-5" />
            </div>
            <div className="space-y-2">
                <Skeleton className="w-full h-128 rounded-2xl" />
                <div className="flex items-center gap-3">
                    <Skeleton className="w-20 h-8 rounded-full" />
                    <Skeleton className="w-14 h-8 rounded-full" />
                </div>
                {isList && <Skeleton className="w-full h-0.5" />}
            </div>
        </div>
    );
};

export default PostSkeleton;
