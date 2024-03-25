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
  Link
} from "@react-email/components";
import { getCurrentDomain } from "@/lib/utils";

interface WelcomeEmailProps {
  name: string | null | undefined;
}

 const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  const previewText = `Bem vindo ao E-Gab, ${name}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-[465px] p-5">
            <Heading className="mx-0 my-8 p-0 text-center text-2xl font-normal">
              Bem vindo ao E-Gab!
            </Heading>
            <Text className="text-sm">Olá {name},</Text>
            <Text className="text-sm">
              Nós estamos animados em ter você na nossa plataforma! Esperamos que você aproveite esta jornada conosco. Caso tenha qualquer duvida de como utilizar nossos sistemas consulte nossa <Link href={getCurrentDomain('docs')} className="text-lighblue-300">documentação detalhada</Link>.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#00A3FF] text-center text-xs font-semibold text-white no-underline py-2 px-4"
                href={getCurrentDomain("app")}
              >
                Inicie
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

export default WelcomeEmail