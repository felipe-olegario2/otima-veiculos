"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Carousel } from '@mantine/carousel';
import { Card, Text, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

interface Car {
  _id: string;
  name: string;
  price: string;
  img: string[]; // Array de imagens
  year: number;
  brand: string;
  description?: string;
}

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

  if (loading) return <p className="text-center text-lg mt-10">Carregando...</p>;
  if (!car) return <p className="text-center text-lg mt-10">Carro não encontrado</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{car.name}</h1>

      {/* Carrossel de Imagens */}
      <Carousel withIndicators loop className="w-full h-80 mb-6">
        {car.img.map((image, index) => (
          <Carousel.Slide key={index}>
            <div className="relative w-full h-80">
              <Image
                src={image}
                alt={car.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Informações do Veículo */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" className="text-gray-700 font-bold">
          {car.brand} - {car.year}
        </Text>
        <Text className="text-2xl font-semibold text-blue-600 mt-2">
          R$ {parseFloat(car.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </Text>
        <Text className="mt-4 text-gray-600">{car.description}</Text>

        {/* Botões de Ação */}
        <div className="mt-6 flex gap-4">
          <Button fullWidth color="blue" component={Link} href="/contact">
            Entrar em Contato
          </Button>
          <Button fullWidth variant="outline" color="gray">
            Simular Financiamento
          </Button>
        </div>
      </Card>
    </div>
  );
}
