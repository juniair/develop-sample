

$(document).ready(function() {
	$window = $(window);
	// 메인 페이지 사이즈 조절, modal CSS height
	var windowHeight;

	var jqLazyObject = undefined;

	if(typeof jqLazy !== "undefined") {
		jqLazyObject = jqLazy.init('.lazy', undefined, false)
							.fadeIn(500, 0)
							.build();
	}
	// 이미지 지연 로딩 추가
	// if(jqLazyObject) {
	// 	jqLazyObject = jqLazyObject.build();
	// }
	// 이미지 지연 로딩 추가




	// 메인 페이지 사이즈 조절 [start]
	var pathname = document.location.pathname;

	if(pathname === "/"){
		windowHeight = $window.height();
		// var headerHeight = $('.header').height();
		// var footerHeight = $('.footer').height();
		// var mainMenuSectionHeight = $('.main_menu_section').height();
		// var mainSliderSectionDiv = $('.main_slider_section > div');
		// var wrapMemberHeight = $(".wrap_member").height();
		// var accordionHeight = $(".accordion").height();
		// var mebersInfoSessionHeight = 0;
		// if(!wrapMemberHeight) {
		// 	wrapMemberHeight = 0;
		// }
		// mebersInfoSessionHeight = wrapMemberHeight + accordionHeight;
		// var mainSliderSectionHeightValue = windowHeight - (headerHeight + mainMenuSectionHeight + footerHeight + mebersInfoSessionHeight);
		// mainSliderSectionDiv.css('min-height', mainSliderSectionHeightValue);
		// mainSliderSectionDiv.find("img").css('height', mainSliderSectionHeightValue);
		// $window.resize(function() {
		// 	windowHeight = $window.height();

		// 	headerHeight = $('.header').height();
		// 	footerHeight = $('.footer').height();
		// 	mainMenuSectionHeight = $('.main_menu_section').height();
		// 	var wrapMemberHeight = $(".wrap_member").height();
		// 	var accordionHeight = $(".accordion").height();
		// 	var mebersInfoSessionHeight = 0;
		// 	if(!wrapMemberHeight) {
		// 		wrapMemberHeight = 0;
		// 	}
		// 	mebersInfoSessionHeight = wrapMemberHeight + accordionHeight;
		// 	mainSliderSectionHeightValue = windowHeight - (headerHeight + mainMenuSectionHeight + footerHeight + mebersInfoSessionHeight);
		// 	mainSliderSectionDiv = $('.main_slider_section > div');

		// 	mainSliderSectionDiv.css('min-height',mainSliderSectionHeightValue);
		// 	mainSliderSectionDiv.find("img").css('height', mainSliderSectionHeightValue);
		// })
	}
	// 메인 페이지 사이즈 조절 [end]

	// navbar on [start]
	var splitPathName = pathname.split('/');
	var folderName = splitPathName[1];
	var $navbarList = $('.navbar_list');

	switch (folderName) {
		case "cart":
		case "checkout":
			$navbarList.find('li.cart').addClass('on');
			break;
		case "mypage":
			$navbarList.find('li.logout').addClass('on');
			break;
		case "customer":
			$navbarList.find('li.cs').addClass('on');
			break;
		case "location":
			$navbarList.find('li.location').addClass('on');
			break;
		default:
			$navbarList.find('li.home').addClass('on');
			break;
	}
	// if(folderName === 'cart' || folderName === 'checkout' ){
	// 	$navbarList.find('li.cart').addClass('on');
	// }else if(folderName === 'mypage'){
	// 	$navbarList.find('li.logout').addClass('on');
	// }else if(folderName === 'customer'){
	// 	$navbarList.find('li.cs').addClass('on');
	// }else if(splitPathName.length <= 2){
	// 	$navbarList.find('li.home').addClass('on');
	// }
	// navbar on [end]

	// header 메뉴에서 해당 카테고리 체크 (메인페이지, 상품페이지) [start]
	var categoryCheck = 'a[href="'+pathname+'"]';
	$('.top_menu_list').find(categoryCheck).parent().addClass('on');
	// header 메뉴에서 해당 카테고리 체크 (메인페이지, 상품페이지) [end]


	// header, footer 크기에 따른 padding 값 주기[start]
	// var $header = $('.header');
	var $header02 = $('.header_02');
	var $footer = $('.footer');

	// var headerHeight = $header.height();
	var header02Height = $header02.height();
	var footerHeight = $footer.height();

	// if($header.length === 1) $('section	:first').css('padding-top', headerHeight);
	if($header02.length === 1) $('section:first').css('padding-top', header02Height);
	if($footer.length === 1) $('section:last').css('padding-bottom', footerHeight);

	$window.resize(function() {
		// if($header.length === 1) $('section:first').css('padding-top', headerHeight);
		if($header02.length === 1) $('section:first').css('padding-top', header02Height);
		if($footer.length === 1) $('section:last').css('padding-bottom', footerHeight);
	})
	// header, footer 크기에 따른 padding 값 주기[end]

	// 상품리스트 인기순, 낮은가격가격순 ... 정렬 [start]
	$('.list_sort_tab li').each(function (index, item) {
		$(item).click(function(){
			$(item).parent().find('li').removeClass('on');
			$(item).addClass('on');
			$("#PSCH").val($(item).attr("psch"));


			if(pathname == "/stay/") stayList("y");
			if(pathname == "/coupon/") srhCoupon();
			if(pathname == "/food/") srhFood();
			if(pathname == "/buggy/") srhBuggy();
		});
	});
	// 상품리스트 인기순, 낮은가격가격순 ... 정렬 [end]

	// 윈도우 스크롤링에 따른 header1, 달력 fixed [start]
	var windowScrollPrevValue;
	var scrollValue;	// 모달 position-top

	// 네비 show/hide 기능 동작 가능 여부 체크 함수
	function isNaviControllerPath(pathName) {
		return pathName === "/stay/" || pathName === "/rentcar/" || pathName === "/buggy/" || pathName === "/coupon/" || pathName === "/food/" || pathName === "/location/";
	}

	function navbarSwitching(prevScrollPos, currentScrollPos, pathName) {
		var $itemlistTopSearch = $('.itemlist_top_search');
		var $navbar = $('.navbar');
		if (currentScrollPos >= 80) {
			$itemlistTopSearch.addClass("fixed");
			$itemlistTopSearch.find('.itemlist_top_search_date').addClass("fixed");

			// 상품리스트 페이지에서만
			if (isNaviControllerPath(pathName) && !$(".btn_more_all_js").hasClass("on")) {
				if(prevScrollPos > currentScrollPos){
					$navbar.show();
				}else{
					$navbar.hide();
				}
			}
		} else {
			$itemlistTopSearch.removeClass("fixed");
			$itemlistTopSearch.find('.itemlist_top_search_date').removeClass("fixed");

			// 상품리스트 페이지에서만
			if (isNaviControllerPath(pathname) && !$(".btn_more_all_js").hasClass("on")) {
				$navbar.show();
			}
		}
	}

	$window.scroll(function() {
		var windowScroll = $window.scrollTop();
		scrollValue = windowScroll;

		navbarSwitching(windowScrollPrevValue, scrollValue, pathname);


		windowScrollPrevValue = windowScroll;
	});

	/* windowScroll의 이전 값을 비교하여 고정 해제 */
	/*
	// var windowScrollPrevValue;

	// if (pathname === "/stay/" || pathname === "/rentcar/" ||
	// 	pathname === "/buggy/" || pathname === "/coupon/" || pathname === "/coupon/2/") {

	// 	$window.scroll(function() {
	// 		var windowScroll = $window.scrollTop();
	// 		var $itemlistTopSearchDate = $('.itemlist_top_search_date');

	// 		if (windowScroll >= 50) {
	// 			$itemlistTopSearchDate.addClass("fixed");
	// 			$itemlistTopSearchDate.css('top', 0);
	// 			if(windowScrollPrevValue > windowScroll){
	// 				$('.header').css('position', 'fixed');
	// 				$('.header').css('z-index', 3);
	// 				$itemlistTopSearchDate.css('top', '95px');
	// 			}else{
	// 				$('.header').css('position', 'static');
	// 			}
	// 		} else {
	// 			$itemlistTopSearchDate.removeClass("fixed");
	// 			$('.header').css('position', 'static');
	// 		}

	// 		windowScrollPrevValue = windowScroll;
	// 	});
	// }
	// 윈도우 스크롤링에 따른 header1, 달력 fixed [end] */

	// <숙박 페이지>
	// 숙소 위치, 숙소 정보, ... 열고 닫기
	$('.detail_add_info_list > li > div:first-child').each(function (index, item) {
		$(item).click(function(){
			$(item).parent().find('div:nth-child(2)').toggleClass('on');
		});
	});

	// <고객센터 페이지>
	// 1:1문의, 자주하는 질문, ... 탭 선택
	$('.cs_tab li').each(function (index, item) {
		$(item).click(function(){
			$(item).parent().find('li').removeClass('on');
			$(item).addClass('on');
		});
	});
	// 할인쿠폰, 실시간렌트카, ... 탭 선택
	$('.category_tab li').each(function (index, item) {
		$(item).click(function(){
			$(item).parent().find('li').removeClass('on');
			$(item).addClass('on');
		});
	});
	// 자주하는 질문 열고 닫기
	$('.faqList > li > a').each(function (index, item) {
		$(item).click(function(){
			$(item).parent().find('div').toggleClass('on');
		});
	});

	// 모달 관련 [start]
	var $modal = $('.modal');

	// modal height CSS
	if($modal.length >= 1) {
		var modalHeight = $(window).height();
		$modal.css('height', modalHeight);

		$window.resize(function() {
			modalHeight = $(window).height();
			$modal.css('height', modalHeight);
		})
	}

	// 상품리스트 검색 모달 관련 [start]
	// 상품리스트 상단검색 - 열기
	$('#mSearchStayOpenButton').click(function(e){
		// scrollOff(scrollValue);
		// $('body').off('scroll touchmove mousewheel', function(e){
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	return false;
		// });

		$('#itemListSearch').addClass('on');
		$('#itemListSearchStay').addClass('on');
		// alert(23);
		// $('html, body').on('scroll touchmove mousewheel', function(e) {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	return false;
		// });

		// alert(17);

// $('body').on('scroll touchmove mousewheel', function(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// });

	});
	$('#mSearchRentcarSrhButton').click(function(){
		scrollOff(scrollValue);

		$('#itemListSearch').addClass('on');
		$('#itemListSearchRentcar').addClass('on');
	});
	$('#mSearchCouponSrhButton').click(function(){
		scrollOff(scrollValue);

		$('#itemListSearch').addClass('on');
		$('#itemListSearchCoupon').addClass('on');
	});
	$('#mSearchCoupon2SrhButton').click(function(){
		scrollOff(scrollValue);

		$('#itemListSearch').addClass('on');
		$('#itemListSearchCoupon2').addClass('on');
	});
	$('#mSearchBuggySrhButton').click(function(){
		scrollOff(scrollValue);

		$('#itemListSearch').addClass('on');
		$('#itemListSearchBuggy').addClass('on');
	});

	// 주문 내역 상세정보 취소요청 - 열기
	$('.orderlist_detail_section .order_list_02 .cancle').click(function(){
		scrollOff(scrollValue);

		$('#itemListSearch').addClass('on');
		$('#orderListDetailCancle').addClass('on');
		$('#cPseq').val($(this).attr('pseq'));
	});
	// 장바구니 담기 - 열기
	// $('#btnCart').click(function(){
	// 	scrollOff(scrollValue);

	// 	$modal.addClass('on');
	// 	$('#popupCartCheck').addClass('on');
	// });
	// 장바구니 담기 - 닫기
	$('#btnCloseMoveCart').click(function(){
		scrollOn();

		$modal.removeClass('on');
		$('#popupCartCheck').removeClass('on');
	});

	//  확인 버튼 클릭

	var selectedSelectList;
	var inputList;
	var selectedCheckboxList;
	var str;

	$("input:checkbox[name=hashtag]").on("change", function() {
		let $this = $(this);
		let elementId = $this.attr("id");
		let $otherCheckedHashTagElements = $("input:checkbox[name=hashtag]:checked:not(#" + elementId + ")");
		if($this.is(":checked") && 0 < $otherCheckedHashTagElements.length) {
            $otherCheckedHashTagElements.prop("checked", false);
		}

		if($this.is(":checked")) {
            let $checkbox_box = $this.closest(".checkbox_box");
            let $hashTagChecked = $checkbox_box.find("input[name=hashTagClicked]");
            $hashTagChecked.val(1);
        }
	})

	//렌트카 보험 라디오 타입으로 변경
	$("input:checkbox[name=instype]").click(function(){
		$("input:checkbox[name=instype]").each(function(){
			if(this.id == $(event.target).attr('id')) this.checked = true;
			else this.checked = false;
		});
	});


	// 상품리스트 페이지 상단검색에 필터 조건을 선택하지 않았을 때



	// 상품리스트 검색 모달 관련 [end]
	// 달력/시간 모달 관련 [start]
	// 달력 생성
	try{buildCalendar();}catch(e){}

	// 달력/시간 - 열기
	$('.mCalendarOpenButton').click(function(){
		scrollOff(scrollValue);
		// event.preventDefault();
		// $("html body").css({'overflow': 'hidden', 'height': '100%'});

		$('#itemListSearch').addClass('on');
		$('.modal_calendar').addClass('on');
		// 날짜탭으로 시작
		$('.calendar_tabs_list li[data-tab="calendar"]').addClass('on');
		$('.calendar').addClass('on');

		$(aa).addClass('on');
		$(bb).addClass('on');
		betweenRentDayAndReturnDayCSS(today, tomorrow);

	});

	// 달력/시간 - 닫기
	$('.calendar_close').click(function(){
		scrollOn();
		event.preventDefault();
		// $("html body").css({'overflow': 'auto', 'height': '100%'});

		// 모달 닫기 및 탭 초기화
		$('#itemListSearch').removeClass('on');
		$('.modal_calendar').removeClass('on');
		$('.calendar_tabs_list li').removeClass('on');
		$('.calendar_conts').removeClass('on');
		$('.calendar_footer').removeClass('on');

		// 달력 테이블 초기화
		$('#cal_area table td').removeClass('on').removeClass('ftl');
		eFirstDate = null;
		eLastDate = null;

		// // console.log("close");
		// // console.log("eFirstDate : "+eFirstDate);
		// // console.log("eLastDate : "+eLastDate);

	});

	// 날짜탭만 보이게
	var pathname = document.location.pathname;

	// 숙박페이지에서
	if(pathname === '/stay/'){
		var $modal_calendar = $('.modal_calendar');
		$modal_calendar.addClass('stay');
	}

	// 달력 탭 선택
	$('.calendar_tabs_list li').click(function() {
		var activeTab = $(this).attr('data-tab');
		$('.calendar_tabs_list li').removeClass('on');
		$('.calendar_conts').removeClass('on');
		$('.calendar_footer').removeClass('on');
		$(this).addClass('on');
		$('.' + activeTab).addClass('on');
	})

	// 달력 하단 시간 선택 버튼 클릭
	// 시간 탭으로
	$('#showTimeTable').click(function(){
		$('.calendar_tabs_list li:first-child').removeClass('on');
		$('.calendar_tabs_list li:last-child').addClass('on');
		$('.calendar_conts').removeClass('on');
		$('.calendar_footer').removeClass('on');


		// $('.modal_calendar .calendar_tabs_list .time').attr('data-tab').addClass('on');
		$('.modal_calendar .time').addClass('on');

	});

	// 달력 마우스 이벤트 [start]
	var eFirstDate = null;
	var eLastDate = null;
	var temp;
	var sw = 1;

	$('#cal_area table td').click(function() {
		// data-date에 값이 있는 지 확인 후 이벤트 실행
		var attrObjCheck = $(this).attr('data-date');
		if(typeof attrObjCheck === 'string'){
			if(sw == 1){
				// // console.log("sw : "+sw);

				//초기화
				eLastDate = null;
				$('#cal_area table td').removeClass('on').removeClass('ftl');

				eFirstDate = $(this).attr("data-date");
				$(this).addClass('on');

				sw = 2;
				// // console.log("eFirstDate : "+eFirstDate);
				// // console.log("eLastDate : "+eLastDate);

			}else if(sw == 2){
				// // console.log("sw : "+sw);

				eLastDate = $(this).attr("data-date");
				$(this).addClass('on');

				// 첫쨋날이 마지막날보다 클때
				if (eFirstDate > eLastDate){
					temp = eFirstDate;
					eFirstDate = eLastDate;
					eLastDate = temp;
				}


				// // console.log("eFirstDate : "+eFirstDate);
				// // console.log("eLastDate : "+eLastDate);

				betweenRentDayAndReturnDayCSS(eFirstDate, eLastDate);
				updateModalTimeDate(new Date(eFirstDate), new Date(eLastDate));
				sw = 1;
				// 날짜 변경작업




			}
		}
	});
	// 달력 선택 이벤트 정지
	$('.disable').off();
	// 달력 마우스 이벤트 [end]

	// 달력 하단 적용 버튼 클릭
	$('#calApplyBtn').click(function(){
		// 달력 뷰
		var startDate = getSelectedCalendarData(true)
		var endDate = getSelectedCalendarData(false)
		var dateFirstDate = new Date(startDate);
		var dateLastDate = new Date(endDate);

		viewChangeDate(dateFirstDate, dateLastDate);

		// 시간 뷰
		var timeRent = $('select[name=sTime]').val();
		var timeReturn = $('select[name=eTime]').val();

		$('.itemlist_top_search_date dl:first-child p').text(timeRent);
		$('.itemlist_top_search_date dl:nth-child(2) p').text(timeReturn);

		event.preventDefault();
		$("html body").css({'overflow': 'auto', 'height': '100%'});

		// 모달 닫기 및 탭 초기화
		$modal.removeClass('on');
		$('.modal_calendar').removeClass('on');
		$('.calendar_tabs_list li').removeClass('on');
		$('.calendar_conts').removeClass('on');
		$('.calendar_footer').removeClass('on');

		//렌트카 조회
		srhRentCar(getDateTransferText(dateFirstDate), getDateTransferText(dateLastDate), timeRent, timeReturn);
	});
	// 달력/시간 모달 관련 [end]

	// 상품리스트 페이지에서 일자 선택을 하지 않았을 시 보이는 뷰
	// sDay, eDay input 데이터가 없으면 오늘 날짜로 셋팅
	if($("#sDay").val() == ""){
		var today = new Date();

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate()+1);
	}else{
		var today = new Date($("#sDay").val());
		var tomorrow = new Date($("#eDay").val());
	}

	viewChangeDate(today, tomorrow);

	var ttoday2 = getDateTransferText(today);
	var ttomorrow2 = getDateTransferText(tomorrow);

	var aa = '';
	var bb = '';

	aa += '#cal_area td[data-date="';
	aa += ttoday2[0]+'-'+ttoday2[1]+'-'+ttoday2[2];
	aa += '"]';

	bb += '#cal_area td[data-date="';
	bb += ttomorrow2[0]+'-'+ttomorrow2[1]+'-'+ttomorrow2[2];
	bb += '"]';

	$(aa).addClass('on');
	$(bb).addClass('on');
	betweenRentDayAndReturnDayCSS(today, tomorrow);

	// 시간 설정 작업
	var sTime = $('.mCalendarOpenButton dl p').first().text();
	var eTime = $('.mCalendarOpenButton dl p').last().text();

	$('select[name=sTime]').val(sTime);
	$('select[name=eTime]').val(eTime);

	// 시간 설정 작업[end]

	// 모달 관련 [end]

	// 수량 추가 / 삭제 [start]
	var $quantity = $('.quantity');
	var quantityValue;
	var quantityCount;

	$quantity.each(function (index, item) {
		let $item = $(item);

		let $counter = $item.find('input[name=otpCnt]');
		$item.find('.minus').click(function(){
			optPrice	  = Number($item.parent().find('#Pay1').val());
			otpPriceDis	  = $item.parent().find('span:eq(3)');

			let newCount = couponOptionCountCalculate($counter, -1);
			
			if(newCount < 0){ 
				newCount = 0; 
			}

			$counter.val(newCount);
			// otpPriceDis.text(comma((optPrice * quantityCount)) + '원');
			couponTotalPrice();
		});
		$item.find('.plus').click(function(){
			optPrice	   = Number($item.parent().find('#Pay1').val());
			otpPriceDis	  = $item.parent().find('span:eq(3)');
			
			let newCount = couponOptionCountCalculate($counter, +1);
			$counter.val(newCount);
			// otpPriceDis.text(comma((optPrice * quantityCount)) + '원');
			couponTotalPrice();
		});
	});
	// 수량 추가 / 삭제 [end]

	//쿠폰, 유모차/카시트, 맛집/뷔페 상세 페이지 합계 출력
	couponTotalPrice();

	// 검색 관련 스크립트 [start]
	// 검색 높이
	// 검색 열기/닫기
	var $totalSearchSection = $('.total_search_section');

	if($totalSearchSection.length === 1){
		windowHeight = $window.height();

		$totalSearchSection.css('height',windowHeight);

		$window.resize(function() {
			windowHeight = $window.height();
			$totalSearchSection.css('height',windowHeight);
		})
	}

	$('#btnCloseSearch').click(function() {
		$totalSearchSection.removeClass('on');
	})

	$('#btnOpenSearch').click(function() {
		$totalSearchSection.addClass('on');
	})

	/* 쿠주선 팁버튼 클릭 이벤트 */
	$(".btn_tip_js").click(function() {
		console.log("");
	});
	/* 쿠주선 팁버튼 클릭 이벤트 [end]*/
	let swiper = undefined;
	$(".btn_more_all_js").click(function() {
		let $this = $(this);
		let $icon = $this.find(".icon_navi.icon_all");
		let $menuLayer = $(".all_menu_layer");

		$icon.toggleClass("on");
		$this.toggleClass("on")
		$menuLayer.toggleClass("active");
		if(swiper == undefined) {
			swiper = new Swiper(".all_menu.event_container.swiper-container", {
				slidesPerView: 1.2,
				centeredSlides: true,
				spaceBetween: 10,
				  loop:true,
				  loopAdditionalSlides: 2,
				zoom:false,
				autoplay: {
				  // 자동 재생
				  delay: 2000 // 딜레이 0
				},
				speed: 500, // 슬라이드 속도 2초
				pagination: {
				  el: ".event_pagenation.swiper-pagination",
			  	}
			});
		}

		if($this.hasClass("on")) {
			swiper.autoplay.start();
		} else {
			swiper.autoplay.stop();
		}

		navbarSwitching(windowScrollPrevValue, scrollValue, pathname);
	});

	$(".btn_all_menu_close_js").click(function() {
		let $menuLayer = $(".all_menu_layer");
		let $naviIcon = $(".btn_more_all_js .icon_navi.icon_all");
		let $btnMoreAll = $(".btn_more_all_js");
		$naviIcon.removeClass("on");
		$btnMoreAll.removeClass("on");
		$menuLayer.removeClass("active");

		navbarSwitching(windowScrollPrevValue, scrollValue, pathname);

	});


	// 검색어 추천
	// 탭전환
	$('.total_search_keyword_tab_list li').click(function() {
		var activeTab = $(this).attr('data-tab');
		$('.total_search_keyword_tab_list li').removeClass('on');
		$('.total_search_keyword_tabcontent').removeClass('on');
		$(this).addClass('on');
		$('#' + activeTab).addClass('on');
	})

	// 선호상품 탭전환
	$('.popular_type_list li').click(function() {
		var activeTab = $(this).attr('data-tab');
		$('.popular_type_list li').removeClass('on');
		// $('.total_search_keyword_tabcontent').removeClass('on');
		$(this).addClass('on');
		$('.keyword_list_box.popular').hide();
		$('#' + $(this).attr('view')).show();
		// $('#' + activeTab).addClass('on');
	})
	// 검색 관련 스크립트 [end]

	// 주문 내역 상세 [start]
	// 주문 내역 상세 닫기
	$('#mOrderlistDetailCloseBtn').click(function() {
		var modalOrderlistDetail = $(this).parent().parent();
		modalOrderlistDetail.removeClass('on');
		modalOrderlistDetail.find('.modal_container').removeClass('on');
	})

	// 주문 내역 상세 열기
	$('.order_list_02 .ticket_barcode').click(function() {
//		var $modalOrderlistDetail = $('.modal_orderlist_detail');
//		$modalOrderlistDetail.addClass('on');

//		var ticketBarcodeType = $(this).parents('li').attr('class');
//		var str = 'div[orderlist-detail-type="'+ticketBarcodeType+'"]';
//		$(str).addClass('on');
	})

	// 주문 내역 상세 탭
	$('ul.orderlist_item_detail_tab li').click(function() {
		var orderlistItemDetailTabLi = $(this);
		var modalContainerOn = $('.modal_container.on');

		var activeTab = orderlistItemDetailTabLi.attr('data-tab');
		modalContainerOn.find('ul.orderlist_item_detail_tab li').removeClass('on');
		modalContainerOn.find('.tabcontent').removeClass('on');
		orderlistItemDetailTabLi.addClass('on');
		modalContainerOn.find('.' + activeTab).addClass('on');
	})
	// 주문 내역 상세 [end]

	// 탑 버튼 [start]
	var $topBtn = $('.topBtn');

	if($topBtn.length === 1){
		$topBtn.hide();
		var footerHeight = $('.footer').height();
		$topBtn.css('bottom', footerHeight);

	    $(window).scroll(function () {
	        if ($(this).scrollTop() > 80) {
	            $topBtn.fadeIn();
	        } else {
	            $topBtn.fadeOut();
	        }
	    });
	}
	// 탑 버튼 [end]

	//여행바구니 전체선택[start]
	// $('#cart_item_all').click(function(){
	// 	$("#cart_item_all").prop("checked") ? $("input[name=cart_item]").prop("checked",true) : $("input[name=cart_item]").prop("checked",false);
	// 	$("input[name=cart_item]").eq(0).trigger("change");
	// });
	// //여행바구니 전채석택[end]

	// //여행바구니 상품 체크박스에 따른 주문가격 변경[start]
	// $('input[name=cart_item]').change(function(){
	// 	var ii = 0;
	// 	var tPay = 0;
	// 	$('input[name=cart_item]:checked').each(function(idx, item){ii += 1;tPay = tPay + parseInt($(item).parent().parent().find('#tPay').val());});
	// 	var disHtml = (ii == 0) ?  "<a onclick='chkBuy()'>주문 상품이 없습니다.</a>" : "<a onclick='chkBuy()'>총 <span>" + ii + "개</span> <span>" + comma(tPay) + "원</span> 주문하기</a>";
	// 	($('input[name=cart_item]:checked').length == $('input[name=cart_item]').length) ? $("#cart_item_all").prop("checked",true) : $("#cart_item_all").prop("checked",false);
	// 	$('#cartCnt').html(ii);
	// 	$('.g_btn_order').html(disHtml);
	// });
	//여행바구니 상품 체크박스에 따른 주문가격 변경[end]


	//결제 수단 선택[S]
	$('.payment_way_list > li').each(function(){
		$(this).click(function(){
			$(this).parent().find('li').removeClass('on');
			$(this).addClass('on');
		});
	});
	//결제 수단 선택[E]

	// 검색 타입 선택 [start]
	$('.search_type_list li').each(function (index, item) {
		$(item).click(function(){
			$(item).parent().find('li').removeClass('on');
			$(item).addClass('on');
			$('.list_style_02').find('li').hide();
			$('.' + $(item).attr('view')).show();
		});
	});
	// 검색 타입 선택 [end]

	// 렌트카 상품페이지 업체 보기 [start]
	$('.rentcar_list01 .corp_list').each(function (index, item) {
		$(item).find('.more_corp_btn').click(function(){
			$(item).toggleClass('on');
			rentCnt = $(item).find('.more_corp_btn').attr('rentCnt');
			$(item).find('ul').slideToggle(300, function(){
					if ($(this).is(':visible')) {
						$(item).find('.more_corp_btn > p').html( rentCnt + '개 업체 가격 비교 △');
					}
					else{
						$(item).find('.more_corp_btn > p').html( rentCnt + '개 업체 가격 비교 ▽');
					}
				}
			);
		});
	});
	// 렌트카 상품페이지 업체 보기 [end]

	$('.termsWrap .terms_list > li').each(function (index, item) {
		$(item).click(function(){
			$(item).toggleClass('on');
		});
	});

	// 모달 로딩 [start]
	$("#rentcarSrhButton").on('click', function(){
		$("html body").css({'overflow': 'hidden', 'height': '100%'});
		$("#mLoading").fadeIn("slow");
	});

	$("#calApplyBtn").on('click', function(){
		$("html body").css({'overflow': 'hidden', 'height': '100%'});
		$("#mLoading").fadeIn("slow");
	// 	document.rentFrm.submit();
	});
	// 모달 로딩 [end]

	$('#findAccountTab > li').on('click', function(){
		var activeTab = $(this).attr('data-tab');
		$('#findAccountTab > li').removeClass('on');
		$(this).parents('.tabContainer').find('.tabView').removeClass('on');
		$(this).addClass('on');
		$('#' + activeTab).addClass('on');
	});

	$('.findAccountSection .findInfoWriteWrap .authNumSendBtn').on('click', function(){
		$(this).parents('.findInfoWriteWrap').find('.mAuth').toggleClass('on');
	});

	$('.itemReviewList > li').on('click', function(){
		$(this).toggleClass('on');
	});

	


	//상세정보 탭 메뉴 이동
	$('.tabsSection ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.tabsSection ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});

});

