"use client";

import { Card, Text, Button, Badge } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { NumberFormatter } from "@mantine/core";
import { Car } from "@/types/Car"
import { FaWhatsapp } from "react-icons/fa";

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
      <Text className="font-thin text-sm mt-1">{car.detail}</Text>
      <Text className="font-semibold text-2xl mt-1">
        <NumberFormatter prefix="R$ " value={car.price} thousandSeparator="." decimalSeparator="," />
      </Text>
      <div className="mt-1 flex gap-2">
        <span className="bg-[#e9edf2] text-[#67696b] text-xs font-medium me-2 px-2.5 py-1 rounded-full flex items-center">{car.mileage} km</span>
        <span className="bg-[#e9edf2] text-[#67696b] text-xs font-medium me-2 px-2.5 py-1 rounded-full flex items-center">{car.year}</span>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <Button variant="outline" fullWidth component={Link} href={`/detail/${car._id}`}>
          Ver Detalhes
        </Button>
        <Button color="#26d267">
          <FaWhatsapp/>
        </Button>
      </div>
    </Card>
  );
}
