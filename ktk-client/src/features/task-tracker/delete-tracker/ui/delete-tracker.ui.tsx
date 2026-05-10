import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/components";
import { Trash } from "lucide-react";
import React from "react";
import { useDeleteTracker } from "../model/useDeleteTracker";

export const DeleteTracker: React.FC<{ projectId: string; trackerId: string }> = ({ projectId, trackerId }) => {
    const { deleteFunc } = useDeleteTracker(projectId);

    const handleDeleteTracker = () => {
        deleteFunc({ trackerId });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className="cursor-pointer">
                <Trash size={20} className="text-primary" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы точно уверены, что хотите удалить трекер?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие не может быть отменена. Нажав кнопку "Удалить" вы безвозвратно удалить этот трекер
                        и все связанные с ним данные.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteTracker}>Удалить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
