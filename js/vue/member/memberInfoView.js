new Vue({
    el: "#wrap",
    data:{
        title: "나의 등급혜택",
        name:"강부성",
        isVip: true,
        money: 4000,
        isActive: true,
        style: "",
        insentive: {
            stay: 0,
            car: 0,
            coupon: 0,
            food: 0,
            buggy: 0
        },
        rate: {
            stay: 0,
            car: 0,
            coupon: 0,
            food: 0,
            buggy: 0
        },
        links: [
            {
                className: "air",
                name: "항공",
                link: "air"
            },
            {
                className: "stay",
                name: "숙소",
                link: "/stay/"
            },
            {
                className: "rentcar",
                name: "렌트카",
                link: "/rentcar/"
            },
            {
                className: "buggy",
                name: "유모차/카시트",
                link: "/buggy/"
            },
            {
                className: "coupon",
                name: "할인쿠폰",
                link: "/coupon/"
            },
            {
                className: "food",
                name: "뷔페/맛집",
                link: "/food/"
            }
        ]
    },
    created: function() {
        
        let scripts = document.getElementsByTagName("script")
        let params = null;
        for (let index = 0; index < scripts.length; index++) {
            const script = scripts[index];

            if(/^https?:\/\/.+\/js\/vue\/member\/memberInfoView\.js([?&]+([^=&]+)=([^&]*))+$/gi.test(script.src)) {
                let replaceSrc = script.src.replace(/^https?:\/\/.+\/js\/vue\/member\/memberInfoView\.js/, "");
                params = this.queryParams(decodeURI(replaceSrc));
                break;
            }
        }
        if(params != null) {
            this.name = params.name;
            this.isVip = params.isVip;
            this.money = params.money;
            if(params.style === null | params.style === undefined) {
                this.style = "";
            } else {
                this.style = params.style;
            }
            
            
            if(params.isActive != null | params.isActive != undefined) {
                this.isActive = params.isActive;
            }


            
            this.insentive.stay = params.insStay;
            this.insentive.car = params.insCar;
            this.insentive.coupon = params.insCoupon;
            this.insentive.food = params.insFood;
            this.insentive.buggy = params.insBuggy;
            this.rate.stay = params.rateStay;
            this.rate.car = params.rateCar;
            this.rate.coupon = params.rateCoupon;
            this.rate.food = params.rateFood;
            this.rate.buggy = params.rateBuggy;
        }
    },
    methods: {
        queryParams: function(src) {
            let params = {};
            let parseValue = function(value) {
                
                if(!Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
                    value = Number(value);
                } else if(value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
                    value = value.toLowerCase() === 'true';
                }
                return value
            };
            src.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { 
                params[key] = parseValue(value); 
            });
            
            return params;
        },
        showInsentive: function() {
            if(this.isActive) {
                this.isActive = false;
            }
        },
        showRate: function() {
            if(!this.isActive) {
                this.isActive = true;
            }
        },
        getDisplayObject: function() {
            if(!this.isVip) {
                this.isActive = true;
            }

            if(!this.isActive) {
                return this.insentive;
            } else {
                return this.rate;
            }
        }
    },
    computed: {
        subTitle: function() {
            if(!this.isActive) {
                return "멤버스 할인 적용율"
            } else {
                return "멤버스 인센티브 적용율"
            }
        },
        role: function() {
            return this.isVip ? "우주인" : "지구인";
        },
        alt: function() {
            return this.isVip ? "VVIP 멤버" : "VIP 멤버";
        },
        banner() {
            return this.isVip ? "/images/banner/main/vvip_mainbanner_.png" :"/images/banner/main/vip_mainbanner.png";
        }
    },
    filters: {
        moneyFormater: function(value) {
            var len, point, str; 
            
            
            let numberString = value.toString();
            point = numberString.length % 3 ;
            len = numberString.length; 
            
            str = numberString.substring(0, point); 
            while (point < len) { 
                if (str != "") str += ","; 
                str += numberString.substring(point, point + 3); 
                point += 3; 
            } 
                 
            return str;
        },
        iconFilter: function(value, style) {
            if(!style) {
                style = ""
            }
            switch (style.toLowerCase()) {
                case "yellow":
                    {
                        return "";
                    }
                default:
                    {
                        switch (value.toLowerCase()) {
                            case "stay": return "ico_stay";
                            case "car": return "ico_car";
                            case "coupon": return "ico_coupon";
                            case "buggy": return "ico_stroller";
                            case "food":  return "ico_food";
                            default: return "";
                        }
                    }
            }
        },
        imageAltFilter: function(value) {
            switch (value.toLowerCase()) {
                case "stay": return "숙박";
                case "car": return "렌터카";
                case "coupon": return "티켓";
                case "buggy": return "여행/편의";
                case "food":  return "뷔페/맛집";
                default: return "";
            }
        },
        labelFilter: function(value) {
            switch (value.toLowerCase()) {
                case "stay": return "숙박";
                case "car": return "렌터카";
                case "coupon": return "티켓";
                case "buggy": return "편의";
                case "food":  return "맛집";
                default: return "";
            }
        }
    }
});