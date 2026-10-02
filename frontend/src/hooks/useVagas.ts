import { useState } from "react";
import { loadVagas, saveVagas } from "../services/vagasStorage";
import type { StatusVaga, Vaga } from "../types/Vaga";
import { isStatusVaga, validateVaga } from "../security/vagaValidation";

export function useVagas() {
  const [vagas, setVagas] = useState(loadVagas);
  const [storageError, setStorageError] = useState(false);

  function updateVagas(next: Vaga[]) {
    try {
      saveVagas(next);
      setStorageError(false);
    } catch {
      setStorageError(true);
    }

    // A interface continua utilizável mesmo se o navegador impedir a gravação.
    setVagas(next);
  }

  function addVaga(vaga: Vaga) {
    const validated = validateVaga(vaga);
    if (vagas.some((existing) => existing.id === validated.id))
      throw new Error("Esta vaga já existe.");
    updateVagas([...vagas, validated]);
  }

  function moveVaga(id: string, status: StatusVaga) {
    if (!isStatusVaga(status) || !vagas.some((vaga) => vaga.id === id)) return;
    updateVagas(
      vagas.map((vaga) => (vaga.id === id ? { ...vaga, status } : vaga)),
    );
  }

  const stats = {
    total: vagas.length,
    active: vagas.filter(
      (vaga) => !["CONTRATADO", "REJEITADO"].includes(vaga.status),
    ).length,
    interviews: vagas.filter((vaga) => vaga.status === "ENTREVISTA").length,
    hired: vagas.filter((vaga) => vaga.status === "CONTRATADO").length,
  };

  return { vagas, storageError, stats, addVaga, moveVaga };
}
