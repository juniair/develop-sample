$(function () {
    let commandList = new CommandList();

    
    $(".select_box select").each(function(index, element) {
        let $element = $(element);
        $element.attr("data-prev-val", $element.val());
    })
    $(".select_box select").on("change", function () { 
        let $this = $(this);
        let beforeVal = $this.attr("data-prev-val");
        let afterVal = $this.val();

        let command = new SelectChangeCommand($this, beforeVal, afterVal);
        commandList.do(command);
    });

    $(".select_box select[name=region]").on("change", function () { 
        let $this = $(this);
        let $sub_region = $(".select_box.sub_region");
        
        let $img = $sub_region.find("img");
        let beforeSrc = $img.attr("src");
        let afterSrc = "/images/map/img_all.png";
        let imagecommand = new ImageChangeCommand($img, beforeSrc, afterSrc);

        let $selectBox = $sub_region.find("select[name=sub_region]") 
        let beforeVal = $selectBox.attr("data-prev-val");
        let afterVal = "";
        let selectCommand = new SelectChangeCommand($selectBox, beforeVal, afterVal);

        let chainCommand = new ChainCommand(imagecommand, selectCommand);
        
        if($this.val() == "9999") {
            $sub_region.hide();
        } else {
            $sub_region.show();
        }
        commandList.do(chainCommand);
    });

    $(".select_box.sub_region map area").on("click", function() {
        event.preventDefault();
        
        let $sub_region = $(".select_box.sub_region");
        
        let $img = $sub_region.find("img");
        let beforeSrc = $img.attr("src");
        let afterSrc = "/images/map/img_all.png";

        let $selectBox = $sub_region.find("select[name=sub_region]") 
        let beforeVal = $selectBox.attr("data-prev-val");
        let afterVal = ""

        let $this = $(this);
        let position = $this.attr("class");
        switch (position) {
            case "noth":
                afterSrc = "/images/map/img_noth.png"
                afterVal = 1;
                break;
            case "south":
                    afterSrc = "/images/map/img_south.png"
                    afterVal = 2;
                    break;
            case "west":
                afterSrc = "/images/map/img_west.png"
                afterVal = 3;
                break;
            case "east":
                afterSrc = "/images/map/img_east.png"
                afterVal = 4;
                break;
            default:
                break;
        }

        let imagecommand = new ImageChangeCommand($img, beforeSrc, afterSrc);
        let selectCommand = new SelectChangeCommand($selectBox, beforeVal, afterVal);

        let chainCommand = new ChainCommand(imagecommand, selectCommand);
        commandList.do(chainCommand);
    })


    $(".checkbox_box input[type=checkbox]").on("change", function () { 
        let $this = $(this);
        let afterVal = $this.is(":checked");
        let beforeVal = !afterVal;
        let command = new CheckBoxChangeCommand($this, beforeVal, afterVal);
        commandList.do(command);
    });


    $(".checkbox_box input[type=radio]").on("change", function () { 
        let $this = $(this);
        let afterVal = $this.is(":checked");
        let beforeVal = !afterVal;

        let command = new RadioChangeCommand($this, beforeVal, afterVal);
        commandList.do(command);
    });

    $(".input_box input[type=text]").on({
        "focusout": function() {
            let $this = $(this);

            let beforeVal = $this.attr("data-prev-val");
            let afterVal = $this.val();

            let command = new TextChangeCommand($this, beforeVal, afterVal);
            commandList.do(command);
        }
    });

    $(".btn_search_submit").on("click", function() {
        event.preventDefault();
		scrollOn();
        
        commandList.clear();
		$('.modal').removeClass('on');
		$('.modal_search_style').removeClass('on');
    });

    // 상품리스트 상단검색 - 닫기
	$('.modal .btn_close').click(function(){
		scrollOn();
        commandList.undoAll();
        commandList.clear();
		$('#itemListSearch').removeClass('on');
		$('.modal_search_style').removeClass('on');
	});	




    //렌트카 검색시 검색어 dlspaly
    let inputList = $('#itemListSearchStay .input_box li > input[type="text"]');
	let selectedCheckboxList = $('#itemListSearchStay .checkbox_box li > input:checkbox:checked + label');
  	selectedSelectList = $('#itemListSearchRentcar .select_box li > select');
	inputList = $('#itemListSearchRentcar .input_box li > input[type="text"]');
	selectedCheckboxList = $('#itemListSearchRentcar .checkbox_box li > input:checkbox:checked + label');
	str = viewChangeFilter(selectedSelectList,inputList,selectedCheckboxList);
	$('#mSearchRentcarSrhButton ul li').html(str);
	


	//쿠폰 검색시 검색어 dlspaly
	selectedSelectList = $('#itemListSearchCoupon .select_box li > select');
	inputList = $('#itemListSearchCoupon .input_box li > input[type="text"]');
	selectedCheckboxList = $('#itemListSearchCoupon .checkbox_box li > input:checkbox:checked + label');
	str = viewChangeFilter(selectedSelectList,inputList,selectedCheckboxList);
	$('#mSearchCouponSrhButton ul li').html(str);
	

 	var itemListTopSearchFilterSelectionList = $('.itemlist_top_search_filter > button > ul').find('li');
 	if(itemListTopSearchFilterSelectionList.length === 0){
 		str = '<span style="font-weight: 600;">검색 조건을 선택해 주세요</span>';
 		$('.itemlist_top_search_filter > button > ul li').html(str);
 	}

	// 숙박
	$('#staySrhButton').click(function(){

		// let $inputList = $('#itemListSearchStay .input_box li > input[type="text"]');
		// let $selectedCheckboxList = $('#itemListSearchStay .checkbox_box li > input:checkbox:checked + label');
        

        // let regionValue = $('#itemListSearchStay .select_box select[name=region]').val();
        // let SDARDR = ""
        // let $selectedSelectList;
        // if(regionValue) {
        //     SDARDR = regionValue;
        //     $selectedSelectList = $('#itemListSearchStay .select_box select:not([name=sub_region])');
        // } else {
        //     SDARDR = $('#itemListSearchStay .select_box select[name=sub_region]').val();
        //     $selectedSelectList = $('#itemListSearchStay .select_box select:not([name=region])');
        // }
		// //숙박 리스트 호출[start]	
		// var val = "";
		// $("#SDARDR").val(SDARDR);
		// $("#Num1").val($($selectedSelectList[1]).val());
		// $("#Num2").val($($selectedSelectList[2]).val());		
		// $('#itemListSearchStay .checkbox_box:eq(0) li > input:checkbox:checked').each(function(index, item){val += item.value + ",";});
		// $("#CODE1").val(val.slice(0, -1));
		// val = "";
		// $('#itemListSearchStay .checkbox_box:eq(1) li > input:checkbox:checked').each(function(index, item){val += item.value + ",";});		
		// $("#CODE2").val(val.slice(0,-1));
        // $("#SNAME").val(inputList[0].value);
        
        // str = viewChangeFilter($selectedSelectList,$inputList,$selectedCheckboxList);
        // $('#mSearchStayOpenButton ul li').html(str);
		stayList("y");
		//숙박 리스트 호툴[end]


	});	

	// 렌트카
	$('#rentcarSrhButton').click(function(){

		selectedSelectList = $('#itemListSearchRentcar .select_box li > select');
		inputList = $('#itemListSearchRentcar .input_box li > input[type="text"]');
		selectedCheckboxList = $('#itemListSearchRentcar .checkbox_box li > input:checkbox:checked + label');
		str = viewChangeFilter(selectedSelectList,inputList,selectedCheckboxList);

		$('#mSearchRentcarSrhButton ul li').html(str);
		
		srhRentCar("", "", "", "");
	});	

	// 쿠폰
	$('#couponSrhButton').click(function(){

		selectedSelectList = $('#itemListSearchCoupon .select_box li > select');
		inputList = $('#itemListSearchCoupon .input_box li > input[type="text"]');
		selectedCheckboxList = $('#itemListSearchCoupon .checkbox_box li > input:checkbox:checked + label');
		str = viewChangeFilter(selectedSelectList,inputList,selectedCheckboxList);

		//$('#mSearchCouponSrhButton ul').html(str);

		//쿠폰 서치
		srhCoupon();
    });

    $('#coupon2SrhButton').click(function(){

		selectedSelectList = $('#itemListSearchCoupon2 .select_box li > select');
		inputList = $('#itemListSearchCoupon2 .input_box li > input[type="text"]');
		selectedCheckboxList = $('#itemListSearchCoupon2 .checkbox_box li > input:checkbox:checked + label');
		str = viewChangeFilter(selectedSelectList,inputList,selectedCheckboxList);

		//$('#mSearchCouponSrhButton ul').html(str);

		//쿠폰 서치
		srhFood();
    });

    $('#buggySrhButton').click(function(){

		selectedSelectList = $('#itemListSearchBuggy .select_box li > select');
		inputList = $('#itemListSearchBuggy .input_box li > input[type="text"]');
		selectedCheckboxList = $('#itemListSearchBuggy .checkbox_box li > input:checkbox:checked + label');
		str = viewChangeFilter(selectedSelectList,inputList,selectedCheckboxList);

		//$('#mSearchCouponSrhButton ul').html(str);

		//쿠폰 서치
		srhBuggy();
    });

});

