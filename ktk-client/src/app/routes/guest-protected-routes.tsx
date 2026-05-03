import { isAuthenticated } from "@/entities/user";
import { Navigate, Outlet } from "react-router-dom";

export const GuestProtectedRoutes: React.FC = () => {
    const isAuth = isAuthenticated();

    if (isAuth.userIsPending) return null;

    if (isAuth.isUserAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};