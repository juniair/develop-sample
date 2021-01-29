

new Vue({
    el:"#wrap",
    data: {
        isLoaded: false,
        isAllSelected: true,
        items:[],
        selectedItems:[],
        prefixHp: "010",
        infixHp: "",
        posfixHp: ""
    },
    created() {
        axios.get("/api/cart")
			.then(response => {

                    this.items = response.data;    
				})
			.catch(error =>{
                
            })
            .then(response => {
                this.isLoaded = true;
            });
    },
    methods:{
        checkCart() {

            if(this.disabled) {
                return;
            }

            if(this.selectedItems.length == 0) {
                alert('선택된 구매 상품이 없습니다.');
            }
        }
    },
    watch: {

    },
    computed: {
        link() {
            if(this.disabled || this.selectedItems.length == 0) { return "javascript:void(0);"; }
            let arrSeq = this.selectedItems.select(item => item.seq).join();
            return `/checkout/?arrSeq=${arrSeq}`

        }
    },
    filters: {
        priceFilter(value) {
            var len, point, str;
    
            let num = value + "";
            point = num.length % 3;
            len = num.length;
    
            str = num.substring(0, point);
            while (point < len) {
              if (str != "") str += ",";
              str += num.substring(point, point + 3);
              point += 3;
            }
    
            return str;
          },
        roundFilter(value, arg) {
            if(arg == 0) {
                return 0;
            }
            let rate = (arg - value) / arg * 100
            return Math.round(rate)
        }
    }
})