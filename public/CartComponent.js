Vue.component(`cart`, {
    data() {
        return {
            imgCart: `https://placehold.it/100x75`,
            cartItems: [],
            cartUrl: `/getBasket.json`,
            isVisibleCart: false,
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);

                }
            });
    },

    methods: {



        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {
                        quantity: 1
                    })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({
                    quantity: 1
                }, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod)
                        }
                    })
            }

        },





                remove(product) {
                    if (product.quantity > 1) {
                        this.$parent.putJson(`/api/cart/${product.id_product}`, {
                                quantity: -1
                            })
                            .then(data => {
                                if (data.result) {
                                    product.quantity--
                                }
                            })
                    } else {
                        this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                            .then(data => {
                                if (data.result) {
                                    this.cartItems.splice(this.cartItems.indexOf(product), 1);
                                }
                            })
                    }
                },

        cartVisibility() {
            if (!this.isVisibleCart) {
                this.isVisibleCart = true;
            } else {
                this.isVisibleCart = false;
            }
        },

    },
    template: `
            <div class="cartcontainer" v-show="isVisibleCart">
                <h3>Корзина</h3>
                <div class="container">
                    <p v-if="!cartItems.length">Ваша корзина пуста</p>
                    <cart-item 
                    v-for = "product of cartItems" 
                    :key = "product.id_product"
                    :img = "imgCart"
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
                                <p class="product-title">{{ cartItem.product_name }}</p>
                                <p class="product-quantity">Количество: {{ cartItem.quantity }}</p>
                                <p class="product-single-price">Цена: {{ cartItem.price }} руб. </p>
                            </div>
                            <div class="right-block">
                                <p class="product-price">Сумма: {{ cartItem.price * cartItem.quantity }} руб. </p>
                                <button class="del-btn" @click='$root.$refs.cart.remove(cartItem)'>&times;</button>
                            </div>
                        </div>
                    </div>
`
});
