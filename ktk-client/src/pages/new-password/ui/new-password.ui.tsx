import { NewPasswordForm } from "@/features/auth/new-password";
import { AuthCard } from "@/widgets/auth-card";
import React from "react";

export const NewPasswordPage: React.FC = () => {
    return (
        <AuthCard
            title="Поменяйте свой пароль"
            description="Придумайте новый пароль и повторите его чтобы поменять."
        >
            <NewPasswordForm />
        </AuthCard>
    );
};
