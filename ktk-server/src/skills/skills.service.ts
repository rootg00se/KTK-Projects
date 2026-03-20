import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllSkills() {
        return await this.prismaService.skills.findMany();
    }
}
