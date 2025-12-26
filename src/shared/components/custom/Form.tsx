import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Form as ShadcnForm } from "../ui/form";
import type { ReactNode } from "react";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit: (data: any) => void;
    children: ReactNode;
    className: string;
}

const Form = <T extends FieldValues>({
    form,
    onSubmit,
    children,
    className,
}: Props<T>) => {
    return (
        <ShadcnForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                {children}
            </form>
        </ShadcnForm>
    );
};

export default Form;
