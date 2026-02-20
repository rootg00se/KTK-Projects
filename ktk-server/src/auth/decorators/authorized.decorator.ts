import { User } from "@/shared/types/user.type";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const Authorized = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    const user = request.user;

    if (!user) return null;

    return data ? user[data] : user;
});
