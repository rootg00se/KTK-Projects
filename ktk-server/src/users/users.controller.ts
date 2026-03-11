import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthenticatedGuard } from "@/auth/guards/authenticated.guard";
import { Authorized } from "@/auth/decorators/authorized.decorator";
import { UsersPaginationDto } from "./dto/users-pagination.dto";
import { ChatsService } from "@/chats/chats.service";
import { ProjectsService } from "@/projects/projects.service";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly chatsService: ChatsService,
        private readonly projectsService: ProjectsService
    ) {}
    
    @Get()
    async getUsers(@Query() paginationDto: UsersPaginationDto) {
        return await this.usersService.getAllUsers(paginationDto);
    }

    @Get("me")
    @UseGuards(AuthenticatedGuard)
    async getAuthUser(@Authorized("user_id") userId: string) {
        return await this.usersService.findUserById(userId);
    }

    @Get("me/chats")
    @UseGuards(AuthenticatedGuard)
    async getUserChats(@Authorized("user_id") userId: string) {
        return await this.chatsService.getUserChats(userId);
    }

    @Get(":id")
    async getUserById(@Param("id") userId: string) {
        return await this.usersService.findUserById(userId);
    }

    @Get(":id/projects")
    async getUserProjects(@Param("id") userId: string) {
        return await this.projectsService.getAllUserProjects(userId);
    }

    @Get(":id/friends")
    async getUserFriends(@Param("id") userId: string) {
        return await this.usersService.findUserFriends(userId);
    }

    @Post("me/friends/:id")
    @UseGuards(AuthenticatedGuard)
    async addFriendToUser(
        @Authorized("user_id") userId: string,
        @Param("id") friendId: string
    ) {
        return await this.usersService.addFriendToUser(friendId, userId);
    }

    @Patch("me")
    @UseGuards(AuthenticatedGuard)
    async updateUserInfo() {}

    @Patch("me/skills")
    @UseGuards(AuthenticatedGuard)
    async addUserSkills() {}

    @Patch("me/profile")
    @UseGuards(AuthenticatedGuard)
    async updateUserProfile() {}

    @Patch("me/avatar")
    @UseGuards(AuthenticatedGuard)
    async updateUserAvatar() {}

    @Patch("me/banner")
    @UseGuards(AuthenticatedGuard)
    async updateUserBanner() {}

    @Delete("me/avatar")
    @UseGuards(AuthenticatedGuard)
    async removeUserAvatar() {}

    @Delete("me/banner")
    @UseGuards(AuthenticatedGuard)
    async removeUserBanner() {}

    @Delete("me/friends/:id")
    @UseGuards(AuthenticatedGuard)
    async deleteUserFriends() {}
}
