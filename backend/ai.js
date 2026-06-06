const { Ollama } = require("ollama");

const ollama = new Ollama({
    host: "http://127.0.0.1:11434"
});

async function resumir(texto) {

    const resposta = await ollama.chat({
        model: "llama3.2",
        messages: [
            {
                role: "user",
                content: `
Faça um resumo organizado do texto abaixo.

Retorne:
- Resumo Geral
- Principais Tópicos
- Palavras-chave

Texto:
${texto}
`
            }
        ]
    });

    return resposta.message.content;
}

module.exports = resumir;