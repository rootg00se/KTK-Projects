import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUser } from "./types/create-user.type";
import { OAuthUserDetails } from "./types/oauth-user-details.type";
import { auth_method } from "@prisma/generated/enums";
import { CreateAccount } from "./types/create-account";
import { userMapper } from "@/mappers/user.mapper";
import { UsersPaginationDto } from "./dto/users-pagination.dto";
import { QueryMode } from "@prisma/generated/internal/prismaNamespace";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

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
                hasNextPage: page < totalPages
            }
        }
    }

    async findUserByEmail(email: string) {
        const user = await this.prismaService.users.findUnique({
            where: { email },
            include: {
                users_skills: { select: { skills: true } },
                accounts: { omit: { access_token: true, refresh_token: true } },
            },
        });

        return userMapper(user);
    }

    async findUserById(userId: string) {
        const user = await this.prismaService.users.findUnique({
            where: { user_id: userId },
            include: {
                users_skills: { select: { skills: true } },
                accounts: { omit: { access_token: true, refresh_token: true } },
            },
        });

        return userMapper(user);
    }

    async addFriendToUser(friendId: string, userId: string) {
        await this.checkIfUserExists(friendId);

        const updatedUser = await this.prismaService.users.update({
            where: { user_id: userId },
            data: {
                users_friends_users_friends_user_idTousers: {
                    create: { friend_id: friendId }
                }
            }
        });

        return updatedUser;
    }

    async findUserFriends(userId: string) {
        const firends = await this.prismaService.users.findMany({
            where: {
                users_friends_users_friends_friend_idTousers: {
                    some: {
                        user_id: userId
                    }
                }
            },
            omit: { password_hash: true }
        });

        return firends;
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

    private async checkIfUserExists(userId: string) {
        const user = await this.prismaService.users.findUnique({ where: { user_id: userId } });
        if (!user) throw new NotFoundException("User was not found");

        return user;
    }
}
