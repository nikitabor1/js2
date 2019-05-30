Vue.component('filterel', {
    data() {
        return {
            searchLine: ``,
        }
    },

    template: `
                    <div class="search">
                        <input v-model = "searchLine" type="text" placeholder="Название товара">
                        <button class="srch-btn" @click = '$root.$refs.products.FilterGoods(searchLine)'>
                                    <h2>Искать</h2>
                        </button>
                    </div>
`

})




