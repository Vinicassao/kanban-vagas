import type { StatusVaga } from './Vaga';
export const stages: { status: StatusVaga; title: string; color: string }[] = [
  { status: 'APLICADO', title: 'Aplicado', color: 'applied' },
  { status: 'TESTE', title: 'Teste', color: 'test' },
  { status: 'ENTREVISTA', title: 'Entrevista', color: 'interview' },
  { status: 'CONTRATADO', title: 'Contratado', color: 'hired' },
  { status: 'REJEITADO', title: 'Rejeitado', color: 'rejected' },
];

