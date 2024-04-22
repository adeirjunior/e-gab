import { getCurrentDomain } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>Esperamos que você aproveite esta jornada conosco.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={getCurrentDomain("", "/logo.png")}
            width="200"
            height="200"
            alt="E-Gab"
            style={{
              margin: "auto"
            }}
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Obrigado por criar sua conta no E-Gab! Esperamos que você aproveite
            esta jornada conosco.
          </Text>
          <Text style={paragraph}>
            Você pode agora personalizar seu próprio site, adicionar conteúdos,
            fazer seu marketing nas redes sociais, e ter seu trabalho facílitado
            por meio de nossas ferramentas.
          </Text>
          <Button style={button} href={getCurrentDomain("app")}>
            Veja sua Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            Caso tenha qualquer duvida de como utilizar nossos sistemas consulte
            nossa{" "}
            <Link style={anchor} href={getCurrentDomain("docs")}>
              documentação detalhada
            </Link>{" "}
            .
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};