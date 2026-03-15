import UserLayout from "@/shared/layouts/UserLayout";
import { lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const GoogleCallbackPage = lazy(() => import("@/pages/GoogleCallbackPage"));
const CreatePostPage = lazy(() => import("@/pages/CreatePostPage"));

export const userRoutes = [
    {
        layout: UserLayout,
        routes: [
            { path: "/", element: HomePage },
            { path: "/posts/create", element: CreatePostPage },
            { path: "/google/callback", element: GoogleCallbackPage },
        ],
    },
    {
        layout: null,
        routes: [{ path: "/", element: GoogleCallbackPage }],
    },
];
