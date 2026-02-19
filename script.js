const banana = document.getElementById("qtde_banana");
const tomate = document.getElementById("qtde_to");
const uva = document.getElementById("qtde_uva");
const pera = document.getElementById("qtde_pera");
const manga = document.getElementById("qtde_manga");

const add_banana = document.getElementById("val_banana");
const add_tomate = document.getElementById("val_tomate");
const add_uva = document.getElementById("val_uva");
const add_pera = document.getElementById("val_pera");
const add_manga = document.getElementById("val_manga");

const re_banana = document.getElementById("r_val_banana");
const re_tomate = document.getElementById("r_val_tomate");
const re_uva = document.getElementById("r_val_uva");
const re_pera = document.getElementById("r_val_pera");
const re_manga = document.getElementById("r_val_manga");

const card_banana = document.getElementById("card_banana");
const card_tomate = document.getElementById("card_tomate");
const card_uva = document.getElementById("card_uva");
const card_pera = document.getElementById("card_pera");
const card_manga = document.getElementById("card_manga");

window.onload = carregarProdutos;
function carregarProdutos() {
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];

    lista.forEach(produto => {
        criarCard(produto);
    });

    banana.innerText = localStorage.getItem("banana");
    tomate.innerText = localStorage.getItem("tomate");
    uva.innerText = localStorage.getItem("uva");
    pera.innerText = localStorage.getItem("pera");
    manga.innerText = localStorage.getItem("manga");
}

function salvarProduto(produto) {
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];

    lista.push(produto);

    localStorage.setItem("produtos", JSON.stringify(lista));
}

//Adicionar itens
function add_ban(){
    let tot_ban = Number(banana.innerText) + Number(add_banana.value);
    banana.innerText = tot_ban;
    localStorage.setItem("banana", tot_ban);
    add_banana.value = ""
}
function add_tom(){
    let tot_toma = Number(tomate.innerText) + Number(add_tomate.value);
    tomate.innerText = tot_toma;
    localStorage.setItem("tomate", tot_toma);
    add_tomate.value = ""
} 
function add_uv(){
    let tot_uva = Number(uva.innerText) + Number(add_uva.value);
    uva.innerText = tot_uva;
    localStorage.setItem("uva", tot_uva);
    add_uva.value = ""
} 
function add_per(){
    let tot_pera = Number(pera.innerText) + Number(add_pera.value);
    pera.innerText = tot_pera;
    localStorage.setItem("pera", tot_pera)
    add_pera.value = ""
} 
function add_mang(){
    let tot_mang = Number(manga.innerText) + Number(add_manga.value);
    manga.innerText = tot_mang;
    localStorage.setItem("manga", tot_mang);
    add_manga.value = ""
}

//Remover itens
function re_ban() {
    banana.innerText = localStorage.getItem("banana");
    let atual = Number(banana.innerText);
    let remover = Number(re_banana.value);
    if (remover <= atual) {
        let tot_ban = atual - remover;
        banana.innerText = tot_ban;
        localStorage.setItem("banana", tot_ban);
        re_banana.value = "";
    } else {
        alert("Você não tem essa quantidade de produto");
        re_banana.value = "";
    }
}
function re_tom() {
    tomate.innerText = localStorage.getItem("tomate");
    let atual = Number(tomate.innerText);
    let remover = Number(re_tomate.value);
    if (remover <= atual) {
        let tot_toma = atual - remover;
        tomate.innerText = tot_toma;
        localStorage.setItem("tomate", tot_toma);
        re_tomate.value = "";
    } else {
        alert("Você não tem essa quantidade de produto");
        re_tomate.value = "";
    }
} 
function re_uv(){
    uva.innerText = localStorage.getItem("uva");
    let atual = Number(uva.innerText);
    let remover = Number(re_uva.value);
    if(remover <= atual){
        tot_uva = atual -  remover
        uva.innerText = tot_uva;
        localStorage.setItem("uva", tot_uva);
        re_uva.value = "";
    }else{
        alert("Você não tem essa quantidade de produto");
        re_uva.value = "";
    }

} 
function re_per(){
    pera.innerText = localStorage.getItem("pera");
    let atual = Number(pera.innerText);
    let remover = Number(re_pera.value);
    if(remover <= atual){
        tot_pera =  atual - remover; 
        pera.innerText = tot_pera;
        localStorage.setItem("pera", tot_pera);
        re_pera = "";
    }else{
        alert("Você não tem essa quantidade de produto");
        re_pera = "";
    }
} 
function re_mang(){
    manga.innerText = localStorage.getItem("manga");
    let atual = Number(manga.innerText);
    let remover = Number(re_manga.value);
    if(remover <= atual){
        tot_mang =  atual - remover; 
        manga.innerText = tot_mang;
        localStorage.setItem("manga", tot_mang);
        re_manga.value = "";
    }else{
        alert("Você não tem essa quantidade de produto");
        re_manga.value = ""
    }
}

