import { ProjectsList } from "@/widgets/projects-list";
import React from "react";

export const HomePage: React.FC = () => {
    return (
        <section className="w-full max-w-190">
            <ProjectsList />
        </section>
    );
};
