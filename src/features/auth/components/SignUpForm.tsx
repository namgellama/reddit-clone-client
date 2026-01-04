import { useState, type Dispatch, type SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/shared/components/custom";
import FormTextInput from "@/shared/components/custom/FormTextInput";
import { Button } from "@/shared/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { Spinner } from "@/shared/components/ui/spinner";

import { useRegisterUser } from "@/contexts/RegisterUserContext";
import { useRegister } from "../hooks/useRegister";
import { useRegisterEmail } from "../hooks/useRegisterEmail";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import type {
    RegisterEmailFormFields,
    RegisterUserFormFields,
} from "../validation";
import authValidation from "../validation";

interface Props {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = ({ step, setStep, setIsLogin }: Props) => {
    return (
        <>
            {step === 1 && (
                <RegisterEmail setIsLogin={setIsLogin} setStep={setStep} />
            )}
            {step === 2 && <VerifyEmail setStep={setStep} />}
            {step === 3 && <RegisterUser setIsLogin={setIsLogin} />}
        </>
    );
};

export default SignUpForm;

interface RegisterEmailProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
    setStep: Dispatch<SetStateAction<number>>;
}

const RegisterEmail = ({ setIsLogin, setStep }: RegisterEmailProps) => {
    const form = useForm<RegisterEmailFormFields>({
        resolver: zodResolver(authValidation.registerEmail),
        defaultValues: {
            email: "",
        },
    });
    const { setFields } = useRegisterUser();

    const { registerEmailMutation, isLoading } = useRegisterEmail();

    const onSubmit = async (data: RegisterEmailFormFields) => {
        try {
            await registerEmailMutation(data);
            setFields((prev) => ({ ...prev, email: data.email }));
            setStep(2);
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

interface VerifyEmailProps {
    setStep: Dispatch<SetStateAction<number>>;
}

const VerifyEmail = ({ setStep }: VerifyEmailProps) => {
    const [otp, setOtp] = useState("");
    const { fields } = useRegisterUser();

    const { verifyEmailMutation, isLoading } = useVerifyEmail();

    const handleVerifyEmail = async () => {
        if (otp.length !== 6) return;

        await verifyEmailMutation({
            email: fields.email,
            otp: Number(otp),
        });

        setStep(3);
    };

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <InputOTP
                className="w-full"
                value={otp}
                onChange={(value) => setOtp(value)}
                maxLength={6}
            >
                <InputOTPGroup className="w-full">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                            key={index}
                            className="w-full h-14 border-gray-400"
                            index={index}
                        />
                    ))}
                </InputOTPGroup>
            </InputOTP>
            <Button
                disabled={isLoading || otp.length !== 6}
                type="submit"
                className="py-6 w-full rounded-full"
                onClick={handleVerifyEmail}
            >
                {isLoading ? <Spinner /> : "Continue"}
            </Button>
        </div>
    );
};

interface RegisterUserProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const RegisterUser = ({ setIsLogin }: RegisterUserProps) => {
    const { fields } = useRegisterUser();

    const form = useForm<RegisterUserFormFields>({
        resolver: zodResolver(authValidation.registerUser),
        defaultValues: {
            email: fields.email ?? "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { registerMuatation, isLoading } = useRegister();

    const onSubmit = async (data: RegisterUserFormFields) => {
        await registerMuatation(data);
        setIsLogin(true);
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
                    label="Username"
                    name="username"
                />

                <FormTextInput
                    type="password"
                    control={form.control}
                    label="Password"
                    name="password"
                />

                <FormTextInput
                    type="password"
                    control={form.control}
                    label="Confirm Password"
                    name="confirmPassword"
                />
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
