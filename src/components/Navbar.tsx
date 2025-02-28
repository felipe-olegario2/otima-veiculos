import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          Otima Veículos
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
