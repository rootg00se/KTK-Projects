import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class ProjectMemberGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const userId = request.user?.user_id;
        const projectId = request.params.id || request.params.projectId;

        if (!userId || !projectId) {
            throw new NotFoundException("Project or user was not found");
        }

        const project = await this.prisma.projects.findFirst({
            where: {
                project_id: projectId,
                OR: [{ creator_id: userId }, { project_members: { some: { user_id: userId } } }],
            },
        });

        if (!project) {
            throw new ForbiddenException("You have no access to this project");
        }

        return true;
    }
}
