"use client";

import { useState, useEffect } from "react";
import { Skeleton, Card, Select, Button, Modal, Text, Paper } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import CarCard from "../components/CardCar";
import { Car } from "../types/Car";
import { IoFilter } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
    brand: "",
    order: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch brands
        const brandsRes = await fetch("/api/cars/brands");
        const brandsData = await brandsRes.json();
        setBrands(brandsData);

        // Fetch cars with filters
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, String(value));
        });

        const carsRes = await fetch(`/api/cars?${queryParams.toString()}`);
        const carsData = await carsRes.json();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters]);

  return (
    <div className="container mx-auto pb-6">
      <img
        src="/otima-banner.png"
        alt="image"
        className="rounded-md object-cover"
      />
      <div className="flex justify-between w-full items-center my-6">
        <Button
          leftSection={showFilters ? <FiChevronLeft size={18} /> : <IoFilter size={18} />}
          variant="outline"
          radius="xl"
          onClick={() => setShowFilters(!showFilters)}
          className=""
        >
          {showFilters ? "Ocultar Filtros" : "Filtrar"}
        </Button>

        <Select
          placeholder="Ordenar por"
          label="Ordenar por:"
          data={[
            { value: "", label: "Relevância" },
            { value: "asc", label: "Menor preço" },
            { value: "desc", label: "Maior preço" },
            { value: "newest", label: "Mais novos" },
            { value: "oldest", label: "Mais antigos" },
          ]}
          value={filters.order}
          onChange={(value) => setFilters((prev) => ({ ...prev, order: value || "" }))}
          className="w-40"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar - Desktop */}
        {!isMobile && showFilters && (
          <div className="w-64 flex-shrink-0">
            <Paper shadow="xs" p="xl">
              <Sidebar brands={brands} filters={filters} setFilters={setFilters} />
            </Paper >
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <Text c="dimmed" mb="md">{cars.length} veículos encontrados</Text>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                  <Skeleton height={160} mb="sm" />
                  <Skeleton height={20} width="80%" mb="xs" />
                  <Skeleton height={16} width="60%" mb="sm" />
                  <Skeleton height={36} />
                </Card>
              ))
            ) : cars.length > 0 ? (
              cars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <Text size="lg" c="dimmed">Nenhum veículo encontrado com esses filtros</Text>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      <Modal
        opened={isMobile && showFilters}
        onClose={() => setShowFilters(false)}
        title="Filtros"
        size="85%"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{
          transition: "slide-right",
          duration: 200,
        }}
        closeButtonProps={{
          'aria-label': 'Fechar filtros',
        }}
      >
        <Sidebar brands={brands} filters={filters} setFilters={setFilters} />
        <div className="mt-4 flex justify-center">
          <Button
            fullWidth
            onClick={() => setShowFilters(false)}
            variant="light"
          >
            Aplicar Filtros
          </Button>
        </div>
      </Modal>
    </div>
  );
}