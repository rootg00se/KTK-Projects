import { cn } from "@/shared/lib/utils";
import { Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useCreateTracker } from "../model/useCreateTracker";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input } from "@/shared/components";

export const CreateTaskTracker: React.FC = () => {
    const { id: projectId } = useParams();

    const [createMode, setCreateMode] = useState(false);
    const [name, setName] = useState("");

    const { createTrackerFunc } = useCreateTracker();

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToMe = () => {
        setTimeout(() => {
            containerRef.current?.scrollIntoView({
                behavior: "smooth",
                inline: "end",
                block: "nearest",
            });
        }, 50);
    };

    const handleCreateTracker = () => {
        if (!projectId) return toast.error("Что-то пошло не так");

        createTrackerFunc({
            projectId,
            name,
        });

        inputRef.current?.focus();

        setName("");
        scrollToMe();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleCreateTracker();
        if (e.key === "Escape") setCreateMode(false);
    }

    useEffect(() => {
        if (createMode) {
            scrollToMe();
        }
    }, [createMode]);

    return (
        <div ref={containerRef}>
            {createMode ? (
                <div className="min-w-85 border-dashed border-2 rounded-lg p-3.5 max-w-95">
                    <Input
                        ref={inputRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus={true}
                        className="mb-3 max-sm:text-sm"
                        placeholder="Введите имя трекера"
                        onKeyDown={handleKeyDown}
                    />
                    <div className="flex items-center gap-3">
                        <Button onClick={handleCreateTracker}>Создать</Button>
                        <X onClick={() => setCreateMode(false)} />
                    </div>
                </div>
            ) : (
                <div
                    className={cn(
                        "flex items-center justify-center shrink-0 border-2 border-dashed rounded-md",
                        "min-h-37.5 hover:border-primary transition-all hover:text-primary text-[#0000007e]",
                        "gap-2 font-medium shadow-sm min-w-85",
                    )}
                    onClick={() => setCreateMode(true)}
                >
                    <Plus size={20} />
                    <span>Новая колонка</span>
                </div>
            )}
        </div>
    );
};
