import { useResetPassword } from "../model/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resetPasswordFormSchema, type ResetPasswordFields } from "../model/validation-schemas";
import { Button, Input, Label } from "@/shared/components";

export const PasswordResetForm: React.FC = () => {
    const { resetPasswordFunc, isResetPasswordPenging } = useResetPassword();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<ResetPasswordFields>({
        resolver: zodResolver(resetPasswordFormSchema),
        mode: "onChange",
    });

    const onSubmit = (data: ResetPasswordFields) => resetPasswordFunc(data);
    const onErroSubmit = () => toast.error("Заполните форму корректно!");

    return (
        <form onSubmit={handleSubmit(onSubmit, onErroSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Почта</Label>
                    <Input {...register("email")} id="email" type="email" placeholder="m@example.com" required />
                    <div className="text-primary text-sm">{errors.email?.message}</div>
                </div>
                <Button type="submit" className="w-full py-5" disabled={isResetPasswordPenging}>
                    Сбросить пароль
                </Button>
            </div>
        </form>
    );
};
