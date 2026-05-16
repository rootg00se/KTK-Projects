import React from "react";
import logo from "/ktk-logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import { Link } from "react-router-dom";
import { SearchProjectsInput } from "@/features/project/search-projects";
import { isActivated, useUser } from "@/entities/user";
import { Menu, MessageSquareText } from "lucide-react";
import { useUiStore } from "@/shared/model/ui-store";

export const Header: React.FC<{ searchInput?: React.ReactNode }> = ({ searchInput }) => {
    const toggleSidebar = useUiStore((store) => store.toggleSidebar);
    const isUserActivated = isActivated();
    const { userData } = useUser();

    return (
        <header className="py-3 bg-white sticky top-0 z-100 border-b">
            <div className="_container flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="lg:hidden p-1 hover:bg-gray-100 rounded-md">
                        <Menu size={24} />
                    </button>
                    <Link to={"/"} className="w-35 max-xs:hidden">
                        <img src={logo} className="w-full" alt="" />
                    </Link>
                </div>
                <div className="max-md:hidden w-full flex justify-center">{searchInput || <SearchProjectsInput />}</div>
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
            <div className="md:hidden flex justify-center w-full mt-5">{searchInput || <SearchProjectsInput />}</div>
        </header>
    );
};
