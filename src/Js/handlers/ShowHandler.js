import { ProductService } from "../services/ProductService.js";
import { AuthHandler } from "./AuthHandler.js";
import { CartHandler } from "./CartHandler.js";

export class ShowHandler {

    static page = document.querySelector('title').innerText;

    static filterPerCategory(products, category) {

        if (category === 'Todos') {
            return products;
        }

        const filterProducts = products.filter(
            (product) => product.categoria.toLowerCase() === category.toLowerCase()
        );

        console.log(filterProducts)
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
        const header = document.createElement('header');
        const container = document.createElement('div');
        const leftSide = document.createElement('section');
        const leftSide__title = document.createElement('h1');
        const rightSide = document.createElement('section');
        const rightSide__search = document.createElement('div');
        const rightSide__icon = document.createElement('span');
        const rightSide__field = document.createElement('input');


        container.classList.add('container', 'container--header');
        leftSide.classList.add('leftSide');
        leftSide__title.classList.add('leftSide__title');
        leftSide__title.innerHTML = 'Kenzie <small>Food</small';
        rightSide.classList.add('rightSide');
        rightSide__search.classList.add('rightSide__search');
        rightSide__icon.classList.add('rightSide__icon');
        rightSide__icon.innerHTML = '<img src="src/assets/images/search.png" alt="search icon">';
        rightSide__field.classList.add('rightSide__field');
        rightSide__field.placeholder = 'Pesquisar por produto';

        header.appendChild(container);
        container.append(leftSide, rightSide);
        leftSide.appendChild(leftSide__title);
        rightSide.append(rightSide__search)

        // <nav class="menuProfile">
        //     <div class="menuProfile__topSide">
        //         <span class="menuProfile__user">Time A</span>
        //     </div>
        //     <div class="menuProfile__bottomSide">
        //         <button class="menuProfile__btn">Dashboard</button>
        //         <button class="menuProfile__btn">Logout</button>
        //     </div>
        // </nav>

        if (verify) {
            const rightSide__photo = document.createElement('img');
            const menuProfile = document.createElement('nav');
            const menuProfile__topSide = document.createElement('div');
            const menuProfile__user = document.createElement('span');
            const menuProfile__bottomSide = document.createElement('div');
            const menuProfile__btn1 = document.createElement('button');
            const menuProfile__btn2 = document.createElement('button');

            rightSide__photo.classList.add('rightSide__photo');
            rightSide__photo.alt = 'profile photo';
            rightSide__photo.src = 'src/assets/images/profile.png';
            menuProfile.classList.add('menuProfile');
            menuProfile__topSide.classList.add('menuProfile__topSide');
            menuProfile__user.classList.add('menuProfile__user');
            menuProfile__user.innerText = 'Time 3';
            menuProfile__bottomSide.classList.add('menuProfile__bottomSide');
            menuProfile__btn1.classList.add('menuProfile__btn');
            menuProfile__btn1.innerText = this.page === 'Home' ? 'Dashboard' : 'Home';
            menuProfile__btn2.classList.add('menuProfile__btn');
            menuProfile__btn2.innerText = 'Logout';

            rightSide__photo.addEventListener('click', this.toggleMenuProfile);

            menuProfile__btn1.addEventListener('click', () => {


                if (this.page === 'Home') {
                    location.href = './src/pages/dashboard.html';
                } else {
                    location.href = '../../index.html';
                }

            })

            menuProfile__btn2.addEventListener('click', () => {
                AuthHandler.logout();

                if (this.page === 'Home') {
                    location.href = './src/pages/auth.html';
                } else {
                    location.href = './auth.html';
                }
            })


            menuProfile.append(menuProfile__topSide, menuProfile__bottomSide);
            menuProfile__topSide.appendChild(menuProfile__user);
            menuProfile__bottomSide.append(menuProfile__btn1, menuProfile__btn2)

            rightSide.append(rightSide__photo, menuProfile)


        } else {
            const rightSide__btn = document.createElement('a');
            rightSide__btn.classList.add('rightSide__btn');
            rightSide__btn.innerText = 'Sign in';
            rightSide__btn.href = './src/pages/auth.html';

            rightSide.appendChild(rightSide__btn)
        }

        rightSide__search.append(rightSide__icon, rightSide__field)

        headerPlace.appendChild(header)
    }

    static async showProducts(products, verify) {

        const showcase = document.querySelector('.showcase');
        showcase.innerText = '';



        products.forEach(product => {
            const card = document.createElement('article');
            const card__image = document.createElement('section');
            const img = document.createElement('img');
            const card__info = document.createElement('section');
            const card__title = document.createElement('h3');
            const card__description = document.createElement('p');
            const card__categories = document.createElement('div');
            const card__category = document.createElement('span');
            const card__end = document.createElement('div');
            const card__price = document.createElement('span');
            const card__btn = document.createElement('button');

            // <article class="card">
            //     <section class="card__image">
            //         <img src="src/assets/images/pancake.png" alt="">
            //     </section>
            //     <section class="card__info">
            //         <h3 class="card__title">Panqueca de banana com aveia</h3>
            //         <p class="card__description">Esta receita serve muito bem 2 pessoas, deixa a gente bem satisfeito, se não tiver outra opção de café. Se tiver mais comida, como pães e frutas.</p>
            //         <div class="card__categories">
            //             <span class="card__category">Panificadora</span>
            //             <span class="card__category">Frutas</span>
            //         </div>
            //         <div class="card__end">
            //             <span class="card__price">R$ 20,00</span>
            //             <button class="card__btn"><img src="src/assets/images/littleCart.png" alt=""></button>
            //         </div>
            //     </section>
            // </article>

            card.classList.add('card');
            card__image.classList.add('card__image');
            img.src = product.imagem;
            img.alt = product.nome;
            card__info.classList.add('card__info');
            card__title.classList.add('card__title');
            card__title.innerText = product.nome;
            card__description.classList.add('card__description');
            card__description.innerText = product.descricao;
            card__categories.classList.add('card__categories');
            card__category.classList.add('card__category');
            card__category.innerText = product.categoria;
            card__end.classList.add('card__end');
            card__price.classList.add('card__price');
            card__price.innerText = `R$ ${product.preco}`;
            card__btn.classList.add('card__btn');
            card__btn.innerHTML = '<img src="src/assets/images/littleCart.png" alt="add cart button">';

            card__btn.addEventListener('click', () => {
                CartHandler.addCart(verify, product)
            })

            card.append(card__image, card__info);
            card__image.appendChild(img);
            card__info.append(card__title, card__description, card__categories, card__end);
            card__categories.appendChild(card__category);
            card__end.append(card__price, card__btn)

            showcase.appendChild(card)

        });
    }

    static async getProducts(verify) {

        let list = []


        if (verify) {
            list = await ProductService.getPrivateProducts(localStorage.getItem("Token"));
            list = list.concat(await ProductService.getPublicProducts())
        } else {
            list = await ProductService.getPublicProducts()
        }

        return list;
    }

    static toggleMenuProfile() {
        const menuProfile = document.querySelector('.menuProfile');

        menuProfile.classList.toggle('openElementWithFlex');
    }
}