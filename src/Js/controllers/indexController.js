import { ShowHandler } from "../handlers/ShowHandler.js";
import { AuthHandler } from "../handlers/AuthHandler.js";
import { CartService } from "../services/CartService.js";

const verify = await AuthHandler.userVerify();

ShowHandler.headerMain(verify);
export const products = await ShowHandler.getProducts(verify);

ShowHandler.showProducts(products, verify);

const cartItemsId = [];

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

const cartChange = () => {
  if (verify) {
    const token = AuthHandler.getToken();
    ShowHandler.cartUserInit(token, verify);
  } else {
    ShowHandler.cartInit();
  }
};
cartChange();
