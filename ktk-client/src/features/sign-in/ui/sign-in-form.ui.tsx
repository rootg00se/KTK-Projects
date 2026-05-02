import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useSignIn } from "../model/useSignIn";
import ReCAPTCHA from "react-google-recaptcha";
import { GOOGLE_RECAPTCHA_SITE_KEY } from "@/shared/config/constants";
import { signInFormSchema, type SignInFields } from "../model/validation-schemas";
import { Link } from "react-router-dom";

export const SignInForm: React.FC = () => {
    const { signInFunc, isSignInPending } = useSignIn();
    const [recaptcha, setRecaptcha] = useState<string | null>(null);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignInFields>({
        resolver: zodResolver(signInFormSchema),
        mode: "onChange",
    });

    const onSubmit = (data: SignInFields) => {
        if (recaptcha) return signInFunc({ data, recaptcha });

        toast.error("Пожалуйста, пройдите рекаптчу");
    };

    const onErroSubmit = () => toast.error("Заполните все поля корректно!");

    return (
        <form onSubmit={handleSubmit(onSubmit, onErroSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Почта</Label>
                    <Input {...register("email")} id="email" type="email" placeholder="m@example.com" required />
                    <div className="text-primary text-sm">{errors.email?.message}</div>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Пароль</Label>
                        <Link to="/password-reset" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                            Забыли свой пароль?
                        </Link>
                    </div>
                    <Input {...register("password")} id="password" type="password" required />
                    <div className="text-primary text-sm">{errors.password?.message}</div>
                </div>
                <div className="flex justify-center">
                    <ReCAPTCHA sitekey={GOOGLE_RECAPTCHA_SITE_KEY} onChange={setRecaptcha} />
                </div>
            </div>
            <Button type="submit" className="w-full mt-6" disabled={isSignInPending}>
                Войти
            </Button>
        </form>
    );
};
