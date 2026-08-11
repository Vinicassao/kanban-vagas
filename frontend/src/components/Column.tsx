import { Card } from "./Card";
import type { Vaga } from "../types/Vaga";

interface ColumnProps {
  title: string;
  vagas: Vaga[];
}

export function Column({ title, vagas }: ColumnProps) {
  return (
    <div className="flex flex-col gap-3 bg-gray-100/50 p-4 rounded-xl w-80 min-h-[500px]">
      <h1 className="font-bold text-gray-700 text-lg mb-4">{title}</h1>
      {vagas.map((vaga) => (
        <Card
          key={vaga.id}
          empresa={vaga.empresa}
          cargo={vaga.cargo}
        />
      ))}
    </div>
  );
}
