import type React from "react";
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
import { AuthProtectedRoutes } from "./routes/auth-protected-routes";
import { GuestProtectedRoutes } from "./routes/guest-protected-routes";
import { ProfilePage } from "@/pages/profile";
import { ProjectPage } from "@/pages/project";
import { ProjectWorkspace } from "@/pages/project-workspace";
import { FriendsPage } from "@/pages/friends";
import { SearchUsersInput } from "@/features/user/search-users";
import { CreateProjectPage } from "@/pages/create-project";
import { ChatsPage } from "@/pages/chats";
import { MemberProtectedRoutes } from "./routes/member-protected-routes";

const App: React.FC = () => {
    return (
        <div className="wrap">
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route element={<AuthProtectedRoutes />}>
                    <Route path="/confirm" element={<ConfirmPage />} />
                </Route>
                <Route element={<AuthProtectedRoutes />}>
                    <Route element={<MemberProtectedRoutes />}>
                        <Route path="/workspace/:id" element={<ProjectWorkspace />} />
                    </Route>
                    <Route path="/chats/:id?" element={<ChatsPage />} />
                </Route>
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route element={<AuthProtectedRoutes />}>
                        <Route path="/project/create" element={<CreateProjectPage />} />
                    </Route>
                    <Route path="/project/:id" element={<ProjectPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                </Route>
                <Route path="/" element={<AppLayout searchInput={<SearchUsersInput />} />}>
                    <Route element={<AuthProtectedRoutes />}>
                        <Route path="/profile/:id/friends" element={<FriendsPage />} />
                    </Route>
                </Route>
                <Route path="/" element={<AuthLayout />}>
                    <Route element={<GuestProtectedRoutes />}>
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="/sign-in" element={<SignInPage />} />
                    </Route>
                    <Route path="/new-password" element={<NewPasswordPage />} />
                    <Route path="/password-reset" element={<PasswordResetPage />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
