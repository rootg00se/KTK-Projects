import { useChatStore } from "@/entities/chat";
import { ContextMenuContent, ContextMenuItem } from "@/shared/components";
import { Edit, Trash } from "lucide-react";
import React from "react";

export const MessageActions: React.FC<{ messageId: string; onEdit: () => void }> = ({
    messageId,
    onEdit,
}) => {
    const deleteMessage = useChatStore((store) => store.deleteMessage);

    return (
        <ContextMenuContent
            className="bg-white"
            onCloseAutoFocus={(e) => e.preventDefault()}
        >
            <ContextMenuItem onClick={onEdit}>
                <Edit />
                <span>Редактировать</span>
            </ContextMenuItem>
            <ContextMenuItem className="text-primary" onClick={() => deleteMessage(messageId)}>
                <Trash />
                <span>Удалить</span>
            </ContextMenuItem>
        </ContextMenuContent>
    );
};
