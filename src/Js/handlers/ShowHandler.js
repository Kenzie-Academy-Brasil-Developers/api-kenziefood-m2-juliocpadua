//import { AuthHandler } from "./AuthHandler.js";

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

  static async headerMain() {
    let verify = false; //await AuthHandler.userVerify();
    const container = document.querySelector(".header");
    container.appendChild(this.headerTitle());
    container.appendChild(this.headerSub());
    container.appendChild(this.headerSearch());

    if (verify) {
      container.appendChild(this.headerUser());
    } else {
      container.appendChild(this.headerSignIn());
    }
  }

  static headerTitle() {
    const strong = document.createElement("strong");
    strong.classList.add("header__strong");
    strong.innerText = "Kenzie";
    return strong;
  }

  static headerSub() {
    const small = document.createElement("small");
    small.classList.add("header__small");
    small.innerText = "food";
    return small;
  }

  static headerSearch() {
    const container = document.createElement("div");
    container.classList.add("header__search--container");

    const img = document.createElement("img");
    img.src = "../src/assets/img/search.png";
    img.classList.add("header__icon");

    const input = document.createElement("input");
    input.classList.add("header__search");
    input.type = "text";
    input.name = "searchBar";
    input.placeholder = "Pesquisar por produto";

    container.appendChild(img);
    container.appendChild(input);
    return container;
  }

  static headerSearchIcon() {}

  static headerSignIn() {
    const button = document.createElement("button");
    button.classList.add("header__signin");
    button.innerText = "Sign in";
    return button;
  }

  static headerUser() {
    const img = document.createElement("img");
    img.classList.add("header__user");
    img.src = "../src/assets/img/defaultUser.png";
    img.addEventListener("click", (event) => {
      event.preventDefault();
      headerUserPopUp();
    });
    return img;
  }

  static headerUserPopUp(event) {}
}
