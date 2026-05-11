import { ProjectsList } from "@/widgets/projects-list";
import React from "react";

export const HomePage: React.FC = () => {
    return (
        <section className="w-full max-lg:flex justify-center">
            <div className="w-full max-w-190">
                <ProjectsList />
            </div>
        </section>
    );
};
