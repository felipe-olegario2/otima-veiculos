import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MantineProvider } from '@mantine/core';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <MantineProvider>
          <Navbar />
          <main className="container mx-auto p-6">{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
