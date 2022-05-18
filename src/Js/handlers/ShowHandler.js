import { ProductService } from "../services/ProductService.js";
import {
  addItemToCart,
  products,
  removeItemCart,
} from "../controllers/indexController.js";
import { CartService } from "../services/CartService.js";

export class ShowHandler {
  static filterPerCategory(products, category) {
    const filterProducts = products.filter(
      (product) => product.categoria.toLowerCase() === category.toLowerCase()
    );
    return filterProducts;
  }

  static searchedProducts(texto, products) {
    const searchedProducts = [];
    products.forEach((product) => {
      if (product.nome.toLowerCase().includes(texto)) {
        searchedProducts.push(product);
      } else if (product.categoria.toLowerCase().includes(texto)) {
        searchedProducts.push(product);
      } else if (product.descricao.toLowerCase().includes(texto)) {
        searchedProducts.push(product);
      }
    });
    return searchedProducts;
  }

  static headerMain(verify) {
    const headerPlace = document.querySelector(".header");
    const container = document.createElement("div");
    const leftSide = document.createElement("section");
    const leftSide__title = document.createElement("h1");
    const rightSide = document.createElement("section");
    const rightSide__search = document.createElement("div");
    const rightSide__icon = document.createElement("span");
    const rightSide__field = document.createElement("input");
    const header = document.createElement("header");

    container.classList.add("container", "container--header");
    leftSide.classList.add("leftSide");
    leftSide__title.classList.add("leftSide__title");
    leftSide__title.innerHTML = "Kenzie <small>Food</small";
    rightSide.classList.add("rightSide");
    rightSide__search.classList.add("rightSide__search");
    rightSide__icon.classList.add("rightSide__icon");
    rightSide__icon.innerHTML =
      '<img src="src/assets/images/search.png" alt="search icon">';
    rightSide__field.classList.add("rightSide__field");
    rightSide__field.placeholder = "Pesquisar por produto";

    header.appendChild(container);
    container.append(leftSide, rightSide);
    leftSide.appendChild(leftSide__title);
    rightSide.append(rightSide__search);

    if (verify) {
      const rightSide__photo = document.createElement("img");
      rightSide__photo.classList.add("rightSide__photo");
      rightSide__photo.alt = "profile photo";
      rightSide__photo.src = "src/assets/images/profile.png";

      rightSide.appendChild(rightSide__photo);
    } else {
      const rightSide__btn = document.createElement("a");
      rightSide__btn.classList.add("rightSide__btn");
      rightSide__btn.innerText = "Sign in";
      rightSide__btn.href = "./src/pages/auth.html";

      rightSide.appendChild(rightSide__btn);
    }

    rightSide__search.append(rightSide__icon, rightSide__field);

    headerPlace.appendChild(header);
  }

  static async showProducts(products) {
    const showcase = document.querySelector(".showcase");
    showcase.innerText = "";

    products.forEach((product) => {
      const card = document.createElement("article");
      const card__image = document.createElement("section");
      const img = document.createElement("img");
      const card__info = document.createElement("section");
      const card__title = document.createElement("h3");
      const card__description = document.createElement("p");
      const card__categories = document.createElement("div");
      const card__category = document.createElement("span");
      const card__end = document.createElement("div");
      const card__price = document.createElement("span");
      const card__btn = document.createElement("button");

      card.classList.add("card");
      card.id = product.id;
      card__image.classList.add("card__image");
      img.src = product.imagem;
      img.alt = product.nome;
      card__info.classList.add("card__info");
      card__title.classList.add("card__title");
      card__title.innerText = product.nome;
      card__description.classList.add("card__description");
      card__description.innerText = product.descricao;
      card__categories.classList.add("card__categories");
      card__category.classList.add("card__category");
      card__category.innerText = product.categoria;
      card__end.classList.add("card__end");
      card__price.classList.add("card__price");
      card__price.innerText = `R$ ${product.preco}`;
      card__btn.classList.add("card__btn");
      card__btn.id = product.id;
      card__btn.addEventListener("click", (event) => {
        event.preventDefault();
        addItemToCart(event);
      });

      card.append(card__image, card__info);
      card__image.appendChild(img);
      card__info.append(
        card__title,
        card__description,
        card__categories,
        card__end
      );
      card__categories.appendChild(card__category);
      card__end.append(card__price, card__btn);

      showcase.appendChild(card);
    });
  }

  static async getProducts(verify) {
    let list = ([] = await ProductService.getPublicProducts());

    if (verify) {
      list = list.concat(
        await ProductService.getPrivateProducts(localStorage.getItem("Token"))
      );
    }

    return list;
  }

