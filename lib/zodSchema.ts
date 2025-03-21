import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const siteSchema = z.object({
    name: z.string().min(1).max(35),
    description: z.string().min(1).max(100),
    subdirectory: z.string().min(1).max(40),
})

export const postSchema = z.object({
    title: z.string().min(1).max(100),
    slug: z.string().min(1).max(190),
    image: z.string().min(1),
    smallDescription: z.string().min(1).max(255),
    articleContent: z.string().min(1),
})

export function siteCreationSchema(options?: {
    isSubdirectoryUnique?: () => Promise<boolean>
}) {
    return z.object({
        subdirectory: z
            .string()
            .min(1)
            .max(40)
            .regex(/^[a-z]+$/, "Subdirectory must be lowercase")
            .transform((value) => value.toLowerCase())
            .pipe(
                z.string().superRefine((email, ctx) => {
                    if (typeof options?.isSubdirectoryUnique != 'function') {
                        ctx.addIssue({
                            code: "custom",
                            message: conformZodMessage.VALIDATION_UNDEFINED,
                            fatal: true
                        })
                        return
                    }

                    return options?.isSubdirectoryUnique().then((isUnique) => {
                        if (!isUnique) {
                            ctx.addIssue({
                                code: 'custom',
                                message: 'Subdirectory already exists!',
                                fatal: true
                            })
                        }
                    })
                })
            ),
        name: z.string().min(1).max(35),
        description: z.string().min(1).max(100),
    })
}