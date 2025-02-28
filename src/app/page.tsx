"use client";

import { useState, useEffect } from "react";
import { Card, Text, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

interface Car {
  _id: string;
  name: string;
  price: string;
  img: string;
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Carros disponíveis</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.length > 0 ? (
            cars.map((car) => (
              <Card key={car._id} shadow="sm" padding="lg">
                <Card.Section>
                  <Image src={car.img} alt={car.name} width={300} height={200} />
                </Card.Section>
                <Text className="font-semibold text-lg">{car.name}</Text>
                <Text className="text-gray-600">{car.price}</Text>
                <Button fullWidth mt="md" component={Link} href={`/detail/${car._id}`}>
                  Ver Detalhes
                </Button>
              </Card>
            ))
          ) : (
            <p>Nenhum carro disponível no momento.</p>
          )}
        </div>
      )}
    </div>
  );
}
