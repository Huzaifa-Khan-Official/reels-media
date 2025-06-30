import * as z from "zod/v4"

export const loginSchema = z.object({
    identifier: z.string(),
    password: z.string(),
})