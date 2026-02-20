import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { IS_DEV } from "./libs/common/utils/is-dev.util";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from "./prisma/prisma.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: !IS_DEV,
            isGlobal: true,
        }),
        AuthModule,
        UsersModule,
        PrismaModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
