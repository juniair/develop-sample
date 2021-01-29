if(!Date.prototype.format) {
    Date.prototype.format = function (f) {

        if (!this.valueOf()) return " ";
    
    
    
        var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    
        var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    
        var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
        var d = this;
    
    
    
        return f.replace(/(yyyy|yy|MM|dd|d|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
    
            switch ($1) {
    
                case "yyyy": return d.getFullYear(); // 년 (4자리)
    
                case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
    
                case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
    
                case "dd": return d.getDate().zf(2); // 일 (2자리)
    
                case "d" : return d.getDate().zf(1)
    
                case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
    
                case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
    
                case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
    
                case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
    
                case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
    
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
    
                case "mm": return d.getMinutes().zf(2); // 분 (2자리)
    
                case "ss": return d.getSeconds().zf(2); // 초 (2자리)
    
                case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
    
                default: return $1;
    
            }
    
        });
    
    };
}



if(!String.prototype.string) {
    String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
}

if(!String.prototype.zf) {
    String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
}

if(!Number.prototype.zf) {
    Number.prototype.zf = function (len) { return this.toString().zf(len); };
}

if(!Number.prototype.priceFormat) {
    Number.prototype.priceFormat = function() {
        let stringNumber = this + "";
        let length = stringNumber.length;
        let point = length % 3;
    
        let str = stringNumber.substring(0, point);
        while (point < length) {
            if(str != "") str += ",";
            str += stringNumber.substring(point, point + 3);
            point += 3;
        }
    
        return str
    }
}

if(!Date.prototype.addDays) {
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
}

Vue.component('rentcar-company-label-component', {
    template:`
        <p class="rentcar-company-label-component company_info">
            <strong class="name" v-html="makeAppendString(item.name, '렌터카')"></strong>
            <span class="distance"><i class="icon_location">거리</i>{{ getDistance(item.lat, item.lng, lat, lng) | precisionRoundFilter }}</span>
        </p>
    `,
    props: {
        lat: {
            type: Number,
            required: false,
            default: 0
        },
        lng: {
            type: Number,
            required: false,
            default: 0
        },
        item: {
            type:Object,
            required: true,
            default: () => {}
        }
    },
    methods: {
        makeAppendString(value, appendString) {
            if(value.includes(appendString)) {
                return `${value.replace(appendString, "")} ${appendString}`;
            } else {
                return `${value} ${appendString}`
            }
        },
        getDistance(lat1 = 0, lon1 = 0, lat2 = 0, lon2 = 0, unit = "K") {

            if (((lat1 == lat2) && (lon1 == lon2)) || (lat1 == 0 || lon1 == 0 || lat2 == 0 || lon2 == 0)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                return dist;
            }
        },
        precisionRound(number, preci = 2) {
            let distance = number;
            let precision = preci;
            if(0 <= number && number < 1) {
                distance = distance * 1000;
                precision = 0;
            }
            let value = +(Math.round(distance + "e+"+precision) + "e-"+precision);
            if(precision <= 0) {
                var factor = Math.pow(10, precision);
                return `${value}m`;
            } else {
                return `${value}km`;
            }
        },
    },
    filters: {
        precisionRoundFilter(number, preci = 2) {
            let distance = number;
            let precision = preci;
            if(0 <= number && number < 1) {
                distance = distance * 1000;
                precision = 0;
            }
            let value = +(Math.round(distance + "e+"+precision) + "e-"+precision);
            if(precision <= 0) {
                var factor = Math.pow(10, precision);
                return `${value}m`;
            } else {
                return `${value}km`;
            }
        }
    }
})

