interface EmailTemplateProps {
  firstName: string;
}

export default function InviteUserTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Olá, o usuário {firstName} está te convidando para administrar o site do político {firstName}!</h1>
    </div>
  );
}
