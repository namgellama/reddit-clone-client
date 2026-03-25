const BASE_URL = "/api/v1";

export const API_ENDPOINT = {
    // Auth
    auth: {
        registerEmail: `${BASE_URL}/auth/signup/register-email`,
        verifyEmail: `${BASE_URL}/auth/signup/verify-email`,
        register: `${BASE_URL}/auth/register`,
        login: `${BASE_URL}/auth/login`,
        logout: `${BASE_URL}/auth/logout`,
        refreshToken: `${BASE_URL}/auth/refresh-token`,
    },

    // User
    user: {
        getMe: `${BASE_URL}/users/me`,
    },

    // Post
    post: {
        getAll: `${BASE_URL}/posts`,
        getById: (id: string) => `${BASE_URL}/posts/${id}`,
        create: `${BASE_URL}/posts`,
        vote: (post_id: string) => `${BASE_URL}/posts/${post_id}/votes`,
    },

    // Comment
    comment: {
        getAll: (postId: string) => `${BASE_URL}/posts/${postId}/comments`,
    },
};
