import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "@/users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { SessionSerializer } from "./utils/session-serializer";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { googleRecaptchaConfig } from "@/config/recaptcha.config";
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { PasswordModule } from './password/password.module';
import { GithubStrategy } from "./strategies/github.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";

@Module({
    imports: [
        GoogleRecaptchaModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: googleRecaptchaConfig,
            inject: [ConfigService],
        }),
        PassportModule.register({ session: true }),
        UsersModule,
        EmailConfirmationModule,
        PasswordModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, GithubStrategy, GoogleStrategy, SessionSerializer],
})
export class AuthModule {}
