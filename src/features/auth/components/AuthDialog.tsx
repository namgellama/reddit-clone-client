import { useState, type Dispatch, type SetStateAction } from "react";

import { GoogleLogo } from "@/assets";

import { Button } from "@/shared/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Separator } from "@/shared/components/ui/separator";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

import { BASE_URL } from "@/shared/lib/api";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginDialog = ({ isOpen, setIsOpen }: Props) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="p-12 min-w-137.5 h-[85vh] rounded-2xl ">
                <div className="flex flex-col gap-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">
                            {isLogin ? "Log In" : "Sign Up"}
                        </DialogTitle>
                        <DialogDescription>
                            By continuing, you agree to our{" "}
                            <span className="text-blue-500">
                                User Agreement
                            </span>{" "}
                            and acknowledge that you understand the{" "}
                            <span className="text-blue-500">
                                Privacy Policy
                            </span>
                            .
                        </DialogDescription>
                    </DialogHeader>

                    {/* OAuth */}
                    <Button
                        variant="outline"
                        className="rounded-2xl w-full relative py-5"
                        onClick={() =>
                            (window.location.href = `${BASE_URL}/api/v1/auth/google`)
                        }
                    >
                        <img
                            src={GoogleLogo}
                            alt="Google logo"
                            className="size-5 absolute left-3"
                        />
                        <p className="font-medium text-center">
                            Continue with Google
                        </p>
                    </Button>

                    <div className="flex items-center justify-between gap-4">
                        <Separator className="w-2/5!" />
                        <span className="text-sm text-muted-foreground">
                            OR
                        </span>
                        <Separator className="w-2/5!" />
                    </div>

                    {isLogin ? (
                        <LoginForm
                            setIsOpen={setIsOpen}
                            setIsLogin={setIsLogin}
                        />
                    ) : (
                        <SignUpForm
                            setIsOpen={setIsOpen}
                            setIsLogin={setIsLogin}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
