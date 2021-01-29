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

if(!Date.prototype.addDays) {
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
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

Vue.component("filter-modal-component", {
    template:`
    <div class="filter_container" v-show="isShow">
        <div class="modal_overlay">
            <div class="modal_content">
                <div class="modal_header">
                    <strong class="txt">조건 검색</strong>
                    <button class="btn_close" @click="modalClose()"><i class="icon_button icon_close">조건 검색창 닫기</i></button>
                </div>
                <div class="location_section">
                    <location-search :lat="latlng.lat" :lng="latlng.lng" @location-updated="locationUpdated"></location-search>
                </div>
                <tabs @tab-changed="tabChanged" :tabsClass="['filter_tabs']" :tabsDetailClass="['filter_tabs_detail']" :ulClass="['tab-headers']">
                    <tab name="숙박" category="stay" :selected="tabType == 'stay'" :headerClass="['stay']">
                        <scheduler-component :category="'stay'" 
                                             :startDate="settings.stay.startDate" 
                                             :endDate="settings.stay.endDate" 
                                             @openCalendar="showCalendar">
                        </scheduler-component>
                        <dl class="section_input region">
                            <dt class="label_txt">지역</dt>
                            <dd class="input-component">
                                <select-component :options="regions" v-model="settings.stay.area"></select-component>
                            </dd>
                        </dl>
                        <dl class="section_input people">
                            <dt class="label_txt">인원</dt>
                            <dd class="input-component">
                                <select-component class="adult" :options="adultOptions" v-model="settings.stay.adult"></select-component>
                                <select-component class="child" :options="childOptions" v-model="settings.stay.child"></select-component>
                            </dd>
                        </dl>
                        <dl class="section_input search">
                            <dt class="label_txt">숙소명</dt>
                            <dd class="input-component">
                                <input class="input_search" type="text" placeholder="검색어를 입력하세요." v-model="settings.stay.searchWord">
                            </dd>
                        </dl>
                        <dl class="section_check kind">
                            <dl class="label_txt"><strong>유형(다중선택 가능)</strong></dl>
                            <dd class="input-component">
                                <ul class="kind_items">
                                    <li class="kind_item"  v-for="option in stayKindOptions" :key="option.id">
                                        <checkbox-component :value="option.value" :text="option.name" :prefixNaming="'stay_kind_'" v-model="settings.stay.kinds"></checkbox-component>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        <dl class="section_check faci">
                            <dl class="label_txt"><strong>편의시설(다중선택 가능)</strong></dl>
                            <dd class="input-component">
                                <ul class="kind_items">
                                    <li class="kind_item"  v-for="option in stayFaciOptions" :key="option.id">
                                        <checkbox-component :value="option.value" :text="option.name" :prefixNaming="'stay_faci_'" v-model="settings.stay.faci"></checkbox-component>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </tab>
                    <tab name="렌터카" category="rentcar" :selected="tabType == 'rentcar'" :headerClass="['rentcar']">
                        <scheduler-component :category="'rentcar'" 
                                             :startDate="settings.rentcar.startDate" 
                                             :startTime="settings.rentcar.startTime" 
                                             :endDate="settings.rentcar.endDate" 
                                             :endTime="settings.rentcar.endTime" 
                                             @openCalendar="showCalendar">
                        </scheduler-component>
                        <dl class="section_input region">
                            <dt class="label_txt">지역</dt>
                            <dd class="input-component">
                                <select-component :options="regions" v-model="settings.rentcar.area"></select-component>
                            </dd>
                        </dl>
                        <dl class="section_input search">
                            <dt class="label_txt">차량명</dt>
                            <dd class="input-component">
                                <input class="input_search" type="text" placeholder="검색어를 입력하세요." v-model="settings.rentcar.searchWord">
                            </dd>
                        </dl>
                        <dl class="section_check hash">
                            <dl class="label_txt"><strong>추천검색</strong></dl>
                            <dd class="input-component">
                                <ul class="kind_items">
                                    <li class="kind_item"  v-for="option in hashTagOptions" :key="option.id">
                                        <checkbox-component :value="option.value" :trueValue="option.value" :falseValue="''" :text="option.name" name="rentcar_hashtag" :prefixNaming="'rentcar_hashtag_'"  v-model="settings.rentcar.hashTag"></checkbox-component>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        <dl class="section_check ins">
                            <dl class="label_txt"><strong>자차보험</strong></dl>
                            <dd class="input-component">
                                <ul class="kind_items">
                                    <li class="kind_item" v-for="option in rentcarInsOptions" :key="option.id">
                                        <checkbox-component :type="'radio'" :value="option.value" :trueValue="option.value" :falseValue="0" :text="option.name" :name="'rentcar_ins'" :prefixNaming="'rentcar_ins_'" v-model="settings.rentcar.insType"></checkbox-component>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        <dl class="section_check car_kind">
                            <dl class="label_txt"><strong>차종(다중선택 가능)</strong></dl>
                            <dd class="input-component">
                                <ul class="kind_items">
                                    <li class="kind_item" v-for="option in rentcarKindOptions" :key="option.id">
                                        <checkbox-component :value="option.value" :text="option.name" :prefixNaming="'rentcar_kind_'" v-model="settings.rentcar.kinds"></checkbox-component>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </tab>
                    <tab name="티켓" category="tour" :selected="tabType == 'tour'" :headerClass="['tour']">
                        <dl class="section_input region">
                            <dt class="label_txt">지역</dt>
                            <dd class="input-component">
                                <select-component :options="regions" v-model="settings.tour.area"></select-component>
                            </dd>
                        </dl>
                        <dl class="section_input search">
                            <dt class="label_txt">관광지명</dt>
                            <dd class="input-component">
                                <input class="input_search" type="text" placeholder="검색어를 입력하세요." v-model="settings.tour.searchWord">
                            </dd>
                        </dl>
                        <dl class="section_check kind">
                            <dl class="label_txt"><strong>테마</strong></dl>
                            <dd class="input-component">
                                <ul class="kind_items">
                                    <li class="kind_item"  v-for="option in tourThemeOptions" :key="option.id">
                                        
                                        <checkbox-component :name="'tour_theme'" :value="option.value" :trueValue="option.value" :falseValue="0" :text="option.name" :prefixNaming="'tour_theme_'" v-model="settings.tour.theme"></checkbox-component>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </tab>
                    <tab name="뷔페/맛집" category="food" :selected="tabType == 'food'" :headerClass="['food']">
                        <dl class="section_input region">
                            <dt class="label_txt">지역</dt>
                            <dd class="input-component">
                                <select-component :options="regions" v-model="settings.food.area"></select-component>
                            </dd>
                        </dl>
                        <dl class="section_input search">
                            <dt class="label_txt">뷔페/맛집명</dt>
                            <dd class="input-component">
                                <input class="input_search" type="text" placeholder="검색어를 입력하세요." v-model="settings.food.searchWord">
                            </dd>
                        </dl>
                    </tab>
                    <tab v-if="false" name="여행/편의" category="buggy" :selected="tabType == 'buggy'" :headerClass="['buggy']">
                        <dl class="section_input region">
                            <dt class="label_txt">지역</dt>
                            <dd class="input-component">
                                <select-component :options="regions" v-model="settings.buggy.area"></select-component>
                            </dd>
                        </dl>
                        <dl class="section_input search">
                            <dt class="label_txt">여행/편의명</dt>
                            <dd class="input-component">
                                <input class="input_search" type="text" placeholder="검색어를 입력하세요." v-model="settings.buggy.searchWord">
                            </dd>
                        </dl>
                    </tab>
                </tabs>
                <div class="filter_button_group">
                    <button class="btn btn_reset" @click="resetSettings">초기화</button>
                    <button class="btn btn_confirm" @click="applySettings">확인</button>
                </div>
            </div>
            <calendar-component :category="tabType" 
                                :startDate="calendarData.startDate" 
                                :startTime="calendarData.startTime" 
                                :endDate="calendarData.endDate" 
                                :endTime="calendarData.endTime" 
                                @confirm-calendar-data="calendarDataUpdate"
                                v-model="isShowCalendar"></calendar-component>
        </div>
    </div>
    `,
    model: {
        prop: 'isShow',
        event: 'modal-close'
    },
    props: {

        lat: {
            type: Number,
            required: false,
            default: 33.510418
        },
        lng: {
            type: Number,
            required: false,
            default: 126.4861157
        },

        // stay setting props 
        stayStartDate: {
            type:String,
            required: false,
            default: new Date().format("yyyy-MM-dd")
        },
        stayEndDate: {
            type:String,
            required: false,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        staySearchWord: {
            type:String,
            required: false,
            default: ""
        },
        stayArea: {
            type:[String, Number],
            required: false,
            default: 0
        },
        stayAdultCount: {
            type:[String, Number],
            required: false,
            default: 2
        },
        stayChildCount: {
            type:[String, Number],
            required: false,
            default: 0
        },
        stayKinds: {
            type:Array,
            required: false,
            default: () => ([])
        },
        stayFaci: {
            type:Array,
            required: false,
            default: () => ([])
        },
        stayKindOptions:{
            type:Array,
            required: true,
            default: () => ([])
        },
        stayFaciOptions: {
            type:Array,
            required: true,
            default: () => ([])
        },
        adultOptions: {
            type:Array,
            required: true,
            default: () => ([])
        },
        childOptions: {
            type:Array,
            required: true,
            default: () => ([])
        },

        // rentcar setting props 
        rentcarStartDate: {
            type:String,
            required: false,
            default: new Date().format("yyyy-MM-dd")
        },
        rentcarStartTime: {
            type:String,
            required: false,
            default: "08:00"
        },
        rentcarEndDate: {
            type:String,
            required: false,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        rentcarEndTime: {
            type:String,
            required: false,
            default: "08:00"
        },
        rentcarArea: {
            type:[String, Number],
            required: false,
            default: 0
        },
        rentcarHashTag: {
            type: [String, Number],
            required: false,
            default: ""
        },
        rentcarSearchWord: {
            type: String,
            required: false,
            default: ""
        },
        rentcarInsType: {
            type: [String, Number],
            required: false,
            default: "1"
        },
        rentcarKinds: {
            type:Array,
            required: false,
            default: () => (["005"])
        },
        hashTagOptions: {
            type:Array,
            required: true,
            default: () => ([{
                id:0,
                name:"#완전/고급자차",
                value:"001"
            },{
                id:1,
                name:"#15인승 승합",
                value:"002"
            },{
                id:2,
                name:"#19~20년 신차",
                value:"003"
            },{
                id:3,
                name:"#자차 보상무제한",
                value:"004"
            },{
                id:4,
                name:"#친환경 전기차",
                value:"005"
            },{
                id:5,
                name:"#야간배차 무료",
                value:"006"
            },{
                id:6,
                name:"#만 21세 대여 가능",
                value:"007"
            }])
        },
        rentcarInsOptions:{
            type:Array,
            required: true,
            default: () => ([{
                id:0,
                name:"완전/고급자차",
                value: "1"
            },{
                id:1,
                name:"일반자차",
                value: "2"
            },{
                id:2,
                name:"보상무제한",
                value: "3"
            },{
                id:3,
                name:"자차불포함",
                value: "4"
            }])
        },
        rentcarKindOptions:{
            type:Array,
            required: true,
            default: () => ([{
                id:0,
                name:"경차",
                value:"008"
            },{
                id:1,
                name:"소형",
                value:"001"
            },{
                id:2,
                name:"준중형",
                value:"007"
            },{
                id:3,
                name:"중형",
                value:"005"
            },{
                id:4,
                name:"SUV",
                value:"006"
            },{
                id:5,
                name:"승합",
                value:"004"
            },{
                id:6,
                name:"고급",
                value:"002"
            },{
                id:7,
                name:"수입",
                value:"003"
            },{
                id:8,
                name:"전기",
                value:"009"
            },{
                id:9,
                name:"2019~2020 신차",
                value:"011"
            },{
                id:10,
                name:"15인승 승합",
                value:"012"
            }])
        },

        // tour setting props 
        tourStartDate: {
            type:String,
            required: false,
            default: new Date().format("yyyy-MM-dd")
        },
        tourEndDate: {
            type:String,
            required: false,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        tourSearchWord: {
            type:String,
            required: false,
            default: ""
        },
        tourArea: {
            type:[String, Number],
            required: false,
            default: 0
        },
        tourTheme: {
            type: Array,
            required: false,
            default: () => []
        },
        tourThemeOptions: {
            type: Array,
            required: true,
            default: () =>  [{
                id:0,
                name:"테마파크",
                value: 25
            },
            {
                id:1,
                name:"수 상 • 레 저",
                value: 1
            },
            {
                id:2,
                name:"체 험 거 리",
                value: 7
            },
            {
                id:3,
                name:"공 연 • 전 시",
                value: 13
            },
            {
                id:4,
                name:"실 내 관 광 지",
                value: 29
            }]
        },

        // food setting props 
        foodStartDate: {
            type:String,
            required: false,
            default: new Date().format("yyyy-MM-dd")
        },
        foodEndDate: {
            type:String,
            required: false,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        foodSearchWord: {
            type:String,
            required: false,
            default: ""
        },
        foodArea: {
            type:[String, Number],
            required: false,
            default: 0
        },

        // buggy setting props 
        buggyStartDate: {
            type:String,
            required: false,
            default: new Date().format("yyyy-MM-dd")
        },
        buggyEndDate: {
            type:String,
            required: false,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        buggySearchWord: {
            type:String,
            required: false,
            default: ""
        },
        buggyArea: {
            type:[String, Number],
            required: false,
            default: 0
        },

        // defulat setting props
        category: {
            type:String,
            required: true,
            default: "stay"
        },
        isShow: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    created() {
        this.initSettings(false);
    },
    data() {
        return {
            tabType: this.category,
            settings: {
            },
            inJeju: false,
            isShowCalendar: false,
            latlng: {
                lat:this.lat,
                lng:this.lng
            }
        }
    },
    methods: {
        resetSettings() {
            if(confirm("설정한 값을 초기화 하시겠습니까?")) {
                this.initSettings(true);
                this.resetScroll();
            }
        },
        initSettings(isReset = false) {
            this.settings = {
                stay:{
                    startDate: this.stayStartDate,
                    endDate: this.stayEndDate,
                    searchWord: this.staySearchWord,
                    area: this.stayArea,
                    adult: this.stayAdultCount,
                    child: this.stayChildCount,
                    kinds: this.stayKinds,
                    faci: this.stayFaci
                },
                rentcar:{
                    startDate: this.rentcarStartDate,
                    startTime: this.rentcarStartTime,
                    endDate: this.rentcarEndDate,
                    endTime: this.rentcarEndTime,
                    searchWord: this.rentcarSearchWord,
                    area: this.rentcarArea,
                    hashTag: this.rentcarHashTag,
                    insType: this.rentcarInsType,
                    kinds: this.rentcarKinds
                },
                tour:{
                    startDate: this.tourStartDate,
                    endDate: this.tourEndDate,
                    theme: this.tourTheme,
                    searchWord: this.tourSearchWord,
                    area: this.tourArea,
                },
                food:{
                    startDate: this.foodStartDate,
                    endDate: this.foodEndDate,
                    searchWord: this.foodSearchWord,
                    area: this.foodArea,
                },
                buggy:{
                    startDate: this.buggyStartDate,
                    endDate: this.buggyEndDate,
                    searchWord: this.buggySearchWord,
                    area: this.buggyArea,
                }
            };

            if(isReset) {
                this.settings.stay.searchWord = "";
                this.settings.stay.adult = 2;
                this.settings.stay.child = 0;

                this.settings.rentcar.searchWord = "";
                this.settings.rentcar.hashTag = "";
                this.settings.rentcar.insType = "3";
                this.settings.rentcar.kinds = ["005"];

                this.settings.tour.searchWord = "";
                this.settings.tour.theme = [];

                this.settings.food.searchWord = "";

                this.settings.buggy.searchWord = "";
            }
        },
        resetScroll() {
            let $el = document.getElementsByClassName("filter_tabs_detail")[0];
            $el.scrollTo(0,0);
        },
        applySettings() {
            let data = {
                category: this.tabType,
                settings: null,
                latlng: this.latlng
            };
            switch (this.tabType) {
                case "rentcar":
                    data.settings = this.settings.rentcar;
                    break;
                case "tour":
                    data.settings = this.settings.tour;
                    break;
                case "food":
                    data.settings = this.settings.food;
                    break;
                case "buggy":
                    data.settings = this.settings.buggy;
                    break;
                case "stay":
                    data.settings = this.settings.stay;
                default:
                    break;
            }
            this.resetScroll();
            this.$emit("apply", data);
            this.$emit('modal-close', false);
        },
        modalClose() {
            this.resetScroll();
            this.$emit('modal-close', false);
        },
        tabChanged(category)  {
            this.tabType = category;
            this.resetScroll();
        },
        locationUpdated(locationData) {
            if(locationData.isSucceeded) {
                this.latlng.lat = locationData.lat;
                this.latlng.lng = locationData.lng;
                this.inJeju = locationData.inJeju;
            } 
        },
        showCalendar() {
            this.isShowCalendar = true;
        },
        calendarDataUpdate(calendarData) {
            
           
            switch (this.tabType) {
                case 'stay':
                    this.settings.stay.startDate = calendarData.startDate.format("yyyy-MM-dd");
                    this.settings.stay.endDate = calendarData.endDate.format("yyyy-MM-dd");
                    break;
                case 'rentcar':
                    this.settings.rentcar.startDate = calendarData.startDate.format("yyyy-MM-dd");
                    this.settings.rentcar.endDate = calendarData.endDate.format("yyyy-MM-dd");
                    this.settings.rentcar.startTime = calendarData.startTime;
                    this.settings.rentcar.endTime = calendarData.endTime;
                    break;
                default:
                    break;
            }
        }
    },
    watch: {
        isShow(newValue) {
            if(newValue) {
                
                this.tabType = this.category;
                this.initSettings();
            }
        },
        lat(newValue) {
            this.latlng.lat = newValue
        },
        lng(newValue) {
            this.latlng.lng = newValue
        },
    },
    computed: {
        calendarData() {
            let item = {}
            switch (this.tabType) {
                case "rentcar":
                    item.startDate = this.settings.rentcar.startDate;
                    item.startTime = this.settings.rentcar.startTime;
                    item.endDate = this.settings.rentcar.endDate;
                    item.endTime = this.settings.rentcar.endTime;
                    break;
                case "stay":
                    item.startDate = this.settings.stay.startDate;
                    item.endDate = this.settings.stay.endDate;
                    item.startTime = "";
                    item.endTime = "";
                    break;
                default:
                    break;
            }
            
            return item;
        },
        regions() {
            
            if(this.tabType == "stay" || this.tabType == "tour") {
                return [{
                    id:1,
                    value: 0,
                    name: (this.inJeju ? "제주도" : "제주도(공항기준)")
                },
                {
                    id:2,
                    value: 9999,
                    name:"내륙"
                }]
            }
            else {
                return [{
                    id:1,
                    value: 0,
                    name: (this.inJeju ? "제주도" : "제주도(공항기준)")
                }]
            }
        }
        

    },
    filters: {
        namingfilter(value, prefixString) {
            return `${prefixString}_${value}`
        }
    }
});

Vue.component("location-search", {
    template:`
        <div class="filter_location_search_component">
            <dl>
                <dt>내 위치</dt>
                <dd>
                    <span>{{ locationData.myLocation }}</span>
                    <button class="btn_refresh" @click="locationRefresh"><i class="icon_button icon_refresh">내 위치 새로고침</i></button>
                </dd>
            </dl>
        </div>
    `,
    props: {
        lat: {
            type: Number,
            required: false,
            default: 33.510418
        },
        lng: {
            type: Number,
            required: false,
            default: 126.4861157
        },
    },
    created() {
        
    },
    mounted() {
        (async () => {
            await this.locationRefresh();
        })();
        
    },
    data() {
        return {
            geocoder: null,
            locationData: {
                myLocation: "위치정보를 확인할 수 없습니다.",
                isSucceeded: true,
                inJeju: false,
                lat: this.lat,
                lng: this.lng
            }
        }
    },
    methods: {
        async locationRefresh() {
            try {
                let geo = await this.geoLocationSearch();
                let coords = geo.coords;
                let lat = coords.latitude;
                let lng = coords.longitude;
                let result = await this.locationUpdate(lat, lng);
                this.locationData.inJeju = result.inJeju;
                this.locationData.lat = result.lat;
                this.locationData.lng = result.lng;
                this.locationData.myLocation = result.myLocation;
                
            } catch (error) {
                this.locationData.myLocation = "위치정보를 확인할 수 없습니다.";
                this.locationData.lat = 33.510418;
                this.locationData.lng = 126.4861157;
            }

            this.$emit("location-updated", this.locationData)           
        },
        async locationUpdate(lat, lng) {
            let obj = {
                myLocation: "",
                isSucceeded: false,
                inJeju: false,
                lat: lat,
                lng: lng
            };

            try {
                let result = await this.locationSearch(lat, lng);
                if (result.length <= 0) {
                    throw {
                        isSucceeded: false,
                        inJeju: false
                    }
                }
                obj.isSucceeded = true;
                let area = result[0];
                let address = area.address;
                obj.myLocation = address.address_name;
                obj.inJeju = inJeju = /제주.*/.test(obj.myLocation)
            } catch (error) {
                obj.myLocation = "위치정보를 확인할 수 없습니다.";
                obj.isSucceeded = error.isSucceeded;
                obj.inJeju = error.inJeju;
            }
            

            if(!obj.inJeju) {
                obj.lat = 33.506629;
                obj.lng = 126.493134;
            }
            return obj;
        },
        locationSearch(lat, lng) {
            return new Promise((resolve, reject) => {
                try {
                    if(!this.geocoder) {
                        this.geocoder = new kakao.maps.services.Geocoder();
                    }
                    
                    this.geocoder.coord2Address(lng, lat, (result, status) => {
                        if(status != kakao.maps.services.Status.OK) {
                            reject({
                                isSucceeded: false,
                                inJeju: false
                            });
                        }
                        else {
                            resolve(result);
                        }
                    })
                } catch (error) {
                    reject(error);
                }
            });
        },
        geoLocationSearch(options) {
            return new Promise((resolve, reject) => {
                if('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(resolve, reject, options)
                }
            });
        }
    }
})

Vue.component("scheduler-component", {
    template: `
        <div class="scheduler_component">
            <button class="btn_open_calendar" @click="$emit('openCalendar')">
                <dl class="label_date start">
                    <dt class="txt">대여일</dt>
                    <dd>
                        <span class="day">{{ startDate | dateFormatFilter("MM.dd") }}</span>
                        <small>
                            <span class="year">{{ startDate | dateFormatFilter("yyyy") }}</span>
                            <span class="week_of_day">{{ startDate | dateFormatFilter("KL") }}</span>
                            <span v-if="category == 'rentcar'" class="time">{{ startTime }}</span>
                        </small>
                    </dd>
                </dl>
                <span class="diff">{{ category | diffFilter(startDate, startTime, endDate, endTime) }}</span>
                <dl class="label_date end">
                    <dt class="txt">반납일</dt>
                    <dd>
                        <span class="day">{{ endDate | dateFormatFilter("MM.dd") }}</span>
                        <small>
                            <span class="year">{{ endDate | dateFormatFilter("yyyy") }}</span>
                            <span class="week_of_day">{{ endDate | dateFormatFilter("KL") }}</span>
                            <span v-if="category == 'rentcar'" class="time">{{ endTime }}</span>
                        </small>
                    </dd>
                </dl>
            </button>
        </div>
    `,
    props: {
        startDate: {
            type:String,
            required: false,
            default: new Date().format("yyyy-MM-dd")
        },
        startTime: {
            type:String,
            required: false,
            default: "08:00"
        },
        endDate: {
            type:String,
            required: false,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        endTime: {
            type:String,
            required: false,
            default: "08:00"
        },
        category: {
            type:String,
            required: true,
            default: "stay"
        }
    },
    watch: {
    },
    filters: {
        diffFilter(category, startDate, startTime, endDate, endTime) {
            let sDate;
            let eDate;
            if(category == "rentcar") {

                let oneDayHour = 1000 * 3600;

                sDate = new Date(`${startDate} ${startTime}`);
                eDate = new Date(`${endDate} ${endTime}`);
                let dateDiff =  Math.ceil((eDate.getTime() - sDate.getTime()) / oneDayHour)
                return `${dateDiff}H`
            }
            else {

                let oneDay = 1000 * 3600 * 24;

                sDate = new Date(`${startDate}`);
                eDate = new Date(`${endDate}`);   
                
                let dateDiff =  Math.ceil((eDate.getTime() - sDate.getTime()) / oneDay)
                return `${dateDiff}박`
            }


        },
        dateFormatFilter(value, formatString) {
            return new Date(value).format(formatString);
        }
    }
});