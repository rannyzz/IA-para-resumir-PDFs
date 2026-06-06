const dropZone = document.getElementById("dropZone");
const input = document.getElementById("pdfInput");

let arquivo = null;

dropZone.addEventListener("click", () => {
    input.click();
});

input.addEventListener("change", (e) => {
    arquivo = e.target.files[0];

    dropZone.innerHTML = `
        <div class="upload-content">
            <h2>${arquivo.name}</h2>
            <p>PDF selecionado</p>
        </div>
    `;
});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    arquivo = e.dataTransfer.files[0];

    dropZone.classList.remove("drag");

    dropZone.innerHTML = `
        <div class="upload-content">
            <h2>${arquivo.name}</h2>
            <p>PDF carregado</p>
        </div>
    `;
});

document.getElementById("sendBtn").addEventListener("click", async () => {

    if(!arquivo){
        alert("Selecione um PDF");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");

    const formData = new FormData();
    formData.append("pdf", arquivo);

    const response = await fetch(
        "http://localhost:3000/upload",
        {
            method:"POST",
            body:formData
        }
    );

    const data = await response.json();

    document.getElementById("loading").classList.add("hidden");

    document.getElementById("result").classList.remove("hidden");

    document.getElementById("summary").innerHTML =
    data.resumo.replace(/\n/g, "<br>");
});