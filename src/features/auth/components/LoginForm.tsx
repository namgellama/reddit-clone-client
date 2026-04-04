import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { Form, FormTextInput } from "@/shared/components/custom";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import type { LoginFormFields } from "../validation";
import authValidation from "../validation";

interface Props {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setIsOpen, setIsLogin }: Props) => {
    const { isLoading, login } = useAuth();

    const form = useForm<LoginFormFields>({
        resolver: zodResolver(authValidation.loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormFields) => {
        await login(data);
        setIsOpen(false);
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
                        <Button
                            type="button"
                            variant="link"
                            className="px-0 text-blue-500 text-sm font-normal"
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>

            <Button
                disabled={isLoading}
                type="submit"
                className="py-6 w-full rounded-full"
            >
                {isLoading ? <Spinner /> : "Log In"}
            </Button>
        </Form>
    );
};

export default LoginForm;
