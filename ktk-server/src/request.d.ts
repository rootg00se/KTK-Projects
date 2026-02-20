import { Request } from "express";
import { User } from "./shared/types/user.type";

declare module "express" {
    interface Request {
        user?: User
    }
}