// body 스크롤 막음
// function scrollOff(){
//    // $('body').addClass('scrollOff').on('scroll touchmove mousewheel', function(e){
//    //    e.preventDefault();
//    // });
//    $("html, body").css({overflow:'hidden'}).bind('touchmove');
// }
function scrollOff(sv){


	// $('body').on('scroll touchmove mousewheel', function(e){
	// 	e.preventDefault();
 //        e.stopPropagation();
 //        return false;

	// });
 //   	sv =  sv * (-1);
	// $('body').css('position', 'static');
	// $('body').css('height', '100%');
	// $('body').css('top', sv);

}

// body 스크롤 풀기
function scrollOn(){
	// $("html, body").css({'overflow':'visible'}).unbind('touchmove');
   // $('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
}

// 달력 관련 함수 [start]
function buildCalendar(){
	var $cal_area = $('#cal_area');

	var today = new Date();

	var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	var lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0);

	var cellCnt = 0;

	var str = '';

	// 현재달부터 4달 출력
	for (j=0; j<4; j++) {
		var year = doMonth.getFullYear();
		var month = doMonth.getMonth()+1;
		var date;

		if(month < 10) {month = '0'+ month;}

		str += '<div class="month">';
		str += '<p>'+year+'. '+month+'</p>';
		str += '<table><tbody>';
		str += '<tr>';

		// 시작하는 일수 만큼 td 추가
		for(i=0; i<doMonth.getDay(); i++) {
			str += '<td><span></span></td>';
			cellCnt++;
		}

		// 해당 월 첫쨋날부터 마지막 날까지 td 추가
		for(i=doMonth.getDate(); i<=lastDate.getDate(); i++) {
			date = i;
			if (date < 10){ date = '0' + date; }
			str += '<td data-date="'+year+'-'+month+'-'+date+'" class="disable"><span>'+i+'</span></td>';
			cellCnt++;
			if(cellCnt % 7 == 0 && i != 31) { str += '</tr><tr>'; }
		}

		str += '</tr>';
		str += '</tbody></table></div>';

		// 셀 카운터 초기화
		cellCnt = 0;

		// 다음달로 초기화
		doMonth.setMonth(doMonth.getMonth()+1);
		lastDate.setMonth(lastDate.getMonth()+2, 0);
	}

 	$cal_area.html(str);

 	// disable 클래스 지우기 (오늘부터 90일까지)
	var removeDisableDate = new Date();
	var cdtRemoveDisableDate;
	var selectorString;

	for(i=0; i<=90; i++){
		cdtRemoveDisableDate = getDateTransferText(removeDisableDate);

		selectorString = '';
		selectorString += '#cal_area td[data-date="';
		selectorString += cdtRemoveDisableDate[0]+'-'+cdtRemoveDisableDate[1]+'-'+cdtRemoveDisableDate[2];
		selectorString += '"]';

		$(selectorString).removeClass('disable');

		removeDisableDate.setDate(removeDisableDate.getDate()+1);
	}

 	// 달력 창에 투데이 표시
 	todayCheck(today);
	// 공휴일 표시
	holidayCheck(today);
}


