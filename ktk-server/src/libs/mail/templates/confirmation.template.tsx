import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import { Html } from "@react-email/html";
import * as React from "react";

interface ConfirmationTemplateProps {
    domain: string;
    token: string;
}

export function ConfirmationTemplate({ domain, token }: ConfirmationTemplateProps) {
    const confirmLink = `${domain}/auth/email-confirmation/${token}`;

    return (
        <Tailwind>
            <Html lang="ru">
                <Head />
                <Preview>Подтвердите адрес электронной почты — KTK Projects</Preview>
                <Body className="m-0 bg-[#fafafa] px-4 py-10 font-sans">
                    <Container className="mx-auto max-w-[520px]">
                        <Section className="overflow-hidden rounded-xl border border-solid border-[#d9d4cf] bg-[#ffffff] shadow-sm">
                            <Section className="bg-[#a0350c] px-8 py-7">
                                <Text className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#f5d4c4]">
                                    KTK Projects
                                </Text>
                                <Heading className="m-0 mt-2 text-[26px] font-bold leading-tight text-[#ffffff]">
                                    Подтверждение email
                                </Heading>
                            </Section>
                            <Section className="px-8 pb-8 pt-8">
                                <Text className="m-0 text-[16px] leading-[26px] text-[#3c3c3c]">
                                    Добро пожаловать в KTK Projects! Чтобы завершить регистрацию и пользоваться аккаунтом, подтвердите
                                    адрес почты — нажмите кнопку ниже.
                                </Text>
                                <Section className="mt-8 text-center">
                                    <Button
                                        href={confirmLink}
                                        className="inline-block rounded-lg bg-[#a0350c] px-8 py-3 text-[15px] font-semibold text-[#ffffff] no-underline"
                                    >
                                        Подтвердить email
                                    </Button>
                                </Section>
                                <Text className="mt-8 text-center text-[13px] leading-[22px] text-[#6b6560]">
                                    Кнопка не срабатывает? Скопируйте ссылку в браузер:
                                    <br />
                                    <Link href={confirmLink} className="break-all text-[#a0350c] underline">
                                        {confirmLink}
                                    </Link>
                                </Text>
                                <Hr className="my-8 border-0 border-t border-solid border-[#ebe8e5]" />
                                <Text className="m-0 text-[13px] leading-[22px] text-[#6b6560]">
                                    Ссылка действует <strong className="text-[#3c3c3c]">1 час</strong>. Если вы не
                                    создавали аккаунт в KTK Projects, просто проигнорируйте это письмо — ничего
                                    менять не нужно.
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}
