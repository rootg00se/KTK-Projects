import { useLogout } from "../model/useLogout";
import { LogOut } from "lucide-react";
import React from "react";

export const LogoutButton: React.FC = () => {
    const { logoutFunc } = useLogout();

    return <LogOut size={22} onClick={() => logoutFunc()} className=" cursor-pointer text-primary float-right" />;
};
