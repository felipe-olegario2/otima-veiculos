"use client";

import { useState } from "react";
import { Text, Select, NumberInput } from "@mantine/core";

interface Filters {
  yearFrom: string | number;
  yearTo: string | number;
  priceFrom: string | number;
  priceTo: string | number;
  brand: string;
  order: string;
}

interface SidebarProps {
  brands: string[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function Sidebar({ brands, filters, setFilters }: SidebarProps) {
  return (
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
        value={filters.priceFrom}
        onChange={(value) => setFilters((prev) => ({ ...prev, priceFrom: value }))}
        className="mt-3"
      />

      <NumberInput
        hideControls
        label="Preço máximo"
        min={0}
        value={filters.priceTo}
        onChange={(value) => setFilters((prev) => ({ ...prev, priceTo: value }))}
        className="mt-3"
      />

      <Select
        label="Marca"
        placeholder="Honda"
        data={brands}
        value={filters.brand}
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
        onChange={(value) => setFilters((prev) => ({ ...prev, brand: value || "" }))}
        className="mt-3"
      />
    </aside>
  );
}
