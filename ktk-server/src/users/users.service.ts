import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateUser } from "./types/create-user.type";
import { IUserData } from "./types/user-data.type";
import { OAuthUserDetails } from "./types/oauth-user-details.type";
import { auth_method } from "@prisma/generated/enums";
import { CreateAccount } from "./types/create-account";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findUserByEmail(email: string) {
        const user = await this.prismaService.users.findUnique({ 
            where: { email },
            include: {
                users_skills: { select: { skills: true } },
                accounts: { omit: { access_token: true, refresh_token: true } },
            } 
        });

        return this.mapUserData(user);
    }

    async findUserById(userId: string) {
        const user = await this.prismaService.users.findUnique({ 
            where: { user_id: userId },
            include: {
                users_skills: { select: { skills: true } },
                accounts: { omit: { access_token: true, refresh_token: true } },
            } 
        });

        return this.mapUserData(user!);
    }

    async createUserWithCredentials(userData: CreateUser) {
        const createdUser = await this.prismaService.users.create({
            data: {
                email: userData.email,
                nickname: userData.nickname,
                password_hash: userData.password
            },
            omit: { password_hash: true }
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

    private mapUserData(user: IUserData | null) {
        if (!user) return null;

        const { users_skills, ...userData } = user;

        return {
            ...userData,
            skills: users_skills.map(el => el.skills)
        }
    }
}
