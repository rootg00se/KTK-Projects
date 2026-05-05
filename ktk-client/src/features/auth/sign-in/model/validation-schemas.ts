import z from "zod";

export const signInFormSchema = z
    .object({
        email: z
            .string({ message: "Почта должна быть строкой" })
            .email({ message: "Почта невалидна" })
            .nonempty({ message: "Почта не может быть пустой" }),
        password: z
            .string({ message: "Пароль должен быть строкой" })
            .nonempty({ message: "Пароль не может быть пустым" })
            .min(8, { message: "Пароль должен содержать минимум 8 символов" })
            .max(16, { message: "Пароль не может быть длиннее 16 символов" }),
    })

export type SignInFields = z.infer<typeof signInFormSchema>;