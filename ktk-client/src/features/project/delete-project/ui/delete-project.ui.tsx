import React from "react";
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
    Button,
} from "@/shared/components";
import { Trash } from "lucide-react";
import { useDeleteProject } from "../model/useDeleteProject";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const DeleteProject: React.FC = () => {
    const { id: projectId } = useParams();
    const { deleteProjectFunc } = useDeleteProject();

    const navigate = useNavigate();

    const handleDeleteProject = () => {
        if (!projectId) return toast.error("Что-то пошло не так");

        deleteProjectFunc({
            projectId,
        });

        navigate("/");
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-primary">
                    <Trash className="text-primary" />
                    <p className="text-primary font-heading">Удалить проект</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы точно уверены, что хотите удалить проект?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие не может быть отменена. Нажав кнопку "Удалить" вы безвозвратно удалить этот проект
                        и все связанные с ним данные.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProject}>Удалить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
