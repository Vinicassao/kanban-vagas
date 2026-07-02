import express from "express";

const app = express()

app.use(express.json());

app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333');
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando")
});