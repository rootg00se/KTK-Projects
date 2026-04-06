import { selectUserId } from "@/entities/user";
import { Home, Lightbulb, MessageCircleQuestionMark } from "lucide-react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export const SidebarNav: React.FC = () => {
    const userId = selectUserId();
    const { search } = useLocation();

    const tab = new URLSearchParams(search).get("tab");

    return (
        <div className="pb-4">
            <NavLink
                to={`/`}
                style={({ isActive }) => ({
                    color: isActive ? "#a0350c" : "#09090b",
                })}
                className="flex items-center gap-3 py-2 w-full rounded-md cursor-pointer"
            >
                <Home size={20} />
                <p className="">Главная</p>
            </NavLink>
            <NavLink
                to={`/profile/${userId}?tab=projects`}
                style={({ isActive }) => ({
                    color: isActive && (tab === "projects" || !tab) ? "#a0350c" : "#09090b",
                })}
                className="flex items-center gap-3 py-2 w-full rounded-md cursor-pointer"
            >
                <Lightbulb size={20} />
                <p className="">Мои проекты</p>
            </NavLink>
            <NavLink
                to={`/profile/${userId}?tab=questions`}
                style={({ isActive }) => ({
                    color: isActive && tab === "questions" ? "#a0350c" : "#09090b",
                })}
                className="flex items-center gap-3 py-2 w-full rounded-md cursor-pointer"
            >
                <MessageCircleQuestionMark size={20} />
                <p className="">Мои вопросы</p>
            </NavLink>
        </div>
    );
};
