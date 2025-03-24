"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Carousel } from "@mantine/carousel";
import { Card, Text, Button, Skeleton, NumberFormatter, Divider, Modal } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/Car";
import { FaWhatsapp } from "react-icons/fa";
import DetailTable from "../../../components/detailTable";
import Badge from "../../../components/Badge";
import FinancingSimulator from "../../../components/FinancingSimulator";
import WhatsappButton from "../../../components/WhatsappButton";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // Estado do modal

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`/api/cars/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar carro");
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCar();
  }, [id]);

  return (
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-6 mt-6">
      {/* Modal de Simulação de Financiamento */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        size="lg"
        withCloseButton={false}
        centered
      >
        {car && <FinancingSimulator carPrice={car.price} />}
      </Modal>

      {/* Seção do Carrossel e Card de Contato abaixo em telas pequenas */}
      <div className="w-full flex flex-col gap-6">
        {/* Carrossel */}
        {loading ? (
          <Skeleton height={400} className="mb-6 w-full" />
        ) : (
          <Carousel withIndicators loop className="w-full mb-6">
            {car?.img.map((image, index) => (
              <Carousel.Slide key={index}>
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={car.model}
                    width={900}
                    height={500}
                    className="rounded-md object-cover w-full h-96"
                    priority
                  />
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}

        {/* Card de preço e contato (Móvel para baixo em telas menores) */}
        <Card shadow="md" padding="lg" radius="md" withBorder className="bg-blue-900 text-white w-full md:hidden block">
          {loading ? (
            <>
              <Skeleton height={30} width="80%" className="mb-4" />
              <Skeleton height={45} className="mb-3" />
              <Skeleton height={45} className="mb-3" />
            </>
          ) : (
            <>
              <Text className="text-2xl font-bold">
                <NumberFormatter prefix="R$ " value={car?.price} thousandSeparator="." decimalSeparator="," />
              </Text>
              <Text className="text-sm underline mt-1 cursor-pointer" onClick={() => setModalOpen(true)}>Ver parcelas →</Text>

              {/* Botão para abrir o modal */}
              <Button fullWidth mt="md" color="blue" className="bg-white text-blue-900 font-semibold" onClick={() => setModalOpen(true)}>
                Simular Financiamento
              </Button>

              <Button fullWidth mt="md" color="green" leftSection={<FaWhatsapp />} className="bg-green-500 text-white font-semibold">
                Enviar WhatsApp
              </Button>

              <Text className="text-sm mt-4 opacity-80">
                Anunciado em {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}
              </Text>
            </>
          )}
        </Card>

        {/* Informações do Veículo */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          {loading ? (
            <>
              <Skeleton height={25} width="50%" />
              <Skeleton height={35} width="40%" className="mt-2" />
              <Skeleton height={16} className="mt-4" />
              <Skeleton height={16} width="80%" className="mt-2" />
              <Skeleton height={16} width="60%" className="mt-2" />
            </>
          ) : (
            <>
              <Text className="text-3xl text-gray-700 font-bold mb-4">
                {car?.brand} {car?.model} {car?.detail} {car?.year}
              </Text>
              {car && <DetailTable key={car._id} car={car} />}

              {car?.options?.length ? (
                <>
                  <Text className="text-xl text-gray-700 font-bold my-4">Itens de série e opcionais</Text>
                  <div className="flex flex-wrap gap-2">
                    {car.options.map((option, index) => (
                      <Badge key={index}>{option}</Badge>
                    ))}
                  </div>
                </>
              ) : null}

              <Divider my="md" />
              <Text className="text-xl text-gray-700 font-bold my-4">Descrição</Text>
              <Text className="text-gray-600">{car?.description}</Text>
            </>
          )}
        </Card>
      </div>

      {/* Card lateral (Somente para telas médias e grandes) */}
      <div className="w-full md:w-1/3 hidden md:block">
        <Card shadow="md" padding="lg" radius="md" withBorder className="bg-blue-900 text-white">
          {loading ? (
            <>
              <Skeleton height={30} width="80%" className="mb-4" />
              <Skeleton height={45} className="mb-3" />
              <Skeleton height={45} className="mb-3" />
            </>
          ) : (
            <>
              <Text className="text-2xl font-bold">
                <NumberFormatter prefix="R$ " value={car?.price} thousandSeparator="." decimalSeparator="," />
              </Text>

              {/* Botão para abrir o modal */}
              <Button fullWidth mt="md" color="blue" className="bg-white text-blue-900 font-semibold" onClick={() => setModalOpen(true)}>
                Simular Financiamento
              </Button>

              <WhatsappButton phone="5511943637539" />
            </>
          )}
        </Card>
        <Text className="text-sm mt-4 opacity-80">
          Anunciado em {car?.createdAt ? new Date(car.createdAt).toLocaleDateString("pt-BR") : "Data desconhecida"}
        </Text>
      </div>
    </div>
  );
}
