import { lerLocalStorage, desenharProdutoNoCarrinhoSimples } from "./src/utilidades";

function criarPedidosHistorico(pedidoComData) {
    const elementoPedido = `
        <p class='text-xl text-bold my-4'>${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</p>
        <section id="container-pedidos-${pedidoComData.dataPedido}" class="bg-slate-300 p-3 rounded-md"></section>
    `
    const main = document.getElementsByTagName("main")[0]
    main.innerHTML += elementoPedido

    for (const idProduto in pedidoComData.pedido) {
        desenharProdutoNoCarrinhoSimples(
            idProduto, 
            `container-pedidos-${pedidoComData.dataPedido}`, 
            pedidoComData.pedido[idProduto]
        )
    }
}

function renderizarHistoricoPedidos() {
    const historicoDePedidos = lerLocalStorage('historico-de-pedidos')
    for (const pedidoComData of historicoDePedidos) {
        criarPedidosHistorico(pedidoComData)
    }
}

renderizarHistoricoPedidos()