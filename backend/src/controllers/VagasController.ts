import { Request, Response } from "express";
import { CreateVagaService } from "../services/CreateVagaService";

export class VagasController {
  async create(req: Request, res: Response) {
    try {
      const { empresa, cargo, link_vaga, salario } = req.body;

      const createVagaService = new CreateVagaService();

      const vaga = await createVagaService.execute({
        empresa,
        cargo,
        link_vaga,
        salario,
      });
      return res.status(201).json(vaga);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao criar a vaga. Verifique os dados enviado." });
    }
  }
}
