import { ProjectMapper } from "./types/project-mapper.type";

export const projectMapper = (project: ProjectMapper) => {
    const { _count, project_likes, projects_tags, ...postData } = project;

    return {
        ...postData,
        likes: _count.project_likes,
        ...(project_likes && {
            is_liked: Boolean(project_likes.length),
        }),
        tags: projects_tags.map(pt => pt.tags),
    };
};
