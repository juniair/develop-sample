new Vue({
  el: '#view',
  data: {
    sortType: 'distance',
    category: 'stay',
    layerType: 0,
    items: [],
    isLoaded: false,
    markerInfos: [],
    selectedMarkerItem: [],
    myMarker: null,
    kakaoMapOptions: {
      appKey: '1bc2fe21830fe9a1689c1fb4df1d4078',
      libraries: ['services'],
      level: 5,
      mapTypeId: MapTypeId.NORMAL,
      center: { lat: 33.450701, lng: 126.570667 },
    },
    lat: 0,
    lng: 0,
    kakaoMap: null,
    contentHeight: { height: `100%` },
    isShow: false,
    settings: {},
    axiosCancelToken: axios.CancelToken,
    options: {
      stayKindOptions: [],
      stayFaciOptions: [],
      adultOptions: [],
      childOptions: [],
      hashTagOptions: [],
      rentcarInsOptions: [],
      rentcarKindOptions: [],
      tourThemeOptions: [],
    },
    categoryItems: [],
    isHeaderShow: true,
    headerHeight: 76,
    footerHeight: 53,
  },
  created() {
    if (this.layerType == 0) {
      window.addEventListener('scroll', this.onScroll)
    }
    this.getOptions('rentcar', 'hashTag').then((response) => (this.options.hashTagOptions = response.data))
    this.getOptions('rentcar', 'insType').then((response) => (this.options.rentcarInsOptions = response.data))
    this.getOptions('rentcar', 'kind').then((response) => (this.options.rentcarKindOptions = response.data))
    this.getOptions('stay', 'kind').then((response) => (this.options.stayKindOptions = response.data))
    this.getOptions('stay', 'faci').then((response) => (this.options.stayFaciOptions = response.data))
    this.getOptions('stay', 'adult').then((response) => (this.options.adultOptions = response.data))
    this.getOptions('stay', 'child').then((response) => (this.options.childOptions = response.data))
    this.getOptions('tour', 'theme').then((response) => (this.options.tourThemeOptions = response.data))

    let data = this.scriptParsing()
    this.lat = data.lat
    this.lng = data.lng
    this.kakaoMapOptions.center.lat = data.lat
    this.kakaoMapOptions.center.lng = data.lng
    this.category = data.category

    this.settings = {
      stay: {
        startDate: data.startDate,
        endDate: data.endDate,
        searchWord: null,
        area: 0,
        adult: 2,
        child: 0,
        kinds: [],
        faci: [],
      },
      rentcar: {
        startDate: data.startDate,
        startTime: data.startTime,
        endDate: data.endDate,
        endTime: data.endTime,
        searchWord: null,
        area: 0,
        hashTag: '',
        insType: '3',
        kinds: ['005'],
      },
      tour: {
        startDate: data.startDate,
        endDate: data.endDate,
        searchWord: null,
        area: 0,
        theme: [],
      },
      food: {
        startDate: data.startDate,
        endDate: data.endDate,
        searchWord: null,
        area: 0,
      },
      buggy: {
        startDate: data.startDate,
        endDate: data.endDate,
        searchWord: null,
        area: 0,
      },
    }

    let startDate = new Date(`${this.settings.rentcar.startDate} ${this.settings.rentcar.startTime}`)

    if (20 <= startDate.getHours()) {
      this.settings.rentcar.startDate = startDate.addDays(1).format('yyyy-MM-dd')
      this.settings.rentcar.endDate = startDate.addDays(2).format('yyyy-MM-dd')
    }
    if (!(8 <= startDate.getHours() && startDate.getHours() <= 20)) {
      this.settings.rentcar.startTime = '08:00'
      this.settings.rentcar.endTime = '08:00'
    }
    switch (this.category) {
      case 'stay':
        this.settings.stay.area = data.area
        break
      case 'rentcar':
        this.settings.rentcar.area = data.area
        break
      case 'tour':
        this.settings.tour.area = data.area
        break
      case 'buggy':
        this.settings.buggy.area = data.area
        break
      case 'food':
      default:
        this.settings.food.area = data.area
        break
    }

    // axios.interceptors.response.use(function (response) {
    //     throw new axios.Cancel('Operation canceled by the user.');
    //   }, function (error) {
    //     return Promise.reject(error);
    //   })
    this.displayUpdate({
      data: this.settings[this.category],
      category: this.category,
    })
  },
  mounted() {
    ;(async () => {
      // this.options.stayKindOptions = await this.getOptions("stay", "kind");
      // this.options.stayFaciOptions = await this.getOptions("stay", "faci");
      // this.options.adultOptions = await this.getOptions("stay", "adult");
      // this.options.childOptions = await this.getOptions("stay", "child");
      // this.options.hashTagOptions = await this.getOptions("rentcar", "hashTag");
      // this.options.rentcarInsOptions = await this.getOptions("rentcar", "insType");
      // this.options.rentcarKindOptions = await this.getOptions("rentcar", "kind");
      // this.options.tourThemeOptions = await this.getOptions("tour", "theme");
      await this.getProducts()
    })()
  },
  methods: {
    onScroll() {
      try {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

        if (currentScrollPosition < 0) {
          return
        }
        // Stop executing this function if the difference between
        // current scroll position and last scroll position is less than some offset

        // if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 80) {
        //     return;
        // }
        this.isHeaderShow = currentScrollPosition === 0
      } catch (error) {
        console.error(error)
      }
    },
    async apply(applyData) {
      this.category = applyData.category
      let settings = this.settings[applyData.category]
      let latlng = applyData.latlng
      this.lat = latlng.lat
      this.lng = latlng.lng
      this.kakaoMapOptions.center.lat = latlng.lat
      this.kakaoMapOptions.center.lng = latlng.lng
      switch (applyData.category) {
        case 'stay':
          settings.startDate = applyData.settings.startDate
          settings.endDate = applyData.settings.endDate
          settings.area = applyData.settings.area
          settings.searchWord = applyData.settings.searchWord
          settings.adult = applyData.settings.adult
          settings.child = applyData.settings.child
          settings.kinds = applyData.settings.kinds
          settings.faci = applyData.settings.faci
          break
        case 'rentcar':
          settings.startDate = applyData.settings.startDate
          settings.startTime = applyData.settings.startTime
          settings.endDate = applyData.settings.endDate
          settings.endTime = applyData.settings.endTime
          settings.area = applyData.settings.area
          settings.searchWord = applyData.settings.searchWord
          settings.hashTag = applyData.settings.hashTag
          settings.insType = applyData.settings.insType
          settings.kinds = applyData.settings.kinds
          break
        case 'tour':
          settings.startDate = applyData.settings.startDate
          settings.endDate = applyData.settings.endDate
          settings.area = applyData.settings.area
          settings.searchWord = applyData.settings.searchWord
          settings.theme = applyData.settings.theme
          break
        case 'buggy':
        case 'food':
        default:
          settings.startDate = applyData.settings.startDate
          settings.endDate = applyData.settings.endDate
          settings.area = applyData.settings.area
          settings.searchWord = applyData.settings.searchWord
          break
      }
      let displayData = {
        category: applyData.category,
        data: applyData.settings,
      }
      EventBus.$emit('update-data', displayData)

      this.displayUpdate(displayData)

      await this.getProducts()
    },
    async getProducts() {
      this.items = []
      this.isLoaded = false

      try {
        let response = await axios.get(this.ApiUrl)
        if (response.status == 200) {
          this.items = response.data
        }
      } catch (error) {
        this.items = []
      }

      this.isLoaded = true
      this.resetMarker()
      this.makeMarker()
    },
    getOptions(category, type) {
      return axios.get(`/api/option?category=${category}&type=${type}`)
      // let options = []
      // try {
      //   let response = await axios.get(`/api/option?category=${category}&type=${type}`);

      //   if(response.status == 200) {
      //     options = response.data;
      //   }

      // } catch (error) {
      // }

      // return options;
    },
    displayUpdate(displayData) {
      this.categoryItems = []

      this.categoryItems.push({
        type: 'category',
        value: displayData.category,
        isVisible: true,
      })

      this.categoryItems.push({
        type: 'date',
        value: {
          start: displayData.data.startDate,
          end: displayData.data.endDate,
        },
        isVisible: true,
      })

      if (displayData.category == 'rentcar') {
        this.categoryItems.push({
          type: 'time',
          value: {
            start: displayData.data.startTime,
            end: displayData.data.endTime,
          },
          isVisible: true,
        })
      }

      if (displayData.data.searchWord) {
        this.categoryItems.push({
          type: 'searchTxt',
          value: displayData.data.searchWord,
          isVisible: true,
        })
      }

      switch (displayData.category) {
        case 'stay':
          this.StayDisplayUpdate(displayData.data)
          break
        case 'rentcar':
          this.RentcarDisplayUpdate(displayData.data)
          break
        case 'tour':
          this.CouponDisplayUpdate(displayData.data)
        case 'food':
        case 'buggy':
        default:
          break
      }
    },
    StayDisplayUpdate(data) {
      this.categoryItems.push({
        type: 'adult', // num1
        value: data.adult,
        isVisible: true,
      })
      this.categoryItems.push({
        type: 'child', // num2
        value: data.child,
        isVisible: true,
      })

      for (const kind of data.kinds) {
        this.categoryItems.push({
          type: 'stayType', // num3
          value: kind,
          isVisible: true,
        })
      }
      for (const facility of data.faci) {
        this.categoryItems.push({
          type: 'facility', // num3
          value: facility,
          isVisible: true,
        })
      }
    },
    RentcarDisplayUpdate(data) {
      this.categoryItems.push({
        type: 'insType', // num2
        value: data.insType,
        isVisible: true,
      })
      for (const kind of data.kinds) {
        this.categoryItems.push({
          type: 'carType', // num3
          value: kind,
          isVisible: true,
        })
      }

      if (data.hashTag) {
        this.categoryItems.push({
          type: 'hashTag', // num3
          value: data.hashTag,
          isVisible: true,
        })
      }
    },
    CouponDisplayUpdate(data) {
      for (const theme of data.theme) {
        this.categoryItems.push({
          type: 'couponType', // num3
          value: theme,
          isVisible: true,
        })
      }
    },
    layerChange(value) {
      this.layerType = value
      if (value != 1) {
        this.hiddenMyMarkerOverlay()
      }
    },
    openFilterModal() {
      this.isShow = true
    },
    async resetPosition() {
      try {
        let geo = await this.geoLocationSearch()
        let coords = geo.coords
        let lat = coords.latitude
        let lng = coords.longitude
        let result = await this.locationUpdate(lat, lng)
        this.lat = result.lat
        this.lng = result.lng
      } catch (error) {
        this.lat = 33.510418
        this.lng = 126.4861157
      }

      this.kakaoMapOptions.center.lat = this.lat
      this.kakaoMapOptions.center.lng = this.lng
      this.updateMyPosition()
    },
    async locationUpdate(lat, lng) {
      let obj = {
        myLocation: '',
        isSucceeded: false,
        inJeju: false,
        lat: lat,
        lng: lng,
      }

      try {
        let result = await this.locationSearch(lat, lng)
        if (result.length <= 0) {
          throw {
            isSucceeded: false,
            inJeju: false,
          }
        }
        obj.isSucceeded = true
        let area = result[0]
        let address = area.address
        obj.myLocation = address.address_name
        obj.inJeju = inJeju = /제주.*/.test(obj.myLocation)
      } catch (error) {
        obj.myLocation = '위치정보를 확인할 수 없습니다.'
        obj.isSucceeded = error.isSucceeded
        obj.inJeju = error.inJeju
      }

      if (!obj.inJeju) {
        obj.lat = 33.506629
        obj.lng = 126.493134
      }
      return obj
    },
    locationSearch(lat, lng) {
      return new Promise((resolve, reject) => {
        try {
          if (!this.geocoder) {
            this.geocoder = new kakao.maps.services.Geocoder()
          }

          this.geocoder.coord2Address(lng, lat, (result, status) => {
            if (status != kakao.maps.services.Status.OK) {
              reject({
                isSucceeded: false,
                inJeju: false,
              })
            } else {
              resolve(result)
            }
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    geoLocationSearch(options) {
      return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options)
        }
      })
    },
    zoom(value) {
      this.kakaoMapOptions.level = this.kakaoMapOptions.level + value
    },
    kakaoMapLoad(map) {
      this.kakaoMap = map
      this.updateMyPosition()
    },
    showmyMarkerOverlay() {
      if (this.myMarker && this.myMarker.overlayConent) {
        this.myMarker.overlayConent.style.display = ''
      }
    },
    hiddenMyMarkerOverlay(args) {
      if (this.myMarker && this.myMarker.overlayConent) {
        this.myMarker.overlayConent.style.display = 'none'
      }
    },
    updateMyPosition() {
      if (window.kakao) {
        let position = new kakao.maps.LatLng(this.lat, this.lng)
        if (this.myMarker) {
          this.myMarker.marker.setPosition(position)
          this.myMarker.overlay.setPosition(position)

          if (this.myMarker.overlayConent.style.display == 'none') {
            this.showmyMarkerOverlay()
          }
        } else {
          let imageSrc = '/images/map/kakaomap/icon_mylocation_148x148.png'
          let imageSize = new kakao.maps.Size(74, 74)
          let imageOption = {
            offset: new kakao.maps.Point(37, 37),
          }

          let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

          let marker = new kakao.maps.Marker({
            position: position,
            image: markerImage, // 마커이미지 설정
          })
          marker.setMap(this.kakaoMap)
          let overlayElement = this.makeMyOverlayItem()
          let overlay = new kakao.maps.CustomOverlay({
            clickable: true,
            map: this.kakaoMap,
            position: position,
            content: overlayElement,
            yAnchor: 1,
            zIndex: 3
          })

          this.myMarker = {
            overlay: overlay,
            marker: marker,
            overlayConent: overlayElement,
          }
        }
      }
    },
    scriptParsing() {
      let scripts = document.getElementsByTagName('script')
      let queryString = ''
      let result = {}
      for (let index = 0; index < scripts.length; index++) {
        const script = scripts[index]
        let isVaild = /^https?:\/\/.+\/js\/vue\/view\/location\/LocationView\.js([?&]+([^=&]+)=([^&]*))+$/gi.test(script.src)
        if (isVaild) {
          queryString = decodeURI(script.src.replace(/^https?:\/\/.+\/js\/vue\/view\/location\/LocationView\.js/, ''))
          result = this.queryToParams(queryString)
          break
        }
      }

      return result
    },
    queryToParams: function (src) {
      let params = {}
      let parseValue = function (value) {
        if (!Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
          value = Number(value)
        } else if (value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
          value = value.toLowerCase() === 'true'
        }
        return value
      }
      src.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
        params[key] = parseValue(value)
      })
      return params
    },
    precisionRound(number, preci = 2) {
      let distance = number
      let precision = preci
      if (0 <= number && number < 1) {
        distance = distance * 1000
        precision = 0
      }
      let value = +(Math.round(distance + 'e+' + precision) + 'e-' + precision)
      if (precision <= 0) {
        var factor = Math.pow(10, precision)
        return `${value}m`
      } else {
        return `${value}km`
      }
    },
    resetMarker() {
      for (const markerInfo of this.markerInfos) {
        let inputElement = markerInfo.content.querySelector('input')
        inputElement.removeEventListener('click', this.overlayClickEvent(inputElement, markerInfo.items))
        markerInfo.items = null
        markerInfo.content = null
        markerInfo.marker.setMap(null)
        markerInfo.overlay.setMap(null)
      }
      this.selectedMarkerItem = []
      this.markerInfos = []
    },
    makeMarker() {
      Enumerable.from(this.groupItems).forEach((group) => {
        if (window.kakao) {
          let latlng = null

          if (this.category != 'rentcar') {
            latlng = group.key
          } else {
            latlng = {
              lat: group.items[0].lat,
              lng: group.items[0].lng,
            }
          }

          let position = new kakao.maps.LatLng(latlng.lat, latlng.lng)
          let marker = new kakao.maps.Marker({
            position: position,
            opacity: 0,
          })
          marker.setMap(this.kakaoMap)
          let item = this.makeOverlayItem(group.items)

          let overlay = new kakao.maps.CustomOverlay({
            clickable: true,
            map: this.kakaoMap,
            position: position,
            content: item.content,
            yAnchor: 1,
          })
          let markerInfo = {
            marker: marker,
            overlay: overlay,
            content: item.content,
            items: group.items,
          }
          this.markerInfos.push(markerInfo)
        }
      })
    },
    makeMyOverlayItem() {
      let overlayElement = document.createElement('div')
      overlayElement.classList.add('marker', 'my_position')

      let textElement = document.createElement('p')
      textElement.classList.add('label', 'name')
      textElement.textContent = '현재 위치입니다.'
      overlayElement.appendChild(textElement)

      let strokeElement = document.createElement('div')
      strokeElement.className = 'stroke'

      let triangleElement = document.createElement('div')
      triangleElement.className = 'triangle'

      strokeElement.appendChild(triangleElement)
      overlayElement.appendChild(strokeElement)

      return overlayElement
    },
    makeOverlayItem(items) {
      // 모양은 marker.html 참고

      let overlayElement = document.createElement('div')
      overlayElement.classList.add('marker', this.category)
      let inputElement = document.createElement('input')
      inputElement.setAttribute('type', 'radio')
      inputElement.setAttribute('name', this.category)
      inputElement.addEventListener('click', this.overlayClickEvent(inputElement, items))
      overlayElement.appendChild(inputElement)

      let labelElement = document.createElement('label')

      let firstParagraphElement = document.createElement('p')
      firstParagraphElement.className = 'label name'

      let iconElement = document.createElement('i')
      iconElement.classList.add('icon_marker', `icon_${this.category}`)
      iconElement.textContent = this.category
      firstParagraphElement.appendChild(iconElement)

      let spanElement = document.createElement('span')
      spanElement.className = 'txt'
      firstParagraphElement.appendChild(spanElement)

      labelElement.appendChild(firstParagraphElement)

      overlayElement.appendChild(labelElement)

      let strokeElement = document.createElement('div')
      strokeElement.className = 'stroke'

      let triangleElement = document.createElement('div')
      triangleElement.className = 'triangle'

      strokeElement.appendChild(triangleElement)
      overlayElement.appendChild(strokeElement)

      let item = null
      let content = overlayElement
      switch (this.category) {
        case 'stay':
          {
            item = Enumerable.from(items).minBy((item) => item.discountPrice)

            labelElement.setAttribute('for', `stay_${item.id}`)
            inputElement.setAttribute('id', `stay_${item.id}`)

            spanElement.textContent = item.originName

            let secondParagraphElement = document.createElement('p')
            secondParagraphElement.className = 'label price'
            secondParagraphElement.textContent = `${new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(item.discountPrice)}~`
            labelElement.appendChild(secondParagraphElement)
          }
          break
        case 'tour':
        case 'food':
        case 'buggy':
          {
            item = Enumerable.from(items).minBy((item) => item.discountPrice)

            labelElement.setAttribute('for', `${this.category}_${item.id}`)
            inputElement.setAttribute('id', `${this.category}_${item.id}`)

            spanElement.textContent = item.originName

            let secondParagraphElement = document.createElement('p')
            secondParagraphElement.className = 'label price'
            secondParagraphElement.textContent = `${new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(item.discountPrice)}~`
            labelElement.appendChild(secondParagraphElement)
          }
          break
        case 'rentcar':
          {
            item = items

            labelElement.setAttribute('for', `${this.category}_${item[0].id}`)
            inputElement.setAttribute('id', `${this.category}_${item[0].id}`)

            let count = items.length
            let name = items[0].name
            spanElement.innerHTML = `${name}렌터카(${count}대)`
          }
          break
        default:
          break
      }
      let contentInfo = {
        item: item,
        content: content,
      }

      return contentInfo
    },
    overlayClickEvent($input, items) {
      return (event) => {
        event.stopImmediatePropagation()
        this.overlayTriggerEvent($input, items)
      }
    },
    overlayTriggerEvent($input, items) {
      if (this.selectedMarkerItem === items) {
        this.selectedMarkerItem = []
        $input.checked = false
        return
      } else {
        this.selectedMarkerItem = items
        $input.checked = true
      }
      if (this.category == 'rentcar') {
        this.layerType = 2
      }
    },
    isNullOrWhiteSpace(value) {
      return value === null || value === undefined || value.trim() == ''
    },
    getDistance(lat1 = 0, lon1 = 0, lat2 = 0, lon2 = 0, unit = 'K') {
      if ((lat1 == lat2 && lon1 == lon2) || lat1 == 0 || lon1 == 0 || lat2 == 0 || lon2 == 0) {
        return 0
      } else {
        var radlat1 = (Math.PI * lat1) / 180
        var radlat2 = (Math.PI * lat2) / 180
        var theta = lon1 - lon2
        var radtheta = (Math.PI * theta) / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
          dist = 1
        }
        dist = Math.acos(dist)
        dist = (dist * 180) / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == 'K') {
          dist = dist * 1.609344
        }
        if (unit == 'N') {
          dist = dist * 0.8684
        }
        return dist
      }
    },
    tryReplaceReservedCharacters(value) {
      let newString = ''
      if(value !== null && value !== undefined) {
        newString = value;
        newString = newString.replaceAll("!", "%21")
        newString = newString.replaceAll("#", "%23")
        newString = newString.replaceAll("$", "%24")
        newString = newString.replaceAll("&", "%26")
        newString = newString.replaceAll("'", "%27")
        newString = newString.replaceAll("(", "%28")
        newString = newString.replaceAll(")", "%29")
        newString = newString.replaceAll("*", "%2A")
        newString = newString.replaceAll("+", "%2B")
        newString = newString.replaceAll(",", "%2C")
        newString = newString.replaceAll("/", "%2F")
        newString = newString.replaceAll(":", "%3A")
        newString = newString.replaceAll(";", "%3B")
        newString = newString.replaceAll("=", "%3D")
        newString = newString.replaceAll("?", "%3F")
        newString = newString.replaceAll("#", "%40")
        newString = newString.replaceAll("[", "%5B")
        newString = newString.replaceAll("]", "%5D")
      }

      return newString;
    }
  },
  watch: {
    layerType(newValue) {
      try {
        if (newValue == 0) {
          window.removeEventListener('scroll', this.onScroll)
          window.addEventListener('scroll', this.onScroll)
        }

        window.scrollTo(0, 0)
        this.isHeaderShow = true

        let windowH = window.innerHeight

        let contentH = windowH - this.headerHeight - this.footerHeight
        this.contentHeight = { height: `${contentH}px` }
      } catch (error) {
        this.contentHeight = { height: `100%` }
      }
    },
    category(newValue) {
      if (newValue == 'rentcar' && this.sortType == 'popular') {
        this.sortType = 'distance'
      }
    },
  },
  computed: {
    // test() {
    //     this.resetMarker();
    //     this.makeMarker();
    //     return "";
    // },
    fixedClass() {
      return {
        fixed: !this.isHeaderShow,
      }
    },
    selectedItem() {
      if (this.selectedMarkerItem == null || this.selectedMarkerItem.length == 0) {
        return null
      }
      switch (this.category) {
        case 'rentcar':
          return this.rentcarApiUrl
        case 'stay':
        case 'tour':
        case 'food':
        case 'buggy':
        default:
          return Enumerable.from(this.selectedMarkerItem).minBy((item) => item.discountPrice)
      }
    },
    zoomClass() {
      let isZoomClass = this.selectedMarkerItem == null || this.selectedMarkerItem.length == 0 || this.category === 'rentcar'
      return {
        zoom: isZoomClass,
        zoom_with_selected: !isZoomClass,
        stay: !isZoomClass && this.category == 'stay',
        tour: !isZoomClass && this.category == 'tour',
        food: !isZoomClass && this.category == 'food',
        buggy: !isZoomClass && this.category == 'buggy',
      }
    },
    ApiUrl() {
      // TODO: 실세 사용 API 주소
      switch (this.category) {
        case 'rentcar':
          return this.rentcarApiUrl
        case 'tour':
          return this.tourApiUrl
        case 'food':
          return this.foodApiUrl
        case 'buggy':
          return this.buggyApiUrl
        case 'stay':
        default:
          return this.stayApiUrl
      }
    },
    stayApiUrl() {
      // TODO: 숙박 정보 API 주소

      let baseApiURL = '/api/stay'
      try {
        let setting = this.settings.stay
        let lat = this.lat
        let lng = this.lng
        // let area = setting.area == 0 ? 1 : setting.area;
        let area = setting.area
        
        let url = `${baseApiURL}?start=${setting.startDate}&end=${setting.endDate}&search=${this.tryReplaceReservedCharacters(setting.searchWord)
        }&area=${area}&kinds=${setting.kinds.join(',')}&facies=${setting.faci.join(',')}&adult=${setting.adult}&child=${
          setting.child
        }&rooms=1&lat=${lat}&lng=${lng}&orderBy=${this.sortType}`
        return url
      } catch (error) {
        console.log(error)
        return baseApiURL
      }
    },
    rentcarApiUrl() {
      // TODO: 렌트카 정보 API 주소

      let baseApiURL = '/api/car'

      let setting = this.settings.rentcar
      let lat = this.lat
      let lng = this.lng

      try {
        let url = `${baseApiURL}?startDate=${setting.startDate}&startTime=${setting.startTime}&endDate=${setting.endDate}&endTime=${setting.endTime}&search=${
          this.tryReplaceReservedCharacters(setting.searchWord)
        }&area=${setting.area}&insType=${setting.insType}&kinds=${setting.kinds.join(',')}&hashTag=${setting.hashTag}&lat=${lat}&lng=${lng}`
        return url
      } catch (error) {
        return baseApiURL
      }
    },
    tourApiUrl() {
      // TODO: 관광지 정보 API 주소

      let setting = this.settings.tour
      let lat = this.lat
      let lng = this.lng
      // let area = setting.area == 0 ? 1 : setting.area;
      let area = setting.area

      let baseApiURL = '/api/tour'
      try {
        let url = `${baseApiURL}?start=${setting.startDate}&end=${setting.endDate}&theme=${setting.theme.join(',')}&search=${
          this.tryReplaceReservedCharacters(setting.searchWord)
        }&area=${area}&lat=${lat}&lng=${lng}&orderBy=${this.sortType}`
        return url
      } catch (error) {
        return baseApiURL
      }
    },
    foodApiUrl() {
      // TODO: 음식 정보 API 주소

      let setting = this.settings.food
      let lat = this.lat
      let lng = this.lng
      // let area = setting.area == 0 ? 1 : setting.area;
      let area = setting.area

      let baseApiURL = '/api/food'
      try {
        let url = `${baseApiURL}?start=${setting.startDate}&end=${setting.endDate}&search=${
          this.tryReplaceReservedCharacters(setting.searchWord)
        }&area=${area}&lat=${lat}&lng=${lng}&orderBy=${this.sortType}`
        return url
      } catch (error) {
        return baseApiURL
      }
    },
    buggyApiUrl() {
      // TODO: 카시트 정보 API 주소

      let setting = this.settings.buggy
      let lat = this.lat
      let lng = this.lng
      // let area = setting.area == 0 ? 1 : setting.area;
      let area = setting.area

      let baseApiURL = '/api/buggy'
      try {
        let url = `${baseApiURL}?start=${setting.startDate}&end=${setting.endDate}&search=${
          this.tryReplaceReservedCharacters(setting.searchWord)
        }&area=${area}&lat=${lat}&lng=${lng}&orderBy=${this.sortType}`
        return url
      } catch (error) {
        return baseApiURL
      }
    },
    CategoryList() {
      switch (this.category) {
        case 'stay':
          return 'list_style_01'
        case 'tour':
        case 'food':
        case 'buggy':
          return 'list_style_02'
        default:
          break
      }
    },
    groupItems() {
      switch (this.category) {
        case 'rentcar': {
          let items = Enumerable.from(this.items)
            .selectMany((item) => {
              let shollowItem = Object.assign({}, item)
              delete shollowItem.companies
              let shollowCompanies = Enumerable.from(item.companies)
                .orderBy((company) => company.discountVehiclePrice + company.discountInsurancePrice)
                .select((company) => {
                  let shollowCompany = {
                    car: shollowItem,
                  }
                  return Object.assign(shollowCompany, company)
                })
              return shollowCompanies.toArray()
            })
            .groupBy(
              (item) => {
                return item.id
              },
              (item) => {
                return item
              },
              (key, group) => {
                return { key: key, items: group.orderBy((item) => item.discountVehiclePrice + item.discountInsurancePrice).toArray() }
              },
              (key) => key
            )
            .toArray()
          return items
        }
        case 'stay':
          return (groups = Enumerable.from(this.items)
            .groupBy(
              (item) => {
                return { lat: item.lat, lng: item.lng }
              },
              (item) => {
                return item
              },
              (key, group) => {
                return { key: key, items: group.orderBy((item) => item.discountPrice).toArray() }
              },
              (key) => key.lat + key.lng
            )
            .toArray())
        case 'tour':
        case 'food':
        case 'buggy':
        default:
          return (groups = Enumerable.from(this.items)
            .where((item) => item.type == '단일티켓')
            .groupBy(
              (item) => {
                return { lat: item.lat, lng: item.lng }
              },
              (item) => {
                return item
              },
              (key, group) => {
                return { key: key, items: group.orderBy((item) => item.discountPrice).toArray() }
              },
              (key) => key.lat + key.lng
            )
            .toArray())
      }
    },
    sortedItems() {
      
      if (!this.items || this.items.lenght == 0) {
        return []
      }

      switch (this.sortType) {
        case 'popular':
          switch (this.category) {
            case 'rentcar':
              return this.items
            case 'stay':
              return Enumerable.from(this.items)
                .orderBy((item) => item.popularity)
                .toArray()
            case 'tour':
            case 'food':
            case 'buggy':
            default:
              return Enumerable.from(this.items)
                .where((item) => item.type == '단일티켓')
                .orderBy((item) => item.order)
                .toArray()
          }
        case 'price asc':
          switch (this.category) {
            case 'rentcar':
              return Enumerable.from(this.groupItems).orderBy((group) => {
                let items = Enumerable.from(group.items)
                  .orderBy((item) => item.discountPrice)
                  .select((item) => item.discountPrice)
                return items.minBy((item) => item)
              }).toArray()
            case 'stay':
              return Enumerable.from(this.items)
                .orderBy((item) => item.discountPrice)
                .toArray()
            case 'tour':
            case 'food':
            case 'buggy':
            default:
              return Enumerable.from(this.items)
                .where((item) => item.type == '단일티켓')
                .orderBy((item) => item.discountPrice)
                .toArray()
          }
        case 'distance':
        default:
          switch (this.category) {
            case 'rentcar': {
              return Enumerable.from(this.groupItems)
                .orderBy((group) => this.getDistance(group.items[0].lat, group.items[0].lng, this.lat, this.lng))
                .toArray()
            }

            case 'stay':
              return Enumerable.from(this.items)
                .orderBy((item) => this.getDistance(item.lat, item.lng, this.lat, this.lng))
                .toArray()
            case 'tour':
            case 'food':
            case 'food':
            default:
              return Enumerable.from(this.items)
                .where((item) => item.type == '단일티켓')
                .orderBy((item) => this.getDistance(item.lat, item.lng, this.lat, this.lng))
                .toArray()
          }
      }
    },
  },
  filters: {
    addZeroes(num) {
      let numString = `${num}`
      let dec = numString.split('.')[1]
      let len = dec && dec.length > 2 ? dec.length : 2
      return Number(numString).toFixed(len)
    },
    typeFilter(value) {
      return value == '0' ? '대기예약' : '실시간예약'
    },
    commaFilter(value) {
      return new Intl.NumberFormat('ko-KR', { minimumSignificantDigits: 1 }).format(value)
    },
    roundFilter(value, arg) {
      if (arg == 0) {
        return 0
      }
      let rate = ((arg - value) / arg) * 100
      return Math.round(rate)
    },
    hrefFilter(item, category, sortType, settings) {
      switch (category) {
        case 'rentcar':
        case 'food':
        case 'tour':
        case 'buggy':
          return `/coupon/detail?PCODE=${item.productCode}&subTop=${item.category}&disPay=${new Intl.NumberFormat('ko-KR', { minimumSignificantDigits: 1 }).format(
            item.discountPrice
          )}&goback=1`
          return ''
        case 'stay':
        default:
          return `/stay/detail?sDay=${settings.startDate}&eDay=${settings.endDate}&SARDR=&SDARDR=&Num1=1&Num2=${settings.adult}&Num3=${settings.child}&SNAME=&CODE1=&CODE2=&PSCH=${sortType}&pseq=${item.id}&product_code=${item.productCode}&goback=1`
      }
    },
    distanceFilter(item, lat, lng) {
      let itemLat = item.lat
      let itemLng = item.lng

      if ((itemLat == lat && itemLng == lng) || itemLat == 0 || itemLng == 0 || lat == 0 || lng == 0) {
        return 0
      } else {
        var radlat1 = (Math.PI * itemLat) / 180
        var radlat2 = (Math.PI * lat) / 180
        var theta = itemLng - lng
        var radtheta = (Math.PI * theta) / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
          dist = 1
        }
        dist = Math.acos(dist)
        dist = (dist * 180) / Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344
        return dist
      }
    },
    precisionRoundFilter(number, preci = 2) {
      let distance = number
      let precision = preci
      if (0 <= number && number < 1) {
        distance = distance * 1000
        precision = 0
      }
      let value = +(Math.round(distance + 'e+' + precision) + 'e-' + precision)
      if (precision <= 0) {
        var factor = Math.pow(10, precision)
        return `${value}m`
      } else {
        return `${value}km`
      }
    },
    categoryFilter(categoryItem, type, optionCategory, settings) {
      let value = categoryItem.value
      let txt = undefined
      switch (type) {
        case 'category':
          switch (value) {
            case 'rentcar':
              txt = '렌터카'
              break
            case 'tour':
              txt = '티켓'
              break
            case 'food':
              txt = '맛집/뷔페'
              break
            case 'buggy':
              txt = '여행/편의'
              break
            case 'stay':
            default:
              txt = '숙박'
              break
          }
          break
        case 'date':
          let sDay = new Date(value.start).format('MM.dd')
          let eDay = new Date(value.end).format('MM.dd')
          txt = `${sDay} - ${eDay}`
          break
        case 'time':
          {
            let startDate = settings['rentcar'].startDate
            let endDate = settings['rentcar'].endDate
            let startDateTime = new Date(`${startDate} ${value.start}`)
            let endDateTime = new Date(`${endDate} ${value.end}`)

            let oneDayHour = 1000 * 3600
            let dateDiff = Math.ceil((endDateTime.getTime() - startDateTime.getTime()) / oneDayHour)
            txt = `대여 ${dateDiff}H`
          }
          break
        case 'adult':
          txt = `성인 ${value}명`
          break
        case 'child':
          txt = `아동 ${value}명`
          break
        case 'rooms':
          txt = value
          break
        case 'stayType':
          {
            let item = optionCategory.stayKindOptions.find((x) => x.value === `${value}`)
            if (item) {
              txt = item.name
            }
          }
          break
        case 'couponType':
          {
            let item = optionCategory.tourThemeOptions.find((x) => x.value === `${value}`)
            if (item) {
              txt = item.name
            }
          }
          break
        case 'facility':
          {
            let item = optionCategory.stayFaciOptions.find((x) => x.value === `${value}`)
            if (item) {
              txt = item.name
            }
          }
          break
        case 'insType':
          {
            let item = optionCategory.rentcarInsOptions.find((x) => x.value === `${value}`)
            if (item) {
              txt = item.name
            }
          }
          break
        case 'carType':
          {
            let item = optionCategory.rentcarKindOptions.find((x) => x.value === `${value}`)
            if (item) {
              txt = item.name
            }
          }
          break
        case 'hashTag':
          {
            let item = optionCategory.hashTagOptions.find((x) => x.value === `${value}`)
            if (item) {
              txt = item.name
            }
          }
          break
        default:
          txt = value
          break
      }

      return txt === undefined ? '' : txt
    },
  },
})
