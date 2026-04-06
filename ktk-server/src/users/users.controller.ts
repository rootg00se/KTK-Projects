import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthenticatedGuard } from "@/auth/guards/authenticated.guard";
import { Authorized } from "@/auth/decorators/authorized.decorator";
import { UsersPaginationDto } from "./dto/users-pagination.dto";
import { ChatsService } from "@/chats/chats.service";
import { ProjectsService } from "@/projects/projects.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserSkillsDto } from "./dto/update-user-skills.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";
import { QuestionsService } from "@/questions/questions.service";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly chatsService: ChatsService,
        private readonly projectsService: ProjectsService,
        private readonly questionsService: QuestionsService
    ) {}

    @Get()
    async getUsers(@Query() paginationDto: UsersPaginationDto) {
        return await this.usersService.getAllUsers(paginationDto);
    }

    @Get("me")
    @UseGuards(AuthenticatedGuard)
    async getAuthUser(@Authorized("user_id") userId: string) {
        return await this.usersService.getUserProfile(userId);
    }

    @Get("me/chats")
    @UseGuards(AuthenticatedGuard)
    async getUserChats(@Authorized("user_id") userId: string) {
        return await this.chatsService.getUserChats(userId);
    }

    @Get(":id")
    async getUserById(@Param("id") userId: string) {
        return await this.usersService.getUserProfile(userId);
    }

    @Get(":id/projects")
    async getUserProjects(@Param("id") userId: string) {
        return await this.projectsService.getAllUserProjects(userId);
    }

    @Get(":id/questions")
    async getUserQuestions(@Param("id") userId: string) {
        return await this.questionsService.getUserQuestions(userId);
    }

    @Get(":id/friends")
    async getUserFriends(@Param("id") userId: string) {
        return await this.usersService.findUserFriends(userId);
    }

    @Post("me/friends/:id")
    @UseGuards(AuthenticatedGuard)
    async addFriendToUser(@Authorized("user_id") userId: string, @Param("id") friendId: string) {
        return await this.usersService.addFriendToUser(friendId, userId);
    }

    @Patch("me")
    @UseGuards(AuthenticatedGuard)
    async updateUserInfo(
        @Authorized("user_id") userId: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.usersService.updateUser(updateUserDto, userId);
    }

    @Patch("me/skills")
    @UseGuards(AuthenticatedGuard)
    async addUserSkills(
        @Authorized("user_id") userId: string,
        @Body() updateUserSkillsDto: UpdateUserSkillsDto,
    ) {
        return await this.usersService.updateUserSkills(userId, updateUserSkillsDto);
    }

    @Patch("me/profile")
    @UseGuards(AuthenticatedGuard)
    async updateUserProfile(
        @Authorized("user_id") userId: string,
        @Body() updateUserProfileDto: UpdateUserProfileDto,
    ) {
        return await this.usersService.updateUserProfile(userId, updateUserProfileDto.content);
    }

    @Patch("me/avatar")
    @UseInterceptors(FileInterceptor("avatar"))
    @UseGuards(AuthenticatedGuard)
    async updateUserAvatar(
        @Authorized("user_id") userId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({
                        fileType: /^(image\/)(jpeg|jpg|png|webp|gif)$/,
                    }),
                    new MaxFileSizeValidator({
                        maxSize: 1000 * 1000 * 100,
                        message: "Can't load files larger than 10 mb",
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return await this.usersService.updateUserAvatar(userId, file);
    }

    @Patch("me/banner")
    @UseInterceptors(FileInterceptor("banner"))
    @UseGuards(AuthenticatedGuard)
    async updateUserBanner(
        @Authorized("user_id") userId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({
                        fileType: /^(image\/)(jpeg|jpg|png|webp|gif)$/,
                    }),
                    new MaxFileSizeValidator({
                        maxSize: 1000 * 1000 * 100,
                        message: "Can't load files larger than 10 mb",
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return await this.usersService.updateUserBanner(userId, file);
    }

    @Delete("me/avatar")
    @UseGuards(AuthenticatedGuard)
    async removeUserAvatar(@Authorized("user_id") userId: string) {
        return await this.usersService.removeUserAvatar(userId);
    }

    @Delete("me/banner")
    @UseGuards(AuthenticatedGuard)
    async removeUserBanner(@Authorized("user_id") userId: string) {
        return await this.usersService.removeUserBanner(userId);
    }

    @Delete("me/friends/:id")
    @UseGuards(AuthenticatedGuard)
    async deleteUserFriends(@Authorized("user_id") userId: string, @Param("id") friendId: string) {
        return await this.usersService.removeUserFriend(friendId, userId);
    }
}
