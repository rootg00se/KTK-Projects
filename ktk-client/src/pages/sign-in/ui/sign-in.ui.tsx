import { OAuthButtons } from "@/features/auth/oauth";
import { SignInForm } from "@/features/auth/sign-in";
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
                <Link to="/sign-up" className="underline absolute top-10 right-10 text-primary text-lg">
                    Зарегестрироваться
                </Link>
            }
        >
            <SignInForm />
        </AuthCard>
    );
};
