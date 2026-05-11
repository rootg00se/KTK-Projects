import { OAuthButtons } from "@/features/auth/oauth";
import { SignUpForm } from "@/features/auth/sign-up";
import { cn } from "@/shared/lib/utils";
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
                <Link
                    to="/sign-up"
                    className={cn(
                        "underline absolute top-10 right-10 text-primary text-lg",
                        "max-md:text-[16px] max-sm:text-center max-sm:w-full max-sm:right-0",
                    )}
                >
                    Войти
                </Link>
            }
        >
            <SignUpForm />
        </AuthCard>
    );
};
