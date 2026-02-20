import { User } from "@/shared/types/user.type";
import { UsersService } from "@/users/users.service";
import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    serializeUser(user: User, done: Function) {
        done(null, user.user_id);   
    }

    async deserializeUser(userId: string, done: Function) {
        try {
            const user = await this.usersService.findUserById(userId);
            
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
}