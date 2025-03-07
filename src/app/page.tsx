"use client";

import { useState, useEffect } from "react";
import { Card, Text, Button, Select, NumberInput, Skeleton } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import {Car} from "../types/Car"

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [filters, setFilters] = useState<{
    yearFrom: string | number;
    yearTo: string | number;
    priceFrom: string | number;
    priceTo: string | number;
    brand: string;
    order: string;
  }>({
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
    brand: "",
    order: "",
  });
  

  useEffect(() => {
    async function fetchCars() {
      try {
        const queryParams = new URLSearchParams(filters as any).toString();
        const res = await fetch(`/api/cars?${queryParams}`);
        if (!res.ok) throw new Error("Erro ao buscar carros");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchBrands() {
      try {
        const res = await fetch("/api/cars/brands");
        if (!res.ok) throw new Error("Erro ao buscar marcas");
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBrands();
    fetchCars();
  }, [filters]);

  return (
    <div className="flex gap-4">
      {/* Sidebar de Filtros */}
      <aside className="w-64 p-4 bg-white shadow-md rounded-md h-fit">
        <Text className="text-lg font-semibold mb-4">Filtros</Text>

        <NumberInput
          hideControls
          label="Ano de (mínimo)"
          min={1900}
          max={new Date().getFullYear()}
          value={filters.yearFrom}
          onChange={(value) => setFilters((prev) => ({ ...prev, yearFrom: value }))}
        />

        <NumberInput
          hideControls
          label="Ano até (máximo)"
          min={1900}
          max={new Date().getFullYear()}
          value={filters.yearTo}
          onChange={(value) => setFilters((prev) => ({ ...prev, yearTo: value }))}
          className="mt-3"
        />

        <NumberInput
          hideControls
          label="Preço mínimo"
          min={0}
          thousandSeparator=","
          value={filters.priceFrom}
          onChange={(value) => setFilters((prev) => ({ ...prev, priceFrom: value }))}
          className="mt-3"
        />

        <NumberInput
          hideControls
          label="Preço máximo"
          min={0}
          thousandSeparator=","
          value={filters.priceTo}
          onChange={(value) => setFilters((prev) => ({ ...prev, priceTo: value }))}
          className="mt-3"
        />

        <Select
          label="Marca"
          data={brands}
          value={filters.brand}
          onChange={(value) => setFilters((prev) => ({ ...prev, brand: value || "" }))}
          className="mt-3"
        />

        <Select
          label="Ordenar por preço"
          data={[
            { value: "asc", label: "Menor preço" },
            { value: "desc", label: "Maior preço" },
          ]}
          value={filters.order}
          onChange={(value) => setFilters((prev) => ({ ...prev, order: value || "" }))}
          className="mt-3"
        />
      </aside>

      {/* Lista de Carros */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center">Carros disponíveis</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? // Exibir Skeletons enquanto os dados carregam
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                <Skeleton height={200} />
                <Skeleton height={20} width="220px" mt="md" />
                <Skeleton height={16} width="220px" mt="sm" />
                <Skeleton height={40} mt="md" />
              </Card>
            ))
          : cars.length > 0
          ? // Exibir os carros quando os dados forem carregados
            cars.map((car) => (
              <Card key={car._id} shadow="sm" padding="lg" radius="md" withBorder>
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
                  Preço: R$ {(car?.price ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </Text>
                <Button fullWidth mt="md" component={Link} href={`/detail/${car._id}`}>
                  Ver Detalhes
                </Button>
              </Card>
            ))
          : // Caso não haja carros cadastrados
            <p className="text-center col-span-3">Nenhum carro disponível no momento.</p>}
      </div>
      </div>
    </div>
  );
}
