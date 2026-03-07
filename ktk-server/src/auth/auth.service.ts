import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "@/users/users.service";
import { hash, verify } from "argon2";
import { RegisterDto } from "./dto/register.dto";
import { EmailConfirmationService } from "./email-confirmation/email-confirmation.service";
import { OAuthUserDetails } from "./types/oauth-user-details.type";
import { ValidateOAuthUserType } from "./types/validate-oauth-user.type";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly emailConfirmationService: EmailConfirmationService,
        private readonly prismaService: PrismaService
    ) {}

    async register(registerDto: RegisterDto) {
        const user = await this.usersService.findUserByEmail(registerDto.email);
        if (user) throw new BadRequestException("User with that email already exists");

        const hashedPasswod = await hash(registerDto.password)

        const createdUser = await this.usersService.createUserWithCredentials({
            email: registerDto.email,
            nickname: registerDto.nickname,
            password: hashedPasswod
        });

        await this.emailConfirmationService.sendConfirmationToken(createdUser);

        return createdUser;
    }

    async validateUser(loginDto: LoginDto) {
        const user = await this.usersService.findUserByEmail(loginDto.email);
        if (!user) return null;

        if (user.accounts.length > 0 && !user.password_hash) {
            throw new BadRequestException(
                "This email is already being used for authorization with oauth2 providers",
            );
        }

        const isPasswordsMatching = await verify(user.password_hash!, loginDto.password);
        if (!isPasswordsMatching) return null;

        const { password_hash, ...result } = user;

        return result;
    }

    private async findOrCreateOAuthUserByEmail(userDetails: OAuthUserDetails) {
        const user = await this.usersService.findUserByEmail(userDetails.email);
        if (user) return user;

        const createdUser = await this.usersService.createOAuthUser({
            email: userDetails.email,
            nickname: userDetails.nickname,
            displayName: userDetails.displayName,
            avatarUrl: userDetails.avatarUrl
        });

        return createdUser;
    }

    async validateOAuthUser(validateOAuthUserType: ValidateOAuthUserType) {
        const user = await this.findOrCreateOAuthUserByEmail({
            email: validateOAuthUserType.email, 
            displayName: validateOAuthUserType.displayName,
            avatarUrl: validateOAuthUserType.avatarUrl,
            nickname: validateOAuthUserType.nickname
        });

        await this.usersService.createUserAccount({
            userId: user.user_id,
            provider: validateOAuthUserType.providerType,
            providerAccountId: validateOAuthUserType.profileId,
            accessToken: validateOAuthUserType.accessToken,
            refreshToken: validateOAuthUserType.refreshToken,
        });

        if (!user.is_verified) {
            await this.prismaService.users.update({
                where: { user_id: user.user_id },
                data: { is_verified: true },
            });
        }

        return user;
    }
}
