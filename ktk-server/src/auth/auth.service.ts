import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "@/users/users.service";
import { hash, verify } from "argon2";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async register(registerDto: RegisterDto) {
        const user = await this.usersService.findUserByEmail(registerDto.email);
        if (user) throw new BadRequestException("User with that email already exists");

        const hashedPasswod = await hash(registerDto.password)

        const createdUser = await this.usersService.createUserWithCredentials({
            email: registerDto.email,
            nickname: registerDto.nickname,
            password: hashedPasswod
        });

        return createdUser;
    }

    async validateUser(loginDto: LoginDto) {
        const user = await this.usersService.findUserByEmail(loginDto.email);
        if (!user) return null;

        const isPasswordsMatching = await verify(user.password_hash!, loginDto.password);
        if (!isPasswordsMatching) return null;

        const { password_hash, ...result } = user;

        return result;
    }
}
