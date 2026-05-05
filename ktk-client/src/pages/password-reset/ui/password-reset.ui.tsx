import { PasswordResetForm } from "@/features/auth/password-reset";
import { AuthCard } from "@/widgets/auth-card";
import React from "react";

export const PasswordResetPage: React.FC = () => {
    return (
        <AuthCard
            title="Сброс пароля"
            description="Введите вашу почту, после чего вы получите на нее ссылку для сброса пароля"
        >
            <PasswordResetForm />
        </AuthCard>
    );
};