// 모달 달력에 투데이 표시 해 주는 함수
function todayCheck(today){
	today = getDateTransferText(today);

	var selectorStr = '';
	selectorStr += '#cal_area td[data-date="';
	selectorStr += today[0]+'-'+today[1]+'-'+today[2];
	selectorStr += '"]';

	$(selectorStr).addClass('today');
}
// 모달 달력에 공휴일 표시 해 주는 함수
function holidayCheck(today){
	var holidayCheckMonth = today.getMonth()+1;

	var solarHolidays = ['01-01','03-01','05-05','06-06','08-15','10-03','10-09','12-25'];
	// 1/1 신정, 3/1 삼일절, 5/5 어린이날, 6/6 현충일, 8/15 광복절, 10/3 개천절, 10/9 한글날, 12/25 크리스마스
	var lunarHolidays = ['01-01','01-02','04-08','08-14','08-15','08-16'];
	// 1/1 설날, 4/8 부처님오신날, 8/15 추석

	var arr = new Array();
	var cnt = 0;	// arr의 크기를 카운터 해주는 변수
	var selectorString;

	// 해당하는 달에 공휴일 배열에 담기
	// 음력 공휴일 양력 날짜로 계산
	for(l=0; l<lunarHolidays.length; l++){
		var str1 = today.getFullYear()+'-'+lunarHolidays[l];
		lunarHolidays[l] = Resut(str1);
	}
	var cc = today.getFullYear()+"-"+lunarHolidays[0];
	cc = new Date(cc);
	cc.setDate(cc.getDate()-1);

	var ccMonth = cc.getMonth()+1;
	var ccDate = cc.getDate();

	if(ccMonth < 10){ ccMonth ='0'+ccMonth;}
	if(ccDate < 10){ ccDate ='0'+ccDate;}

	var ccstr = ccMonth+'-'+ccDate;

	lunarHolidays.push(ccstr);

	for(j=0; j<4; j++){
		// 양력
		for(i=0; i<solarHolidays.length; i++){
			if(holidayCheckMonth == solarHolidays[i].substring(0,2)){
				arr[cnt] = solarHolidays[i];
				cnt++;
			};
		}
		// 음력
		for(k=0; k<lunarHolidays.length; k++){
			if(holidayCheckMonth == lunarHolidays[k].substring(0,2)){
				arr[cnt] = lunarHolidays[k];
				cnt++;
			};
		}
		holidayCheckMonth++;
	}

	// addClass
	for(k=0; k<arr.length; k++){
		// // console.log(arr[k]);

		selectorString = '';
		selectorString += '#cal_area td[data-date="';
		selectorString += today.getFullYear()+'-'+arr[k];
		selectorString += '"]';

		$(selectorString).addClass('holiday');
	}
}
function betweenRentDayAndReturnDayCSS(eFirstDate, eLastDate) {
	var efd = new Date(eFirstDate);
	var eld = new Date(eLastDate);

	// 날짜 차이 알아 내기
	var diff = eld - efd;
	var currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
	var diffDays = parseInt(diff/currDay);

	var firsttoLast = '';

	for(i=1; i<diffDays; i++){
		efd.setDate(efd.getDate()+1);

		var efdYear = efd.getFullYear();
		var efdMonth = efd.getMonth()+1;
		if(efdMonth < 10){efdMonth = '0'+efdMonth;}
		var efdDate = efd.getDate();
		if(efdDate < 10){efdDate = '0'+efdDate;}

		firsttoLast += '#cal_area td[data-date="';
		firsttoLast += efdYear+'-'+efdMonth+'-'+efdDate;
		firsttoLast += '"]';

		$(firsttoLast).addClass('ftl');

		//문자열 초기화
		firsttoLast = '';
	}
}
// Date객체에서 배열로 년도, 월, 일, 요일 각각 넣어 반환하는 함수
// Ex) In - Date 객체, Out - Array = [년도, 월, 일, 요일]
function getDateTransferText(date){
	var dateYear = date.getFullYear();
	var dateMonth = date.getMonth()+1;
	var dateDate = date.getDate();
	var dateDay = date.getDay();

	dateYear = String(dateYear);

	if(dateMonth < 10){ dateMonth ='0'+dateMonth;}
	if(dateDate < 10){ dateDate ='0'+dateDate;}

	// 연도, 요일 표시
	// 일-0 ~ 토-6
	switch (dateDay) {
		case 0:
			dateDay = '일';
			break;
		case 1:
			dateDay = '월';
			break;
		case 2:
			dateDay = '화';
			break;
		case 3:
			dateDay = '수';
			break;
		case 4:
			dateDay = '목';
			break;
		case 5:
			dateDay = '금';
			break;
		default:
			dateDay = '토';
			break;
	}

	var gcdt = [dateYear, dateMonth, dateDate, dateDay];

	return gcdt;
}
function viewChangeDate(dateFirstDate, dateLastDate){
	//상품리스트페이지에 날짜와, 모달 달력 시간부분 날짜 화면에 뿌리기 [start]
	var gcdtTodayRent = getDateTransferText(dateFirstDate);
	var gcdtTomoReturn = getDateTransferText(dateLastDate);

	var efdYear = gcdtTodayRent[0];
	var efdMonth = gcdtTodayRent[1];
	var efdDate = gcdtTodayRent[2];
	var efdDay = gcdtTodayRent[3];
	var eldYear = gcdtTomoReturn[0];
	var eldMonth = gcdtTomoReturn[1];
	var eldDate = gcdtTomoReturn[2];
	var eldDay = gcdtTomoReturn[3];

	var $topSearchDateDlFirst = $('.itemlist_top_search_date dl:first-child');
	var $topSearchDateDlSecond = $('.itemlist_top_search_date dl:nth-child(2)');

	var strTopSearchDateRentDate = efdMonth + '.' + efdDate;
	var strTopSearchDateReturnDate = eldMonth + '.' + eldDate;

	$topSearchDateDlFirst.find('dd > span').text(strTopSearchDateRentDate);
	$topSearchDateDlSecond.find('dd > span').text(strTopSearchDateReturnDate);

	var strTopSearchDateRentYear = efdYear;
	var strTopSearchDateReturnYear = efdYear;

	var strTopSearchDateRentDay = efdDay + '요일';
	var strTopSearchDateReturnDay = eldDay + '요일';

	$topSearchDateDlFirst.find('small > span:first-child').text(strTopSearchDateRentYear);
	$topSearchDateDlSecond.find('small > span:first-child').text(strTopSearchDateReturnYear);

	$topSearchDateDlFirst.find('small > span:nth-child(2)').text(strTopSearchDateRentDay);
	$topSearchDateDlSecond.find('small > span:nth-child(2)').text(strTopSearchDateReturnDay);

	var $modalTimeDlFirst = $('.calendar_conts.time dl:first-child');
	var $modalTimeDlSecond = $('.calendar_conts.time dl:nth-child(2)');

	var strRentDate = efdYear + '.' + efdMonth + '.' + efdDate + '(' + efdDay +')';
	var strReturnDate = eldYear + '.' + eldMonth + '.' + eldDate + '(' + eldDay +')';

	$modalTimeDlFirst.find('dt em').text(strRentDate);
	$modalTimeDlSecond.find('dt em').text(strReturnDate);
	//상품리스트페이지에 날짜와, 모달 달력 시간부분 날짜 화면에 뿌리기 [end]

	//숙소, 렌트카 날짜 선택시 리스트 호출[start]
	try{
		//체크인/체크아웃, 인수/반납 데이터 입력
		$("#sDay").val(efdYear + '-' + efdMonth + '-' + efdDate);
		$("#eDay").val(eldYear + '-' + eldMonth + '-' + eldDate);

		//숙박 리스트 호출
		stayList("y");
	}catch(e){
	}
	//숙소, 렌트카 날짜 선택시 리스트 호출[end]
}

