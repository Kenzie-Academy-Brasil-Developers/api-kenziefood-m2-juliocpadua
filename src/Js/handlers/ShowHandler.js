import {ProductService } from "../services/ProductService.js";
import { AuthHandler } from "../handlers/AuthHandler.js";

export class ShowHandler{
    static async showProducts(){

        const containerProducts = document.getElementById("List_produtcts");
        const authentication =  AuthHandler.userVerify();

        let list = []
        const list1 = await ProductService.getPublicProducts();
        if(authentication == true){
            list = list1.concat(ProductService.getPrivateProducts(localStorage.getItem("Token")))
        }else{
            list = list1
        }
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
}