Vue.component('rentcar-company-item-component', {
    template:`
    <div class="rentcar-company-item-component">
        <rentcar-company-label-component :item="item.items[0]"
                                         :lat="lat"
                                         :lng="lng"></rentcar-company-label-component>       
        <ul>
            <rentcar-car-item-component v-for="(company, index) in item.items" :key="company.car.id"
                                        :item="company"
                                        :start-date="startDate" 
                                        :start-time="startTime" 
                                        :end-date="endDate" 
                                        :end-time="endTime" 
                                        :trigger="(isMoreShow && (moreStartValue - 1) < index) || (index <= (moreStartValue - 1))">
            </rentcar-car-item-component>
        </ul>
        <button class="btn_more" v-if="moreStartValue < item.items.length" @click="isMoreShow = !isMoreShow">{{ moreCount }} 개 차량 가격 비교 {{ isMoreShow ? "△" : "▽" }}</button>
    </div>
    `,
    props: {
        lat: {
            type: Number,
            required: false,
            default: 0
        },
        lng: {
            type: Number,
            required: false,
            default: 0
        },
        item: {
            type: Object,
            required: true,
            default: () => {}
        },
        startDate: {
            type: String,
            required: true,
            default: new Date().format("yyyy-MM-dd")
        },
        startTime: {
            type: String,
            required: true,
            default: "08:00"
        },
        endDate: {
            type: String,
            required: true,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        endTime: {
            type: String,
            required: true,
            default: "08:00"
        },
        moreStartValue: {
            type: Number,
            required: false,
            default: 2
        }
    },
    data() {
        return {
            isMoreShow: false
        }
    },
    methods: {        
    },
    computed:{
        moreCount() {
            return this.item.items.length - this.moreStartValue;
        }
    },
    filters: {
        
    }
});

Vue.component('rentcar-car-item-component', {
    template:`
    <transition name="expand" 
               @enter="enter"
               @after-enter="afterEnter"
               @leave="leave">
            <li class="company_item Po_r pt008 pb008 pl010 pr010" v-show="trigger">
                <span class="name" v-html="carName"></span>
                <button class="btn_open_thumbnail" @click="isThumbnailShow = true">차량이미지</button>
                <a class="link" :href="link">실시간예약</a>
                <dl class="data_price_label online">
                    <dt class="txt_title">온라인판매가</dt>
                    <dd class="txt_data"><del class="strike_through">{{ (item.vehiclePrice + item.insurancePrice)  | commaFilter }}원</del></dd>
                </dl>
                <dl class="data_price_label members">
                    <dt class="txt_title"><strong>쿠주선멤버가</strong></dt>
                    <dd class="txt_data"><strong>{{ item.discountPrice  | commaFilter }}원</strong></dd>
                </dl>
                <p class="txt_info main mt010 mb000 ml000 mr000">
                    <span class="license">면허:{{ item.car.license }}</span>
                    <span class="apssenger_limit">인원:{{ item.car.passengerLimit }}명</span>
                    <span class="fuel_type">연료:{{ item.car.fuelType }}</span>
                </p>
                <p class="txt_info ect mt010 mb000 ml000 mr000">
                    <span class="txt">대여조건</span>
                    <span class="age_limit">나이(item.ageLimit)</span>
                    <span class="career_limit">운전경력({{ item.careerLimit }}년 이상)</span>
                    <span class="license_limit">({{ item.licenseLimit }}종보통 이상)</span>
                    <span class="model">차량연식 {{ item.model }} </span>
                    <span class="insurance_limit_amount">보상한도 {{ item.insuranceLimitAmount | insuranceLimitFilter  }}</span>
                </p>
                <div class="thumbnail" v-show="isThumbnailShow">
                    <button class="btn_close" @click="isThumbnailShow = false">
                        <i class="icon_button icon_close">닫기</i>
                    </button>
                    <img class="lazy-img-fadein " alt="" v-lazy="item.car.image">
                    <p class="warning">* 실제 이미지와 다를 수 있습니다.</p>
                </div>
            </li>
        </transition>
    `,
    props: {
        startDate: {
            type: String,
            required: true,
            default: new Date().format("yyyy-MM-dd")
        },
        startTime: {
            type: String,
            required: true,
            default: "08:00"
        },
        endDate: {
            type: String,
            required: true,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        endTime: {
            type: String,
            required: true,
            default: "08:00"
        },
        item: {
            type: Object,
            required: true,
            default: () => {}
        },
        trigger: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            isThumbnailShow: false
        }
    },
    methods: {
        enter(el) {
            el.style.height = 'auto';
            const height = getComputedStyle(el).height;
            el.style.height = 0;
            getComputedStyle(el);
            setTimeout(() => {
                el.style.height = height;
            });
        },
        afterEnter(el) {
            el.style.height = 'auto';
        },
        leave(el) {
            el.style.height = getComputedStyle(el).height;
            getComputedStyle(el);
            setTimeout(() => {
                el.style.height = 0;
            });
        }
    },
    computed: {
        carName() {
            return `${this.item.car.name}`;
        },
        link() {
            try {
                let baseUrl = "/rentcar/detail";
                let carId = this.item.car.id;
                let companyId = this.item.id;
                let startDate = new Date(`${this.startDate} ${this.startTime}`).format("yyyyMMddHHmm");
                let endDate = new Date(`${this.endDate} ${this.endTime}`).format("yyyyMMddHHmm");
                let insuranceType = this.item.insuranceType;
                return `${baseUrl}?pseq=${carId}&oseq=${companyId}&rp_sdate=${startDate}&rp_edate=${endDate}&insType=${insuranceType}&goback=1`;
            } catch (error) {
                console.log(error);
                return "javascript:void(0);"
            }
        }
    },
    filters: {
        insuranceLimitFilter(value) {
            return 1000 <= value ? "무제한" : `${value}만원`
        },
        commaFilter(value) {

            return new Intl.NumberFormat('ko-KR', { minimumSignificantDigits: 1 }).format(value);
        }
    }
});


Vue.component('rentcar-company-car-item-component', {
    template: `
        <div class="rentcar-company-car-item-component">
            <div class="info main">
                <img class="lazy-img-fadein " alt="" v-lazy="item.car.image">
                <strong class="name" v-html="carName"></strong>
                <dl class="data_price_label members">
                    <dt class="txt_title"><strong>쿠주선멤버가</strong></dt>
                    <dd class="txt_data"><strong>{{ item.discountPrice  | commaFilter }}원</strong></dd>
                </dl>
                <p class="spec">
                    <span class="brand">제조사:{{ item.car.brand }}.</span>
                    <span class="type">차종:{{ item.car.type }}.</span>
                    <span class="license">면허:{{ item.car.license }}.</span>
                </p>
                <p class="spec">
                    <span class="passenger_limit">인원:{{ item.car.passengerLimit }}명.</span>
                    <span class="fuel">연료:{{ item.car.fuelType }}</span>
                </p>
            </div>
            <p class="info ect">
                <span class="txt">대여조건</span>
                <span class="age_limit">나이(item.ageLimit)</span>
                <span class="career_limit">운전경력({{ item.careerLimit }}년 이상)</span>
                <span class="license_limit">({{ item.licenseLimit }}종보통 이상)</span>
                <span class="model">차량연식 {{ item.model }} </span>
                <span class="insurance_limit_amount">보상한도 {{ item.insuranceLimitAmount | insuranceLimitFilter  }}</span>
                <span class="use_limit">이용시간 {{ useLimit }}</span>
            </p>
            <a class="link" :href="link">실시간예약</a>
        </div>
    `,
    props: {
        startDate: {
            type: String,
            required: true,
            default: new Date().format("yyyy-MM-dd")
        },
        startTime: {
            type: String,
            required: true,
            default: "08:00"
        },
        endDate: {
            type: String,
            required: true,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        endTime: {
            type: String,
            required: true,
            default: "08:00"
        },
        item: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    data() {
        return {}
    },
    computed: {
        carName() {
            return `${this.item.car.name}`;
        },
        link() {
            try {
                let baseUrl = "/rentcar/detail";
                let carId = this.item.car.id;
                let companyId = this.item.id;
                let startDate = new Date(`${this.startDate} ${this.startTime}`).format("yyyyMMddHHmm");
                let endDate = new Date(`${this.endDate} ${this.endTime}`).format("yyyyMMddHHmm");
                let insuranceType = this.item.insuranceType;
                return `${baseUrl}?pseq=${carId}&oseq=${companyId}&rp_sdate=${startDate}&rp_edate=${endDate}&insType=${insuranceType}&goback=1`;
            } catch (error) {
                console.log(error);
                return "javascript(void);"
            }
        },
        useLimit() {
            let oneDayHour = 1000 * 3600;

            let sDate = new Date(`${this.startDate} ${this.startTime}`);
            let eDate = new Date(`${this.endDate} ${this.endTime}`);
            let dateDiff =  Math.ceil((eDate.getTime() - sDate.getTime()) / oneDayHour)
            return `${dateDiff}H`
        }
    },
    filters: {
        insuranceLimitFilter(value) {
            return 1000 <= value ? "무제한" : `${value}만원`
        },
        commaFilter(value) {
            return new Intl.NumberFormat('ko-KR', { minimumSignificantDigits: 1 }).format(value);
        }
    }
})