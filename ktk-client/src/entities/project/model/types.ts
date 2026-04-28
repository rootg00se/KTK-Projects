export type TagData = {
    tag_id: string;
    name: string;
    badge_url: string;
    created_at: Date;
};

export type Member = {
    user_id: string;
    email: string;
    nickname: string;
    display_name: string | null;
    avatar_url: string | null;
    is_verified: boolean;
    method: string;
    profile_data: string | null;
    banner_url: string | null;
    created_at: Date;
    updated_at: Date;
    avatar_key: string | null;
    banner_key: string | null;
    profile_data_key: string | null;
};

export type ProjectStatus = "working" | "completed" | "paused" | "abandoned";

export interface IProjectResponse {
    project_id: string;
    status: ProjectStatus;
    title: string;
    chat_id: string;
    content_url: string | null;
    project_link: string | null;
    created_at: Date;
    updated_at: Date;
    content_key: string;
    creator_id: string;
    project_members: Member[];
    creator: Member;
    likes: number;
    is_liked: boolean;
    tags: TagData[];
}

export interface IPaginationProjectResponse {
    data: IProjectResponse[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
    };
}

export type ProjectsFilterDto = {
    page: number;
    query: string;
    tags: string;
};

export type UpdateProjectDto = {
    title: string;
    projectId: string;
    projectLink: string;
};

export type CreateProjectDto = {
    title: string;
    tags: string[];
    content: string;
    members: string[];
    projectLink?: string;
};
