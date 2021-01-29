new Vue({
			el: "#app",
			data: {
				latitude: -1,
				longitude: -1,
				myLocation: "위치정보를 확인할 수 없습니다.",
				option:"",
				searchRegion:0,
				geocoder:null,
				inJeju: false,
				isClicked: false,
				area:0
			},
			created() {
				
				(async () => {
					try {
						let geo = await this.geoLocationSearch();
						let coords = geo.coords;
						let lat = coords.latitude;
						let lng = coords.longitude;
						let result = await this.locationUpdate(lat, lng);
						this.inJeju = result.inJeju;
						this.latitude = result.lat;
						this.longitude = result.lng;
						this.myLocation = result.myLocation;
						
					} catch (error) {
						this.myLocation = "위치정보를 확인할 수 없습니다.";
						this.latitude = 33.510418;
						this.longitude = 126.4861157;
					}
				})();

			
			},
			methods: {
				
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
							reject({
								isSucceeded: false,
								inJeju: false,
								error
							});
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
			},
			watch: {
				option(newValue) {
					this.searchRegion = 0;
					if(newValue) {
						this.isClicked = true;
					}
				}
			},
			computed: {
				isShow() {
					if(this.inJeju) {
						return false;
					}
					else {
						return true;
					}
				},
				regions() {
					this.area = 0;
					if(this.option == "stay" || this.option == "tour") {
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
				},
				link() {
					let url =  `/location?category=${this.option}&lat=${this.latitude}&lng=${this.longitude}&area=${this.area}&inJeju=${this.inJeju}`
					if(this.option) {
						return url;	
					}
					else {
						return "javascript:void(0);"
					}
					
				}
			}
		})