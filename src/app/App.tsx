import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import UserLayout from "@/shared/layouts/UserLayout";

const HomePage = lazy(() => import("@/pages/HomePage"));

function App() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    );
}

export default App;
