import { Card } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
          Sobre a <span className="text-blue-600">Ótima Veículos</span>
        </h1>
        <p className="text-gray-600 text-lg">
          A <strong>Ótima Veículos</strong> nasceu do sonho simples e sensato de ser referência em atendimento, qualidade e empatia com o cliente.
          Buscamos, junto à nossa equipe, alcançar a excelência no mercado automotivo.
        </p>
      </div>

      {/* Imagem */}
      <div className="mt-8 flex justify-center">
        <Image
          src="/image.png"
          alt="image"
          width={900}
          height={500}
          className="rounded-md object-cover"
          priority
        />
      </div>

      {/* Informações adicionais */}
      <div className="mt-12 space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Por que escolher a Ótima Veículos?</h2>
        <p className="text-gray-600 text-lg">
          Oferecemos um atendimento personalizado, transparência em cada negociação e veículos de qualidade.
          Nosso compromisso é proporcionar a melhor experiência na compra do seu carro novo ou seminovo.
        </p>
      </div>

      {/* Localização */}
      <Card shadow="sm" padding="lg" radius="md" withBorder className="text-center mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Nossa Localização</h2>
        <p className="text-gray-600">
          Estamos localizados na <strong>região norte de São Paulo</strong>, com fácil acesso de carro, ônibus e metrô.
        </p>
        <div className="my-6 w-full max-w-3xl mx-auto h-80 rounded-lg overflow-hidden shadow-md">
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
        <Link className="text-blue-600 cursor-pointer font-semibold" href="https://api.whatsapp.com/send?phone=5511943637539">
          Para mais informações, chame a gente!
        </Link>

      </Card>
    </div>
  );
}