function viewChangeFilter(selectList, inputList, checkboxList){
	var str = '';

	for(i=0; i<selectList.length; i++){
        
        let $selectBox = $(selectList[i]);
		if($selectBox.val() != 'none' && $selectBox.val() != ''){
			str += '<span style="font-weight: 600;">'+$selectBox.find(`option[value=${$selectBox.val()}]`).text()+'</span>';
		}
	}

	for(i=0; i<inputList.length; i++){
		if(inputList[i].value != ''){
			str += '<span style="font-weight: 600;">'+inputList[i].value+'</span>';
		}
	}

	for(i=0; i<checkboxList.length; i++){
		if(checkboxList[i].value != ''){
			str += '<span style="font-weight: 600;">'+checkboxList[i].textContent+'</span>';
		}
	}

	return str;
}



// 달력 관련 함수 [end]

//렌트카 날짜 검색
function srhRentCar(arrSdate, arrEdate, timeRent, timeReturn){
	if(timeRent != ""){
		var sDay = arrSdate[0] + "-" + arrSdate[1] + "-" + arrSdate[2];
		var eDay = arrEdate[0] + "-" + arrEdate[1] + "-" + arrEdate[2];
	}
	else{
		var sDay = $("#sDay").val();
		var eDay = $("#eDay").val();
		timeRent = $(".mCalendarOpenButton").find("p").eq(0).html();
		timeReturn = $(".mCalendarOpenButton").find("p").eq(1).html();
	}

	var instype = "";
	var model = "";
	var hashtag = "";
	$('input:checkbox[name="instype"]').each(function(){if(this.checked){instype += this.value + ",";}});
	instype = instype.slice(0, -1);
	$('input:checkbox[name="model"]').each(function(){if(this.checked){model += this.value + ",";}});
	model = model.slice(0, -1);
	$('input:checkbox[name="hashtag"]').each(function(){if(this.checked){hashtag += this.value + ",";}});
	hashtag = hashtag.slice(0, -1);
    let hashTagClicked = $('input[name="hashTahClicked"').val();
    if(hashTagClicked === undefined || !hashTagClicked) hashTagClicked = 0;
	location.href = "?Sday=" + sDay + "&eDay=" + eDay + "&sTime=" + timeRent + "&eTime=" +  timeReturn + "&carType=" +  model + "&insType=" +  instype + "&Car_Name=" +  $("#Car_Name").val() + "&hashtag=" + hashtag + "&hashTagClicked=" + hashTagClicked;
}

