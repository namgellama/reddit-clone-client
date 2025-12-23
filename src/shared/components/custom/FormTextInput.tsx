import { useState, type ComponentProps } from "react";

import { Eye, EyeOff } from "lucide-react";
import {
    useController,
    type Control,
    type ControllerRenderProps,
    type FieldValues,
    type Path,
} from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

interface Props<T extends FieldValues>
    extends Omit<ComponentProps<"input">, "name" | "type"> {
    control: Control<T>;
    label: string;
    name: Path<T>;
    type?: "text" | "password";
    isRequired?: boolean;
}

const errorStyles =
    "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30 focus-visible:ring-2";

const FormTextInput = <T extends FieldValues>({
    control,
    label,
    name,
    type = "text",
    isRequired = true,
    ...inputProps
}: Props<T>) => {
    const {
        formState: { errors },
    } = useController({ control, name });

    const error = errors[name] && errors[name].message?.toString();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex gap-1">
                        {label}
                        {isRequired && (
                            <span className="text-destructive">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <div>
                            {type === "text" && (
                                <Input
                                    {...field}
                                    {...inputProps}
                                    className={error ? errorStyles : ""}
                                />
                            )}
                            {type === "password" && (
                                <PasswordInput
                                    field={field}
                                    error={error}
                                    {...inputProps}
                                />
                            )}
                        </div>
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormTextInput;

interface PasswordInputProps<T extends FieldValues> {
    field: ControllerRenderProps<T>;
    error?: string;
    placeholder?: string;
}

const PasswordInput = <T extends FieldValues>({
    field,
    error,
    placeholder,
    ...inputProps
}: PasswordInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                {...field}
                {...inputProps}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className={`pr-10 ${error ? errorStyles : ""}`}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
};
