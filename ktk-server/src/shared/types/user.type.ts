import { users } from "@prisma/generated/browser";

export type User = Omit<users, "password_hash">;