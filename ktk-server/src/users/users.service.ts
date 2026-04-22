import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUser } from "./types/create-user.type";
import { OAuthUserDetails } from "./types/oauth-user-details.type";
import { auth_method } from "@prisma/generated/enums";
import { CreateAccount } from "./types/create-account";
import { userMapper } from "@/mappers/user.mapper";
import { UsersPaginationDto } from "./dto/users-pagination.dto";
import { QueryMode } from "@prisma/generated/internal/prismaNamespace";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserSkillsDto } from "./dto/update-user-skills.dto";
import { S3StorageService } from "@/libs/s3-storage/s3-storage.service";
import { USER_INCLUDE } from "./utils/user.constants";

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly s3StorageService: S3StorageService,
    ) {}

    async getAllUsers(paginationDto: UsersPaginationDto) {
        const page = paginationDto.page || 1;
        const limit = paginationDto.limit || 10;
        const search = paginationDto.nickname?.trim() || "";

        const where = search
            ? { nickname: { contains: search, mode: QueryMode.insensitive } }
            : undefined;

        const [users, total] = await Promise.all([
            this.prismaService.users.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prismaService.users.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
            },
        };
    }

    async findUserByEmail(email: string) {
        const user = await this.prismaService.users.findUnique({
            where: { email },
            include: { ...USER_INCLUDE },
        });

        return userMapper(user);
    }

    async findUserById(userId: string) {
        const user = await this.prismaService.users.findUnique({
            where: { user_id: userId },
            include: { ...USER_INCLUDE },
        });

        return userMapper(user);
    }

    async getUserProfile(userId: string) {
        const user = await this.prismaService.users.findUnique({
            where: { user_id: userId },
            include: {  ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        if (!user) throw new NotFoundException("User was not found");

        return userMapper(user);
    }

    async addFriendToUser(friendId: string, userId: string) {
        await this.checkIfUserExists(friendId);

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: {
                users_friends_users_friends_user_idTousers: {
                    create: { friend_id: friendId },
                },
            },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(updatedUser);
    }

    async removeUserFriend(friendId: string, userId: string) {
        await this.checkIfUserExists(friendId);

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: {
                users_friends_users_friends_user_idTousers: {
                    deleteMany: {
                        friend_id: friendId,
                    },
                },
            },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(updatedUser);
    }

    async findUserFriends(userId: string) {
        const firends = await this.prismaService.users.findMany({
            where: {
                users_friends_users_friends_friend_idTousers: {
                    some: {
                        user_id: userId,
                    },
                },
            },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return firends.map(friend => userMapper(friend));
    }

    async createUserWithCredentials(userData: CreateUser) {
        const createdUser = await this.prismaService.users.create({
            data: {
                email: userData.email,
                nickname: userData.nickname,
                password_hash: userData.password,
            },
            omit: { password_hash: true },
        });

        return createdUser;
    }

    async createOAuthUser(oauthUserDetails: OAuthUserDetails) {
        const user = await this.prismaService.users.create({
            data: {
                email: oauthUserDetails.email,
                nickname: oauthUserDetails.nickname,
                display_name: oauthUserDetails.displayName,
                method: auth_method.oauth,
                avatar_url: oauthUserDetails.avatarUrl,
                is_verified: true,
            },
            omit: { password_hash: true },
        });

        return user;
    }

    async createUserAccount(accountData: CreateAccount) {
        const account = await this.prismaService.accounts.findFirst({
            where: {
                provider: accountData.provider,
                provider_account_id: accountData.providerAccountId,
            },
        });

        if (!account) {
            await this.prismaService.accounts.create({
                data: {
                    provider: accountData.provider,
                    access_token: accountData.accessToken,
                    user_id: accountData.userId,
                    provider_account_id: accountData.providerAccountId,
                    refresh_token: accountData.refreshToken || null,
                },
            });
        }
    }

    async updateUser(updateUserDto: UpdateUserDto, userId: string) {
        const user = await this.checkIfUserExists(userId);

        const existingUser = await this.prismaService.users.findUnique({
            where: { nickname: updateUserDto.nickname },
        });

        if (existingUser && existingUser.nickname !== user.nickname)
            throw new BadRequestException("User with that nickname already exists");

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: {
                nickname: updateUserDto.nickname,
                display_name: updateUserDto.displayName,
            },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(updatedUser);
    }

    async updateUserSkills(userId: string, updateUserSkillsDto: UpdateUserSkillsDto) {
        await this.checkIfUserExists(userId);

        await this.prismaService.$transaction([
            this.prismaService.users_skills.deleteMany({
                where: {
                    user_id: userId,
                    skill_id: { in: updateUserSkillsDto.skillsToRemoveIds },
                },
            }),
            this.prismaService.users_skills.createMany({
                data: updateUserSkillsDto.skillsToAddIds.map(skillId => ({
                    user_id: userId,
                    skill_id: skillId,
                })),
                skipDuplicates: true,
            }),
        ]);

        const user = await this.prismaService.users.findUnique({
            where: { user_id: userId },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(user);
    }

    async updateUserProfile(userId: string, content: string) {
        const user = await this.checkIfUserExists(userId);
        const folder = "profiles";

        const file: Express.Multer.File = {
            fieldname: "file",
            originalname: `${userId}.md`,
            encoding: "7bit",
            mimetype: "text/markdown",
            size: Buffer.byteLength(content),
            buffer: Buffer.from(content, "utf-8"),
            stream: null as any,
            destination: "",
            filename: "",
            path: "",
        };

        const fileData = await this.s3StorageService.uploadFile(
            file,
            folder,
            user.profile_data_key,
        );

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: {
                profile_data: fileData.fileUrl,
                profile_data_key: fileData.fileKey,
            },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(updatedUser);
    }

    async updateUserAvatar(userId: string, file: Express.Multer.File) {
        const existingUser = await this.checkIfUserExists(userId);
        const avatarFolder = "avatars";

        const fileData = await this.s3StorageService.uploadFile(
            file,
            avatarFolder,
            existingUser.avatar_key,
        );

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: { avatar_url: fileData.fileUrl, avatar_key: fileData.fileKey },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(updatedUser);
    }

    async removeUserAvatar(userId: string) {
        const existingUser = await this.checkIfUserExists(userId);
        if (!existingUser.avatar_key) return existingUser;

        await this.s3StorageService.deleteFile(existingUser.avatar_key);

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: {
                avatar_url: null,
                avatar_key: null,
            },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(updatedUser);
    }

    async updateUserBanner(userId: string, file: Express.Multer.File) {
        const existingUser = await this.checkIfUserExists(userId);
        const bannerFolder = "banners";

        const fileData = await this.s3StorageService.uploadFile(
            file,
            bannerFolder,
            existingUser.banner_key,
        );

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: {
                banner_url: fileData.fileUrl,
                banner_key: fileData.fileKey,
            },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(updatedUser);
    }

    async removeUserBanner(userId: string) {
        const existingUser = await this.checkIfUserExists(userId);
        if (!existingUser.banner_key) return existingUser;

        await this.s3StorageService.deleteFile(existingUser.banner_key);

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: {
                banner_url: null,
                banner_key: null,
            },
            include: { ...USER_INCLUDE },
            omit: { password_hash: true },
        });

        return userMapper(updatedUser);
    }

    private async checkIfUserExists(userId: string) {
        const user = await this.prismaService.users.findUnique({ where: { user_id: userId } });
        if (!user) throw new NotFoundException("User was not found");

        return user;
    }
}
