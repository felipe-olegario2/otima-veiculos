"use client";

import { useState, useEffect } from "react";
import { Card, Text, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

interface Car {
  _id: string;
  name: string;
  price: string;
  img: string[]; // Corrigido para um array de strings
  year: number;
  brand: string;
  description?: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch("/api/cars");
        if (!res.ok) throw new Error("Erro ao buscar carros");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Carros disponíveis</h1>
      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.length > 0 ? (
            cars.map((car) => (
              <Card key={car._id} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={car.img[0] || "/placeholder.jpg"} // Corrigido para acessar a primeira imagem
                    alt={car.name}
                    width={300}
                    height={200}
                    className="object-cover w-full h-48"
                  />
                </Card.Section>
                <Text className="font-semibold text-lg mt-2">{car.name}</Text>
                <Text className="text-gray-600">Preço: {car.price}</Text>
                <Button fullWidth mt="md" component={Link} href={`/detail/${car._id}`}>
                  Ver Detalhes
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-center">Nenhum carro disponível no momento.</p>
          )}
        </div>
      )}
    </div>
  );
}
