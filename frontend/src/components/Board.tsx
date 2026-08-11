import { Column } from "./Column";
import type { Vaga } from "../types/Vaga";

const vagas: Vaga[] = [
  {
    id: "1",
    empresa: "Google",
    cargo: "Desenvolvedor Junior",
    status: "Aplicado",
  },
  {
    id: "2",
    empresa: "Meta",
    cargo: "Backend Junior",
    status: "Teste",
  },
  {
    id: "4",
    empresa: "Nubank",
    cargo: "Dev FullStack",
    status: "Teste",
  },
  {
    id: "2",
    empresa: "Fenix",
    cargo: "Backend Junior",
    status: "Rejeitado",
  },
];

export function Board() {
  return (
    <div className="flex gap-6 p-8 overflow-x-auto min-h-screen bg-white">
      <Column
        title="Aplicado"
        vagas={vagas.filter((vaga) => vaga.status === "Aplicado")}
      />
      <Column
        title="Teste"
        vagas={vagas.filter((vaga) => vaga.status === "Teste")}
      />
      <Column
        title="Entrevista"
        vagas={vagas.filter((vaga) => vaga.status === "Entrevista")}
      />
      <Column
        title="Contratado"
        vagas={vagas.filter((vaga) => vaga.status === "Contratado")}
      />
      <Column
        title="Rejeitado"
        vagas={vagas.filter((vaga) => vaga.status === "Rejeitado")}
      />
    </div>
  );
}
