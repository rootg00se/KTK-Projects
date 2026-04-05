import z from "zod";

export const newPasswordFormSchema = z
    .object({
        password: z
            .string({ message: "Пароль должен быть строкой" })
            .nonempty({ message: "Пароль не может быть пустым" })
            .min(8, { message: "Пароль должен содержать минимум 8 символов" })
            .max(16, { message: "Пароль не может быть длиннее 16 символов" }),
        repeatPassword: z
            .string({ message: "Повторный пароль должен быть строкой" })
            .nonempty({ message: "Повторный пароль не может быть пустым" }),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Пароли не совпадают",
        path: ["repeatPassword"],
    });

export type NewPasswordFields = z.infer<typeof newPasswordFormSchema>;