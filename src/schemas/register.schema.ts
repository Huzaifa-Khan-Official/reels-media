import * as z from "zod/v4"

export const usernameValidation = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
});

export const registerSchema = z.object({
    usernameValidation,
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be less than 20 characters"),
})