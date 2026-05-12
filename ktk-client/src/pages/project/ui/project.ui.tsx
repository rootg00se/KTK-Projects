import { SendQuestion } from "@/features/question/send-question";
import { ProjectDetails } from "@/widgets/project-details";
import { ProjectQuestionsList } from "@/widgets/project-questions-list";
import React from "react";

export const ProjectPage: React.FC = () => {
    return (
        <section className="w-full max-lg:flex justify-center">
            <div className="max-w-180 w-full">
                <div className="bg-white rounded-md p-5 max-sm:p-3">
                    <ProjectDetails />
                    <SendQuestion />
                    <div className="mt-10 max-sm:mt-5">
                        <ProjectQuestionsList />
                    </div>
                </div>
            </div>
        </section>
    );
};
