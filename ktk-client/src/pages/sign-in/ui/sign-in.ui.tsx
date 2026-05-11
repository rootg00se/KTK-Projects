import { OAuthButtons } from "@/features/auth/oauth";
import { SignInForm } from "@/features/auth/sign-in";
import { cn } from "@/shared/lib/utils";
import { AuthCard } from "@/widgets/auth-card";
import React from "react";
import { Link } from "react-router-dom";

export const SignInPage: React.FC = () => {
    return (
        <AuthCard
            title="Войдите в KTK Projects!"
            description="Введите свою почту и пароль чуть ниже чтобы войти."
            footer={<OAuthButtons />}
            topLink={
                <Link
                    to="/sign-up"
                    className={cn(
                        "underline absolute top-10 right-10 text-primary text-lg",
                        "max-md:text-[16px] max-sm:text-center max-sm:w-full max-sm:right-0",
                    )}
                >
                    Зарегестрироваться
                </Link>
            }
        >
            <SignInForm />
        </AuthCard>
    );
};
