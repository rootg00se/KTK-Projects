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

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) {}

    @Post("register")
    async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
        const user = await this.authService.register(registerDto);

        await new Promise<void>((resolve, reject) => {
            req.logIn(user, err => {
                if (err) reject(err);
                resolve();
            });
        });

        return user;
    }

    @Post("login")
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

    @Get("check")
    @UseGuards(AuthenticatedGuard)
    async checkUser(@Authorized() user: User) {
        return user;
    }
}
