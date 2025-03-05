"use client";

import { usePathname } from "next/navigation";

export default function DynamicContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/"; // Verifica se está na Home para expandir o layout

  return (
    <main className={isHome ? "max-w-8xl mx-auto p-6 flex-1" : "container mx-auto p-6 flex-1"}>
      {children}
    </main>
  );
}
