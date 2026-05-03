import { isActivated, isAuthenticated } from "@/entities/user";
import { Navigate, Outlet } from "react-router-dom";

export const AuthProtectedRoutes: React.FC = () => {
    const isUserActivated = isActivated();
    const isAuth = isAuthenticated();

    if (isUserActivated.userIsPending || isAuth.userIsPending) return null;

    if (!isAuth.isUserAuthenticated) {
        return <Navigate to="/sign-up" replace />;
    }

    if (!isUserActivated.isUserActivated) {
        return <Navigate to="/verify" replace />;
    }

    return <Outlet />;
};