function updateModalTimeDate(startDate, endDate) {
	var gcdtTodayRent = getDateTransferText(startDate);
	var gcdtTomoReturn = getDateTransferText(endDate);

	var efdYear = gcdtTodayRent[0];
	var efdMonth = gcdtTodayRent[1];
	var efdDate = gcdtTodayRent[2];
	var efdDay = gcdtTodayRent[3];
	var eldYear = gcdtTomoReturn[0];
	var eldMonth = gcdtTomoReturn[1];
	var eldDate = gcdtTomoReturn[2];
	var eldDay = gcdtTomoReturn[3];

	var $modalTimeDlFirst = $('.calendar_conts.time dl:first-child');
	var $modalTimeDlSecond = $('.calendar_conts.time dl:nth-child(2)');


	var strRentDate = efdYear + '.' + efdMonth + '.' + efdDate + '(' + efdDay +')';
	var strReturnDate = eldYear + '.' + eldMonth + '.' + eldDate + '(' + eldDay +')';

	$modalTimeDlFirst.find('dt em').text(strRentDate);
	$modalTimeDlSecond.find('dt em').text(strReturnDate);
}




// 달력 관련 함수 [end]

// 쿠폰 옵션 갯수 증감 계산 함수
// el : 현재 쿠폰 옵션 갯수 값을 보관하는 element
// increment : 현재 값에 추가 될 값
// if 0 < increment ihen -> 증가
// if increment < 0 then -> 감소
// if increment == 0 then -> 변화 없음
// return : increment를 더한 값
function couponOptionCountCalculate(el, increment) {
	let $counter = $(el);
	let count = Number($counter.val()) + increment;
	
	return count;
}