let add_produ = document.getElementById("add_produtos")

function add_prod() {

    const card = document.createElement("div");
    const modal = document.createElement("div");
    const re_modal = document.createElement("div");

    const nome = document.getElementById("nome");
    const imagem = document.getElementById("img");
    const qtde = document.getElementById("Qtde");

    const idSeguro = nome.value.replace(/\s+/g, "_").toLowerCase() + "_" + Date.now();

    const reader = new FileReader();

reader.onload = function (e) {

    const imagemBase64 = e.target.result;

    const produto = {
        idSeguro: nome.value.replace(/\s+/g, "_").toLowerCase() + "_" + Date.now(),
        nome: nome.value,
        qtde: Number(qtde.value),
        imagem: imagemBase64
    };

    salvarProduto(produto);

    criarCardNaTela(produto);
};

if (imagem.files.length > 0) {
    reader.readAsDataURL(imagem.files[0]);
}

    modal.innerHTML = `
        <div class="modal fade" id="modal_${idSeguro}" data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">Adicionar quantidade</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <input type="number" class="form-control input-add">
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button class="btn btn-success btn-confirm" data-bs-dismiss="modal">
                            Confirmar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `;

    re_modal.innerHTML = `
    <div class="modal fade" id="r_${idSeguro}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Digite a quantidade produtos</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <input type="text" id="r_val_banana" class="form-control input-add">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" >Remover</button>
        </div>
        </div>
    </div>
    </div>
    `
    document.querySelector(".produtos").appendChild(card);
    document.body.appendChild(modal);
    document.body.appendChild(re_modal);

    const btnAdd = modal.querySelector(".btn-confirm");
    const inputAdd = modal.querySelector(".input-add");
    const qtdeEl = card.querySelector(".qtde");

    btnAdd.addEventListener("click", function () {

        let total = Number(qtdeEl.innerText) + Number(inputAdd.value || 0);

        qtdeEl.innerText = total;

        localStorage.setItem(idSeguro, total);

        inputAdd.value = "";
    });

    salvarProduto({
        nome: nome.value,
        qtde: Number(qtde.value),
        imagem: urlArq
    });

nome.value = "";
qtde.value = "";
imagem.value = ""
}

function criarCard(produto) {

    const card = document.createElement("div");

    card.classList.add("card");
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

    document.querySelector(".produtos").appendChild(card);
    document.getElementById(`exc_${produto.idSeguro}`).addEventListener("click", function()  {
    card.remove();
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    lista = lista.filter(p => p.idSeguro !== produto.idSeguro);
    localStorage.setItem("produtos", JSON.stringify(lista));
    })
}

    document.getElementById("exc_banana").addEventListener("click", function()  {
    card_banana.remove();
    let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    lista = lista.filter(p => p.idSeguro !== produto.idSeguro);
    localStorage.setItem("produtos", JSON.stringify(lista));
    })
