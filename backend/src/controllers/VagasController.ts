const service = new CreateVagaService();

await service.execute({
    empresa: "Rhodium",
    cargo: "Ajudante de produção",
    link_vaga: "https://...",
    salario: 2200,
});