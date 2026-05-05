import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateProject } from "@/features/project/create-project";
import type { IUserResponse } from "@/entities/user";

export const useCreateProjectForm = () => {
    const [markdown, setMarkdown] = useState("### Начните расписывать ваш проект");
    const [title, setTitle] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [projectTags, setProjectTags] = useState<string[]>([]);
    const [members, setMembers] = useState<IUserResponse[]>([]);

    const { createProjectFunc } = useCreateProject();

    const handleAddTag = (tagName: string) => setProjectTags((prev) => [...prev, tagName]);
    const handleRemoveTag = (tagName: string) => setProjectTags((prev) => prev.filter((t) => t !== tagName));
    
    const handleAddMember = (user: IUserResponse) => setMembers((prev) => [...prev, user]);
    const handleRemoveMember = (id: string) => setMembers((prev) => prev.filter((m) => m.user_id !== id));

    const submit = () => {
        if (!title) return toast.error("Название проекта обязательно!");
        if (!projectTags.length) return toast.error("Вам нужно выбрать хотя бы 1 тег для проекта");

        createProjectFunc({
            title,
            projectLink,
            members: members.map((m) => m.user_id),
            tags: projectTags,
            content: markdown,
        });
    };

    return {
        state: { title, projectLink, projectTags, members, markdown },
        actions: { 
            setTitle, 
            setProjectLink, 
            setMarkdown, 
            handleAddTag, 
            handleRemoveTag, 
            handleAddMember, 
            handleRemoveMember,
            submit 
        }
    };
};