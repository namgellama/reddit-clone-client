import type { Post } from "@/features/types";
import { API_ENDPOINT } from "@/shared/constants/api.constants";
import api from "@/shared/lib/api";
import type { Response } from "@/shared/types/response";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useGetAllPosts = () => {
    const getAllPostsRequest = async (): Promise<Response<Post[]>> => {
        const response = await api.get<Response<Post[]>>(
            API_ENDPOINT.post.getAll
        );
        return response.data;
    };

    const {
        data: posts,
        isLoading,
        error,
    } = useQuery<Response<Post[]>, AxiosError<{ message: string }>, Post[]>({
        queryFn: getAllPostsRequest,
        queryKey: ["posts"],
        select: (response) => response.data,
    });

    return { posts, isLoading, error };
};
