Vue.component(`products`, {
    data() {
        return {
            catalogUrl: `/catalogData.json`,
            products: [],
            imgCatalog: `https://placehold.it/200x150`,
            filtered: [],
        }
    },

    methods: {
        FilterGoods(value) {
            let regExp = new RegExp(value, `i`);
            this.filtered = this.products.filter(el => regExp.test(el.product_name));
        },
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });

    },
    template: `
            <div class="catalogcontainer">
                <h3>Каталог товаров</h3>
                <div class="container">
                    <div class="products">
                        <product  
                        v-for="product of filtered" 
                        :key="product.id_product"
                        :img = "imgCatalog"
                        :product = "product">
                        </product>
                    </div>
                </div>
            </div>                        
                        
`
});

Vue.component(`product`, {
    props: [`product`, `img`],
    template: `
                        <div class="product-item">
                            <img :src="img" alt="img">
                            <div class="desc">
                                <h3>{{ product.product_name }}</h3>
                                <p>{{ product.price }}</p>
                                <button class="buy-btn" @click='$root.$refs.cart.addProduct(product)'>Купить</button>
                            </div>

                        </div>
`


});
