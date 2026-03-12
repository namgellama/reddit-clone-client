import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import UserLayout from "@/shared/layouts/UserLayout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const GoogleCallbackPage = lazy(() => import("@/pages/GoogleCallbackPage"));

function App() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/google/callback" element={<GoogleCallbackPage />} />
        </Routes>
    );
}

export default App;
