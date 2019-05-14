"use strict"

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor() {
        this.products = [];
        this.allProducts = [];
        this._init();
    }
    _getProducts() {
        fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.products = [...data];
                //                console.log(this.products);
                this.render();
            })
            .catch(error => {
                console.log(error);
            })
    }

    _init() {
        this._getProducts();
    }
    render() {
        const block = document.querySelector('.products');
        this.products.forEach(product => {
            const prod = new Product(product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
            prod.addButtonlistener();
        })
    }

    sumPrice() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.product_name = product.product_name
        this.id_product = product.id_product,
            this.price = product.price,
            this.img = img
    }
    render() {
        return `<div class = "product-item">
            <h3>${this.product_name}</h3>
            <h3>${this.price} руб. </h3>
            <button class="buy-btn" data-id="${this.id_product}">Купить</button>
            </div>`
    }
    addButtonlistener() {
        return document.querySelector(`.buy-btn[data-id="${this.id_product}" ]`).addEventListener("click", () => this.putToCartProduct(this.id_product));
    }

    putToCartProduct(id_product) {
        let convertToObj = {id_product};
        return console.log(convertToObj); //здесь надо отправить на сервер запрос с PUT методом чтобы добавить + 1 единицу товара из корзины по ID

    }
    //    _postToCart(product) {
    //        let bodytopost = JSON.stringify(product);
    //        fetch(`${API}/addToBasket.json`, {
    //            method: "POST",
    //            body: bodytopost
    //        });
    //    }


}



//-----------------------------------------------------------------------------------------------------------------------------


class CartList {
    constructor() {
        this.cartSection = [];
        this.cartSum = {};
        this.cartCount = {};
        this.products = [];
        this.allProducts = [];
        this._init();
    }

    _getProducts() {
        fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.cartSection = data;
                this.cartSum = this.cartSection.amount;
                this.cartCount = this.cartSection.countGoods;
                this.products = this.cartSection.contents;
                this.render();
            })
            .catch(error => {
                console.log(error);
            })
    }

    _init() {
        this._getProducts();
    }
    render() {
        const block = document.querySelector('.cart');
        this.products.forEach(product => {
            const prod = new CartItem(product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
            prod.addButtonlistener();
        })
        const totalOrder = document.querySelector('.cartTotal');
        totalOrder.insertAdjacentHTML('beforeend', `Сумма вашего заказа: ${this.cartSum} руб.`);
        totalOrder.insertAdjacentHTML('beforeend', `<br>Количество товаров в корзине: ${this.cartCount} шт.`);

    }

    sumPrice() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
}

class CartItem {
    constructor(product, img = 'https://placehold.it/140x100') {
        this.product_name = product.product_name
        this.id_product = product.id_product,
            this.price = product.price,
            this.quantity = product.quantity,
            this.img = img
    }
    render() {
        return `<div class = "product-item-cart">
            <h4>${this.product_name}</h4>
            <h4>${this.quantity} шт. </h4>
            <h4>${this.price} руб.</h4>
            <button class="delete-btn" data-id="${this.id_product}">Удалить</button>
            </div>`
    }
    addButtonlistener() {
        return document.querySelector(`.delete-btn[data-id="${this.id_product}" ]`).addEventListener("click", () => this.deleteProduct(this.id_product));
    }
    deleteProduct(id_product) {
        let convertToObj = {id_product};
        return console.log(convertToObj); // здесь надо отправить на сервер запрос с DELETE методом чтобы удалить 1 единицу товара из корзины по ID
    }
}


let products = new ProductList();
let myCart = new CartList();
