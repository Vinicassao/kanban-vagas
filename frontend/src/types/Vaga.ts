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
  status: StatusVaga;
  modalidade?: string;
  salario?: string;
  link?: string;
}
