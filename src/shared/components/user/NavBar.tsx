import { Logo } from "@/assets";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between px-2 py-1 border-b">
            <Link to="/">
                <img
                    src={Logo}
                    alt="Logo"
                    className="w-36 h-14 object-contain"
                />
            </Link>
            <Button className="rounded-full py-5">Log In</Button>
        </nav>
    );
};

export default NavBar;
