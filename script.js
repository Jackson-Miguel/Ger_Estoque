window.onload = carregarProdutos;
function carregarProdutos() {
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];

    lista.forEach(produto => {
        criarCard(produto);
    });
}

function salvarProduto(produto) {
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    lista.push(produto);
    localStorage.setItem("produtos", JSON.stringify(lista));
}

function addProdutos(produto){
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    lista.push(produto);
    produto.qtde = produto.qtde + `add${produto.idSeguro}`
}

let add_produ = document.getElementById("add_produtos")

function add_prod() {

    const nome = document.getElementById("nome");
    const imagem = document.getElementById("img");
    const qtde = document.getElementById("Qtde");

    const nom = nome.value;
    const q = qtde.value;

    const idSeguro = nome.value.replace(/\s+/g, "_").toLowerCase() + "_" + Date.now();

    const reader = new FileReader();

reader.onload = function (e) {

    const imagemBase64 = e.target.result;

    const produto = {
        idSeguro: nome.value.replace(/\s+/g, "_").toLowerCase() + "_" + Date.now(),
        nome: nom,
        qtde: Number(q),
        imagem: imagemBase64
    };

    salvarProduto(produto);
    criarCard(produto);
};

if (imagem.files.length > 0) {
    reader.readAsDataURL(imagem.files[0]);
}
imagem.value = ""
nome.value = "";
qtde.value = "";
}

function criarCard(produto) {

    const card = document.createElement("div");
    const modal = document.createElement("div");
    const re_modal = document.createElement("div");

    card.classList.add("card");
    card.setAttribute("data-quant", produto.qtde);
    card.style.width = "18rem";

    card.innerHTML = `

        <img src="${produto.imagem}" class="card-img-top img-card">
        <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>

            <div class="d-flex">
                <p class="me-2">Qtde:</p>
                <p class="qtde">${produto.qtde}</p>
            </div>
            <div id="p">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal_${produto.idSeguro}">Adicionar</button>
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#r_${produto.idSeguro}">Remover</button>
            <button class="btn btn-secondary" id="exc_${produto.idSeguro}">Excluir</button>
            </div>
        </div>
    `;

        modal.innerHTML = `
        <div class="modal fade" id="modal_${produto.idSeguro}" data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">Adicionar quantidade</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <input type="number" class="form-control" id="add_${produto.idSeguro}">
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button class="btn btn-success" data-bs-dismiss="modal" id="btn-confirm">Confirmar</button>
                    </div>

                </div>
            </div>
        </div>
    `;

    re_modal.innerHTML = `
    <div class="modal fade" id="r_${produto.idSeguro}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Remover quantidade</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <input type="number" class="form-control" id="remo_${produto.idSeguro}">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="btn-re-confirm">Remover</button>
        </div>
        </div>
    </div>
    </div>
    `;

    document.querySelector(".produtos").appendChild(card);
    document.querySelector(".produtos").append(modal);
    document.querySelector(".produtos").append(re_modal);

    document.getElementById(`exc_${produto.idSeguro}`).addEventListener("click", function()  {
    card.remove();
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    lista = lista.filter(p => p.idSeguro !== produto.idSeguro);
    localStorage.setItem("produtos", JSON.stringify(lista));
    });

    const add = modal.querySelector(`#add_${produto.idSeguro}`);
    const btnConfirm = modal.querySelector("#btn-confirm");
    const qtdeEl = card.querySelector(".qtde");

    btnConfirm.addEventListener("click", function () {
        let valor = Number(add.value || 0);
        produto.qtde = Number(produto.qtde) + valor;
        qtdeEl.innerText = produto.qtde;
        let lista = JSON.parse(localStorage.getItem("produtos")) || [];

        lista = lista.map(p => {
            if (p.idSeguro === produto.idSeguro) {
                p.qtde = produto.qtde;
            }
            return p;
        });

        localStorage.setItem("produtos", JSON.stringify(lista));

        add.value = "";
    });

    const remover = re_modal.querySelector(`#remo_${produto.idSeguro}`);
    const btnConfirmR = re_modal.querySelector("#btn-re-confirm");

    btnConfirmR.addEventListener("click", function () {
        let Rvalor = Number(remover.value || 0);
        if(Number(Rvalor) > produto.qtde){
            alert("Você não tem essa quantidade de produto")
        }else{
            produto.qtde = Number(produto.qtde) - Rvalor;
        }
        qtdeEl.innerText = produto.qtde;
        let lista = JSON.parse(localStorage.getItem("produtos")) || [];

        lista = lista.map(p => {
            if (p.idSeguro === produto.idSeguro) {
                p.qtde = produto.qtde;
            }
            return p;
        });

        localStorage.setItem("produtos", JSON.stringify(lista));

        remover.value = "";
    });
    const lista = document.querySelector(".produtos")
    const OrdAZ = document.getElementById("AZ");
    const OrdZA = document.getElementById("ZA");
    const OrdMenor = document.getElementById("Menor");
    const OrdMaior = document.getElementById("Maior");

    OrdAZ.addEventListener("click", function(){
        const itens = Array.from(lista.children); 
        itens.sort((a, b) => {
            return a.innerText.localeCompare(b.innerText);
        })
        lista.innerHTML = "";

        itens.forEach(item => lista.appendChild(item));
    });

    OrdZA.addEventListener("click", function(){
        const itens = Array.from(lista.children); 
        itens.sort((a, b) => {
            return b.innerText.localeCompare(a.innerText);
        })
        lista.innerHTML = "";

        itens.forEach(item => lista.appendChild(item));
    });

    OrdMenor.addEventListener("click", function(){
        const itens = Array.from(lista.querySelectorAll("[data-quant]"));
        itens.sort((a, b) => {
            return Number(a.dataset.quant) - Number(b.dataset.quant);
        })
        lista.innerHTML = "";

        itens.forEach(item => lista.appendChild(item));
    });

    OrdMaior.addEventListener("click", function(){
        const itens = Array.from(lista.querySelectorAll("[data-quant]")); 
        itens.sort((a, b) => {
            return Number(b.dataset.quant) - Number(a.dataset.quant);
        })
        lista.innerHTML = "";

        itens.forEach(item => lista.appendChild(item));
    });
}