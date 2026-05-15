import React from "react";
import { FaGithub, FaNewspaper, FaTelegram } from "react-icons/fa";

export const SidebarFooter: React.FC = () => {
    return (
        <div>
            <div className="flex items-center gap-4 mt-4 mb-2 justify-between">
                <p className="opacity-70 text-sm">Котакты разраба: </p>
                <div className="flex items-center gap-3">
                    <a href="https://github.com/rootg00se">
                        <FaGithub size={20} className="opacity-80" />
                    </a>
                    <a href="https://t.me/deg00se">
                        <FaTelegram size={20} className="opacity-80" />
                    </a>
                </div>
            </div>
            <div className="flex items-center gap-4 justify-between">
                <p className="opacity-70 text-sm">Следите за новостями: </p>
                <div className="flex items-center gap-3">
                    <a href="https://t.me/ktk_projects">
                        <FaNewspaper size={20} className="opacity-80" />
                    </a>
                </div>
            </div>
        </div>
    );
};
