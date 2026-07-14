import { Router } from "express";
import { VagasController } from "../controllers/VagasController";

const vagasRoutes = Router();

const vagasController = new VagasController();

vagasRoutes.post("/", vagasController.create);
vagasRoutes.get("/", vagasController.list);
vagasRoutes.patch("/:id/status", vagasController.uptadeStatus);

export { vagasRoutes };
