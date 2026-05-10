import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { handleOAuthRedirect } from "../model/handle-oauth-redirect";

export const OAuthButtons: React.FC = () => {
    return (
        <div className="flex items-center justify-between w-full gap-3">
            <div
                onClick={() => handleOAuthRedirect("github")}
                className="cursor-pointer w-full border rounded-md p-2 flex justify-center"
            >
                <FaGithub size={22} />
            </div>
            <div
                onClick={() => handleOAuthRedirect("google")}
                className="cursor-pointer w-full border rounded-md p-2 flex justify-center"
            >
                <FaGoogle size={22} />
            </div>
        </div>
    );
};