//쿠폰, 뷔페/맛집, 유모차/카시트 옵션 가격 계산
function getCouponOptionTotalPrice(idx, el) {
	let couponOptionTotalPrice = 0;
	let $parent = $(el).parent();
	let $counter = $parent.find('input[name=otpCnt]');
	let count = Number($counter.val());
	let text = $parent.find('input[name=pName]').val();
	if(0 < count) {	
		couponOptionTotalPrice = Number(el.value) * count;
	}
	return couponOptionTotalPrice;
}

//쿠폰, 뷔페/맛집, 유모차/카시트 옵션 가격 계산
function couponTotalPrice(){
	let couponTotalPrice = 0;
	let couponTotalmPrice = 0;
	$('input[name=Pay1]').each(function(idx, el){
		couponTotalPrice += getCouponOptionTotalPrice(idx, el);
	});
	$('input[name=Pay2]').each(function(idx, el){
		couponTotalPrice += getCouponOptionTotalPrice(idx, el);
	});
	$('input[name=Pay3]').each(function(idx, el){
		couponTotalPrice += getCouponOptionTotalPrice(idx, el);
	});
	$('input[name=mPay1]').each(function(idx, el){
		couponTotalmPrice += getCouponOptionTotalPrice(idx, el);
	});
	$('input[name=mPay2]').each(function(idx, el){
		couponTotalmPrice += getCouponOptionTotalPrice(idx, el);
	});
	$('input[name=mPay3]').each(function(idx, el){
		couponTotalmPrice += getCouponOptionTotalPrice(idx, el);
	});
	$("#tPrice").html(comma(couponTotalPrice) + '<small>원</small>');
	$("#totalmempay").val(couponTotalPrice);
	$("#totalfmempay").val(couponTotalmPrice);
}

//유모차 검색
function srhBuggy(){
	var PSHP3	= $('#PSHP3').val();
	var PSHP2	= $("#PSHP2 option:selected").val();
	var PSHK 	= $('#PSCH').val();
	location.href = '?PSHP3=' + PSHP3 + '&PSHP2=' + PSHP2 + "&PSHK=" + PSHK;
}

//뷔페/맛집
function srhFood(){
	var PSHP3 = $('#PSHP3').val();
	var PSHP2 = $('#PSHP2').val();
	var PSHK = $('#PSCH').val();
	location.href = '?PSHP3=' + PSHP3 + "&PSHP2=" + PSHP2 + "&PSHK=" + PSHK;
}

