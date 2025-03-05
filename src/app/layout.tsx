import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MantineProvider } from "@mantine/core";
import { createTheme } from "@mantine/core";
import "@mantine/core/styles.css"; // Importação correta dos estilos globais
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

// Criando um tema personalizado (opcional)
const theme = createTheme({
  primaryColor: "blue", // Altere conforme necessário
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <MantineProvider theme={theme}>
          <Navbar />
          <main className="flex-1">
            <div className="container mx-auto p-6">{children}</div>
          </main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
