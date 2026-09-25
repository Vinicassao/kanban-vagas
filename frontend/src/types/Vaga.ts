export type StatusVaga =
  | "APLICADO"
  | "TESTE"
  | "ENTREVISTA"
  | "CONTRATADO"
  | "REJEITADO";

export interface Vaga {
  id: string;
  empresa: string;
  cargo: string;
  status: string;
}