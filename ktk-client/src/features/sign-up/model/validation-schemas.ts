import z from "zod";

export const signUpFormSchema = z
    .object({
        email: z
            .string({ message: "Почта должна быть строкой" })
            .email({ message: "Почта невалидна" })
            .nonempty({ message: "Почта не может быть пустой" }),
        nickname: z
            .string({ message: "Никнейм должен быть строкой" })
            .nonempty({ message: "Никнейм не может быть пустым" })
            .min(2, { message: "Никнейм должен быть минимум 2 символа в длину" })
            .max(64, { message: "Никней не может быть длиннее 64 символов" }),
        password: z
            .string({ message: "Пароль должен быть строкой" })
            .nonempty({ message: "Пароль не может быть пустым" })
            .min(8, { message: "Пароль должен содержать минимум 8 символов" })
            .max(16, { message: "Пароль не может быть длиннее 16 символов" }),
    })

export type SignUpFields = z.infer<typeof signUpFormSchema>;