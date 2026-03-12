import { Outlet } from "react-router-dom";

import { Footer, NavBar, SideBar } from "@/shared/components/user";

const UserLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <div className="flex-1 overflow-auto">
                    <div className="grid grid-cols-[3fr_1fr] px-24 gap-10 min-h-full">
                        <main className="p-4">
                            <Outlet />
                        </main>
                        <aside className="h-full">
                            <div className="flex flex-col h-full pb-6">
                                <div className="flex-1" />
                                <Footer />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
