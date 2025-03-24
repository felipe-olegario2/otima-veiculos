"use client";

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
    <aside className="w-full bg-white rounded-md h-fit">
      <Text className="text-lg font-semibold mb-2">Ano</Text>
      <div className="flex items-center gap-2 mb-4">
        <NumberInput
          hideControls
          label="De"
          placeholder="1900"
          min={1900}
          max={new Date().getFullYear()}
          value={filters.yearFrom}
          onChange={(value) => {
            const sanitizedValue = value?.toString().replace(/\D/g, "").slice(0, 4) || "";
            setFilters((prev) => ({ ...prev, yearFrom: Number(sanitizedValue) || "" }));
          }}
        />
        <NumberInput
          hideControls
          label="Até"
          placeholder="2025"
          min={1900}
          max={new Date().getFullYear() + 1}
          value={filters.yearTo}
          onChange={(value) => {
            const sanitizedValue = value?.toString().replace(/\D/g, "").slice(0, 4) || "";
            setFilters((prev) => ({ ...prev, yearTo: Number(sanitizedValue) || "" }));
          }}
        />
      </div>

      <Text className="text-lg font-semibold mb-2">Preço</Text>
      <div className="flex items-center gap-2 mb-4">
        <NumberInput
          hideControls
          label="De"
          placeholder="R$"
          min={0}
          value={filters.priceFrom}
          decimalSeparator=","
          thousandSeparator="."
          onChange={(value) => setFilters((prev) => ({ ...prev, priceFrom: value }))}
        />
        <NumberInput
          hideControls
          label="Até"
          placeholder="R$"
          min={0}
          value={filters.priceTo}
          decimalSeparator=","
          thousandSeparator="."
          onChange={(value) => setFilters((prev) => ({ ...prev, priceTo: value }))}
        />
      </div>

      <Text className="text-lg font-semibold mb-2">Marca</Text>
      <Select
        placeholder="Selecione uma marca"
        data={brands}
        value={filters.brand}
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
        onChange={(value) => setFilters((prev) => ({ ...prev, brand: value || "" }))}
        className="mb-4"
      />
    </aside>
  );
}