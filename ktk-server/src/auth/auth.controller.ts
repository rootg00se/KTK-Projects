import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { type Response, type Request } from "express";
import { UsersService } from "@/users/users.service";
import { AuthenticatedGuard } from "./guards/authenticated.guard";
import { Authorized } from "./decorators/authorized.decorator";
import { ValidateLoginGuard } from "./guards/validate-login.guard";
import { LocalGuard } from "./guards/local.guard";
import { type User } from "@/shared/types/user.type";
import { ConfigService } from "@nestjs/config";
import { Recaptcha } from "@nestlab/google-recaptcha";
import { OAuth2Guard } from "./guards/oauth2.guard";
import { provider_type } from "@prisma/generated/enums";

@Controller("auth")
export class AuthController {
    private readonly CLIENT_URL: string;

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) {
        this.CLIENT_URL = configService.getOrThrow<string>("CLIENT_ORIGIN");
    }

    @Post("register")
    @Recaptcha()
    async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
        const user = await this.authService.register(registerDto);

        return user;
    }

    @Post("login")
    @Recaptcha()
    @UseGuards(ValidateLoginGuard, LocalGuard)
    async login(@Authorized() user: User, @Req() req: Request) {
        await new Promise<void>((resolve, reject) => {
            req.logIn(user, err => {
                if (err) reject(err);
                resolve();
            });
        });

        return user;
    }

    @Post("logout")
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        await new Promise<void>((resolve, reject) => {
            req.logOut(err => {
                if (err) return reject(new InternalServerErrorException("Couldn't logout"));

                req.session.destroy(destroyErr => {
                    if (destroyErr) {
                        return reject(new InternalServerErrorException("Couldn't destroy session"));
                    }

                    res.clearCookie(this.configService.getOrThrow<string>("SESSION_NAME"));

                    resolve();
                });
            });
        });
    }

    @Get("oauth2/google")
    @UseGuards(OAuth2Guard(provider_type.google))
    googleOAuth() {}

    @Get("oauth2/google/redirect")
    @UseGuards(OAuth2Guard(provider_type.google))
    googleOAuthRedirect(@Res() res: Response) {
        res.status(302).redirect(this.CLIENT_URL);
    }

    @Get("oauth2/github")
    @UseGuards(OAuth2Guard(provider_type.github))
    githubOAuth() {}

    @Get("oauth2/github/redirect")
    @UseGuards(OAuth2Guard(provider_type.github))
    githubOAuthRedirect(@Res() res: Response) {
        res.status(302).redirect(this.CLIENT_URL);
    }
}
