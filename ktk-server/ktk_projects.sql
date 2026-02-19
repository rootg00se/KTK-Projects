CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

SET pg_trgm.similarity_threshold = 0.2;

CREATE TYPE auth_method AS ENUM ('oauth', 'credentials');
CREATE TYPE token_type AS ENUM ('reset_password', 'verify_email');
CREATE TYPE provider_type AS ENUM ('google', 'github');
CREATE TYPE project_status AS ENUM ('working', 'paused', 'completed', 'abandoned');
CREATE TYPE chat_type AS ENUM ('group', 'private');
CREATE TYPE task_status AS ENUM ('marked', 'completed', 'in_progress');

CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4(),
    email VARCHAR NOT NULL UNIQUE,
    password_hash TEXT,
    nickname VARCHAR(64) NOT NULL UNIQUE,
    display_name VARCHAR(64),
    avatar_url TEXT UNIQUE,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    method auth_method NOT NULL DEFAULT 'credentials',
    profile_data TEXT UNIQUE,
    banner_url TEXT UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_users_user_id PRIMARY KEY (user_id)
);

CREATE TABLE skills (
    skill_id UUID DEFAULT uuid_generate_v4(),
    badge_url TEXT NOT NULL UNIQUE,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_skills_skill_id PRIMARY KEY (skill_id)
);

CREATE TABLE users_skills (
    skill_id UUID NOT NULL,
    user_id UUID NOT NULL,

    CONSTRAINT fk_users_skills_skill_id FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_users_skills_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT pk_users_skills PRIMARY KEY (skill_id, user_id)
);

CREATE TABLE tokens (
    token_id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    token TEXT NOT NULL,
    type token_type NOT NULL,
    expires_in TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_tokens_users_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT pk_tokens_token_id PRIMARY KEY (token_id)
);

CREATE TABLE accounts (
    account_id UUID DEFAULT uuid_generate_v4(),
    provider provider_type NOT NULL,
    refresh_token TEXT,
    access_token TEXT NOT NULL,
    access_expires_in INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id UUID NOT NULL,
    provider_account_id VARCHAR NOT NULL,

    CONSTRAINT pk_accounts_account_id PRIMARY KEY (account_id),
    CONSTRAINT fk_accounts_users FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT unq_accounts_provider_provider_user_id UNIQUE(provider, provider_account_id)
);

CREATE TABLE chats (
    chat_id UUID DEFAULT uuid_generate_v4(),
    type chat_type NOT NULL DEFAULT 'private',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_chats_chat_id PRIMARY KEY (chat_id)
);

CREATE TABLE projects (
    project_id UUID DEFAULT uuid_generate_v4(),
    status project_status NOT NULL DEFAULT 'working',
    title VARCHAR(64) NOT NULL,
    chat_id UUID NOT NULL,
    content_url TEXT NOT NULL UNIQUE,
    project_link TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_projects_chats_chat_id FOREIGN KEY (chat_id) REFERENCES chats(chat_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT pk_projects_project_id PRIMARY KEY (project_id)
);

CREATE TABLE tags (
    tag_id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(64) NOT NULL UNIQUE,
    badge_url TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_tags_tag_id PRIMARY KEY (tag_id)
);

CREATE TABLE projects_tags (
    project_id UUID NOT NULL,
    tag_id UUID NOT NULL,

    CONSTRAINT fk_projects_tags_project_id FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_projects_tags_tag_id FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT pk_projects_tags PRIMARY KEY (project_id, tag_id) 
);

CREATE TABLE project_likes (
    project_id UUID NOT NULL,
    user_id UUID NOT NULL,

    CONSTRAINT fk_project_likes_project_id FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_likes_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT pk_project_likes PRIMARY KEY (project_id, user_id) 
);

CREATE TABLE project_members (
    project_id UUID NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_project_members_project_id FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_members_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT pk_project_members PRIMARY KEY (project_id, user_id) 
);

CREATE TABLE users_friends (
    user_id UUID NOT NULL,
    friend_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_users_friends_friend_id FOREIGN KEY (friend_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_users_friends_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT pk_users_friends PRIMARY KEY (friend_id, user_id) 
);

CREATE TABLE task_trackers (
    task_tracker_id UUID DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    name VARCHAR(64) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_task_trackers_task_tracker_id PRIMARY KEY (task_tracker_id)
);

CREATE TABLE tasks (
    task_id UUID DEFAULT uuid_generate_v4(),
    status task_status NOT NULL DEFAULT 'in_progress',
    task_tracker_id UUID NOT NULL,
    text VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_tasks_task_trackers_task_tracker_id FOREIGN KEY (task_tracker_id) REFERENCES task_trackers(task_tracker_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT pk_tasks_task_id PRIMARY KEY (task_id)  
);

CREATE TABLE questions (
    question_id UUID DEFAULT uuid_generate_v4(),
    parent_id UUID,
    user_id UUID NOT NULL,
    project_id UUID NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_questions_parent_parent_id FOREIGN KEY (parent_id) REFERENCES questions(question_id) ON DELETE SET NULL,
    CONSTRAINT fk_questions_users_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_questions_projects_project_id FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT pk_questions_question_id PRIMARY KEY (question_id)
);

CREATE TABLE messages (
    message_id UUID DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL,
    chat_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_messages_users_sender_id FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_messages_chats_chat_id FOREIGN KEY (chat_id) REFERENCES chats(chat_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT messages_message_id PRIMARY KEY (message_id)
);

CREATE TABLE chat_members (
    user_id UUID NOT NULL,
    chat_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_chat_members_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_chat_members_chat_id FOREIGN KEY (chat_id) REFERENCES chats(chat_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT pk_chat_members PRIMARY KEY (user_id, chat_id)
);

CREATE INDEX idx_project_likes_project_id ON project_likes(project_id);
CREATE INDEX idx_project_likes_user_id ON project_likes(user_id);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_project_id ON projects(project_id);
CREATE INDEX idx_users_nickname ON users USING gin (nickname gin_trgm_ops);
