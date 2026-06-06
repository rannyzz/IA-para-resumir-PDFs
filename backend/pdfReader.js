const fs = require("fs");
const pdf = require("pdf-parse");

async function lerPDF(caminho) {
    const buffer = fs.readFileSync(caminho);
    const data = await pdf(buffer);
    return data.text;
}

module.exports = lerPDF;