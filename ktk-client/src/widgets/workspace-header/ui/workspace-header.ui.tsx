import React from "react";
import { Link } from "react-router-dom";
import logo from "/ktk-logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import { isActivated, useUser } from "@/entities/user";
import { ChangeWorkspace } from "@/features/project/change-workspace";
import { MessageSquareText } from "lucide-react";

export const WorkspaceHeader: React.FC = () => {
    const { userData } = useUser();
    const isUserActivated = isActivated();

    return (
        <header className="py-3 bg-white sticky top-0 z-100 border-b">
            <div className="_container flex items-center justify-between max-sm:flex-col max-sm:gap-3">
                <div className="flex items-center gap-10 max-sm:gap-4">
                    <Link className="max-w-35" to={"/"}>
                        <img src={logo} className="w-full" alt="" />
                    </Link>
                    <ChangeWorkspace />
                </div>
                {isUserActivated && userData ? (
                    <div className="flex items-center gap-7">
                        <Link to={`/profile/${userData.user_id}`} className="flex items-center gap-4">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={userData.avatar_url || ""} />
                                <AvatarFallback className="text-sm bg-[#dadada]">
                                    {userData.nickname.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-[16px] truncate max-w-50 max-md:max-w-45 max-sm:max-w-30">{userData.display_name || userData.nickname}</div>
                        </Link>
                        <Link to={`/chats`}>
                            <MessageSquareText size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to={"/sign-in"} className="underline">
                            Логин
                        </Link>
                        <div className="h-6 bg-accent-foreground w-[0.2px] block"></div>
                        <Link className="cursor-pointer bg-primary text-white rounded-md py-2 px-4" to={"/sign-up"}>
                            Регистрация
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};
