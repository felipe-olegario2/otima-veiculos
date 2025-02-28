import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Car from "@/lib/models/Car";

// GET - Lista todos os carros
export async function GET() {
  await connectDB();
  const cars = await Car.find();
  return NextResponse.json(cars);
}

// POST - Cria um novo carro
export async function POST(req: Request) {
  await connectDB();
  try {
    const data = await req.json();
    const newCar = await Car.create(data);
    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao criar carro" }, { status: 500 });
  }
}
