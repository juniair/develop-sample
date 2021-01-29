var app = new Vue({
  el: "#app",
  data: {
    searchWord: "",
    isLoaded: false,
    selectedTab: null,
    stayItems: [],
    rentCarItems: [],
    couponItems: [],
    foodItems: [],
  },
  created() {
    let queryString = decodeURI(location.search)
    let params = this.queryToParams(queryString)
    console.log(params)
    this.searchWord = params.srhTxt;

  },
  mounted() {
    (async () => {
      let response = await axios.get(`/api/search?srhTxt=${this.searchWord}`);
      let statusCode = response.status;
      if (statusCode == 200) {
        let data = response.data;
        this.stayItems = data.stayItems;
        this.rentCarItems = data.rentCarItems;
        this.couponItems = data.couponItems;
        this.foodItems = data.foodItems;

        if (0 < this.stayItems.length) {
          this.selectedTab = "stay";
        } else if (0 < this.rentCarItems.length) {
          this.selectedTab = "rentcar";
        } else if (0 < this.couponItems.length) {
          this.selectedTab = "coupon";
        } else {
          this.selectedTab = "food";
        }
      }
      this.isLoaded = true;
    })();
  },
  methods: {
    queryToParams: function(src) {
      let params = {};
      let parseValue = function(value) {
        if (
          !Number.isNaN(Number(value)) &&
          typeof value === "string" &&
          value.trim() !== ""
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
    getRentcarMinimumPrice(item) {
      let company = this.getRentcarMinimumPriceCompany(item.companies);
      let totalPrice = 0;
      if(company != null) {
        totalPrice = company.discountVehiclePrice + company.discountInsurancePrice;
      }
      return totalPrice;
    },
    getRentcarMinimumPriceCompany(companies) {
      let result = null
      for (const company of companies) {
        if(result == null) {
          result = company;
        }
        else {
          let mininumPrice = result.discountVehiclePrice + result.discountInsurancePrice;
          let totalPrice = company.discountVehiclePrice + company.discountInsurancePrice;
          if(totalPrice < mininumPrice) {
            result = company;
          }
        }
      }

      return result;
    },
    isNullOrWhiteSpace(str) {
      if(!str) {
        return true
      } else {
        return str.replace(/\s/g, "").length == 0
      }
    }
  },
  filters: {
    stayLinkFilter(item, linkOption) {
      try {
        return `/stay/detail?product_code=${item.productCode}&pseq=${item.id}&actionType=${linkOption}&goback=1`;
      } catch (error) {
        return ""
      }
    },
    stayTypeFilter(stayType) {
      return stayType == "0" ? "대기예약" : "실시간예약";
    },
    rentcarLinkFilter(item, company) {
      try {
        return `/rentcar/detail?pseq=${item.id}&oseq=${company.id}&insType=${company.insuranceType}`;
      } catch (error) {
        return "";
      }
    },
    couponLinkFilter(item, linkOption) {
      try {
        return `/coupon/detail?PCODE=${item.productCode}&subTop=${item.category}&actionType=${linkOption}&goback=1`;
      } catch (error) {
        return ""
      }
    },
    priceFormatFilter(value) {
      try {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //return new Intl.NumberFormat('ko-KR', { minimumSignificantDigits: 1 }).format(value);
      } catch (error) {
        return 0
      }
    },
    roundFilter(value, arg) {
      try {
        if (arg == 0) {
          return 0;
        }
        let rate = ((arg - value) / arg) * 100;
        return Math.round(rate);
      } catch (error) {
        return ""
      }
    },
  },
  computed: {
    isEmptyItems() {
      let totalItemCount = 0;
      try {
        totalItemCount += this.stayItems.length;
        totalItemCount += this.rentCarItems.length;
        totalItemCount += this.couponItems.length;
        totalItemCount += this.foodItems.length;
      } catch (error) {
        
      }

      return totalItemCount == 0;
    },
  },
});
