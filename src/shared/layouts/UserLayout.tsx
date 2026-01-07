import { Footer, NavBar, SideBar } from "@/shared/components/user";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-1">
                <SideBar />
                <div className="grid grid-cols-[3fr_1fr] px-24 gap-10 flex-1">
                    <main className="p-4 overflow-auto">
                        <Outlet />
                    </main>
                    <aside className="h-full">
                        <div className="flex flex-col h-full pb-6">
                            {/* spacer */}
                            <div className="flex-1" />

                            {/* footer */}
                            <Footer />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
