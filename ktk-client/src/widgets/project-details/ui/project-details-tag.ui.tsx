import React from "react";

export const ProjectDetailsTag: React.FC<{ tag: string }> = ({ tag }) => {
    return <span className="opacity-50 font-medium">#{tag.toLocaleLowerCase()}</span>;
};
