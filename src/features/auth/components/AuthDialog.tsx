import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { ArrowLeft } from "lucide-react";

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

import { GoogleLogo } from "@/assets";
import { EmailOtpProvider, useEmailOtp } from "@/contexts/EmailOtpContext";
import { API_URL } from "@/shared/lib/api";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthDialog = ({ isOpen, setIsOpen }: Props) => {
    return (
        <EmailOtpProvider>
            <AuthDialogContent isOpen={isOpen} setIsOpen={setIsOpen} />
        </EmailOtpProvider>
    );
};

export default AuthDialog;

interface AuthDialogContentProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthDialogContent = ({ isOpen, setIsOpen }: AuthDialogContentProps) => {
    const { data, isEmailSet, isOtpSet } = useEmailOtp();
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (!isOpen) return;

        if (isOtpSet) {
            setIsLogin(false);
            setStep(3);
        } else if (isEmailSet) {
            setIsLogin(false);
            setStep(2);
        } else {
            setTimeout(() => {
                setIsLogin(true);
                setStep(1);
            }, 1500);
        }
    }, [isOpen, data.email, data.otp, isEmailSet, isOtpSet]);

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
            `Enter the 6-digits code sent to ${data.email}`
        ) : (
            "Reddit is anonymouse, so your username is what you'll go by here. Choose wisely-because once you get a name you can't change it."
        );

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);

        if (!open) {
            setIsLogin(true);
            setStep(1);
        }
    };

    const showBackButton = step > 1;
    const showLoginWithGoogleButton = isLogin || step == 1;

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="p-12 min-w-137.5 h-[85vh] rounded-2xl ">
                {showBackButton && (
                    <Button
                        variant="ghost"
                        className="size-8 rounded-full absolute top-2 left-2"
                        onClick={() => setStep((prev) => prev - 1)}
                    >
                        <ArrowLeft />
                    </Button>
                )}

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
                    {showLoginWithGoogleButton && (
                        <>
                            <Button
                                variant="outline"
                                className="rounded-2xl w-full relative py-5"
                                onClick={() =>
                                    (window.location.href = `${API_URL}/api/v1/auth/google`)
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
