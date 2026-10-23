export type StatusVaga =
  | "APLICADO"
  | "TESTE"
  | "ENTREVISTA"
  | "CONTRATADO"
  | "REJEITADO";

// Dados enviados na criação: ID e status são definidos pelo backend.
export interface CreateVagaInput {
  empresa: string;
  cargo: string;
  link_vaga?: string;
  salario?: number;
}

// Modelo local existente, mantido até a integração da leitura com a API.
export interface Vaga {
  id: string;
  empresa: string;
  cargo: string;
  status: StatusVaga;
  modalidade?: string;
  salario?: string;
  link?: string;
}
