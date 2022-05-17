//import { Authentication } from "../handlers/AuthHandler.js";
//const authentication =  Authentication.userVerify();

import { Products } from "../Class/Product.js";

const containerProducts = document.getElementById("List_produtcts");

async function showProducts(){
    const list = await Products.listProducts();
    console.log(list);
    list.forEach(element => {
        let li = document.createElement("li");
        li.className = "cardsProducts";
        li.innerHTML = `<image class="image-products" src=${element.imagem}></image>
       <h4>${element.nome}</h4>
       <p class="descricao">${element.descricao}</p>
       <h6 class="categoria">${element.categoria}</h6>
       <h5>R$ ${element.preco}</h5>
       <button><image class = "image-carrinho" src="https://cdn-icons-png.flaticon.com/512/126/126510.png"></image></button>`;
        containerProducts.appendChild(li);
    });
}

showProducts();