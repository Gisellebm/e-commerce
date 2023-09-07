import { apagarDoLocalStorage, desenharProdutoNoCarrinhoSimples, lerLocalStorage, salvarLocalStorage } from "./src/utilidades"

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {}
    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinhoSimples(idProduto, 'container-produtos-checkout', idsProdutoCarrinhoComQuantidade[idProduto])
    }
}

function finalizarCompras(evento) {
    evento.preventDefault()
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {}
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return
    }

    const dataAtual = new Date()
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }

    const historicoDePedidos = lerLocalStorage('historico-de-pedidos') ?? []
    const historicoDePedidosAtualizado = [...historicoDePedidos, pedidoFeito]
    
    salvarLocalStorage('historico-de-pedidos', historicoDePedidosAtualizado)
    apagarDoLocalStorage('carrinho')
    
    window.location.href = "./pedidos.html"
}

desenharProdutosCheckout()

document.addEventListener('submit', (evento) => finalizarCompras(evento))