  static async showCartItems(cartProducts, verify) {
    const container = document.querySelector(".cart__body");
    container.innerHTML = "";
    let data = [];
    let amount = 0;
    if (verify) {
      cartProducts.forEach((element) => {
        data.push(element.products);
      });
    } else if (cartProducts.length > 0) {
      data = await cartProducts;
    }

    if (data.length > 0) {
      data.forEach((product) => {
        const card__article = document.createElement("article");
        const card__section__img = document.createElement("section");
        const card__img = document.createElement("img");
        const card__info = document.createElement("section");
        const card__title = document.createElement("h4");
        const card__category = document.createElement("p");
        const card__price = document.createElement("span");
        const card__delete = document.createElement("section");
        const card__delbtn = document.createElement("button");
        const card__delimg = document.createElement("img");

        card__article.classList.add("itemCart");
        card__section__img.classList.add("itemCart__image");
        card__img.src = product.imagem;
        card__img.alt = product.nome;
        card__info.classList.add("itemCart__info");
        card__title.classList.add("itemCart__title");
        card__title.innerText = product.nome;
        card__category.classList.add("item__category");
        card__category.innerText = product.categoria;
        card__price.classList.add("itemCart__price");
        card__price.innerText = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(product.preco);
        amount += product.preco;
        card__delete.classList.add("itemCart__delete");
        card__delbtn.classList.add("itemCart__btn");
        card__delimg.id = product.id;
        card__delimg.src = "../src/assets/images/trash.png";
        card__delbtn.addEventListener("click", (event) => {
          event.preventDefault();
          removeItemCart(event);
        });

        card__section__img.appendChild(card__img);
        card__article.appendChild(card__section__img);
        card__info.append(card__title, card__category, card__price);
        card__article.appendChild(card__info);
        card__delbtn.appendChild(card__delimg);
        card__delete.appendChild(card__delbtn);
        card__article.appendChild(card__delete);
        container.appendChild(card__article);
      });
      this.cartTotal(data.length, amount);
    } else {
      container.classList.add("empty");
      const empty__section = document.createElement("section");
      const empty__img = document.createElement("img");
      const empty__text = document.createElement("p");

      empty__section.classList.add("cart__empty");
      empty__img.classList.add("cart__empty--img");
      empty__img.src = "../src/assets/images/empty.png";
      empty__text.classList.add("cart__empty--text");
      empty__text.innerText = "Por enquanto não temos produtos no carrinho";

      empty__section.appendChild(empty__img);
      empty__section.appendChild(empty__text);
      container.appendChild(empty__section);

      console.log("carrinho vazio");
    }
  }
  static async cartUserInit(token, verify) {
    const data = await CartService.getProductsInCart(token);
    this.showCartItems(data, verify);
  }
  static async cartInit() {
    const data = [];
    const storageItems = localStorage.getItem("cartItems");
    if (storageItems !== null) {
      const storageCart = storageItems.split(",");
      storageCart.forEach((id) => {
        data.push(ShowHandler.cartDataManagement(id));
      });
      return this.showCartItems(data);
    }
  }

  static cartDataManagement(id) {
    let find = products.find((element) => {
      if (element.id === id) {
        return element;
      }
    });
    return find;
  }
  static cartTotal(items, amount) {
    const container = document.querySelector(".cart__footer");
    container.innerHTML = "";
    const quantity__section = document.createElement("section");
    const quantity__title = document.createElement("span");
    const quantity__value = document.createElement("span");
    const total__section = document.createElement("section");
    const total__value = document.createElement("span");
    const total__title = document.createElement("span");

    quantity__section.classList.add("quantity");
    quantity__title.classList.add("quantity__title");
    quantity__value.classList.add("quantiry__value");
    total__section.classList.add("total");
    total__value.classList.add("total__value");
    total__title.classList.add("total__title");

    quantity__title.innerText = "Quantidade";
    quantity__value.innerText = items;
    total__title.innerText = "Total";
    total__value.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);

    quantity__section.append(quantity__title, quantity__value);
    total__section.append(total__title, total__value);
    container.appendChild(quantity__section);
    container.appendChild(total__section);
  }
  static cartTotalClear() {
    const container = document.querySelector(".cart__footer");
    const quantity__section = document.querySelector(".quantity");
    const total__section = document.querySelector(".total");
    container.removeChild(quantity__section);
    container.removeChild(total__section);
  }
}
