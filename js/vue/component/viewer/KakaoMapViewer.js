const MapTypeId = {
    "ROADMAP": 1,
    "NORMAL": 1,
    "SKYVIEW": 2,
    "HYBRID": 3,
    "OVERLAY": 4,
    "ROADVIEW": 5,
    "TRAFFIC": 6,
    "TERRAIN": 7,
    "BICYCLE": 8,
    "BICYCLE_HYBRID": 9,
    "USE_DISTRICT": 10
  };
  const EVENTS = [
    'center_changed',
    'zoom_start',
    'zoom_changed',
    'bounds_changed',
    'click',
    'dblclick',
    'rightclick',
    'mousemove',
    'dragstart',
    'drag',
    'dragend',
    'idle',
    'tilesloaded',
    'maptypeid_changed'
  ];

Vue.component("kakao-map-viewer", {
    template: `<div class="kakao-map-viewer"></div>`,
    props: {
        appKey: {
            type: String,
            required: true,
            defualt: ""
        },
        libraries: {
            type: Array,
            required: false,
            default: () => []
        },
        center: {
            type: Object,
            required: true
        },
        level: {
            type: Number,
            required: false,
            default: undefined
        },
        mapTypeId: {
            type: Number,
            required: false,
            default: undefined
        },
        draggable: {
            type: Boolean,
            required: false,
            default: undefined
        },
        scrollwheel: {
            type: Boolean,
            required: false,
            default: undefined
        },
        disableDoubleClick: {
            type: Boolean,
            required: false,
            default: undefined
        },
        disableDoubleClickZoom: {
            type: Boolean,
            required: false,
            default: undefined
        },
        projectionId: {
            type: String,
            required: false,
            default: undefined
        },
        tileAnimation: {
            type: Boolean,
            required: false,
            default: undefined
        },
        keyboardShortcuts: {
            type: [Boolean, Object],
            required: false,
            default: undefined
        },
        isRelayout: {
            type: Boolean,
            required: false,
            default: false
        }

    },
    mounted() {
        window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
    },
    data() {
        return {
            map: null
        };
    },
    methods: {
        initMap() {
            
            this.render();
            this.bindEvents();
            this.$emit("load", this.map);
        },
        render() {
            const options = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(this.center.lat, this.center.lng), //지도의 중심좌표.
                level: this.level, //지도의 레벨(확대, 축소 정도)
                mapTypeId: this.mapTypeId, //지도 타입
                draggable: this.draggable,
                scrollwheel: this.scrollwheel,
                disableDoubleClick: this.disableDoubleClick,
                disableDoubleClickZoom: this.disableDoubleClickZoom,
                projectionId: this.projectionId,
                tileAnimation: this.tileAnimation,
                keyboardShortcuts: this.keyboardShortcuts
            };
            this.map = new kakao.maps.Map(this.$el, options); //지도 생성 및 객체 리턴
        },
        refresh() {
          this.map.relayout();
          this.map.setLevel(this.level);
          let position = new kakao.maps.LatLng(this.center.lat, this.center.lng);
          this.map.setCenter(position);
          this.map.panTo(position);
        },
        bindEvents () {
          const handlers = {
            bounds_changed: this.onChange,
            idle: this.onChange
          };
          for (let event of EVENTS) {
            this.bindEvent(event, handlers[event]);
          }
        },
        bindEvent (event, handler) {
          kakao.maps.event.addListener(this.map, event, (...args) => {
            
            this.$emit(event.replace("_", "-"), args);
            if (typeof handler === 'function') {
              handler();
            }
          });
        },
        onChange () {
          
          const level = this.map.getLevel();
          const latlng = this.map.getCenter();
          this.$emit('update:level', level);
          this.$emit('update:center', {
            lat: latlng.getLat(),
            lng: latlng.getLng()
          });
        },
        addScript() {
            let script = document.createElement('script');
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.appKey}&libraries=${this.libraries.join(',')}`
            document.head.appendChild(script);
        },
        
    },
    watch: {
        level () {
          if (!this.map) {
            return;
          }
          this.map.setLevel(this.level);
          
        },
        center : {
          handler () {
            if (!this.map) {
              return;
            }
            let position = new kakao.maps.LatLng(this.center.lat, this.center.lng);
            this.map.setCenter(position);
          },
          deep: true
        },
        isRelayout(newValue) {
            if(newValue) {
                if(!this.map) {
                    return;
                }
                this.refresh();
            }
        }
    },
    MapTypeId: MapTypeId
});
