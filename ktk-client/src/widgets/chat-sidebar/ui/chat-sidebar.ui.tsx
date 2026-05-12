import React from "react";
import { SidebarNav } from "@/widgets/sidebar/ui/sidebar-nav.ui";
import { Link } from "react-router-dom";
import { LogoutButton } from "@/features/auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components";
import { useUser } from "@/entities/user";
import { SidebarFooter } from "@/widgets/sidebar/ui/sidebar-footer.ui";

export const ChatSidebar: React.FC = () => {
    const { userData } = useUser();

    if (!userData) return null;

    return (
        <div className="flex h-full min-h-0 w-full max-w-100 flex-col bg-background">
            <div className="flex items-center gap-7 min-h-18.5 border-b justify-between w-full px-5">
                <Link to={`/profile/${userData.user_id}`} className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={userData.avatar_url || ""} />
                        <AvatarFallback className="text-sm bg-[#dadada]">
                            {userData.nickname.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-[16px]">{userData.display_name || userData.nickname}</div>
                </Link>
                <Link to={`/chats`}>
                    <LogoutButton />
                </Link>
            </div>
            <div className="p-5 flex-1 pb-0 w-full border-b">
                <SidebarNav />
            </div>
            <div className="px-5 pb-4 w-full">
                <SidebarFooter />
            </div>
        </div>
    );
};
