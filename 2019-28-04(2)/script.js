"use strict"

//без событий заказа по клику

class Basket {
    //список продуктов из ProductList с указанием заказываемого количества и суммой по каждому товару и по всей корзине вместе
    constructor() {
        this.productsInOrder = [];
    } //конструктором создаем сам список товаров в корзине
    busketSum() {
        let summary = 0;
        for (i = 0; i < this.productsInOrder.length; i++) {
            summary += this.productsInOrder[i].count * this.productsInOrder[i].price;
        };
        return summary;

    } //метод рассчитывает сумму денег за все товары в корзине 
    renderProducts() {} //метод отрисовывает все продукты в корзине
    renderSum() {} //метод отрисовывает итоговую сумму заказа
}
class BasketItem {
    //класс с названием продукта, ценой и количеством
    constructor(product, count = 1) {
            this.title = product.title,
            this.price = product.price,
            this.count = count
        
    } //преобразуем данные по товару из объекта и добавляем параметр "количетсво заказываемого товара"
    productSum() {} //метод счиает сумму по товару количество*цену
    render() {} //метод отрисовывает HTML код с товаром
}


class ProductList {
    constructor() {
        this.products = [];
        this._init();
    }
    fetchProducts() {
        this.products = [
            {
                title: 'Notebook',
                price: 2000
    },
            {
                title: 'Mouse',
                price: 5
    },
            {
                title: 'Keyboard',
                price: 8
    },
            {
                title: 'Display',
                price: 400
    },
        ]
    }
    _init() {
        this.fetchProducts();
        this.render();
    }
    render() {
        const block = document.querySelector('.products');
        this.products.forEach(product => {
            const prod = new Product(product);
            block.insertAdjacentHTML('beforeend', prod.render());
        })
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150') {
            this.title = product.title,
            this.price = product.price,
            this.img = img
    }
    render() {
        return `<div class = "product-item">
            <h3>${this.title}</h3>
            <h3>${this.price}</h3>
            </div>`
    }
}


let products = new ProductList();