//카트담기
// proc : 1 -> 바로 구매, 0 -> 장바구니
function addCart(proc){

	let OPAY1				= "0";
	let OPAY2				= "0";
	let OPAY3				= "0";
	let NPAY1				= "0";
	let NPAY2				= "0";
	let NPAY3				= "0";

	//쿠폰일 경우 배열로 처리
	if($("#PRODUCT_TOP").val() == "5"){
		let arrOseq		= "";
		let arrOName	= "";
		let arrNum1		= "";
		let arrNum2		= "";
		let arrNum3		= "";
		let arrSpay1	= "";
		let arrSpay2	= "";
		let arrSpay3	= "";
		let arrPName1	= "";
		let arrPName2	= "";
		let arrPName3	= "";
		let arrOriPay1	= "";
		let arrOriPay2	= "";
		let arrOriPay3	= "";
		let arrNPay1	= "";
		let arrNPay2	= "";
		let arrNPay3	= "";

		var arrMemberPrice1	= "";
		var arrMemberPrice2	= "";
		var arrMemberPrice3	= "";

		var arrMemberFPrice1	= "";
		var arrMemberFPrice2	= "";
		var arrMemberFPrice3	= "";

		$('.item_option').each(function(idx, item){
			if($('.item_option').length > (idx + 1)){
				arrOseq		= arrOseq + $('input[name=OSEQ]').eq(idx).val() + ',';
				arrOName	= arrOName + $(item).find('p').text() + ',';
			}
		});

		$('input[name=otpCnt]').each(function(idx, item){
			if(((idx + 1) % 3) == 1){arrNum1		= arrNum1 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 2){arrNum2		= arrNum2 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 0){arrNum3		= arrNum3 + $(item).val() + ',';}
		});

		// $('input[name=Pay1').each(function(idx, item){
			// if(((idx + 1) % 3) == 1){arrSpay1		= arrSpay1 + $(item).val() + ',';}
			// if(((idx + 1) % 3) == 2){arrSpay2		= arrSpay2 + $(item).val() + ',';}
			// if(((idx + 1) % 3) == 0){arrSpay3		= arrSpay3 + $(item).val() + ',';}
		// });

		$('input[name=OPAY1]').each(function(idx, item){
			if(((idx + 1) % 3) == 1){arrSpay1		= arrSpay1 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 2){arrSpay2		= arrSpay2 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 0){arrSpay3		= arrSpay3 + $(item).val() + ',';}
		});



		$('input[name=pName]').each(function(idx, item){
			if(((idx + 1) % 3) == 1){arrPName1		= arrPName1 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 2){arrPName2		= arrPName2 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 0){arrPName3		= arrPName3 + $(item).val() + ',';}
		});


		$('input[name=OPAY1]').each(function(idx, item){
			if(((idx + 1) % 3) == 1){arrOriPay1		= arrOriPay1 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 2){arrOriPay2		= arrOriPay2 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 0){arrOriPay3		= arrOriPay3 + $(item).val() + ',';}
		});

		$('input[name=NPAY1]').each(function(idx, item){
			if(((idx + 1) % 3) == 1){arrNPay1		= arrNPay1 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 2){arrNPay2		= arrNPay2 + $(item).val() + ',';}
			if(((idx + 1) % 3) == 0){arrNPay3		= arrNPay3 + $(item).val() + ',';}
		});



		arrOseq		= arrOseq.substr(0, arrOseq.length - 1);
		arrOName	= arrOName.substr(0, arrOName.length - 1);
		arrNum1		= arrNum1.substr(0, arrNum1.length - 1);
		arrNum2		= arrNum2.substr(0, arrNum2.length - 1);
		arrNum3		= arrNum3.substr(0, arrNum3.length - 1);
		arrSpay1	= arrSpay1.substr(0, arrSpay1.length - 1);
		arrSpay2	= arrSpay2.substr(0, arrSpay2.length - 1);
		arrSpay3	= arrSpay3.substr(0, arrSpay3.length - 1);
		arrPName1	= arrPName1.substr(0, arrPName1.length - 1);
		arrPName2	= arrPName2.substr(0, arrPName2.length - 1);
		arrPName3	= arrPName3.substr(0, arrPName3.length - 1);
		arrOriPay1	= arrOriPay1.substr(0, arrOriPay1.length - 1);
		arrOriPay2	= arrOriPay2.substr(0, arrOriPay2.length - 1);
		arrOriPay3	= arrOriPay3.substr(0, arrOriPay3.length - 1);
		arrNPay1	= arrNPay1.substr(0, arrNPay1.length - 1);
		arrNPay2	= arrNPay2.substr(0, arrNPay2.length - 1);
		arrNPay3	= arrNPay3.substr(0, arrNPay3.length - 1);

		// $("#OSEQ").val(arrOseq);
		OSEQ = arrOseq;
		$("#O_NAME").val(arrOName);
		$("#NUM1").val(arrNum1);
		$("#NUM2").val(arrNum2);
		$("#NUM3").val(arrNum3);
		$("#SPAY1").val(arrSpay1);
		$("#SPAY2").val(arrSpay2);
		$("#SPAY3").val(arrSpay3);
		$("#PNAME1").val(arrPName1);
		$("#PNAME2").val(arrPName2);
		$("#PNAME3").val(arrPName3);
		OPAY1 = arrOriPay1;
		OPAY2 = arrOriPay2;
		OPAY3 = arrOriPay3;
		NPAY1 = arrNPay1;
		NPAY2 = arrNPay2;
		NPAY3 = arrNPay3;
	}
	//숙박인경우
	if($("#PRODUCT_TOP").val() == "3"){
		OSEQ				= $("#OSEQ").val();
		OPAY3 = $("#Tdispay").val();
		$("#NUM1").val($("#selRoomCnt option:selected").val());
		$("#NUM2").val($("#selAdultCnt option:selected").val());
		$("#NUM3").val($("#selChildCnt option:selected").val());
		NPAY1				= $("#NPAY1").val();
		NPAY2				= $("#NPAY2").val();
		NPAY3				= $("#NPAY3").val();
	}

	//렌트카인경우
	if($("#PRODUCT_TOP").val() == "4"){
		OSEQ				= $("#OSEQ").val();
		OPAY2 = $("#rentInsPrice").val();
		OPAY3 = $("#OPAY3").val();
		NPAY1				= $("#NPAY1").val();
		NPAY2				= $("#NPAY2").val();
		NPAY3				= $("#NPAY3").val();
	}


	//상세 페이지에서 장바구니 담기
	PROCTYPE			= proc;
	PRODUCT_TOP			= $("#PRODUCT_TOP").val();
	PSEQ				= $("#PSEQ").val();
	
	O_NAME				= $("#O_NAME").val();
	NUM1				= $("#NUM1").val();
	NUM2				= $("#NUM2").val();
	NUM3				= $("#NUM3").val();
	SPAY1				= $("#SPAY1").val();
	SPAY2				= $("#SPAY2").val();
	SPAY3				= $("#SPAY3").val();

	PNAME1				= $("#PNAME1").val();
	PNAME2				= $("#PNAME2").val();
	PNAME3				= $("#PNAME3").val();
	PRODUCT_SUB			= $("#PRODUCT_SUB").val();
	PRODUCT_NAME		= $("#PRODUCT_NAME").val();
	PRODUCT_CODE		= $("#PRODUCT_CODE").val();
	PRODUCT_TYPE		= $("#PRODUCT_TYPE").val();
	IMG					= $("#IMG").val();
	SdayD				= $("#SdayD").val();
	SdayH				= $("#SdayH").val();
	SdayM				= $("#SdayM").val();
	EdayD				= $("#EdayD").val();
	EdayH				= $("#EdayH").val();
	EdayM				= $("#EdayM").val();
	rentTermTime		= $("#rentTermTime").val();
	rentTermDay			= $("#rentTermDay").val();
	rentInsPrice		= $("#rentInsPrice").val();
	rentCarPrice		= $("#rentCarPrice").val();
	insType				= $("#insType").val();
	totalmempay 		= $( "#totalmempay" ).val();
	totalfmempay 		= $( "#totalfmempay" ).val();

	defaultCommiList	= $("input[name=defaultCommi]").map(function(){
																			return this.value;
																		}).get().join(',');
	addCommiList		= $("input[name=addCommi]").map(function(){
																			return this.value;
																		}).get().join(',');
	addCommiList2		= $("input[name=add_Com2]").map(function(){
																			return this.value;
																		}).get().join(',');
	addCommiList3		= $("input[name=add_Com3]").map(function(){
																			return this.value;
																		}).get().join(',');
	addCommiPayList1	= $("input[name=add_commi_Pay1]").map(function(){
																			return this.value;
																		}).get().join(',');
	addCommiPayList2	= $("input[name=add_commi_Pay2]").map(function(){
																			return this.value;
																		}).get().join(',');
	addCommiPayList3	= $("input[name=add_commi_Pay3]").map(function(){
																			return this.value;
																		}).get().join(',');
	defaultFeesList		= $("input[name=defaultFees]").map(function(){
																		return this.value;
																	}).get().join(',');
	addFeesList			= $("input[name=addFees]").map(function(){
																	return this.value;
																}).get().join(',');
	addFeesList2		= $("input[name=add_fees2]").map(function(){
																	return this.value;
																}).get().join(',');
	addFeesList3		= $("input[name=add_fees3]").map(function(){
																	return this.value;
																}).get().join(',');
	addFeesPayList1		= $("input[name=add_fees_Pay1]").map(function(){
																	return this.value;
																}).get().join(',');
	addFeesPayList2		= $("input[name=add_fees_Pay2]").map(function(){
																	return this.value;
																}).get().join(',');
	addFeesPayList3		= $("input[name=add_fees_Pay3]").map(function(){
																	return this.value;
																}).get().join(',');
    																
	memberPriceList1		= $("input[name=Pay1]").map(function(){ return this.value; }).get().join(',');
	memberPriceList2		= $("input[name=Pay2]").map(function(){ return this.value; }).get().join(',');
	memberPriceList3		= $("input[name=Pay3]").map(function(){ return this.value; }).get().join(',');

	memberFPriceList1		= $("input[name=mPay1]").map(function(){ return this.value; }).get().join(',');
	memberFPriceList2		= $("input[name=mPay2]").map(function(){ return this.value; }).get().join(',');
	memberFPriceList3		= $("input[name=mPay3]").map(function(){ return this.value; }).get().join(',');

	if(!defaultCommiList ||  defaultCommiList.length == 0) {
		defaultCommiList = [0]
	}

	if(!addCommiList || addCommiList.length  == 0) {
		addCommiList = [0]
	}
	if(!addCommiList2 || addCommiList2.length  == 0) {
		addCommiList2 = [0]
	}
	if(!addCommiList3 || addCommiList3.length  == 0) {
		addCommiList3 = [0]
	}

	if(!addCommiPayList1 || addCommiPayList2.length  == 0) {
		addCommiPayList1 = [0]
	}
	if(!addCommiPayList2 || addCommiPayList2.length  == 0) {
		addCommiPayList2 = [0]
	}
	if(!addCommiPayList3 || addCommiPayList3.length  == 0) {
		addCommiPayList3 = [0]
	}

	if(!defaultFeesList || defaultFeesList.length == 0) {
		defaultFeesList = [0]
	}

	if(!addFeesList || addFeesList.length == 0) {
		addFeesList = [0]
	}
	if(!addFeesList2 || addFeesList2.length == 0) {
		addFeesList2 = [0]
	}
	if(!addFeesList3 || addFeesList3.length == 0) {
		addFeesList3 = [0]
	}

	if(!addFeesPayList1 || addFeesPayList1.length == 0) {
		addFeesPayList1 = [0]
	}
	if(!addFeesPayList2 || addFeesPayList2.length == 0) {
		addFeesPayList2 = [0]
	}
	if(!addFeesPayList3 || addFeesPayList3.length == 0) {
		addFeesPayList3 = [0]
	}

	if(!memberPriceList1 || memberPriceList1.length == 0) {
		memberPriceList1 = [0]
	}
	if(!memberPriceList2 || memberPriceList2.length == 0) {
		memberPriceList2 = [0]
	}
	if(!memberPriceList3 || memberPriceList3.length == 0) {
		memberPriceList3 = [0]
	}

	if(!memberFPriceList1 || memberFPriceList1.length == 0) {
		memberFPriceList1 = [0]
	}
	if(!memberFPriceList2 || memberFPriceList2.length == 0) {
		memberFPriceList2 = [0]
	}
	if(!memberFPriceList3 || memberFPriceList3.length == 0) {
		memberFPriceList3 = [0]
	}

	var ajaxData = {
    PROCTYPE: proc,
    PRODUCT_TYPE: PRODUCT_TYPE,
    TEMPTYPE: "1",
    PRODUCT_TOP: PRODUCT_TOP,
    PRODUCT_SUB: PRODUCT_SUB,
    PSEQ: PSEQ,
    OSEQ: OSEQ,
    PRODUCT_NAME: PRODUCT_NAME,
    PRODUCT_CODE: PRODUCT_CODE,
    O_NAME: O_NAME,
    NUM1: NUM1,
    NUM2: NUM2,
    NUM3: NUM3,
    SPAY1: SPAY1,
    SPAY2: SPAY2,
    SPAY3: SPAY3,
    RENTINPAY: "1",
    RENTINSPAY: "0",
    RENTINSDAY: "0",
    PNAME1: PNAME1,
    PNAME2: PNAME2,
    PNAME3: PNAME3,
    O_CHKP1: "0",
    O_CHKP2: "0",
    O_CHKP3: "0",
    IMG: IMG,
    SdayD: SdayD,
    SdayH: SdayH,
    SdayM: SdayM,
    EdayD: EdayD,
    EdayH: EdayH,
    EdayM: EdayM,
    rentTermTime: rentTermTime,
    rentTermDay: rentTermDay,
    rentInsPrice: rentInsPrice,
    rentCarPrice: rentCarPrice,
    insType: insType,
    OPAY1: OPAY1,
    OPAY2: OPAY2,
	OPAY3: OPAY3,
	NPAY1: NPAY1,
    NPAY2: NPAY2,
	NPAY3: NPAY3,
	defaultCommiList:defaultCommiList,
	addCommiList:addCommiList,
	addCommiList2:addCommiList2,
	addCommiList3:addCommiList3,
	addCommiPayList1:addCommiPayList1,
	addCommiPayList2:addCommiPayList2,
	addCommiPayList3:addCommiPayList3,
	defaultFeesList:defaultFeesList,
	addFeesList:addFeesList,
	addFeesList2:addFeesList2,
	addFeesList3:addFeesList3,
	addFeesPayList1:addFeesPayList1,
	addFeesPayList2:addFeesPayList2,
	addFeesPayList3:addFeesPayList3,
	totalmempay:totalmempay,
	totalfmempay:totalfmempay,
	memberPriceList1:memberPriceList1,
	memberPriceList2:memberPriceList2,
	memberPriceList3:memberPriceList3,
	memberFPriceList1:memberFPriceList1,
	memberFPriceList2:memberFPriceList2,
	memberFPriceList3:memberFPriceList3,
  };

  let successHandler = (response) => {}

	// if(PROCTYPE=="0"){
			// 	$("#cartCnt").text(data);

			// 	scrollOff();

			// 	$('.modal').addClass('on');
			// 	$('#popupCartCheck').addClass('on');
			// }
			// else{
			// 	// console.log("/checkout/?seq=" + data.substr(0, data.length -1));

			// }

	$.ajax({
		type: "POST",
		url : "/api/cart/default.asp",
		data: ajaxData,
		success:function(response) {
		  if(response.productType == "1") {
			  let beySeqList = response.buySeq;
			  window.location.href="/checkout/?arrSeq=" + beySeqList.substr(0, beySeqList.length -1);
		  } else {
			  let basketCount = response.count;
			  $("#cartCnt").text(basketCount);

			  scrollOff();

			  $('.modal').addClass('on');
			  $('#popupCartCheck').addClass('on');
		  }
		},
		error:function(jqXHR, textStatus, errorThrown ){
		},
		complete:function(res) {
		}
	});
}


//여행바구니 삭제
function cartDel(Product_name, seq){
	confirm(Product_name + ' 상품을\n여행바구니에서 삭제하시겠습니까?') ? location.href='/inc/cartDel.asp?seq=' + seq : '';
}

//여행바구니 주문하기
function chkBuy(){
	if($('#cartCnt').text() == '0'){
		alert('선택된 구매 상품이 없습니다.');
	}
	else{
		var arrSeq = "";
		$('input[name=cart_item]:checked').each(function(idx, item){arrSeq = arrSeq + $(item).val() + ",";});
		location.href = '/checkout/?arrSeq=' + arrSeq.slice(0, -1);
	}
}

