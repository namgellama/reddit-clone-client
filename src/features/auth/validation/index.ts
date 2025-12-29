import { z } from "zod";

// Sign up - register email
const registerEmail = z.object({
    email: z.email().nonempty("Email is required"),
});

// Sign up - verify email
const verifyEmail = z.object({
    email: z.email().nonempty("Email is required"),
    otp: z.coerce
        .number()
        .int("OTP must be an integer")
        .min(100000, "OTP must be 6 digits")
        .max(999999, "OTP must be 6 digits"),
});

// Login
const loginSchema = z.object({
    email: z.email().nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
});

const authValidation = {
    registerEmail,
    verifyEmail,
    loginSchema,
};

export default authValidation;

export type RegisterEmailFormFields = z.infer<
    typeof authValidation.registerEmail
>;
export type VerifyEmailFormFields = z.infer<typeof authValidation.verifyEmail>;
export type LoginFormFields = z.infer<typeof authValidation.loginSchema>;
