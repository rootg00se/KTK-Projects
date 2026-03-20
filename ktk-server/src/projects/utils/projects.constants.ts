export const PROJECTS_INCLIDE = {
    projects_tags: { select: { tags: true } },
    project_members: { select: { users: { omit: { password_hash: true } } } },
    _count: { select: { project_likes: true } },
};
