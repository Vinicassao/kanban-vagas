import type { StatusVaga, Vaga } from "../types/Vaga";
import { stages } from "../types/stages.ts";

const modalidades = ["A definir", "Remoto", "Híbrido", "Presencial"];
function hasControlCharacters(value: string): boolean {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });
}

export function isStatusVaga(value: unknown): value is StatusVaga {
  return stages.some((stage) => stage.status === value);
}

// URLs são dados não confiáveis, inclusive quando vêm do armazenamento local.
export function safeExternalUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 2048 || hasControlCharacters(trimmed))
    return null;
  try {
    const url = new URL(trimmed);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      !url.hostname ||
      url.username ||
      url.password
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}

function text(value: unknown, maxLength: number, field: string): string {
  if (typeof value !== "string")
    throw new Error(`${field}: informe um texto válido.`);
  const normalized = value.trim();
  if (
    !normalized ||
    normalized.length > maxLength ||
    hasControlCharacters(normalized)
  ) {
    throw new Error(
      `${field}: use entre 1 e ${maxLength} caracteres, sem caracteres de controle.`,
    );
  }
  // Não remove tags: a saída deve continuar sendo texto escapado pelo React.
  return normalized;
}

function optionalText(value: unknown, field: string): string {
  if (value === undefined) return "";
  if (typeof value !== "string") throw new Error(`${field}: valor inválido.`);
  return value.trim();
}

export function validateVaga(input: unknown): Vaga {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Vaga inválida.");
  const value = input as Record<string, unknown>;
  const id = text(value.id, 100, "Identificador");
  const empresa = text(value.empresa, 100, "Empresa");
  const cargo = text(value.cargo, 120, "Cargo");
  if (!isStatusVaga(value.status))
    throw new Error("Selecione uma etapa válida.");
  const modalidade = optionalText(value.modalidade, "Modalidade");
  if (modalidade && !modalidades.includes(modalidade))
    throw new Error("Selecione uma modalidade válida.");
  const salario = optionalText(value.salario, "Salário");
  if (
    salario &&
    (!/^\d{1,9}(\.\d{1,2})?$/.test(salario) ||
      !Number.isFinite(Number(salario)))
  ) {
    throw new Error(
      "Salário: informe um valor positivo com até 9 dígitos e 2 casas decimais.",
    );
  }
  const rawLink = optionalText(value.link, "Link");
  const link = rawLink ? safeExternalUrl(rawLink) : "";
  if (link === null)
    throw new Error("Link: use uma URL HTTP ou HTTPS, sem usuário ou senha.");
  // Reconstrói apenas os campos conhecidos, descartando propriedades extras.
  return {
    id,
    empresa,
    cargo,
    status: value.status,
    modalidade,
    salario,
    link,
  };
}

export function validateVagas(input: unknown): Vaga[] {
  if (!Array.isArray(input)) throw new Error("Lista de vagas inválida.");
  const vagas = input.map(validateVaga);
  if (new Set(vagas.map((vaga) => vaga.id)).size !== vagas.length)
    throw new Error("Identificadores duplicados.");
  return vagas;
}
