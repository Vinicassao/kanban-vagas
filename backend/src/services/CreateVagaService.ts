import { prisma } from "../lib/prismaClient";

interface CreateVagaRequest {
    empresa: string;
    cargo: string;
    link_vaga?: string;
    salario?: number;
}

export class CreateVagaRequest {
    async execute({empresa, cargo, link_vaga, salario}: CreateVagaRequest) {
        
    }
}