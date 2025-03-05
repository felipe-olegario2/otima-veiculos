import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Car from "@/lib/models/Car";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configuração do MinIO
const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:9000", // Se Next.js estiver no Docker, use "http://minio:9000"
  forcePathStyle: true, // Importante para MinIO
  credentials: {
    accessKeyId: "minioadmin",
    secretAccessKey: "minioadmin123",
  },
});

export async function GET() {
  await connectDB();
  const cars = await Car.find();
  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ message: "Imagens obrigatórias" }, { status: 400 });
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      // Convertendo para Buffer e pegando o tamanho
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentLength = buffer.length;

      // Upload para MinIO
      await s3.send(
        new PutObjectCommand({
          Bucket: "otima-veiculos",
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
          ContentLength: contentLength, // Define o tamanho correto do arquivo
        })
      );

      // Criar URL da imagem e adicionar ao array
      const imageUrl = `http://localhost:9000/otima-veiculos/${fileName}`;
      imageUrls.push(imageUrl);
    }

    // Criar novo carro no MongoDB com as imagens
    const newCar = await Car.create({
      name: formData.get("name"),
      price: formData.get("price"),
      img: imageUrls, // Agora recebe um array de imagens
      year: formData.get("year"),
      brand: formData.get("brand"),
      description: formData.get("description"),
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar carro:", error);
    return NextResponse.json({ message: "Erro ao criar carro" }, { status: 500 });
  }
}
