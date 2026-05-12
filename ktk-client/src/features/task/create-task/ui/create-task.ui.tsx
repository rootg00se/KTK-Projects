import { Button, Input } from "@/shared/components";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCreateTask } from "../model/useCreateTask";

export const CreateTask: React.FC<{ trackerId: string }> = ({ trackerId }) => {
    const [createMode, setCreateMode] = useState(false);
    const [text, setText] = useState("");

    const { createTaskFunc } = useCreateTask();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCreateTask = () => {
        createTaskFunc({
            trackerId,
            text,
        });

        inputRef.current?.focus();
        setText("");
    };

    return (
        <div>
            {createMode ? (
                <div className="">
                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus={true}
                        className="mb-3 bg-white max-sm:text-sm"
                        placeholder="Придумайте задачу"
                        onKeyDown={(e) => e.key === "Enter" && handleCreateTask()}
                    />
                    <div className="flex items-center gap-3">
                        <Button onClick={handleCreateTask} size="sm" className="text-[12px] max-h-7">
                            Создать
                        </Button>
                        <X onClick={() => setCreateMode(false)} />
                    </div>
                </div>
            ) : (
                <div className="flex gap-2 opacity-80 items-center cursor-pointer" onClick={() => setCreateMode(true)}>
                    <Plus size={16} />
                    <p>Добавить задачу</p>
                </div>
            )}
        </div>
    );
};
