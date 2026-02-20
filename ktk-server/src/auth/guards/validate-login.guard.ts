import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { LoginDto } from "../dto/login.dto";
import { validate } from "class-validator";

@Injectable()
export class ValidateLoginGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const body = request.body;

        const loginDto = plainToClass(LoginDto, body);
        const errors = await validate(loginDto);

        if (errors.length > 0) {
            const errorMessages = errors.flatMap(error => 
                error.constraints ? Object.values(error.constraints) : []
            );
            
            throw new BadRequestException(errorMessages);
        }

        request.validatedBody = loginDto;

        return true;
    }
}