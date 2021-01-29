Vue.component("stay-item", {
    template: `
        <div>
            <a :herf="item.PSEQ | hrefFilter">
                <div class="wrap_img">
                    <img class="lazy-img-fadein" alt="" v-lazy="item.imgintro">
                    <span class="type_maker" :class="{ happy_time: item.S_type == '0', real_time: item.S_type == '1'}">{{ item.S_type | typeFilter }}</span>
                </div>
                <div class="wrap_ctt">
                    <span class="region">{{ item.areaname }}</span>
                    <span class="selCount">{{ item.selCount | priceFilter }}건 구매</span>
                    <p><em>{{ item.lodname }}</em></p>
                    <div class="rateWrap">
                        <i class="icon_rate">평점</i>{{ item.REVIEW_AVG }}/5({{ item.count }})
                    </div>
                    <div class="priceWrap">
                        <div class="price">
                            <div class="title">
                                <p class="origin">정상가</p>
                                <p class="online">온라인판매가</p>
                                <p class="members">쿠주선멤버가</p>
                            </div>
                            <div class="value">
                                <p class="origin">{{ item.originPay | commaFilter }}<span class="decimal">원</span></p>
                                <p class="online">{{ item.Npay | commaFilter }}<span class="decimal">원</span></p>
                                <p class="members">{{ item.dispay | commaFilter }}<span class="decimal">원</span></p>
                            </div>
                            
                            <div class="rate icon_discount">
                                <p class="online_discount">{{ item.Npay | roundFilter(item.originPay) }}<span>%</span></p>
                                <p class="members_discount"><strong>{{ item.dispay | roundFilter(item.originPay) }}</strong><span>%</span></p>	
                            </div>
                            
                        </div>								
                    </div>
                </div>
            </a>
        </div>
    `,
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
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
        hrefFilter(pseq, sDay, hDay, sortType) {
            return `/stay/detail?sDay=${sDay}&eDay=${hDay}&SARDR=&SDARDR=&Num1=2&Num2=0&Num3=1&SNAME=&CODE1=&CODE2=&PSCH=${sortType}&pseq=${pseq}`;
        }
    }
})



Vue.component("rencar-")