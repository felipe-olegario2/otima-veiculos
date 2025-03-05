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

export async function GET(req: Request) {
  await connectDB();
  
  // Pegar parâmetros da query string
  const { searchParams } = new URL(req.url);
  const yearFrom = searchParams.get("yearFrom");
  const yearTo = searchParams.get("yearTo");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const order = searchParams.get("order"); // "asc" ou "desc"

  // Criar um objeto de filtro para MongoDB
  let filters: any = {};

  // Filtro por ano (de/até)
  if (yearFrom || yearTo) {
    filters.year = {};
    if (yearFrom) filters.year.$gte = parseInt(yearFrom);
    if (yearTo) filters.year.$lte = parseInt(yearTo);
  }

  // Filtro por preço (de/até)
  if (priceFrom || priceTo) {
    filters.price = {};
    if (priceFrom) filters.price.$gte = parseFloat(priceFrom);
    if (priceTo) filters.price.$lte = parseFloat(priceTo);
  }

  // Filtro por marca
  if (brand) {
    filters.brand = new RegExp(brand, "i"); // Case insensitive (ex: "toyota" == "Toyota")
  }

  // Filtro por modelo (nome do carro)
  if (model) {
    filters.name = new RegExp(model, "i");
  }

  // Definir ordenação (1 = crescente, -1 = decrescente)
  let sortOption: any = {};
  if (order === "asc") {
    sortOption.price = 1; // Menor preço primeiro
  } else if (order === "desc") {
    sortOption.price = -1; // Maior preço primeiro
  }

  try {
    // Buscar no MongoDB aplicando filtros e ordenação
    const cars = await Car.find(filters).sort(sortOption);
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Erro ao buscar carros:", error);
    return NextResponse.json({ message: "Erro ao buscar carros" }, { status: 500 });
  }
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
