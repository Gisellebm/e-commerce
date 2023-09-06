import { catalogo } from "./utilidades"
import { adicionarAoCarrinho } from "./menuCarrinho"

export function renderizarCatalogo() {
    for (const produtoCatalogo of catalogo) {
        const cartaoproduto = `
            <div 
                class='border-solid  w-48 m-2 flex flex-col p-2 justify-between group shadow-xl shadow-slate-400 rounded-lg ${produtoCatalogo.feminino ? 'feminino' : 'masculino'}' id="card-produto-${produtoCatalogo.id}"
            >
                <img src="./assets/img/${produtoCatalogo.imagem}" alt="Produto 1 - Casaco Branco" class='group-hover:scale-110 duration-300 my-3 rounded-lg' >
                <p class='text-sm'>${produtoCatalogo.marca}</p>
                <p class='text-sm'>${produtoCatalogo.nome}</p>
                <p class='text-sm'>R$${produtoCatalogo.preco},00</p>
                <button id='adicionar-${produtoCatalogo.id}' class="bg-slate-950 hover:bg-slate-700 text-slate-200" >
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        `
        document.getElementById("container-produto").innerHTML += cartaoproduto
        
    }

    for (const produtoCatalogo of catalogo) {
        document
        .getElementById(`adicionar-${produtoCatalogo.id}`)
        .addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id))
    }
    
}