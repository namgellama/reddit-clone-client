import type { Dispatch, SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { GoogleLogo } from "@/assets";

import type { LoginFormFields } from "@/features/auth/validation";
import authValidation from "@/features/auth/validation";

import { Button } from "@/shared/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginDialog = ({ isOpen, setIsOpen }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="p-20 min-w-137.5 h-[75vh] rounded-2xl ">
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full h-full flex flex-col justify-between"
            >
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
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
            </form>
        </Form>
    );
};
