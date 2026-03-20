import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllTags() {
        return await this.prismaService.tags.findMany();
    }
}
