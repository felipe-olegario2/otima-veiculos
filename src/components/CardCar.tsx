"use client";

import { Card, Text, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { NumberFormatter } from "@mantine/core";
import { Car } from "@/types/Car"

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={car.img[0] || "/placeholder.jpg"}
          alt={car.model}
          width={300}
          height={200}
          className="object-cover w-full h-48"
        />
      </Card.Section>
      <Text className="font-semibold text-lg mt-2">{car.model}</Text>
      <Text className="text-gray-600">
        Preço: <NumberFormatter prefix="R$ " value={car.price} thousandSeparator="." decimalSeparator="," />
      </Text>
      <Button fullWidth mt="md" component={Link} href={`/detail/${car._id}`}>
        Ver Detalhes
      </Button>
    </Card>
  );
}
