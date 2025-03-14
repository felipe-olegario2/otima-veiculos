import { Card, Text, Button, Group, Divider } from "@mantine/core";
import { FaEnvelope, FaInstagram, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Título */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
          Entre em <span className="text-blue-600">Contato</span>
        </h1>
        <Text className="text-gray-600 text-lg">
          Precisa falar conosco? Quer agendar uma visita? Envie uma mensagem, estamos prontos para atendê-lo!
        </Text>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card shadow="sm" padding="lg" radius="md" withBorder className="text-center">
          <div className="flex items-center gap-4 justify-center">
            <FaMapMarkerAlt className="text-blue-600 text-xl" />
            <Text size="lg" className="font-bold">Endereço</Text>
          </div>
          <Text size="sm" className="mt-2 text-gray-600">
            Avenida João Paulo I, 1515 - São Paulo - SP - 02842-280
          </Text>
          <Text size="sm" className="text-gray-600">Ótima Veículos Loja I: Nº 1.515</Text>
          <Text size="sm" className="text-gray-600">Ótima Veículos Loja II: Nº 1.501</Text>
          <Text size="sm" className="text-gray-600">Ótima Veículos Loja III: Nº 1.512</Text>
        </Card>

        {/* Horário de Funcionamento */}
        <Card shadow="sm" padding="lg" radius="md" withBorder className="text-center">
          <div className="flex items-center gap-4 justify-center">
            <FaClock className="text-blue-600 text-xl" />
            <Text size="lg" className="font-bold">Horário de Funcionamento</Text>
          </div>
          <Text size="sm" className="mt-2 text-gray-600">Segunda a Sexta: 09:00 - 19:00</Text>
          <Text size="sm" className="text-gray-600">Sábados: 09:00 - 16:00</Text>
          <Text size="sm" className="text-gray-600">Domingos: Fechado</Text>
        </Card>
      </div>

      {/* Redes Sociais e Contato */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email e Telefone */}
        <Card shadow="sm" padding="lg" radius="md" withBorder className="text-center">
          <div className="flex items-center gap-4 justify-center">
            <FaEnvelope className="text-blue-600 text-xl" />
            <Text size="lg" className="font-bold">Email</Text>
          </div>
          <Text size="sm" className="mt-2 text-gray-600">contato@otimaveiculos.com</Text>

          <Divider my="sm" />

          <div className="flex items-center gap-4 justify-center">
            <FaPhone className="text-blue-600 text-xl" />
            <Text size="lg" className="font-bold">Telefone</Text>
          </div>
          <Text size="sm" className="mt-2 text-gray-600">(11) 4363-7539</Text>
        </Card>

        {/* Redes Sociais */}
        <Card shadow="sm" padding="lg" radius="md" withBorder className="text-center">
          <div className="flex items-center gap-4 justify-center">
            <FaInstagram className="text-pink-500 text-xl" />
            <Text size="lg" className="font-bold">Instagram</Text>
          </div>
          <Button
            component="a"
            href="https://www.instagram.com/otimaveiculos"
            target="_blank"
            variant="outline"
            className="mt-2 w-full"
          >
            @otimaveiculos
          </Button>
          <Button
            component="a"
            href="https://api.whatsapp.com/send?phone=5511943637539"
            target="_blank"
            leftSection={<FaWhatsapp />}
            className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition mt-4"
          >
            Enviar Mensagem no WhatsApp
          </Button>
        </Card>
      </div>

      {/* Google Maps */}
      <div className="mt-12 w-full mx-auto h-80 rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.4383192859955!2d-46.6865485!3d-23.4807167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef84a4ac99d9f%3A0x6bc452d69c3c7b4f!2zw5N0aW1hIFZlw61jdWxvcw!5e0!3m2!1spt-BR!2sbr!4v1741975961735!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
