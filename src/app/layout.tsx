import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MantineProvider } from "@mantine/core";
import { createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import DynamicContainer from "@/components/DynamicContainer"; // ✅ Importando o novo componente Client
import '@mantine/carousel/styles.css';
import { Figtree, Inter } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const theme = createTheme({
  primaryColor: "blue",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${figtree.variable} ${inter.variable}`}>
      <body className={`bg-[#fbfbff] min-h-screen flex flex-col ${figtree.className}`}>
        <MantineProvider theme={theme}>
          <Navbar />
          <DynamicContainer>{children}</DynamicContainer>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
