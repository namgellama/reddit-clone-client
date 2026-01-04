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

import { useRegisterUser } from "@/contexts/RegisterUserContext";
import { BASE_URL } from "@/shared/lib/api";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthDialog = ({ isOpen, setIsOpen }: Props) => {
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1);
    const { fields } = useRegisterUser();

    const title = isLogin
        ? "Log In"
        : step === 1
        ? "Sign up"
        : step === 2
        ? "Verify your email"
        : "Create your username and password";

    const description =
        isLogin || step === 1 ? (
            <>
                By continuing, you agree to our{" "}
                <span className="text-blue-500">User Agreement</span> and
                acknowledge that you understand the{" "}
                <span className="text-blue-500">Privacy Policy</span>.
            </>
        ) : step === 2 ? (
            `Enter the 6-digits code sent to ${fields?.email}`
        ) : (
            "Reddit is anonymouse, so your username is what you'll go by here. Choose wisely-because once you get a name you can't change it."
        );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="p-12 min-w-137.5 h-[85vh] rounded-2xl ">
                <div className="flex flex-col gap-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    {/* OAuth */}
                    {(isLogin || step == 1) && (
                        <>
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
                        </>
                    )}

                    {isLogin ? (
                        <LoginForm
                            setIsOpen={setIsOpen}
                            setIsLogin={setIsLogin}
                        />
                    ) : (
                        <SignUpForm
                            step={step}
                            setStep={setStep}
                            setIsLogin={setIsLogin}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
