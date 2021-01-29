'use strict';

let controller = new AroundMapController();
$(function () {
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
			params[key] = parseValue(value);
		})

		return params;
	}

	// 주변맵 스크립트 데이터 추출
	let scripts = document.getElementsByTagName('script')
	let params = null
	for (let index = 0; index < scripts.length; index++) {
		const script = scripts[index]

		if (/^https?:\/\/.+\/js\/around-map\/test\.js([?&]+([^=&]+)=([^&]*))+$/gi.test(script.src)) {
			let replaceSrc = script.src.replace(/^https?:\/\/.+\/js\/around-map\/index\.js/, '')
			params = queryParams(decodeURI(replaceSrc))
			break
		}
	}

	controller.setParameters(params);
	
	controller.build();

	controller.setHandler((item, aroundName, markerType) => {
		console.log("item", item);
		console.log("aroundName", aroundName);
		console.log("markerType", markerType);
	})
});