CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateEnum
CREATE TYPE "auth_method" AS ENUM ('oauth', 'credentials');

-- CreateEnum
CREATE TYPE "chat_type" AS ENUM ('group', 'private');

-- CreateEnum
CREATE TYPE "project_status" AS ENUM ('working', 'paused', 'completed', 'abandoned');

-- CreateEnum
CREATE TYPE "provider_type" AS ENUM ('google', 'github');

-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('postponed', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "token_type" AS ENUM ('reset_password', 'verify_email');

-- CreateTable
CREATE TABLE "accounts" (
    "account_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "provider" "provider_type" NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "provider_account_id" VARCHAR NOT NULL,

    CONSTRAINT "pk_accounts_account_id" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "chat_members" (
    "user_id" UUID NOT NULL,
    "chat_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_chat_members" PRIMARY KEY ("user_id","chat_id")
);

-- CreateTable
CREATE TABLE "chats" (
    "chat_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" "chat_type" NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_chats_chat_id" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "message_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "sender_id" UUID NOT NULL,
    "chat_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "messages_message_id" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "project_likes" (
    "project_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "pk_project_likes" PRIMARY KEY ("project_id","user_id")
);

-- CreateTable
CREATE TABLE "project_members" (
    "project_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_project_members" PRIMARY KEY ("project_id","user_id")
);

-- CreateTable
CREATE TABLE "projects" (
    "project_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "status" "project_status" NOT NULL DEFAULT 'working',
    "title" VARCHAR(64) NOT NULL,
    "chat_id" UUID NOT NULL,
    "content_url" TEXT NOT NULL,
    "project_link" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_key" TEXT NOT NULL,
    "creator_id" UUID NOT NULL,

    CONSTRAINT "pk_projects_project_id" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "projects_tags" (
    "project_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "pk_projects_tags" PRIMARY KEY ("project_id","tag_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "parent_id" UUID,
    "user_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "pk_questions_question_id" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "skills" (
    "skill_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "badge_url" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_skills_skill_id" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(64) NOT NULL,
    "badge_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_tags_tag_id" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "task_trackers" (
    "task_tracker_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "project_id" UUID NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_task_trackers_task_tracker_id" PRIMARY KEY ("task_tracker_id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "status" "task_status" NOT NULL DEFAULT 'in_progress',
    "task_tracker_id" UUID NOT NULL,
    "text" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_tasks_task_id" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "token_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "type" "token_type" NOT NULL,
    "expires_in" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_tokens_token_id" PRIMARY KEY ("token_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR NOT NULL,
    "password_hash" TEXT,
    "nickname" VARCHAR(64) NOT NULL,
    "display_name" VARCHAR(64),
    "avatar_url" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "method" "auth_method" NOT NULL DEFAULT 'credentials',
    "profile_data" TEXT,
    "banner_url" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar_key" TEXT,
    "banner_key" TEXT,
    "profile_data_key" TEXT,

    CONSTRAINT "pk_users_user_id" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users_friends" (
    "user_id" UUID NOT NULL,
    "friend_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_users_friends" PRIMARY KEY ("friend_id","user_id")
);

-- CreateTable
CREATE TABLE "users_skills" (
    "skill_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "pk_users_skills" PRIMARY KEY ("skill_id","user_id")
);

-- CreateIndex
CREATE INDEX "idx_accounts_user_id" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "unq_accounts_provider_provider_user_id" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE INDEX "idx_project_likes_project_id" ON "project_likes"("project_id");

-- CreateIndex
CREATE INDEX "idx_project_likes_user_id" ON "project_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "projects_content_url_key" ON "projects"("content_url");

-- CreateIndex
CREATE INDEX "idx_projects_project_id" ON "projects"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_badge_url_key" ON "skills"("badge_url");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_badge_url_key" ON "tags"("badge_url");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "users_avatar_url_key" ON "users"("avatar_url");

-- CreateIndex
CREATE UNIQUE INDEX "users_profile_data_key" ON "users"("profile_data");

-- CreateIndex
CREATE UNIQUE INDEX "users_banner_url_key" ON "users"("banner_url");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_nickname" ON "users" USING GIN ("nickname" gin_trgm_ops);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "fk_accounts_users" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_members" ADD CONSTRAINT "fk_chat_members_chat_id" FOREIGN KEY ("chat_id") REFERENCES "chats"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_members" ADD CONSTRAINT "fk_chat_members_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "fk_messages_chats_chat_id" FOREIGN KEY ("chat_id") REFERENCES "chats"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "fk_messages_users_sender_id" FOREIGN KEY ("sender_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_likes" ADD CONSTRAINT "fk_project_likes_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_likes" ADD CONSTRAINT "fk_project_likes_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "fk_project_members_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "fk_project_members_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "fk_projects_chats_chat_id" FOREIGN KEY ("chat_id") REFERENCES "chats"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "fk_projects_users_user_id" FOREIGN KEY ("creator_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_tags" ADD CONSTRAINT "fk_projects_tags_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_tags" ADD CONSTRAINT "fk_projects_tags_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "fk_questions_parent_parent_id" FOREIGN KEY ("parent_id") REFERENCES "questions"("question_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "fk_questions_projects_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "fk_questions_users_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "fk_tasks_task_trackers_task_tracker_id" FOREIGN KEY ("task_tracker_id") REFERENCES "task_trackers"("task_tracker_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "fk_tokens_users_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_friends" ADD CONSTRAINT "fk_users_friends_friend_id" FOREIGN KEY ("friend_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_friends" ADD CONSTRAINT "fk_users_friends_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_skills" ADD CONSTRAINT "fk_users_skills_skill_id" FOREIGN KEY ("skill_id") REFERENCES "skills"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_skills" ADD CONSTRAINT "fk_users_skills_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
