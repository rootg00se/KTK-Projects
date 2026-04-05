import { ProjectMapper } from "./types/project-mapper.type";

export const projectMapper = (project: ProjectMapper) => {
    const { _count, project_likes, users, project_members, projects_tags, ...postData } = project;

    return {
        ...postData,
        likes: _count.project_likes,
        ...(project_likes && {
            is_liked: Boolean(project_likes.length),
        }),
        project_members: project_members.map(member => member.users),
        tags: projects_tags.map(pt => pt.tags),
        creator: { ...users }
    };
};
