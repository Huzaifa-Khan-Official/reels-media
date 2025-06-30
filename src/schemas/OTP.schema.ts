import * as z from "zod/v4"

export const OtpSchema = z.object({
    code: z.string().min(6, "Code must be at least 6 characters"),
})