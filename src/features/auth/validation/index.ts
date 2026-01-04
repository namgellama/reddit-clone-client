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

// Sign up - register user
const registerUser = z
    .object({
        email: z.email().nonempty("Email is required"),
        username: z.string().nonempty("Username is required"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
                message:
                    "Password must include uppercase, lowercase, number, and special character",
            }),
        confirmPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
    })
    .refine((field) => !(field.password !== field.confirmPassword), {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Login
const loginSchema = z.object({
    email: z.email().nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
});

const authValidation = {
    registerEmail,
    verifyEmail,
    registerUser,
    loginSchema,
};

export default authValidation;

export type RegisterEmailFormFields = z.infer<
    typeof authValidation.registerEmail
>;
export type VerifyEmailFormFields = z.infer<typeof authValidation.verifyEmail>;
export type RegisterUserFormFields = z.infer<
    typeof authValidation.registerUser
>;
export type LoginFormFields = z.infer<typeof authValidation.loginSchema>;
