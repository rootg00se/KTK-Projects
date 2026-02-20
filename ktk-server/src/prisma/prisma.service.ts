import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/generated/client";
import * as pg from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly configService: ConfigService) {
        const connectionString = configService.getOrThrow<string>("POSTGRES_URI");
        const pool = new pg.Pool({ connectionString });
        const adapter = new PrismaPg(pool);

        super({
            adapter
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}