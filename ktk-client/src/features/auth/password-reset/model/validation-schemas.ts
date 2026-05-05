import z from "zod";

export const resetPasswordFormSchema = z.object({
    email: z
        .string({ message: "Почта должна быть строкой" })
        .email({ message: "Почта невалидна" })
        .nonempty({ message: "Почта не может быть пустой" }),
});

export type ResetPasswordFields = z.infer<typeof resetPasswordFormSchema>;
