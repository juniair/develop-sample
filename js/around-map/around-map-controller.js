'use strict'




class AroundMapController {
    constructor(params) {
        

        this.initializeParameters(params);
    }

    initializeParameters(params) {
        function settingValue(targetValue, defaultValue) {
            return (targetValue !== null && targetValue !== undefined) ? targetValue : defaultValue
        }
        let newParams = settingValue(params, {});
        this.el = settingValue(newParams.el, "map");
        this.level = settingValue(newParams.level, 7);
        this.lat = settingValue(newParams.lat, 0);
        this.lng = settingValue(newParams.lng, 0);
        this.range = settingValue(newParams.range, 5);
        this.myName = settingValue(newParams.name, "unknown");
        this.libraries = settingValue(newParams.libraries, "service");
        this.appKey = settingValue(newParams.appKey, "") ;
        
        this.handler = null;
        this.kakaoMap = null;
        this.centerPosition = null;
        this.aroundProducts = {}
        this.overlaies = [];
        this.totalAroundCount = 0;
    }

    setParameters(params) {
        this.initializeParameters(params)
    }

    setHandler(handler) {
        if(typeof handler === "function") {
            this.handler = handler;
        }
    }
    
    refreshMap() {
        let controller = this;
        setTimeout(() => {
            controller.kakaoMap.relayout();
            controller.kakaoMap.setCenter(controller.centerPosition);
            controller.kakaoMap.panTo(controller.centerPosition);
        }, 1000);
    }

    isKakaoMapMounted() {
        return this.kakaoMap != null;
    }

