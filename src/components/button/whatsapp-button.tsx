"use client"

import { Button } from "@nextui-org/react";
import { RiWhatsappFill } from "@remixicon/react";

const WhatsAppButton = ({ phoneNumber }: {phoneNumber: string}) => {
  // Função para formatar o número de telefone para o formato do link do WhatsApp
  const formatPhoneNumber = (phoneNumber: string) => {
    // Remover caracteres não numéricos do número de telefone
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    // Adicionar o prefixo internacional do Brasil (+55)
    const internationalPhoneNumber = `+55${cleanedPhoneNumber}`;
    return internationalPhoneNumber;
  };

  // Função para abrir o link do WhatsApp
  const openWhatsAppChat = () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    // Construir o link do WhatsApp
    const whatsappLink = `https://wa.me/${formattedPhoneNumber}`;
    // Abrir o link em uma nova janela/tab
    window.open(whatsappLink, "_blank");
  };

  return <Button startContent={<RiWhatsappFill/>} color="success" onClick={openWhatsAppChat} >Conversar pelo WhatsApp</Button>;
};

export default WhatsAppButton;
