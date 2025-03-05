import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MantineProvider } from "@mantine/core";
import { createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import DynamicContainer from "@/components/DynamicContainer"; // ✅ Importando o novo componente Client
import '@mantine/carousel/styles.css';

const theme = createTheme({
  primaryColor: "blue",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <MantineProvider theme={theme}>
          <Navbar />
          <DynamicContainer>{children}</DynamicContainer>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
