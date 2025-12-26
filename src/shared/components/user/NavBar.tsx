import { useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/assets";

import { Button } from "@/shared/components/ui/button";
import LoginDialog from "./LoginDialog";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-2 py-1 border-b sticky top-0">
            <Link to="/">
                <img
                    src={Logo}
                    alt="Logo"
                    className="w-36 h-14 object-contain"
                />
            </Link>
            <Button
                className="rounded-full py-5"
                onClick={() => setIsOpen(true)}
            >
                Log In
            </Button>

            <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
    );
};

export default NavBar;
