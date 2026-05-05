import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSignUp } from "../model/useSignUp";
import ReCAPTCHA from "react-google-recaptcha";
import { GOOGLE_RECAPTCHA_SITE_KEY } from "@/shared/config/constants";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { signUpFormSchema, type SignUpFields } from "../model/validation-schemas";

export const SignUpForm: React.FC = () => {
    const { singUpFunc, isSignUpPending } = useSignUp();
    const [recaptcha, setRecaptcha] = useState<string | null>(null);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignUpFields>({
        resolver: zodResolver(signUpFormSchema),
        mode: "onChange",
    });

    const onSubmit = (data: SignUpFields) => {
        if (recaptcha) return singUpFunc({ data, recaptcha });

        toast.error("Пожалуйста, заполните рекаптчу");
    }

    const onErroSubmit = () => toast.error("Заполните все поля корректно!");

    return (
        <form onSubmit={handleSubmit(onSubmit, onErroSubmit)}>
            <div className="flex flex-col gap-3">
                <div className="grid gap-2">
                    <Label htmlFor="email">Эл. Почта</Label>
                    <Input {...register("email")} id="email" type="email" placeholder="m@example.com" required />
                    <div className="text-primary text-sm">{errors.email?.message}</div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="nickname">Никнейм</Label>
                    <Input {...register("nickname")} placeholder="DeG00se" id="nickname" type="text" required />
                    <div className="text-primary text-sm">{errors.nickname?.message}</div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input {...register("password")} id="password" type="password" required />
                    <div className="text-primary text-sm">{errors.password?.message}</div>
                </div>
                <div className="flex justify-center">
                    <ReCAPTCHA sitekey={GOOGLE_RECAPTCHA_SITE_KEY} onChange={setRecaptcha} />
                </div>
            </div>
            <Button type="submit" className="w-full py-5 mt-6" disabled={isSignUpPending}>
                Зарегестрироваться
            </Button>
        </form>
    );
};
