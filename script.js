"use strict"


const products = [
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
];
const renderProduct = (title = default_product, price = 1) => {
    return `<div class = "product-item">
            <h3>${title}</h3>
            <h3>${price}</h3>
            </div>`

};
const renderPage = (list = products) => {
    const productList = list.map(item => renderProduct(item.title, item.price))
    document.querySelector('.products').innerHTML = productList.join("");//добавил join - перевод массива в строку с условием что разделители "ничего"
    
};

    renderPage();


