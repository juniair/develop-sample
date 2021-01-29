

new Vue({
    el:"#wrap",
    data: {
        isLoaded: false,
        isAllSelected: true,
        items:[],
        selectedItems:[]
    },
    created() {
        axios.get("/api/cart")
			.then(response => {

                    this.items = response.data; 
                    this.selectedItems = response.data;
                    this.selectedItems = dummy;    
				})
			.catch(error =>{
                
            })
            .then(response => {
                this.itemSelectedChange();
                this.isLoaded = true;
            });
    },
    methods:{
        itemSelectedAllChange() {
            if(this.items.length == 0) {
                this.isAllSelected = !this.isAllSelected;
                return;
            }

            if(this.isAllSelected) {
                this.selectedItems = this.items;
            } else {
                this.selectedItems = []
            }
            
        },
        itemSelectedChange() {
            if(this.items.length == this.selectedItems.length && this.items.length > 0) {
                this.isAllSelected = true;
            } else {
                this.isAllSelected = false;
            }
        },
        removeItem(seq, productName) {
            let isRemove = confirm(`${productName} 상품을\n여행바구니에서 삭제하시겠습니까?`);
            if(isRemove) {
                axios.post(`/api/cart/delete/?seq=${seq}`)
                        .then(response => {
                            this.items = this.items.where(item => item.seq != seq);
                            this.selectedItems = this.selectedItems.where(item => item.seq != seq);
                            this.itemSelectedChange();
                        })
                        .catch(error =>{
                            console.log(error.response.data);
                        })
                        .then(response => {
                        });
            }
        },
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
        selectedCount() {
            return this.selectedItems.length;
        },
        selectedPrice() {
            if(this.selectedItems.length == 0) return 0;
            return this.selectedItems.select(item => item.membersPrice).reduce((x,y) => x + y , 0);
        },
        totalCount() {
            return this.items.length
        },
        disabled() {
            
            return this.items.length == 0 && this.isLoaded;
        },
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