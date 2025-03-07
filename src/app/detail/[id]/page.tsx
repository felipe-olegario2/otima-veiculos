"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Carousel } from "@mantine/carousel";
import { Card, Text, Button, Skeleton, NumberFormatter } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import {Car} from "@/types/Car"

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Título do Carro */}
      {loading ? (
        <Skeleton height={40} width="60%" className="mb-4" />
      ) : (
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{car?.model}</h1>
      )}

      {/* Carrossel de Imagens */}
      {loading ? (
        <Skeleton height={400} className="mb-6 w-full" />
      ) : (
        <Carousel withIndicators loop height={400} className="w-full mb-6">
          {car?.img.map((image, index) => (
            <Carousel.Slide key={index}>
              <div className="relative w-full h-[400px]">
                <Image
                  src={image}
                  alt={car.model}
                  width={800}
                  height={400}
                  className="rounded-md object-cover"
                  priority
                />
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}

      {/* Informações do Veículo */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {loading ? (
          <>
            <Skeleton height={25} width="50%" />
            <Skeleton height={35} width="40%" className="mt-2" />
            <Skeleton height={16} className="mt-4" />
            <Skeleton height={16} width="80%" className="mt-2" />
            <Skeleton height={16} width="60%" className="mt-2" />
            <div className="mt-6 flex gap-4">
              <Skeleton height={45} className="w-full" />
              <Skeleton height={45} className="w-full" />
            </div>
          </>
        ) : (
          <>
            <Text size="lg" className="text-gray-700 font-bold">
              {car?.brand} {car?.detail} {car?.year}
            </Text>
            <Text className="text-2xl font-semibold text-blue-600 mt-2">
            <NumberFormatter prefix="R$ " value={car?.price} thousandSeparator="." decimalSeparator="," />
            </Text>
            <Text className="mt-4 text-gray-600">{car?.description}</Text>

            {/* Botões de Ação */}
            <div className="mt-6 flex gap-4">
              <Button fullWidth color="blue" component={Link} href="/contact">
                Entrar em Contato
              </Button>
              <Button fullWidth variant="outline" color="gray">
                Simular Financiamento
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