//1:1문의하기 글 등록
function CustomerSend()
{
	var SNKTOP	= $("#SNKTOP option:selected").val();
	if (SNKTOP == "")
	{
		alert("문의 유형을 선택하세요.");
		return $("#SNKTOP").focus();
	}
	var subject	= $("#subject").val();
	if (subject.length==0)
	{
		alert("내용을 입력하세요.");
		return $("#subject").focus();
	}
	if (subject.length<5)
	{
		alert("내용을 정확하게 입력하세요.");
		return $("#subject").focus();
	}

	var strurl	= "/inc/customerReg.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {SNKTOP:SNKTOP,subject:subject},
		success:function(data){
			alert('1:1문의글이 등록되었습니다.');
			location.href = "./";
		}
	});
}

//콤마
function comma(num){
    var len, point, str;

    num = num + "";
    point = num.length % 3 ;
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
        if (str != "") str += ",";
        str += num.substring(point, point + 3);
        point += 3;
    }

    return str;
}

//메일 주소 변경
function lastMailChg(oMail, cMail){
	$("#" + cMail).val(oMail);
}

// 주문결제 구매고객 이용고객 같은경우 체크
function TempChkJP()
{
	if($('input:checkbox[name="TempChk"]').is(":checked"))
	{
		$("#tempUseUser").show();
		// $("#Temp_Name").val($("#Order_Name").val());
		// $("#Temp_Email_1").val($("#Order_Email_1").val());
		// $("#Temp_Email_2").val($("#Order_Email_2").val());
		// $("#Temp_HP1").val($("#Order_HP1").val());
		// $("#Temp_HP2").val($("#Order_HP2").val());
		// $("#Temp_HP3").val($("#Order_HP3").val());
		// $("#Temp_Tel1").val($("#Order_Tel1").val());
		// $("#Temp_Tel2").val($("#Order_Tel2").val());
		// $("#Temp_Tel3").val($("#Order_Tel3").val());
	}
	else
	{
		$("#tempUseUser").hide();
		// $("#Temp_Name").val("");
		// $("#Temp_Email_1").val("");
		// $("#Temp_Email_2").val("");
		// $("#Temp_HP1").val("010");
		// $("#Temp_HP2").val("");
		// $("#Temp_HP3").val("");
		// $("#Temp_Tel1").val("");
		// $("#Temp_Tel2").val("");
		// $("#Temp_Tel3").val("");
	}
}

function captureReturnKey(e) {
    if(e.keyCode==13 && e.srcElement.type != 'textarea')
    return false;
}

//결제하기
function OrderSend(No)
{
	// // console.log("CALL ORDER SEND");
	var Order_Name	= $("#Order_Name").val();
	if (Order_Name.length==0)
	{
		alert("예약자 성명을 입력하세요.");
		return $("#Order_Name").focus();
	}

	var Order_Email_1	= $("#Order_Email_1").val();
	if (Order_Email_1.length==0)
	{
		alert("예약자 이메일을 입력하세요.");
		return $("#Order_Email_1").focus();
	}
	var Order_Email_2	= $("#Order_Email_2").val();
	if (Order_Email_2.length==0)
	{
		alert("예약자 이메일주소를 입력하세요.");
		return $("#Order_Email_2").focus();
	}

	var Email = $("#Order_Email_1").val() + "@" + $("#Order_Email_2").val();

	if(!isValidEmail(Email))
	{
		alert("이메일 형식이 아닙니다.");
		return $("#Order_Email_2").focus();
	}

	var Order_HP1	= $("#Order_HP1").val();
	var Order_HP2	= $("#Order_HP2").val();
	if (Order_HP2.length<3)
	{
		alert("예약자 핸드폰 중간번호를 정확히 입력하세요.");
		return $("#Order_HP2").focus();
	}
	var Order_HP3	= $("#Order_HP3").val();
	if (Order_HP3.length!==4)
	{
		alert("예약자 핸드폰 뒷번호를 정확히 입력하세요.");
		return $("#Order_HP3").focus();
	}

	var TempChk		= "0";
	var Temp_Name	= $("#Temp_Name").val();
	let Temp_Email_1 = $("#Temp_Email_1").val()
	let Temp_Email_2 = $("#Temp_Email_2").val()
	var Temp_Email	= Temp_Email_1 + "@" + Temp_Email_2;
	var Temp_HP1	= $("#Temp_HP1").val();
	var Temp_HP2	= $("#Temp_HP2").val();
	var Temp_HP3	= $("#Temp_HP3").val();
	if (document.getElementById("TempChk").checked == true)
	{
		TempChk	= "1";

		if (Temp_Name.length==0)
		{
			alert("이용자 성명을 입력하세요.");
			return $("#Temp_Name").focus();
		}
		if (Temp_Email.length!==0)
		{
			if(!isValidEmail(Temp_Email))
			{
				alert("이메일 형식이 아닙니다.");
				return $("#Temp_Email_2").focus();
			}
		}
		if (Temp_HP2.length<3)
		{
			alert("이용자 핸드폰 중간번호를 정확히 입력하세요.");
			return $("#Temp_HP2").focus();
		}
		if (Temp_HP3.length!==4)
		{
			alert("이용자 핸드폰 뒷번호를 정확히 입력하세요.");
			return $("#Temp_HP3").focus();
		}
	}

	var TourSday	= $("#TourSday").val();
	if (TourSday.length==0)
	{
		alert("여행 시작일자를 선택하세요.");
		return $("#TourSday").focus();
	}
	var TourEday	= $("#TourEday").val();
	if (TourEday.length==0)
	{
		alert("여행 종료일자를 선택하세요.");
		return $("#TourEday").focus();
	}

	if ($("#PayCard option:selected").val()=="")
	{
		alert("결제 방법이 선택 되지 않았습니다.");
		return;
	}

	if (document.getElementById("agree01").checked == false)
	{
		alert("이용약관에 동의하셔야 하십니다.");
		return $("#agree01").focus();
	}


	var rentYN = "Y"
	var strurl = "/inc/orderChk.asp";
	var boardId = $("#BoardID").val();
	jQuery.ajax({
		type: "post",
		url : strurl,
		async   : false,
		data: {
				nCount: boardId
			  },
		success:function(data){
			if(data!=""){
				alert(data);
				rentYN = "N"
			}
		},
		error : function(err) {
		}
	});

	if(rentYN == "N")	return;

	function OrderProcess() {
		var pointPay1 = $("#PointPay1").val();
		var pointPay2 = $("#PointPay2").val();
		var pointPay3 = $("#PointPay3").val();
		var pointPay4 = $("#PointPay4").val();
		var pointPay5 = $("#PointPay5").val();
		var pointPay6 = $("#PointPay6").val();
		var pointPay7 = $("#PointPay7").val();
		var pointPay8 = $("#PointPay8").val();
		var couponbookpay	= $("#couponbookpay").val();	
		var couponbooknum	= $("#couponbooknum").val();	

		if ($("#Total").val()=="0" )
		{
			if (pointPay3!=="0" && pointPay4!=="0")
			{
				if (!confirm("레드캡상품권과 무통장입금으로 결제 하시겠습니까?"))	return;
			}
			else if (pointPay3!=="0")
			{
				if (!confirm("레드캡상품권으로 결제 하시겠습니까?"))	return;
			}
			else if (pointPay4!=="0")
			{
				if (!confirm("무통장입금으로 결제 하시겠습니까?"))	return;
			}
			else
			{
				if (!confirm("포인트로 결제 하시겠습니까?"))	return;
			}
			Sendmit("/asp/order/Order_PointSend.asp");
		}
		else
		{
			var payType = $("#PayCard option:selected").val();
			var words = payType.split('||');
			if (words.length==10)
			{
		//		loading_In();
				var jsonData = {
					BoardID: boardId,
					sVId: $("#sVId").val(),
					Point1: pointPay1,
					Point2: pointPay2,
					Point5: pointPay5,
					Point6: pointPay6,
					Point7: pointPay7,
					Point8: pointPay8,
					CHK: "LGPULS",
					pay_type: payType,
					Order_Name:Order_Name,
					Order_Email_1:Order_Email_1,
					Order_Email_2:Order_Email_2,
					Order_HP1:Order_HP1,
					Order_HP2:Order_HP2,
					Order_HP3:Order_HP3,
					Delivery:"0",
					TourSday:TourSday,
					TourEday: TourEday,
					TempChk: TempChk,
					Temp_Name: Temp_Name,
					Temp_Email_1:Temp_Email_1,
					Temp_Email_2:Temp_Email_2,
					Temp_HP1: Temp_HP1,
					Temp_HP2: Temp_HP2,
					Temp_HP3: Temp_HP3,
					couponbookpay: couponbookpay,
					couponbooknum: couponbooknum,
				}
				// var BoardID		= $("#BoardID").val();
				// var sVId		= $("#sVId").val();
				// var Point1		= $("#PointPay1").val();
				// var Point2		= $("#PointPay2").val();
				// var Point5		= $("#PointPay5").val();
				// var Point6		= $("#PointPay6").val();
				// var Point7		= $("#PointPay7").val();
				// var Point8		= $("#PointPay8").val();
				// var Delivery	= 0;
				// var CHK			= "LGPULS";
				// var strurl		= "LGUPLUS.asp";
				// var payType		= words[9];
				jQuery.ajax({
					type: "post",
					url : "LGUPLUS.asp",
					data: jsonData,
					success:function(data){
						$( "#PGDIV").html(data);
					},
					error : function(err) {
						alert(err);
					}
				});
			}
		}
	}
	var BoardID		= $("#BoardID").val();
	$.ajax({
		type: "GET",
		url: ("/checkout/OrderValidate.asp?seq=" + BoardID),

		success: function (response) {
				let errorCode = response.errorCode;
				switch (errorCode) {
					case 200:
						OrderProcess();
						break;
					case 404:
						alert("세션이 만료 되었습니다.");
						location.href = "/"
						break;
					case 500:
					default:

						break;
				}
		},
		error: function(error) {

		}
	});
}

//이메일 유효성 검사
function isValidEmail(input)
{
	var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
	return isValidFormat(input,format);
}

function isValidFormat(input,format)
{
	if (input.search(format) != -1)
	{
		return true;
	}
	return false;
}


