import z from "zod";

// Create Post
const createPost = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 letters")
        .max(255, "Title must not exceed 255 characters"),
    content: z.string().trim().min(3, "Content must be at least 3 letters"),
    images: z
        .array(
            z
                .instanceof(File)
                .refine(
                    (file) => file.type.startsWith("image/"),
                    "Only image files are allowed",
                )
                .refine(
                    (file) => file.size <= 5 * 1024 * 1024,
                    "Each image must be less than 5MB",
                ),
        )
        .max(3, "Only 3 images are allowed"),
});

const postValidation = {
    createPost,
};

export default postValidation;

export type CreatePostFormFields = z.infer<typeof createPost>;
