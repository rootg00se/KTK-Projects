import { provider_type } from "@prisma/generated/enums";

export type CreateAccount = {
    userId: string;
    provider: provider_type;
    accessToken: string;
    providerAccountId: string;
    refreshToken?: string;
};