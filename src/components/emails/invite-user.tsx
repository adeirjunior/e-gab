import { getCurrentDomain } from "@/lib/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface SlackConfirmEmailProps {
  validationCode?: string;
}

export const InviteUserEmail = ({ validationCode }: SlackConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={getCurrentDomain("", "/logo.png")}
            width="120"
            height="120"
            alt="Logo do E-Gab"
          />
        </Section>
        <Heading style={h1}>Você foi convidado</Heading>
        <Text style={heroText}>
          Crie sua conta no <Link href={getCurrentDomain()}>E-Gab</Link> e se
          coloque como convidado, então ponha o código abaixo.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>
          Não conhece quem te convidou? não se preocupe, simplesmente ignore
          este email.
        </Text>
      </Container>
    </Body>
  </Html>
);

InviteUserEmail.PreviewProps = {
  validationCode: "8fb2a405-503e-4344-8543-6e8d93f4c9ee",
} as SlackConfirmEmailProps;

export default InviteUserEmail;

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
