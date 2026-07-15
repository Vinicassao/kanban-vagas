import { prisma } from "../lib/prismaClient";

interface DeleteVagaRequest {
  id: string;
}

export class DeleteVagaService {
  async execute({ id }: DeleteVagaRequest) {
    const vaga = await prisma.vaga.delete({
      where: { id },
    });
    return vaga;
  }
}
