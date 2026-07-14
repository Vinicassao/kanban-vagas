import { StatusVaga } from "@prisma/client";
import { prisma } from "../lib/prismaClient";

interface UpdateVagaStatusServiceRequest {
  status: StatusVaga;
  id: string;
}

export class UpdateVagaStatusService {
  async execute({ id, status }: UpdateVagaStatusServiceRequest) {
    const vaga = await prisma.vaga.update({
      where: { id },
      data: { status },
    });
   
    return vaga;
  }
}
