import { Request, Response } from "express";
import { CreateVagaService} from "../services/CreateVagaService";

export class VagasController {
    async create(req: Request, res: Response) {
        const {empresa, cargo, link_vaga, salario} = req.body;
        const createVagaService = new CreateVagaService();
        await createVagaService.execute(function createVagaService.execute);
    }
}
