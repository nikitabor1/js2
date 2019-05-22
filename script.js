//"use strict"

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue({
    el: `#app`,
    data: {
        catalogUrl: `/catalogData.json`,
        products: [],
        imgCatalog: `https://placehold.it/200x150`,
        searchLine: ``,
        isVisibleCart: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        FilterGoods(searchLine) {
            console.log(this.searchLine);
        },
        cartVisibility() {
            if (!this.isVisibleCart) {
                this.isVisibleCart = true;
            } else {
                this.isVisibleCart = false;
            }
        },
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (el of data) {
                    this.products.push(el)
                }
            })
        //            this.getJson(`getProducts.json`)
        //            .then (data=> {
        //            for (el of data) {
        //                this.priducts.push(el)
        //            }
        //        })
    }
})





//class List {
//    constructor(url, container) {
//        this.container = container;
//        this.url = url;
//        this.goods = [];
//        this.allProducts = [];
//        this._init()
//    };
//    _init() {
//        return false;
//    };
//    getJson(url) {
//        fetch(url ? url : `${API + this.url}`)
//            .then(result => result.json())
//            .catch(error => {
//                console.log(error);
//            })
//    }
//    handleData(data) {
//        this.goods = [...data];
//        this.render();
//    };
//    sumPrice() {
//        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//    }
//    render() {
//        const block = document.querySelector(this.container);
//        for (let product of this.goods) {
//            const prod = new lists[this.constructor.name](product);
//            this.allProducts.push(prod);
//            block.insertAdjacentHTML('beforeend', prod.render());
//
//        }
//    }
//
//};
//
//class Item {
//    constructor(el, img = 'https://placehold.it/200x150') {
//        this.product_name = el.product_name;
//        this.id_product = el.id_product;
//        this.price = el.price;
//        this.img = img
//    };
//    render() {
//        return `<div class = "product-item" data-id = "${this.id_product}">
//            <h3>${this.product_name}</h3>
//            <h3>${this.price} руб. </h3>
//            <button class="buy-btn" 
//            data-id = "${this.id_product}"
//            data-name = "${this.product_name}"
//            data-img = "${this.img}"
//            data-price = "${this.price}"
//
//            >Купить</button>
//            </div>`
//    }
//
//
//};
//
//
//
//
//
//class ProductList extends List {
//    constructor(cart, url = `/catalogData.json`, container = `.products`) {
//        super(url, container);
//        this.cart = cart;
//        this.getJson()
//            .then(data => this.handleData(data));
//    }
//    _init() {
//        document.querySelector(this.container).addEventListener('click', e => {
//            if (e.target.classlist.contains('buy-btn')) {
//                this.cart.addProduct(e.target)
//            }
//        })
//    }
//
//};
//
//class ProductItem extends Item {};
//
//class Cart extends List {
//    constructor(url = `/getBasket.json`, container = `.cart-block`) {
//        super(url, container);
//        this.getJson()
//            .then(data => this.handleData(data.contents));
//    }
//    addProduct(element) {
//        this.getJson(`${API}/addToBasket.json`)
//            .then(data => {
//                if (data.result) {
//                    let productId = +element.dataset['id'];
//                    let find = this.allProducts.find(product => product.id_product === productId); //проверка есть ли этот продукт уже в корзине
//                    if (find) {
//                        find.quantity++;
//                        this._updateCart(find); //если есть, добавляем +1
//                    } else {
//                        let product = {
//                            id_product: elemet.dataset[`id`],
//                            price: elemet.dataset[`price`],
//                            product_name: elemet.dataset[`name`],
//                            quantity: 1
//                        };
//                        this.goods = [product];
//                        this.render(); //если нет, то добавляем его в корзину и отрисовываем
//                    }
//                } else {
//                    console.log('Some error');
//                }
//            })
//    };
//
//    removeProduct(element) {
//        this.getJson(`${API}/deleteFromBasket.json`)
//            .then(data => {
//                if (data.result) {
//                    let productId = +element.dataset['id'];
//                    let find = this.allProducts.find(product => product.id_product === productId);
//                    if (find.quantity > 1) {
//                        find.quantity--;
//                        this._updateCart(find);
//                    } else {
//                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//                    }
//                } else {
//                    console.log('Some error')
//                }
//            })
//    }
//
//    _updateCart(product) {
//        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//        block.querySelector(`.product-quantity`).textContent = `Quantity: ${product.quantity}`;
//        block.querySelector(`.product-price`).textContent = `${product.quantity*product.price}`;
//    };
//
//    _init() {
//        document.querySelector('.btn-cart').addEventListener('click', () => {
//            document.querySelector(this.container).classList.toggle('invisible');
//        });
//        document.querySelector(this.container).addEventListener('click', e => {
//            if (e.target.classList.contains('del-btn')) {
//                this.removeProduct(e.target)
//            }
//        })
//    }
//};
//
//
//class CartItem extends Item {
//    constructor(el, img = 'https://placehold.it/200x150') {
//        super(el, img);
//        this.quantity = quantity;
//
//    };
//
//    render() {
//        return `<div class="cart-item" data-id="${this.id_product}">
//            <div class="product-bio">
//            <img src="${this.img}" alt="">
//            <div class="prodiuct-desc">
//            <p class="product-title">${this.id_product}</p>
//            <p class="product-quantity">Количество: ${this.quantity}</p>
//            <p class="product-single-price">Цена: ${this.price} руб. </p>
//            </div>
//            <div class="right-block">
//            <p class="product-price">Сумма: ${this.price * this.quantity} руб. </p>
//            <button class="del-btn" data-id = "${this.id_product}">&times;</button>
//            </div>
//            </div>
//            </div>
//`
//    };
//};
//
//
//
//let lists = {
//    ProductList: ProductItem,
//    Cart: CartItem
//};
//
//let myCart = new Cart();
//
//let products = new ProductList(cart);
//
//
