import { useQuery } from "@tanstack/react-query";

import type { ApiError } from "@/shared/types/api-error";
import postApi from "../api";
import type { Post } from "../types";

// Get all posts
export const useGetAllPosts = () => {
    const postsQuery = useQuery<Post[], ApiError>({
        queryKey: ["posts"],
        queryFn: postApi.getAllPosts,
    });

    return postsQuery;
};
