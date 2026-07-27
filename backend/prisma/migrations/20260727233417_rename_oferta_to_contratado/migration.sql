-- CreateEnum
CREATE TYPE "StatusVaga" AS ENUM ('APLICADO', 'TESTE', 'ENTREVISTA', 'CONTRATADO', 'REJEITADO');

-- CreateTable
CREATE TABLE "vagas" (
    "id" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "link_vaga" TEXT,
    "salario" DECIMAL(65,30),
    "status" "StatusVaga" NOT NULL DEFAULT 'APLICADO',
    "data_aplicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vagas_pkey" PRIMARY KEY ("id")
);
