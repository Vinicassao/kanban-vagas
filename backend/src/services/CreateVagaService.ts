import { prisma } from "../lib/prismaClient";

interface CreateVagaRequest {
    empresa: string;
    cargo: string;
    link_vaga?: string;
    salario?: number;
}

export class CreateVagaService {
    async execute({empresa, cargo, link_vaga, salario}: CreateVagaRequest) {
        const vaga = await prisma.vaga.create({
            data: {
                empresa,
                cargo,
                link_vaga,
                salario
            }
        });
        return vaga;
    }
}