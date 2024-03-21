"use client";
import Form from "../..";
import { ButtonContainerLg } from "../ButtonContainerLg";

export const InvitedPath1 = () => {

  return (
    <div>
      <Form
        title="Escreva o código recebido no email."
        description="Escreva o código que foi enviado ao seu email para se tornar adminstrador do site de [nome do político]"
        helpText="Não é necessário por espaçamento no código."
        inputAttrs={{
          placeholder: "Código...",
          type: "text",
          name: "code",
          defaultValue: "",
        }}
        handleSubmit={() => `TODO`}
      />
      <ButtonContainerLg />
    </div>
  );
};
