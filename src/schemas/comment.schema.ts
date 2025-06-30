import * as z from "zod/v4"

export const commentSchema = z.object({
    comment: z.string().min(1, "Comment is required").max(50, "Comment must be less than 50 characters"),
})