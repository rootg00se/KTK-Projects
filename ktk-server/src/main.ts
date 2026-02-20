import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import { createClient, RedisClientType } from "redis";
import { ValidationPipe } from "@nestjs/common";
import session from "express-session";
import { sessionConfig } from "./config/session.config";
import { GlobalFilter } from "./libs/common/filters/global.filter";
import { GlobalLogger } from "./libs/common/logger/logger.service";
import passport from "passport";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    const redis: RedisClientType = createClient({ url: config.getOrThrow<string>("REDIS_URI") });
    await redis.connect();

    app.setGlobalPrefix("api/v1");
    app.use(cookieParser(config.getOrThrow<string>("COOKIE_SECRET")));
    app.useLogger(new GlobalLogger());
    
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    app.use(session(sessionConfig(config, redis)));

    app.use(passport.initialize());
    app.use(passport.session());

    app.useGlobalFilters(new GlobalFilter());

    app.enableCors({
        origin: config.getOrThrow<string>("CLIENT_ORIGIN"),
        credentials: true,
        exposedHeaders: ["set-cookie"],
    });

    await app.listen(config.getOrThrow<number>("APPLICATION_PORT"));
}

bootstrap();
