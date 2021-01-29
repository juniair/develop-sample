var app = new Vue({
  el: "#coupon_list_app",
  data: {
    stayPage: 0,
    selectedPseq: null,
    isLoaded: false,
    items: [],
    requestParams: null
  },
  beforeCreate() {},
  created() {
    let scripts = document.getElementsByTagName("script");
    let queryString = "";
    for (let index = 0; index < scripts.length; index++) {
      const script = scripts[index];
      if (this.srcRegEx.test(script.src)) {
        queryString = script.src.replace(/^https?:\/\/.+\/js\/vue\/view\/couponListView\.js\?/,"")
        this.requestParams = this.queryToParams(queryString);
        queryString = decodeURI(queryString);
        break;
      }
    }
    
    this.loadingModalAction(true);
    
    axios
      .get(`${this.apiUrl}?${queryString}`)
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
      })
      .then(() => {
        this.loadingModalAction(false);
        this.isLoaded = true;
        
      });
  },
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    loadingModalAction(isOpen) {
      if(isOpen) {
        $("html body").css({'overflow': 'hidden', 'height': '100%'});
        $("#mLoading").fadeIn("slow");
      } else {
        $("html body").css({'overflow': '', 'height': ''});
        $("#mLoading").fadeOut("slow");
      }
    },
    queryToParams: function(src) {
      let params = {};
      let parseValue = function(value) {
        if (
          !Number.isNaN(Number(value)) &&
          typeof value === "string" && value.trim() !== ""
        ) {
          value = Number(value);
        } else if (
          value !== null &&
          (value.toLowerCase() === "true" || value.toLowerCase() === "false")
        ) {
          value = value.toLowerCase() === "true";
        }
        return value;
      };
      src.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
        params[key] = parseValue(value);
      });
      return params;
    },
    isNullOrWhiteSpace(value) {
      return value === null || value === undefined || value.trim() == "";
    }
  },
  computed: {
    apiUrl() {
      let params  = this.requestParams;
      let type = params.type;
      let baseUrl = `/api/${type}`
      return baseUrl
    },
    srcRegEx() {
      return /^https?:\/\/.+\/js\/vue\/view\/couponListView\.js([?&]+([^=&]+)=([^&]*))+$/gi;
    }
  },
  watch: {},
  filters: {
    /* 쿠폰 
     * /coupon/1.asp?PCODE=<%=Product_code%>&subTop=1&disPay=<%=PriceFormat(PSPay)%> 
     */
    /* 맛집
     * /coupon/1.asp?PCODE=<%=Product_code%>&subTop=2&subTop=1&disPay=<%=PriceFormat(PSPay)%> 
     */
    /* 카시트 
     * /coupon/1.asp?PCODE=<%=Product_code%>&subTop=3&subTop=1&disPay=<%=PriceFormat(PSPay)%> 
     */
    ///coupon/1.asp?PCODE=<%=Product_code%>&subTop=2&subTop=1&disPay=<%=PriceFormat(PSPay)%>
      hrefFilter(discountPrice, productCode, subTop, actionType) {
        return `/coupon/detail?PCODE=${productCode}&subTop=${subTop}&disPay=${discountPrice}&actionType=${actionType}`;
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
        let rate = ((arg - value) / arg) * 100;
        return Math.round(rate);
      }
  }
});
