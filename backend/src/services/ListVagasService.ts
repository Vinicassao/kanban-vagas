import { prisma } from "../lib/prismaClient";

export class ListVagasService {
  async execute() {
    const vagas = await prisma.vaga.findMany();
    return vagas;
  }
}
