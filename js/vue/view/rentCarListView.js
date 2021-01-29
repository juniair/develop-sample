var app = new Vue({
    el: "#app",
    data: {
        isLoading: false,
        commi: 0,
        insType: 1,
        startDay: "",
        startTime: "",
        endDay: "",
        endTime: "",
        items: []
    },
    beforeCreate() {},
    created() {
      let scripts = document.getElementsByTagName("script");
      let queryString = "";
      for (let index = 0; index < scripts.length; index++) {
        const script = scripts[index];
        if (
          /^https?:\/\/.+\/js\/vue\/view\/rentCarListView\.js([?&]+([^=&]+)=([^&]*))+$/gi.test(
            script.src
          )
        ) {
          queryString = decodeURI(
            script.src.replace(
              /^https?:\/\/.+\/js\/vue\/view\/rentCarListView\.js\?/,
              ""
            )
          );
          break;
        }
      }
  
      axios
        .get(`/rentcar/carList.asp?${queryString}`)
        .then(response => {
            let data = response.data
          this.startDay = data.Sday;
          this.startTime = data.sTime;
          this.endDay = data.Eday;
          this.endTime = data.eTime;
          this.items = data.carItems;
        })
        .catch(error => {
        });
    },
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    mounted() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {
        sliceItems(items, start, end) {
            return items.slice(start, end);
        },
        makeHref(rentNumber, cpNumber) {
            return `/rentcar/detail?pseq=${rentNumber}&oseq=${cpNumber}}&rp_sdate=${this.startDay.replace("-", "")}${this.startTime.replace(":", "")}&rp_edate=${this.endDay.replace("-", "")}${this.endTime.replace(":", "")}&insType=${this.insType}`;
        }
    },
    computed: {
         
    },
    watch: {

    },
    filters: {
        utf8Filter(string) {
            return decodeURIComponent(string);
        },
        dicountFilter(price) {
            return price / 100 * this.commi;
        },
        floorFiler(value) {
            return Math.floor(value);
        },
        ceilFiler(value) {
            return Math.ceil(value);
        },
        roundFilter(value) {
            return Math.round(value);
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
        inspayDescriptionFilter(discountedInsPay, insDay) {
            return `${discountedInsPay}원(${insDay}일)`;
        },
        minmumPriceeFilter(cpInfos) {
            let cpInfo = cpInfos.reduce((prev, curr) => prev.discountPrice < curr.discountPrice ? prev : curr);
            return cpInfo.discountPrice;
        },
        hrefFilter(cpNumber, carNumber, startDay, startTime, endDay, eTime, insType) {
            
        },
        compensationLimitDescription(value) {
            return value == 1000 ? "무제한" : `${value}만원`;
        }
    }
});