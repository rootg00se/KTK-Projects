import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { QueryMode } from "@prisma/generated/internal/prismaNamespace";

@Injectable()
export class SkillsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllSkills(query: string) {
        return await this.prismaService.skills.findMany({
            where: {
                ...(query ? { name: { contains: query, mode: QueryMode.insensitive } } : {}),
            },
        });
    }
}