//상품 문의하기
function questionWriteProc(){
	qProductTop		= $('#qProductTop').val();
	qProductSubTop	= $('#qProductSubTop').val();
	qProductSeq		= $('#qProductSeq').val();
	qProductName	= $('#qProductName').val();
	wName			= $('#wName').val()
	wSubject		= $('#wSubject').val();
	wContent		= $('#wContent').val();
	qProductScret	= $(":input:radio[name=qradios]:checked").val();

	// if(wSubject == ""){
	// 	alert("제목을 입력하세요");
	// 	$('#wSubject').focus();
	// 	return;
	// }

	if(wContent == ""){
		alert("내용을 입력하세요");
		$('#wContent').focus();
		return;
	}

	var strurl	= "/inc/productProcXml.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {flag:"w",pTop:qProductTop,pSeq:qProductSeq,pName:qProductName,wName:wName,wSubject:wSubject,wContent:wContent,qProductScret:qProductScret,sTop:qProductSubTop},
		success:function(data){
			if(data=="Y"){
				alert("문의글이 등록되었습니다.");
				history.back();
			}

			else{
				alert("문의글이 등록에 실패했습니다.");
			}
		},
		error : function(err) {
		}
	});
}


//1:1문의하기 글 등록
function CustomerSend()
{
	var SNKTOP	= $("#SNKTOP option:selected").val();
	if (SNKTOP == "")
	{
		alert("문의 유형을 선택하세요.");
		return $("#SNKTOP").focus();
	}
	var title	= $("#title").val();
	if (title.length==0)
	{
		alert("제목을 입력하세요.");
		return $("#title").focus();
	}
	var subject	= $("#subject").val();
	if (subject.length==0)
	{
		alert("내용을 입력하세요.");
		return $("#subject").focus();
	}
	if (subject.length<5)
	{
		alert("내용을 정확하게 입력하세요.");
		return $("#subject").focus();
	}

	var strurl	= "/inc/customerReg.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {SNKTOP:SNKTOP,subject:subject,title:title},
		success:function(data){
			alert("1:1문의가 등록되었습니다.")
			location.href="/customer/oneInquiry";
		},
		error : function(err) {
		}
	});
}


//리뷰 작성
function reviewWrite(){

	if($('#reviewSubject').val() == ""){
		alert("리뷰 내용을 작성해주세요.");
		$('#reviewSubject').focus();
		return false;
	}

	starScoreValue	= $('#starScoreValue').val();
	reviewPseq		= $('#reviewPseq').val();
	reviewPTop		= $('#reviewPTop').val();
	reviewPSub		= $('#reviewPSub').val();
	reviewSubject	= $('#reviewSubject').val();

	var strurl	= "/inc/productProcXml.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {flag:"rw",pTop:reviewPTop,pSeq:reviewPseq,wSubject:reviewSubject,sTop:reviewPSub,eval:starScoreValue},
		success:function(data){
			if(data=="Y"){
				alert("리뷰가 등록되었습니다. 감사합니다.");
				history.back();
			}

			else{
				alert("리뷰 등록에 실패했습니다.");
				history.back();
			}
		},
		error : function(err) {
		}
	});

}


//주문상품 취소요청
function claimsSend(){
 if($("#cTxt").val()==""){
	alert("취소요청 사유를 입력해주세요.");
	$("#cTxt").focus();
	return;
 }

	var strurl	= "/mypage/claims.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {PSEQ:$("#cPseq").val(), CTEXT:$("#cTxt").val()},
		success:function(data){
			if(data=="Y"){
				alert("정상적으로 취소요청 되었습니다.");
				history.back();
			}
			else{
				alert("취소요청에 실패하였습니다.");
			}
		},
		error : function(err) {
		}
	});

}

//상품 문의글 삭제
function quetionProductDel(seq, staffNo, productName){
	if(confirm(productName + " 상품에 문의주신 내용을 삭제하시겠습니까?")){
	var strurl	= "/inc/productProcXml.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {flag:"d",seq:seq,staffNo:staffNo},
		success:function(data){
			if(data=="Y"){
				alert("문의글이 삭제되었습니다.");
				qProductTop		= $('#qProductTop').val();
				qProductSeq		= $('#qProductSeq').val();
				qProductName	= $('#qProductName').val();
				quetionProduct(qProductTop, qProductSeq, qProductName);
			}

			else{
				alert("문의글이 삭제에 실패했습니다.");
			}
		},
		error : function(err) {
		}
	});
	}
}


//1:1문의글 삭제
function  oneQuetionDel(seq, staffNo, event){
	 event.stopPropagation();
	if(confirm("해당 게시글을 내용을 삭제하시겠습니까?")){
		let strurl	= "/inc/productProcXml.asp";
		jQuery.ajax({
			type: "post",
			url : strurl,
			data: {flag:"d",seq:seq,staffNo:staffNo},
			success:function(data){
				if(data=="Y"){
					alert("성공적으로 삭제되었습니다.");
					// location.reload();
					//location.href = "/customer/oneInquiry";
				}

				else{
					alert("삭제에 실패했습니다.");
				}
			},
			error : function(err) {			
			}
		});			
	}
}

//계좌번호 변경
function accountEdit(){
	bankName		= $("#bankName option:selected").val();
	accountNumber	= $("#accountNumber").val();
	prefixId = $(`#prefix_id`).val();
	posfixId = $(`#posfix_id.focus_off:input:not([readonly])[type=text]`).val();
	idCard = `${prefixId}${posfixId}`
	if(idCard.length != 13) {
		alert("주민번호를 정확히 입력해주세요.")
		return;
	}

	let jsonData = {
		flag:"chgmember",
		bankName:bankName,
		accountNumber:accountNumber,
		idCard: idCard
	};

	var strurl	= "/inc/memberChk.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: jsonData,
		success:function(data){
			if(data=="Y"){
				alert("계좌정보가 변경되었습니다.");
				location.reload();
			}
			else{
				alert("계좌정보 변겡에 실패하였습니다.");
			}
		},
		error : function(err) {
		}
	});
}


//회원정보관리 패스워드 확인
function passChk(){

	if($('#chkPw').val() == ""){
		alert("비밀번호를 입력해주세요.");
		$('#chkPw').focus();
		return false;
	}

	var strurl	= "/inc/memberChk.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {flag:"pwh",chkPw:$('#chkPw').val()},
		success:function(data){
			if(data=="Y"){
				location.href="/mypage/myInfoUpdate.asp";
			}
			else {
				alert("비밀번호가 일치하지 않습니다.");
			}
		},
		error : function(err) {
		}
	});

}


//회원정보관리 패스워드 수정
function memberChgPW(){
	if($('#chgPw').val() == ""){
		alert("비밀번호를 입력해주세요.");
		$('#chgPw').focus();
		return;
	}

	if($('#chgPwc').val() == ""){
		alert("비밀번호가 일치하지 않습니다.");
		$('#chgPwc').focus();
		return;
	}

	var pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;?@\[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;?@\[\\\]^_`{|}~]{8,20}$/
	// var pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})$/

	if(!pwRegex.test($("#chgPwc").val()))
    {
       alert('비밀번호는 8~20자의 영문자, 숫자, 특수문자를 사용해야 합니다.');
	   $("#chgPwc").focus();
       return false;
	}

	var strurl	= "/inc/memberChk.asp";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {flag:"chgpwd",chgPw:$('#chgPw').val()},
		success:function(data){
			if(data=="Y"){
				alert("비밀번호가 변경되었습니다.");
				$("#passUpdateCancleBtn").click();
			}
			else{
				alert("비밀번호 변경에 실패하였습니다.");
			}
		},
		error : function(err) {
		}
	});
}


//추천인 URL 복사
function recomCopy(){
		$('#recomUrl').select() //복사할 텍스트를 선택
		document.execCommand("copy") //클립보드 복사 실행
		alert('추천인코드 URL이 복사되었습니다.');
}


//회원정보 수정
function editMember(){
		bankName		= $("#bankName option:selected").val();
		accountNumber	= $("#accountNumber").val();

		var strurl	= "/inc/memberChk.asp";
		jQuery.ajax({
			type: "post",
			url : strurl,
			data: {flag:"chgmember",bankName:bankName,accountNumber:accountNumber},
			success:function(data){
				if(data=="Y"){
					alert("회원정보가 수정되었습니다.");
					location.href="/";
				}
				else{
					alert("회원정보 수정에 실패하였습니다.");
				}
			},
			error : function(err) {
			}
		});
}


//회원탈퇴 신청
function dropMember(){
		dropReasons		= $("#dropReasons option:selected").val();
		if (!confirm("회원 탈퇴를 하시겠습니까?")){return}
		var strurl	= "/inc/memberChk.asp";
		jQuery.ajax({
			type: "post",
			url : strurl,
			data: {flag:"reasons",dropReasons:dropReasons},
			success:function(data){
				if(data=="Y"){
					alert("회원탈퇴 신청되었습니다.");
					location.href="/";
				}
				else{
					alert("회원탈퇴신청에 실패하셨습니다.");
				}
			},
			error : function(err) {
			}
		});

}


function inputTextCopy(id, copyTxt){
	$('#' + id).select() //복사할 텍스트를 선택
	document.execCommand("copy") //클립보드 복사 실행
	alert(copyTxt + ' 복사되었습니다.');
}


function getSelectedCalendarData(isFirst) {
	if (isFirst) {
		return $('#cal_area .on').first().attr('data-date');
	} else {
		return $('#cal_area .on').last().attr('data-date');
	}

}

//평점 이미지 출력
function getStarImg(avg){
    var avgStarImg
    if (avg > 0 && avg <= 1) avgStarImg = "star1.png";
    else if (avg > 1 && avg <= 1.5) avgStarImg = "star1_5.png";
    else if (avg > 1.5 && avg <= 2) avgStarImg = "star2.png";
    else if (avg > 2 && avg <= 2.5) avgStarImg = "star2_5.png";
    else if (avg > 2.5 && avg <= 3) avgStarImg = "star3.png";
    else if (avg > 3 && avg <= 3.5) avgStarImg = "star3_5.png";
    else if (avg > 3.5 && avg <= 4) avgStarImg = "star4.png";
    else if (avg > 4 && avg <= 4.5) avgStarImg = "star4_5.png";
    else if (avg > 4.5) avgStarImg = "star5.png";
    return avgStarImg;
}