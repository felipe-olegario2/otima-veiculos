"use client";

import { useState, useEffect } from "react";
import { Skeleton, Card, Select, Button } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import CarCard from "../components/CardCar";
import { Car } from "../types/Car";
import { IoFilter } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";


export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true); // Estado para exibir/esconder Sidebar
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
    <div>
      <div className="flex items-center pb-4 gap-56">
        <Button
          leftSection={showFilters ? <FiChevronLeft/> : <IoFilter />}
          variant="outline"
          radius="xl"
          onClick={() => setShowFilters(!showFilters)} // Alterna a visibilidade do Sidebar
        >
          {showFilters ? "Esconder Filtros" : "Filtros"}
        </Button>
      </div>
      <div className="flex gap-4">
      {showFilters && <Sidebar brands={brands} filters={filters} setFilters={setFilters} />}

        {/* Lista de Carros */}
        <div className="flex-1">
        <div className="flex items-center pb-4 justify-between">
        <span className="font-thin">{cars.length} Carros encontrados</span>
          <div className="flex items-center gap-2">
            <span>Ordenar por: </span>
            <Select
              placeholder="Mais relevantes"
              data={[
                { value: "asc", label: "Menor preço" },
                { value: "desc", label: "Maior preço" },
              ]}
              comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
              value={filters.order}
              onChange={(value) => setFilters((prev) => ({ ...prev, order: value || "" }))}
            />
          </div>
        </div>
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
                ? cars.map((car) => <CarCard key={car._id} car={car} />)
                : <p className="text-center col-span-3">Nenhum carro disponível no momento.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
