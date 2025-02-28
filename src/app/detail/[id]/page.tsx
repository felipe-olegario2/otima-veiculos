import { useRouter } from "next/router";

export default function CarDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Detalhes do carro {id}</h1>
    </div>
  );
}
