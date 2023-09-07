import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades"

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {}

function abrircarrinho() {
    document.getElementById("carrinho").classList.remove("right-[-360px]")
    document.getElementById("carrinho").classList.add("right-[0px]")
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("right-[0px]")
    document.getElementById("carrinho").classList.add("right-[-360px]")
}

function irParacheckout() {
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return
    }
    window.location.href = window.location.origin + "/checkout.html"
}

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho")
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho")
    const botaoIrParaCheckout = document.getElementById("finalizar-compra")

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho)
    botaoAbrirCarrinho.addEventListener("click", abrircarrinho)
    botaoIrParaCheckout.addEventListener("click", irParacheckout)
}

function removerProdutoDoCarrinho(idProduto) {
    delete idsProdutoCarrinhoComQuantidade[idProduto]
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade)
    atualizarPrecoCarrinho()
    renderizarProdutosCarrinho()
}

function incrementarQuantidadeProduto(idProduto) {
    idsProdutoCarrinhoComQuantidade[idProduto]++
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade)
    atualizarPrecoCarrinho()
    atualizarInformacaoQuantidade(idProduto)
}

function decrementarQuantidadeProduto(idProduto) {
    if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
        removerProdutoDoCarrinho(idProduto)
        return
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade)
    atualizarPrecoCarrinho()
    atualizarInformacaoQuantidade(idProduto)
}

function atualizarInformacaoQuantidade(idProduto) {
    document
        .getElementById(`quantidade-${idProduto}`)
        .innerText = idsProdutoCarrinhoComQuantidade[idProduto]
}

function desenharProdutoNoCarrinho(idProduto) {
    const produto = catalogo.find(p => p.id === idProduto)

    const containerProdutosCarrinho = document.getElementById("produtos-carrinho")

    const elementoArticle = document.createElement("article")
    const articleClasses = ["flex", "gap-4", "p-1", "relative", "bg-slate-100", "rounded-lg"]

    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass)
    }

    const cartaoProdutoCarrinho = `
        <img src="./assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
        <div class="py-2 flex flex-col justify-between">
            <p class="text-slate-900 text-sm">${produto.nome}</p>
            <p class="text-slate-400 text-xs">Tamanho: M</p>
            <p class="text-green-700 text-lg">R$${produto.preco},00</p>
        </div>
        <div class="flex text-slate-950 items-end absolute bottom-0 right-2 gap-2 text-lg">
            <button id="decrementar-produto-${produto.id}" >-</button>
            <p id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
            <button id="incrementar-produto-${produto.id}" >+</button>
        </div>
        <button id="remover-item-${produto.id}" class="absolute top-0 right-2">
            <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
        </button>
    `
    elementoArticle.innerHTML = cartaoProdutoCarrinho
    containerProdutosCarrinho.appendChild(elementoArticle)

    document
        .getElementById(`incrementar-produto-${produto.id}`)
        .addEventListener("click", () => incrementarQuantidadeProduto(produto.id))
    
    document
        .getElementById(`decrementar-produto-${produto.id}`)
        .addEventListener("click", () => decrementarQuantidadeProduto(produto.id))

    document
        .getElementById(`remover-item-${produto.id}`)
        .addEventListener("click", () => removerProdutoDoCarrinho(produto.id))
}

export function renderizarProdutosCarrinho() {
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho")
    containerProdutosCarrinho.innerHTML = ""

    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinho(idProduto)
    }
}

export function adicionarAoCarrinho(idProduto) {
    if (idProduto in idsProdutoCarrinhoComQuantidade) {
        incrementarQuantidadeProduto(idProduto)
        return
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade)
    desenharProdutoNoCarrinho(idProduto)
    atualizarPrecoCarrinho()
}

export function atualizarPrecoCarrinho() {
    const precoCarrinho = document.getElementById("preco-total")
    let precoTotalCarrinho = 0
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
        precoTotalCarrinho += 
            catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho]
    }
    precoCarrinho.innerText = `Total: R$${precoTotalCarrinho},00`
}