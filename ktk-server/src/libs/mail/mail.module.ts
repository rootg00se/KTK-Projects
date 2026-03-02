import { mailerConfig } from "@/config/mailer.config";
import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailService } from "./mail.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: mailerConfig,
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}