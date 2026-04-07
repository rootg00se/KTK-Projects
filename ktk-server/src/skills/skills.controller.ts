import { Controller, Get, Query } from "@nestjs/common";
import { SkillsService } from "./skills.service";

@Controller("skills")
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) {}

    @Get()
    async getAllSkills(@Query("query") query: string) {
        return await this.skillsService.getAllSkills(query);
    }
}
