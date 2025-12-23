import type { Dispatch, SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { GoogleLogo } from "@/assets";

import type { LoginFormFields } from "@/features/auth/validation";
import authValidation from "@/features/auth/validation";

import { Form } from "@/shared/components/custom";
import FormTextInput from "@/shared/components/custom/FormTextInput";
import { Button } from "@/shared/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Separator } from "@/shared/components/ui/separator";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginDialog = ({ isOpen, setIsOpen }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="p-12 min-w-137.5 h-[85vh] rounded-2xl ">
                <div className="flex flex-col gap-5">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">
                            Log In
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

                    <LoginForm />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;

const LoginForm = () => {
    const form = useForm<LoginFormFields>({
        resolver: zodResolver(authValidation.loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormFields) => {
        console.log("🚀 ~ onSubmit ~ data:", data);
    };

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
            className="w-full h-full flex flex-col justify-between"
        >
            <div className="space-y-6">
                <FormTextInput
                    control={form.control}
                    label="Email"
                    name="email"
                />
                <FormTextInput
                    type="password"
                    control={form.control}
                    label="Password"
                    name="password"
                />

                <div className="flex flex-col gap-4">
                    <Link to="" className="text-blue-500 text-sm">
                        Forgot Password?
                    </Link>

                    <div className="space-x-1">
                        <span className="text-sm text-black/70">
                            New to Reddit?
                        </span>
                        <Link to="" className="text-blue-500 text-sm">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>

            <Button type="submit" className="py-6 w-full rounded-full">
                Log In
            </Button>
        </Form>
    );
};
