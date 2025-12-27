import { useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/assets";

import { useAuth } from "@/contexts/AuthContext";

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import LoginDialog from "./LoginDialog";

import { Bell, LogOut, SquarePlus } from "lucide-react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="flex items-center justify-between px-2 py-1 border-b sticky top-0">
            <Link to="/">
                <img
                    src={Logo}
                    alt="Logo"
                    className="w-36 h-14 object-contain"
                />
            </Link>

            {!isAuthenticated ? (
                <Button
                    className="rounded-full py-5"
                    onClick={() => setIsOpen(true)}
                >
                    Log In
                </Button>
            ) : (
                <div className="flex space-x-4">
                    <Button
                        variant="ghost"
                        className="rounded-2xl flex items-center"
                    >
                        <SquarePlus className="mt-0.5" /> Create
                    </Button>
                    <Button variant="ghost" className="rounded-full relative">
                        <Bell className="size-5" />
                        <Badge className="size-4 absolute right-0 top-0">
                            1
                        </Badge>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarFallback className="bg-gray-500 text-background">
                                    {user?.firstName.charAt(0)}
                                    {user?.lastName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60">
                            <DropdownMenuItem
                                className="hover:bg-muted cursor-pointer px-4 py-2"
                                onClick={logout}
                            >
                                <LogOut /> Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}

            <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
    );
};

export default NavBar;
