import { StatusVaga } from "@prisma/client";
import { prisma } from "../lib/prismaClient";

interface UptadeVagaStatusServiceRequest {
  status: StatusVaga;
  id: string;
}

export class UptadeVagaStatusService {
  async execute({ id, status }: UptadeVagaStatusServiceRequest) {
    const vaga = await prisma.vaga.update({
      where: { id },
      data: { status },
    });
   
    return vaga;
  }
}
