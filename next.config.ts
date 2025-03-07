/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9003", // Porta do MinIO
        pathname: "/otima-veiculos/**", // Permitir imagens do bucket
      },
    ],
  },
};

module.exports = nextConfig;
