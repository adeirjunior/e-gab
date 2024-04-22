import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
  Link,
} from "@react-email/components";
import { getCurrentDomain } from "@/lib/utils";

interface VerifyEmailProps {
  token: string;
  name: string | null | undefined;
}

const VerifyEmail = ({ token, name }: VerifyEmailProps) => {
  const previewText = `Bem vindo ao E-Gab, ${name}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-[465px] p-5">
            <Heading className="mx-0 my-8 p-0 text-center text-2xl font-normal">
              Verifique seu email
            </Heading>
            <Text className="text-sm">Olá {name || "{nome}"},</Text>
            <Text className="text-sm">
              Agora que você criou sua conta, pedimos que você verifique seu
              email para que sua conta seja confirmada. Caso você não verifique
              sua conta pode ser desativada em 1 semana.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#00A3FF] px-4 py-2 text-center text-xs font-semibold text-white no-underline"
                href={getCurrentDomain("app", `/verify-email?token=${token}`)}
              >
                Clique para verificar seu email
              </Button>
            </Section>
            <Text className="text-sm">
              Saudações,
              <br />
              Time do E-Gab
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;
