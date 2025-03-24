"use client";

import { Paper, Text } from "@mantine/core";
import { Car } from "../types/Car";
import { BsFuelPump } from "react-icons/bs";
import { CiCalendarDate, CiBarcode } from "react-icons/ci";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { BsHSquare } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";

interface CarCardProps {
  car: Car;
}

export default function DetailTable({ car }: CarCardProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
      <Paper shadow="sm" radius="md" p="md" withBorder>
        <Text className="flex gap-2 items-center text-gray-600 text-sm">
          <LiaTachometerAltSolid size={20} />
          Quilometragem
        </Text>
        <Text className="text-xl sm:text-2xl font-bold">
          {car.mileage}
        </Text>
      </Paper>
      <Paper shadow="sm" radius="md" p="md" withBorder>
        <Text className="flex gap-2 items-center text-gray-600 text-sm">
          <CiCalendarDate size={20} />
          Ano
        </Text>
        <Text className="text-xl sm:text-2xl font-bold">
          {car.year}
        </Text>
      </Paper>
      <Paper shadow="sm" radius="md" p="md" withBorder>
        <Text className="flex gap-2 items-center text-gray-600 text-sm">
          <BsHSquare />
          Cambio
        </Text>
        <Text className="text-xl sm:text-2xl font-bold">
          {car.transmission}
        </Text>
      </Paper>
      <Paper shadow="sm" radius="md" p="md" withBorder>
        <Text className="flex gap-2 items-center text-gray-600 text-sm">
          <BsFuelPump />
          Combustível
        </Text>
        <Text className="text-xl sm:text-2xl font-bold">
          {car.fuel}
        </Text>
      </Paper>
      <Paper shadow="sm" radius="md" p="md" withBorder>
        <Text className="flex gap-2 items-center text-gray-600 text-sm">
          <IoColorPaletteOutline size={20} />
          Cor
        </Text>
        <Text className="text-xl sm:text-2xl font-bold">
          {car.color}
        </Text>
      </Paper>
      <Paper shadow="sm" radius="md" p="md" withBorder>
        <Text className="flex gap-2 items-center text-gray-600 text-sm">
          <CiBarcode size={20}/>
          Final da placa
        </Text>
        <Text className="text-xl sm:text-2xl font-bold">
          {car.licensePlateEnd}
        </Text>
      </Paper>
    </div>
  );
}
