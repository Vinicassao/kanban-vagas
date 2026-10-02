import type { Vaga } from "../types/Vaga";
import { validateVagas } from "../security/vagaValidation.ts";

const storageKey = "kanban-vagas-ui-v1";

const initialVagas: Vaga[] = [
  {
    id: "1",
    empresa: "Google",
    cargo: "Desenvolvedor Júnior",
    status: "APLICADO",
  },
  { id: "2", empresa: "Meta", cargo: "Backend Júnior", status: "TESTE" },
  { id: "3", empresa: "Nubank", cargo: "Dev Full Stack", status: "TESTE" },
  { id: "4", empresa: "Fenix", cargo: "Backend Júnior", status: "REJEITADO" },
];

export function loadVagas(): Vaga[] {
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(storageKey) || "null",
    );
    if (saved !== null) return validateVagas(saved);
  } catch {
    // Mantém os exemplos disponíveis quando o armazenamento não pode ser lido.
  }

  return initialVagas;
}

export function saveVagas(vagas: Vaga[]): void {
  localStorage.setItem(storageKey, JSON.stringify(validateVagas(vagas)));
}
