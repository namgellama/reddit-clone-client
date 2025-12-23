import { NavBar, SideBar } from "@/shared/components/user";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-1">
                <SideBar />
                <main className="flex-1  p-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;
