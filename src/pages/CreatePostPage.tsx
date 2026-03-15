import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreatePost } from "@/features/post/hooks/useCreatePost";
import type { CreatePostFormFields } from "@/features/post/validation";
import postValidation from "@/features/post/validation";
import { Button } from "@/shared/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Spinner } from "@/shared/components/ui/spinner";
import { Textarea } from "@/shared/components/ui/textarea";

const CreatePostPage = () => {
    const form = useForm<CreatePostFormFields>({
        resolver: zodResolver(postValidation.createPost),
        defaultValues: {
            title: "",
            content: "",
            images: [],
        },
    });

    const { createPostMutation, isLoading } = useCreatePost();

    const navigate = useNavigate();

    const onSubmit = async (data: CreatePostFormFields) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("content", data.content);

        data.images.forEach((file) => {
            formData.append("images", file);
        });

        await createPostMutation(formData);
        form.reset();
        navigate("/");
    };

    return (
        <div className="space-y-5">
            <h3 className="text-xl font-bold">Create post</h3>

            <form id="post-create-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        control={form.control}
                        name="title"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="title">
                                    Title
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <div className="flex flex-col items-end space-y-2">
                                    <Input
                                        {...field}
                                        id="title"
                                        aria-invalid={fieldState.invalid}
                                        className="bg-transparent rounded-2xl py-6 border-gray-300"
                                    />
                                    <p className="text-muted-foreground text-xs">
                                        {field.value.length}/255
                                    </p>
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="content"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="content">
                                    Content{" "}
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id="content"
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                    className="bg-transparent rounded-2xl py-6 border-gray-300 min-h-30"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="images"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="images">Images</FieldLabel>
                                <Input
                                    id="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) =>
                                        field.onChange(
                                            Array.from(e.target.files || []),
                                        )
                                    }
                                    aria-invalid={fieldState.invalid}
                                    className="bg-transparent rounded-2xl h-14 border-gray-300"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Button
                        type="submit"
                        form="post-create-form"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : "Submit"}
                    </Button>
                </FieldGroup>
            </form>
        </div>
    );
};

export default CreatePostPage;
