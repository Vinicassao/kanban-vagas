import express from "express";
import { vagasRoutes } from "./routes/vagas.routes";

const app = express()

app.use(express.json());
app.use("/vagas", vagasRoutes);

app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333');
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando")
});