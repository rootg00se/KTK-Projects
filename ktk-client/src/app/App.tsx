import type React from "react";
import { Button } from "@/shared/components/ui/button";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "@/pages/not-found";
import { SignUpPage } from "@/pages/sign-up";
import { AuthLayout } from "./layouts/auth-layout";
import { SignInPage } from "@/pages/sign-in";
import { VerifyPage } from "@/pages/verify";
import { ConfirmPage } from "@/pages/confirm";
import { PasswordResetPage } from "@/pages/password-reset";
import { NewPasswordPage } from "@/pages/new-password";
import { AppLayout } from "./layouts/app-layout";
import { HomePage } from "@/pages/home";

const App: React.FC = () => {
    return (
        <div className="wrap">
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/confirm" element={<ConfirmPage />} />
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/password-reset" element={<PasswordResetPage />} />
                    <Route path="/new-password" element={<NewPasswordPage />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
