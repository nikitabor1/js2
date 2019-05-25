Vue.component(`searching`, {
    props: [`damn`],
    template: `
                    <div class="search">
                        <input  type="text" placeholder="Название товара" id = "wtf">
                        <button class="srch-btn" @click="$parent.$emit('filter-goods', damn)">
                                    <h2>Искать</h2>
                        </button>
                    </div>
`,

    methods:{
    filterText(){
        this.damn = document.querySelector(`#wtf`).value;  
}},
//
//    computed: {
//        set() {
//            let value = document.querySelector(`#wtf`).value;
//            this.$parent.$emit.searchLine = value;
//            
//            return this.searchusertext = document.querySelector(`#wtf`).value;
        }
    }
});


//v-model="searchusertext"