    build() {

        if(!(window.kakao && window.kakao.maps)) {
            let script = document.createElement("script");
            
            script.onload = () => kakao.maps.load(this.build);
            if(this.appKey == "" || this.libraries == "") {
                throw new Error("kakao is not defined.")
            }
            else {
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.appKey}&libraries=${this.libraries}`
                document.head.appendChild(script);
                return;
            }
        }

        this.initialize();
        this.loadAroundProduct("stay");
        this.loadAroundProduct("coupon");
        this.loadAroundProduct("food");
        this.loadAroundProduct("buggy");
        this.loadAroundProduct("tourlist");
        
    }

    initialize() {

        let myPosition = new kakao.maps.LatLng(this.lat, this.lng);

        let options = {
            center: new kakao.maps.LatLng(this.lat, this.lng),
            level: this.level
        }

        let target = document.getElementById(this.el);
        this.kakaoMap = new kakao.maps.Map(target, options);

        
        let myMarker = this.makeMaker(myPosition);

        myMarker.setMap(this.kakaoMap);
        
        let makeMyOverlayElement = (textName) => {
            let overlayElement = document.createElement('div');
            overlayElement.classList.add('marker', 'product_position');
    
            let textElement = document.createElement('p');
            textElement.classList.add('label', 'name');
            textElement.textContent = textName;
            overlayElement.appendChild(textElement);
    
            let strokeElement = document.createElement('div');
            strokeElement.className = 'stroke';
            strokeElement.style.bottom = "-10px";
    
            let triangleElement = document.createElement('div');
            triangleElement.className = 'triangle';
    
            strokeElement.appendChild(triangleElement);
            overlayElement.appendChild(strokeElement);
    
            return overlayElement;
        };

        let overlayElement = makeMyOverlayElement(this.myName);
        let overlay = new kakao.maps.CustomOverlay({
            clickable: false,
            map: this.kakaoMap,
            position: myPosition,
            content: overlayElement,
            yAnchor: 1, 
            zIndex: 100
        });
    }

    loadAroundProduct(productType) {
        let url = `/api/${productType.replace("coupon", "tour")}?lat=${this.lat}&lng=${this.lng}&aroundRange=${this.range}`;
        let controller = this;
        $.ajax({
            type: "GET",
            url: url,
            success: function (response) {
                if(!(productType in controller.aroundProducts)) {
                    controller.aroundProducts[productType] = [].concat(response)
                } else {
                    controller.aroundProducts[productType] = controller.aroundProducts[productType].concat(response);
                }

                controller.makeAroundMakers(controller.kakaoMap, controller.myName, controller.aroundProducts[productType], productType);
            }
        });
    }


    makeAroundMakers(target, aroundName, items, markerType) {
		this.totalAroundCount += items.length;
        for (let index = 0; index < items.length; index++) {
			const item = items[index];
			let itemIndex = this.totalAroundCount + index;
			item.itemIndex = itemIndex;
            let makerItem = this.makeAroundMaker(item, aroundName, markerType);

            let position = new kakao.maps.LatLng(item.lat, item.lng)
            let marker = this.makeMaker(position, 24, 35, '/images/map/kakaomap/transparent_marker_24x35.png')
            marker.setMap(target);
            let overlay = new kakao.maps.CustomOverlay({
                clickable: true,
                map: target,
                position: position,
                content: makerItem.content,
                yAnchor: 1,
			  });
			this.overlaies.push(overlay);
        }
    }

    makeAroundMaker(item, aroundName, markerType) {
		let overlayElement = document.createElement('div')
		overlayElement.classList.add('marker', markerType)
		let inputElement = document.createElement('input')
		inputElement.setAttribute('type', 'radio')
        inputElement.setAttribute('name', "product")

		inputElement.addEventListener('click', this.overlayClickEvent(item, aroundName, markerType))
		overlayElement.appendChild(inputElement)

		let labelElement = document.createElement('label')

		let firstParagraphElement = document.createElement('p')
		firstParagraphElement.className = 'label name'

		let iconElement = document.createElement('i')
		iconElement.classList.add('icon_marker', `icon_${markerType}`)
		iconElement.textContent = markerType
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

		
		let content = overlayElement
		switch (markerType) {
			case 'stay':
				{
					// item = Enumerable.from(items).minBy((item) => item.discountPrice)
					let idAttr = `${markerType}_${item.id + item.itemIndex}`
					labelElement.setAttribute('for', idAttr)
					inputElement.setAttribute('id', idAttr)

					spanElement.textContent = item.originName

					let secondParagraphElement = document.createElement('p')
					secondParagraphElement.className = 'label price'
					secondParagraphElement.textContent = `${new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(item.discountPrice)}~`
					labelElement.appendChild(secondParagraphElement)
				}
                break
            case 'coupon':
			case 'tour':
			case 'food':
			case 'buggy':
				{
					let idAttr = `${markerType}_${item.id + item.itemIndex}`
					labelElement.setAttribute('for', idAttr)
					inputElement.setAttribute('id', idAttr)

					spanElement.textContent = item.originName

					let secondParagraphElement = document.createElement('p')
					secondParagraphElement.className = 'label price'
					secondParagraphElement.textContent = `${new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(item.discountPrice)}~`
					labelElement.appendChild(secondParagraphElement)
				}
				break
			case 'rentcar':
				{
					// item = items

					labelElement.setAttribute('for', `${markerType}_${item[0].id}`)
					inputElement.setAttribute('id', `${markerType}_${item[0].id}`)

					let count = items.length
					let name = items[0].originName
					spanElement.innerHTML = `${name}렌터카(${count}대)`
				}
				break
			case 'tourlist':
				{
					let idAttr = `${markerType}_${item.id + item.itemIndex}`
                    labelElement.setAttribute('for', idAttr)
                    inputElement.setAttribute('id', idAttr)

                    let name = item.originName
                    spanElement.innerHTML = name;
				}
				break;
			default:
				break
		}
		let contentInfo = {
			item: item,
			content: content,
		}

		return contentInfo
    }

    makeMaker(position, imageSizeX, imageSizeY, imageSrc) {
		let imageSize = new kakao.maps.Size(imageSizeX, imageSizeY)
		let markerImg = new kakao.maps.MarkerImage(imageSrc, imageSize)
		return new kakao.maps.Marker({
			position: position,
			image: markerImg,
		});
    }
    
    overlayClickEvent(item, aroundName, markerType) {
        if(typeof this.handler === "function") {
            let controller = this;
            return () => {
                controller.handler(item, aroundName, markerType);
            };
        } else {
            return () => {};
        }
    }
}
