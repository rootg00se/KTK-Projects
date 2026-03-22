import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { AuthenticatedGuard } from "@/auth/guards/authenticated.guard";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Controller("questions")
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Get(":id/replies")
    async getQuestionReplies(@Param("id") questionId: string) {
        return await this.questionsService.getQuestionReplies(questionId);
    }

    @Put(":id")
    @UseGuards(AuthenticatedGuard)
    async updateQuestion(
        @Param("id") questionId: string,
        @Body() updateQuestionDto: UpdateQuestionDto,
    ) {
        return await this.questionsService.updateQuestion(questionId, updateQuestionDto.text);
    }

    @Delete(":id")
    @UseGuards(AuthenticatedGuard)
    async deleteQuestion(@Param("id") questionId: string) {
        return await this.questionsService.deleteQuestion(questionId);
    }
}
