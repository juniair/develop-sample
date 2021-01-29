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


Vue.component('tabs', {
    template:`
    <div class="tab-component">
        <div class="tabs" :class="tabsClass">
            <ul :class="ulClass">
                <li class="tab-header" v-for="tab in tabs" :key="tab.id" :class="[tab.headerClass, tab.isActive ? 'on' : '' ]">
                    <button @click="selectTab(tab)">{{ tab.name }}</button>
                </li>
            </ul>
        </div>
        <div class="tabs-details" :class="tabsDetailClass"><slot></slot></div>
    </div>
    `,
    props:{
        tabsClass:{
            type: Array,
            required: false,
            default:() => ([])
        },
        tabsDetailClass:{
            type: Array,
            required: false,
            default:() => ([])
        },
        ulClass: {
            type: Array,
            required: false,
            default:() => ([])
        }
    },
    data() {
        return {
            tabs: []
        }
    },

    created() {
        this.tabs = this.$children;
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.category == selectedTab.category);
                if(tab.isActive) {
                    this.$emit("tab-changed", tab.category);
                }
            });
        }
    }
});

Vue.component('tab', {
    template: `
    <div v-show="isActive" :class="headerClass"><slot></slot></div>
    `,
    props: {
        name: {
            required: true
        },
        category: {
            required: true
        },
        selected: {
            type: Boolean,
            required: false,
            default: false
        },
        headerClass: {
            type: Array,
            required: false,
            default: () => (['']),
        }
    },
    created() {
        this.isActive = this.selected;  
    },
    data() {
        return {
            isActive: false
        }
    },
    beforeUpdate() {
        this.isActive = this.selected;
    },
    mounted() {
    }
});
