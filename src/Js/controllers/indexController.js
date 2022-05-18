import { ShowHandler } from "../handlers/ShowHandler.js";
import { AuthHandler } from "../handlers/AuthHandler.js";
import { CartService } from "../services/CartService.js";

const verify = await AuthHandler.userVerify();

ShowHandler.headerMain(verify);
export const products = [
  {
    id: "97e3e9db-dd3f-42b2-a838-ff505a020213",
    nome: "Panqueca de banana com aveia",
    preco: 20,
    categoria: "Panificadora",
    descricao:
      "Esta receita serve muito bem 2 pessoas, deixa a gente bem satisfeito, se não tiver outra opção de café. Se tiver mais comida, como pães e frutas.",
    imagem:
      "https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint4/img/capstone-images/panqueca.png",
    createdAt: "2022-05-16T06:53:33.405Z",
    updatedAt: "2022-05-16T06:53:33.405Z",
  },
  {
    id: "cd92b980-c60d-4170-9159-1b9b70f8ff67",
    nome: "Mousse de morango com a fruta",
    preco: 27.5,
    categoria: "Frutas",
    descricao:
      "Sobremesa fácil, rápida e muito saborosa: a mousse de morango leva apenas 5 ingredientes; confira como fazer a receita.",
    imagem:
      "https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint4/img/capstone-images/mousse.png",
    createdAt: "2022-05-16T06:54:26.733Z",
    updatedAt: "2022-05-16T06:54:26.733Z",
  },
];
//await ShowHandler.getProducts(verify);

ShowHandler.showProducts(products, verify);

let cartItemsId = [];

export const addItemToCart = async (event) => {
  const productId = event.target.id;
  cartItemsId.push(productId);
  if (verify) {
    const token = AuthHandler.getToken();
    const send = await CartService.putInCart(token, productId);
    ShowHandler.cartUserInit(token, verify);
  } else {
    localStorage.setItem("cartItems", cartItemsId);
    ShowHandler.cartInit();
  }
};

export const removeItemCart = async (event) => {
  const productId = event.target.id;
  if (verify) {
  } else {
    let find = cartItemsId.findIndex((element) => {
      if (element === event.target.id) {
        return element;
      }
    });
    cartItemsId.splice(find, 1);
    localStorage.setItem("cartItems", cartItemsId);
    ShowHandler.cartInit();
  }
};

const cartChange = () => {
  if (verify) {
    const token = AuthHandler.getToken();
    ShowHandler.cartUserInit(token, verify);
  } else {
    ShowHandler.cartInit();
  }
};
cartChange();
