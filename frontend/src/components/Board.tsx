import { Column } from "./Column";
import type { Vaga } from "../types/Vaga";
import { useState } from "react";
import { NewVagaModal } from "./NewVagaModal";

const vagas: Vaga[] = [
  {
    id: "1",
    empresa: "Google",
    cargo: "Desenvolvedor Junior",
    status: "APLICADO",
  },
  {
    id: "2",
    empresa: "Meta",
    cargo: "Backend Junior",
    status: "TESTE",
  },
  {
    id: "3",
    empresa: "Nubank",
    cargo: "Dev FullStack",
    status: "TESTE",
  },
  {
    id: "4",
    empresa: "Fenix",
    cargo: "Backend Junior",
    status: "REJEITADO",
  },
];

export function Board() {
  const [isNewVagaModalOpen, setIsNewVagaModalOpen] = useState(false);

  return (
    <>
      <div className="px-8 pt-8 flex justify-end">
        <button
          type="button"
          onClick={() => setIsNewVagaModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >Nova Vaga
        </button>
      </div>

      <div className="flex gap-6 p-8 overflow-x-auto min-h-screen bg-white">
        <Column
          title="Aplicado"
          vagas={vagas.filter((vaga) => vaga.status === "APLICADO")}
        />
        <Column
          title="Teste"
          vagas={vagas.filter((vaga) => vaga.status === "TESTE")}
        />
        <Column
          title="Entrevista"
          vagas={vagas.filter((vaga) => vaga.status === "ENTREVISTA")}
        />
        <Column
          title="Contratado"
          vagas={vagas.filter((vaga) => vaga.status === "CONTRATADO")}
        />
        <Column
          title="Rejeitado"
          vagas={vagas.filter((vaga) => vaga.status === "REJEITADO")}
        />
      </div>

      {isNewVagaModalOpen && (
        <NewVagaModal onClose={() => setIsNewVagaModalOpen(false)} />
      )}
    </>
  );
}
