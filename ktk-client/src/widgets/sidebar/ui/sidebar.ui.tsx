import React from "react";
import { SidebarNav } from "./sidebar-nav.ui";
import { SidebarTags } from "./sidebar-tags.ui";
import { SidebarFooter } from "./sidebar-footer.ui";
import { cn } from "@/shared/lib/utils";
import { useUiStore } from "@/shared/model/ui-store";
import { X } from "lucide-react";

export const Sidebar: React.FC = () => {
    const isOpen = useUiStore((store) => store.isSidebarOpen);
    const closeSidebar = useUiStore((store) => store.closeSidebar);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-110 lg:hidden" onClick={closeSidebar} />}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-120 w-64 p-4 transition-transform duration-300 transform border-r overflow-y-auto",
                    "lg:translate-x-0 max-lg:bg-white lg:z-0 lg:w-full lg:max-w-60 lg:h-full lg:sticky lg:top-22 lg:self-start lg:border-none lg:p-0",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                )}
            >
                <div className="flex justify-end lg:hidden mb-4">
                    <button onClick={closeSidebar}>
                        <X size={24} />
                    </button>
                </div>
                <SidebarNav />
                <div className="w-full h-px bg-[#c0c0c0]"></div>
                <SidebarTags />
                <div className="w-full h-px bg-[#c0c0c0]"></div>
                <SidebarFooter />
            </aside>
        </>
    );
};
