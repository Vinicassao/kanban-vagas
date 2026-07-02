import { prisma } from "../lib/prismaClient";
async function main () {
const vaga = await prisma.vaga.create({
    data: {
        cargo: "Estágiario",
        empresa: "Rhodium"
    },
});
console.log(vaga);
}
main();