//쿠폰 검색
function srhCoupon(){
	var PSHP2	= $("#itemListSearchCoupon #PSHP2 option:selected").val();
	var PSUB	= $("#itemListSearchCoupon #PSUB option:selected").val();
	var PSHP3	= $("#itemListSearchCoupon #PSHP3").val();
	var PSHP4	= "";
	var PSHK	= $(".item_list_section #PSCH").val();
	$('input:checkbox[name="wCoupontheme"]').each(function(){if(this.checked){PSHP4 += this.value + ",";}});
    PSHP4 = PSHP4.slice(0, -1);
    findCoupon(PSHP2, PSUB, PSHP3, PSHP4, PSHK);

}

function srhFood(){
	var PSHP2	= $("#itemListSearchCoupon2 #PSHP2 option:selected").val();
	var PSUB	= $("#itemListSearchCoupon2 #PSUB option:selected").val();
	var PSHP3	= $("#itemListSearchCoupon2 #PSHP3").val();
	var PSHP4	= "";
	var PSHK	= $(".item_list_section #PSCH").val();
	$('input:checkbox[name="wCoupontheme"]').each(function(){if(this.checked){PSHP4 += this.value + ",";}});
	PSHP4 = PSHP4.slice(0, -1);
	findCoupon(PSHP2, PSUB, PSHP3, PSHP4, PSHK);
}

function srhBuggy(){
	var PSHP2	= $("#itemListSearchBuggy #PSHP2 option:selected").val();
	var PSUB	= $("#itemListSearchBuggy #PSUB option:selected").val();
	var PSHP3	= $("#itemListSearchBuggy #PSHP3").val();
	var PSHP4	= "";
	var PSHK	= $(".item_list_section #PSCH").val();
	$('input:checkbox[name="wCoupontheme"]').each(function(){if(this.checked){PSHP4 += this.value + ",";}});
	PSHP4 = PSHP4.slice(0, -1);
	findCoupon(PSHP2, PSUB, PSHP3, PSHP4, PSHK);
}

function findCoupon(PSHP2, PSUB, PSHP3, PSHP4, PSHK) {

    location.href = `?PSHP2=${replaceValidValue(PSHP2)}&PSUB=${replaceValidValue(PSUB)}&PSHP3=${replaceValidValue(PSHP3)}&PSHP4=${replaceValidValue(PSHP4)}&PSHK=${replaceValidValue(PSHK)}`;
}

function replaceValidValue(value) {
    if(value === undefined || value === null) {
        return "";
    } else {
        return value
    }
}