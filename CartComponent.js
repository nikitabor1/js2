Vue.component(`cart`, {
    props: [`cart-items`, `img`, `visability`],
    template: `
            <div class="cartcontainer" v-show="visability">

                <h3>Корзина</h3>
                <div class="container">
                    <p v-if="!cartItems.length">Ваша корзина пуста</p>
                    <cart-item 
                    v-for = "product of cartItems" 
                    :key = "product.id_product"
                    :img = "img"
                    :cart-item = "product">
                    </cart-item>
                </div>
            </div>
`
});
Vue.component(`cart-item`, {
    props: [`cartItem`, `img`],
    template: `
                    <div class="cart-item" >
                        <div class="product-bio">
                            <img :src = "img" alt="img">
                            <div class="product-desc">
                                <p class="product-title">{{ cartItem.id_product }}</p>
                                <p class="product-quantity">Количество: {{ cartItem.quantity }}</p>
                                <p class="product-single-price">Цена: {{ cartItem.price }} руб. </p>
                            </div>
                            <div class="right-block">
                                <p class="product-price">Сумма: {{ cartItem.price * cartItem.quantity }} руб. </p>
                                <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                            </div>
                        </div>
                    </div>
`
});
