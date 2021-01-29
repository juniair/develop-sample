
var app = new Vue({
    el: "#stay_list_app",
    data:{
        selectedPseq: null,
        selectedProductCode: null,
        isLoaded: true,
        items: [],
        stayPage: 0,
        totalCount: -1,
        sortType: "A",
        actionType: 'normal',
        adultCount: 2,
        childCount: 0
    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    beforeUpdate() {

    },
    updated() {
        if(this.selectedPseq) {
            this.$refs.frm.submit();
        }
    },
    mounted() {

    },
    beforeDestroy() {
    },
    destroyed() {

    },
    methods: {
        getItems(request, isNewRequest) {
            if(this.sortType != request.PSCH) {
                this.sortType = request.PSCH;
            }
            if(isNewRequest) {
                this.stayPage = 1;
                this.items = [];
            } else {
                this.stayPage++;
            }
            if(this.isLoaded && 
                (this.items.length == 0 
                    || this.items.length < this.totalCount)
              ) {
                this.isLoaded = false;
                request.page = this.stayPage;
                // const config = {
                //     headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                //     }
                // }
                // let params = new URLSearchParams();
                // for (const key in request) {
                //     if (request.hasOwnProperty(key)) {
                //         const value = request[key];
                //         params.append(key, value);
                //     }
                // }
                this.loadingModalAction(true);
                axios.get("/api/stay", {params: request})
                    .then(response => {
                        let data = response.data
                        if(0 < data.length) {
                            this.items = this.items.concat(data);
                        }
                        let headers = response.headers;
                        this.stayPage = headers["current-page"];
                        this.totalCount = headers["total-count"];
                        this.adultCount = request.adult;
                        this.childCount = request.child;
                        
                    }).catch(error => {
                        console.log(error)
                    }).then(() => {
                        this.loadingModalAction(false);
                        this.isLoaded = true;
                    });
                }
        },
        loadingModalAction(isOpen) {
            if(isOpen) {
              $("html body").css({'overflow': 'hidden', 'height': '100%'});
              $("#mLoading").fadeIn("slow");
            } else {
              $("html body").css({'overflow': '', 'height': ''});
              $("#mLoading").fadeOut("slow");
            }
        },
        showStayDetail(pseq, productCode, actionType) {
            this.actionType = actionType;
            this.selectedPseq = pseq;
            this.selectedProductCode = productCode;
            
            // this.$refs.frm.submit();
        },
        comma(value) {
            var len, point, str; 
       
            num = value + ""; 
            point = num.length % 3 ;
            len = num.length; 
        
            str = num.substring(0, point); 
            while (point < len) { 
                if (str != "") str += ","; 
                str += num.substring(point, point + 3); 
                point += 3; 
            } 
        }
    },
    computed: {
        /*
        CODE1: ""
CODE2: ""
Eday: "2020-12-29"
Num1: "2"
Num2: "0"
Num3: "1"
PSCH: "A"
SARDR: ""
SDARDR: "1"
SNAME: ""
Sday: "2020-12-28"
page: 1 */
    },
    filters: {
        typeFilter(value) {
            return value == "0" ? "대기예약" : "실시간예약";
        },
        commaFilter(value) {
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
        },
        hrefFilter(pseq, sDay, hDay, sortType, adultCount, childCount) {
            return `/stay/detail?sDay=${sDay}&eDay=${hDay}&SARDR=&SDARDR=&Num1=1&Num2=${adultCount}&Num3=${childCount}&SNAME=&CODE1=&CODE2=&PSCH=${sortType}&pseq=${pseq}`;
        }
    }
})