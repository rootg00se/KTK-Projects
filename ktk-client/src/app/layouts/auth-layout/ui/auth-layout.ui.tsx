import React from "react";
import authBackground from "/auth-background.jpg";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
            <div className="w-[50vw] bg-black max-md:hidden">
                <img className="w-full h-full" src={authBackground} alt="" />
            </div>
            <div className="w-[50vw] max-md:w-full max-md:px-3 flex items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
};
