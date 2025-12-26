const BASE_URL = "/api/v1";

export const API_ENDPOINT = {
    // Auth
    auth: {
        login: `${BASE_URL}/auth/login`,
        refreshToken: `${BASE_URL}/auth/refresh-token`,
    },

    // User
    user: {
        getMe: `${BASE_URL}/users/get-me`,
    },

    // Post
    post: {
        getAll: `${BASE_URL}/posts`,
    },
};
