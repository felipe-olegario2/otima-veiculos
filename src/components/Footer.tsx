import { FaInstagram, FaWhatsapp, FaYoutube  } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white mt-12 p-6 text-center text-gray-700 border-t border-gray-200">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Nome e direitos */}
        <div className="text-sm">
          © {year} <span className="font-semibold">Ótima Veículos</span> — Todos os direitos reservados.
        </div>

        {/* Links de redes sociais */}
        <div className="flex gap-4 justify-center">
          <a
            href="https://www.instagram.com/otimaveiculosoficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5511943637539"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCLEJbrlD-bESgHViDQmKmmA"
            target="_blank"
            className="hover:text-red-600 transition-colors"
            aria-label="Email"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
