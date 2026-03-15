import { Route, Routes } from "react-router-dom";

import { userRoutes } from "./routes/user.routes";

function App() {
    return (
        <Routes>
            {userRoutes.map((userRoute, index) => {
                const Layout = userRoute.layout;

                if (Layout) {
                    return (
                        <Route key={index} element={<Layout />}>
                            {userRoute.routes.map((route, routeIndex) => {
                                const Element = route.element;

                                return (
                                    <Route
                                        key={routeIndex}
                                        path={route.path}
                                        element={<Element />}
                                    />
                                );
                            })}
                        </Route>
                    );
                }

                return userRoute.routes.map((route, routeIndex) => {
                    const Element = route.element;

                    return (
                        <Route
                            key={routeIndex}
                            path={route.path}
                            element={<Element />}
                        />
                    );
                });
            })}
        </Routes>
    );
}

export default App;
