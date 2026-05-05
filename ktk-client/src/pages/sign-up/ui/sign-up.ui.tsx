import { OAuthButtons } from "@/features/auth/oauth";
import { SignUpForm } from "@/features/auth/sign-up";
import { AuthCard } from "@/widgets/auth-card";
import React from "react";
import { Link } from "react-router-dom";

export const SignUpPage: React.FC = () => {
    return (
        <AuthCard
            title="Зарегестрируйтесь на KTK Projects!"
            description="Заполните данные чуть ниже чтобы зарегестрироваться"
            footer={<OAuthButtons />}
            topLink={
                <Link to="/sign-in" className="underline absolute top-10 right-10 text-primary text-lg">
                    Войти
                </Link>
            }
        >
            <SignUpForm />
        </AuthCard>
    );
};
