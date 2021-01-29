'use strict'




$(function () {

    $(".around_overlay_modal .content .btn_close_js").click(function() {
        $(".around_overlay_modal").toggle();
    })

	$('.btn_around_map_toggle').click(function () {
		$('#around_map').slideToggle('slow')
		$('.icon_arrow').toggleClass('up')
		$('.icon_arrow').toggleClass('down')
		if ($('.icon_arrow').hasClass('up')) {
			if (map == null) {
				initMap();
			} else {
				setTimeout(() => {
					map.relayout()
					map.setCenter(mapPosition)
					map.panTo(mapPosition)
				}, 1000)
			}
		}
	})

	function queryParams(src) {
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
	}

	// 주변맵 스크립트 데이터 추출
	let scripts = document.getElementsByTagName('script')
	let params = null
	for (let index = 0; index < scripts.length; index++) {
		const script = scripts[index]

		if (/^https?:\/\/.+\/js\/around-map\/index\.js([?&]+([^=&]+)=([^&]*))+$/gi.test(script.src)) {
			let replaceSrc = script.src.replace(/^https?:\/\/.+\/js\/around-map\/index\.js/, '')
			params = queryParams(decodeURI(replaceSrc))
			break
		}
	}

	// map 데이터 추출
	let map = null
	let mapPosition = null
	function makeMyOverlayItem(productName) {
		let overlayElement = document.createElement('div')
		overlayElement.classList.add('marker', 'product_position')

		let textElement = document.createElement('p')
		textElement.classList.add('label', 'name')
		textElement.textContent = productName
		overlayElement.appendChild(textElement)

		let strokeElement = document.createElement('div')
		strokeElement.className = 'stroke'
		strokeElement.style.bottom = "-10px"

		let triangleElement = document.createElement('div')
		triangleElement.className = 'triangle'

		strokeElement.appendChild(triangleElement)
		overlayElement.appendChild(strokeElement)

		return overlayElement
	}

	function MakeMaker(position, imageSizeX, imageSizeY, imageSrc) {
		let imageSize = new kakao.maps.Size(imageSizeX, imageSizeY)
		let markerImg = new kakao.maps.MarkerImage(imageSrc, imageSize)
		return new kakao.maps.Marker({
			position: position,
			image: markerImg,
		})
	}

	function initMap() {
		const options = {
			//지도를 생성할 때 필요한 기본 옵션
			center: new kakao.maps.LatLng(params.lat, params.lng), //지도의 중심좌표.
			level: params.level,
		}
		let target = document.getElementById(params.el)
		map = new kakao.maps.Map(target, options)

		mapPosition = new kakao.maps.LatLng(params.lat, params.lng)
		let marker = MakeMaker(mapPosition, 24, 35, '/images/map/kakaomap/transparent_marker_24x35.png')
		marker.setMap(map)
		let overlayElement = makeMyOverlayItem(params.name)
		let overlay = new kakao.maps.CustomOverlay({
			clickable: false,
			map: map,
			position: mapPosition,
			content: overlayElement,
			yAnchor: 1,
			zIndex: 3,
		})
	}

	if (window.kakao && window.kakao.maps) {
		initMap()
	} else {
		let script = document.createElement('script')
		script.onload = () => kakao.maps.load(initMap)
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${params.appKey}&libraries=${params.libraries}`
		document.head.appendChild(script)
	}

    function overlayClickEvent(item, aroundName, markerType) {
        return () => {
			$(".marker:not(.product_position)").css("z-inedx", 1);
			$(this).css.css("z-inedx", 50);
            let $modal = $(".around_overlay_modal");
            let $button = $modal.find(".btn_around_favorite_js");
            $button.attr("data-pseq", item.id);
            $button.attr("data-product-code", item.productCode);
            $button.attr("data-product-top", item.mainCategory);
            $button.attr("data-product-sub", item.category);
            $button.attr("data-around-name", aroundName);
            $button.attr("data-type", 1);

            
            let link = ""
            switch (markerType) {
                case "stay":
                    link = `/stay/detail?pseq=${item.id}&product_code=${item.productCode}&goback=1`        
                    break;
                default:
                    link = `/coupon/detail/?PCODE=${item.productCode}&subTop=${item.category}`
                    break;
            }

            let $link = $modal.find(".btn_product_link");
            $link.attr("href", link);
            $modal.toggle();
        }
    }

	function MakeAroundMaker(item, aroundName, markerType) {
		let overlayElement = document.createElement('div')
		overlayElement.classList.add('marker', markerType)
		let inputElement = document.createElement('input')
		inputElement.setAttribute('type', 'radio')
        inputElement.setAttribute('name', markerType)
		inputElement.addEventListener('click', overlayClickEvent(item, aroundName, markerType))
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
					let idAttr = item.id + item.itemIndex
					labelElement.setAttribute('for', idAttr)
					inputElement.setAttribute('id', idAttr)

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
					let idAttr = item.id + item.itemIndex
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
					let idAttr = data.itemIndex + data.item.id
                    labelElement.setAttribute('for', idAttr)
                    inputElement.setAttribute('id', idAttr)

                    let name = data.item.originName
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
	let totalAroundCount = 0;
	let overlaies = [];
    function MakeAroundMakers(target, aroundName, items, markerType) {
		totalAroundCount += items.length;
        for (let index = 0; index < items.length; index++) {
			const item = items[index];
			let itemIndex = totalAroundCount + index;
			item.itemIndex = itemIndex;
            let makerItem = MakeAroundMaker(item, aroundName, markerType);

            let position = new kakao.maps.LatLng(item.lat, item.lng)
            let marker = MakeMaker(position, 24, 35, '/images/map/kakaomap/transparent_marker_24x35.png')
            marker.setMap(map);
            let overlay = new kakao.maps.CustomOverlay({
                clickable: true,
                map: target,
                position: position,
                content: makerItem.content,
                yAnchor: 1,
			  });
			overlaies.push(overlay);
        }
    }

	function getAroundStay(lat, lng, range) {
        let url = `/api/stay?lat=${lat}&lng=${lng}&aroundRange=${range}`
		$.ajax({
			type: 'GET',
			url: url,
			success: function (response) {
                let items = response;
                MakeAroundMakers(map, params.name, items, "stay")
			},
			error: function (error) {},
		})
	}
	function getAroundTicket(lat, lng, range) {
		let url = `/api/tour?lat=${lat}&lng=${lng}&aroundRange=${range}`
		$.ajax({
			type: 'GET',
			url: url,
			success: function (response) {
                let items = response;
                MakeAroundMakers(map, params.name, items, "tour")
			},
			error: function (error) {},
		})
	}
	function getAroundFood(lat, lng, range) {
		let url = `/api/food?lat=${lat}&lng=${lng}&aroundRange=${range}`
		$.ajax({
			type: 'GET',
			url: url,
			success: function (response) {
				let items = response;
                MakeAroundMakers(map, params.name, items, "food")
			},
			error: function (error) {},
		})
	}
	function getAroundService(lat, lng, range) {
		let url = `/api/buggy?lat=${lat}&lng=${lng}&aroundRange=${range}`
		$.ajax({
			type: 'GET',
			url: url,
			success: function (response) {
				let items = response;
                MakeAroundMakers(map, params.name, items, "buggy")
			},
			error: function (error) {},
		})
	}

	function getAroundTourlist(lat, lng, range) {
		let url = `/api/tourlist?lat=${lat}&lng=${lng}&aroundRange=${range}`
		$.ajax({
			type: 'GET',
			url: url,
			success: function (response) {
				let items = response;
                MakeAroundMakers(map, params.name, items, "tourlist")
			},
			error: function (error) {},
		})
	}

	getAroundTicket(params.lat, params.lng, params.range)
	getAroundFood(params.lat, params.lng, params.range)
	getAroundService(params.lat, params.lng, params.range)
	getAroundStay(params.lat, params.lng, params.range)
})
