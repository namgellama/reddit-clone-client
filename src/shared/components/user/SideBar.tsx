import { CircleArrowOutUpRight, House, Shapes } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
    const links = [
        { label: "Home", path: "/", icon: House },
        {
            label: "Popular",
            path: "/popular",
            icon: CircleArrowOutUpRight,
        },
        {
            label: "Explore",
            path: "/explore",
            icon: Shapes,
        },
    ];

    const { pathname } = useLocation();

    return (
        <aside className="w-64 h-full border-r py-6 pl-4 pr-8 sticky top-0 left-0">
            <ul className="space-y-2">
                {links.map((link) => (
                    <li
                        key={link.label}
                        className={`p-2 rounded-lg cursor-pointer hover:bg-input/50 ${
                            pathname === link.path ? "bg-input" : ""
                        } `}
                    >
                        <Link
                            to={link.path}
                            className="flex items-center gap-4"
                        >
                            <link.icon className="size-5" />
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SideBar;
