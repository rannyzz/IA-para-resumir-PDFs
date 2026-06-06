const lerPDF = require("./pdfReader");
const resumir = require("./ai");

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

app.use(cors());

const upload = multer({
  dest: "uploads/"
});

app.post("/upload", upload.single("pdf"), async (req, res) => {

    try {

        console.log("REQUISIÇÃO RECEBIDA");

        const texto = await lerPDF(req.file.path);

        const resumo = await resumir(texto);

        console.log(resumo);

        res.json({
            resumo
        });

    } catch(err) {

        console.error(err);

        res.status(500).json({
            resumo: "ERRO: " + err.message
        });

    }

});
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});