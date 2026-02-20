import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateUser } from "./types/create-user.type";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findUserByEmail(email: string) {
        return await this.prismaService.users.findUnique({ where: { email } });
    }

    async findUserById(userId: string) {
        return await this.prismaService.users.findUnique({ where: { user_id: userId } });
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
}
