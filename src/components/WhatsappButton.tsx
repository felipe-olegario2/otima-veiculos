"use client";

import { Button } from "@mantine/core";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface WhatsappButtonProps {
  label?: string;
  message?: string;
}

export default function WhatsappButton({
  label = "Enviar WhatsApp",
  message,
}: WhatsappButtonProps) {
  const whatsappLink = `https://api.whatsapp.com/send?phone=5511943637539${
    message ? `&text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <Button
      fullWidth
      mt="md"
      color="green"
      leftSection={<FaWhatsapp />}
      className="bg-green-500 text-white font-semibold"
      component={Link}
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </Button>
  );
}
