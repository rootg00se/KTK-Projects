import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllUserProjects(userId: string) {
        return await this.prismaService.projects.findMany({
            where: {
                project_members: { some: { user_id: userId } }
            }
        })
    }
}
