import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-white border-b-2 border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Image
            src="/logo-otima-veiculos.jpeg"
            alt="logo"
            width={100}
            height={150}
          />
        </Link>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">Sobre</Link>
          <Link href="/contact">Contato</Link>
        </div>
      </div>
    </nav>
  );
}
