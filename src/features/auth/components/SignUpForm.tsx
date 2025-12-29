import type { Dispatch, SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuth } from "@/contexts/AuthContext";

import { Form } from "@/shared/components/custom";
import FormTextInput from "@/shared/components/custom/FormTextInput";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";

import { useRegisterEmail } from "../hooks/useRegisterEmail";
import type { LoginFormFields } from "../validation";
import authValidation from "../validation";

interface Props {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = ({ setIsOpen, setIsLogin }: Props) => {
    const { isLoading, login } = useAuth();
    const {} = useRegisterEmail();

    const form = useForm<LoginFormFields>({
        resolver: zodResolver(authValidation.loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormFields) => {
        try {
            await login(data);
            setIsOpen(false);
        } catch (error) {}
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

                <div className="space-x-1">
                    <span className="text-sm text-black/70">
                        Already a redditor?
                    </span>
                    <Button
                        type="button"
                        variant="link"
                        className="px-0 text-blue-500 text-sm font-normal"
                        onClick={() => setIsLogin(true)}
                    >
                        Log In
                    </Button>
                </div>
            </div>

            <Button
                disabled={isLoading}
                type="submit"
                className="py-6 w-full rounded-full"
            >
                {isLoading ? <Spinner /> : "Continue"}
            </Button>
        </Form>
    );
};

export default SignUpForm;
