import { Request, Response } from "express";
import { CreateVagaService } from "../services/CreateVagaService";
import { ListVagasService } from "../services/ListVagasService";
import { UpdateVagaStatusService } from "../services/UptadeVagaStatusService";

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

  async list(req: Request, res: Response) {
    try {
      const listVagasService = new ListVagasService();
      const vagas = await listVagasService.execute();
      return res.status(200).json(vagas);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao trazer a lista de vagas." });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
    const updateStatusService = new UpdateVagaStatusService();
    const id = req.params.id as string;
    const { status } = req.body;
    const vaga = await updateStatusService.execute({
      id,
      status,
    });
    return res.status(200).json(vaga);
      } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Erro ao tentar atualizar o status da vaga"});
      }
  }
}
