
var stayPage = 0;
$(window).scroll(function() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {				
        stayList("n");
    }
});

function updateLabel() {
    let $inputList = $('#itemListSearchStay .input_box li > input[type="text"]');
	let $selectedCheckboxList = $('#itemListSearchStay .checkbox_box li > input:checkbox:checked + label');
    
    let regionValue = $('#itemListSearchStay .select_box select[name=region]').val();
    let SDARDR = ""
    let $selectedSelectList;
    if(regionValue) {
        SDARDR = regionValue;
        $selectedSelectList = $('#itemListSearchStay .select_box select:not([name=sub_region])');
    } else {
        SDARDR = $('#itemListSearchStay .select_box select[name=sub_region] option:selected').val();
        $selectedSelectList = $('#itemListSearchStay .select_box select:not([name=region])');
    }
    
	//숙박 리스트 호출[start]	
	var val = "";
	$("#SDARDR").val(SDARDR);
	$("#Num2").val($($selectedSelectList[1]).val());
	$("#Num3").val($($selectedSelectList[2]).val());		
	$('#itemListSearchStay .checkbox_box:eq(0) li > input:checkbox:checked').each(function(index, item){val += item.value + ",";});
	$("#CODE1").val(val.slice(0, -1));
	val = "";
	$('#itemListSearchStay .checkbox_box:eq(1) li > input:checkbox:checked').each(function(index, item){val += item.value + ",";});		
	$("#CODE2").val(val.slice(0,-1));
    $("#SNAME").val($inputList[0].value);
    
    str = viewChangeFilter($selectedSelectList,$inputList,$selectedCheckboxList);
    $('#mSearchStayOpenButton ul li').html(str);
}

function stayList(reload){
    // if(reload == "y"){
    //     stayPage = 1;
    // }else{
    //     stayPage = stayPage + 1;
    // }
    updateLabel();
    


    SDAY	= $("#sDay").val();
    EDAY	= $("#eDay").val();
    SARDR	= $("#SARDR").val();
    SDARDR	= $("#SDARDR").val();
    Num1	= $("#Num1").val();
    Num2	= $("#Num2").val();
    Num3	= $("#Num3").val();
    SNAME	= $("#SNAME").val();
    CODE1	= $("#CODE1").val();
    CODE2	= $("#CODE2").val();
    PSCH	= $("#PSCH").val();
	chkqseq	= $("#chkqseq").val();
    
    let request = {
        start:SDAY,
        end:EDAY,
        area:SDARDR,
        adult:Num2,
        child:Num3,
        search:SNAME,
        kinds:CODE1,
        facies:CODE2,
        orderBy:PSCH,
		chkqseq:chkqseq
    }
    
    app.getItems(request, reload == "y")


    // jQuery.ajax({
    //     type: "post",
    //     url : "/stay/stayList.asp",
    //     async: true,
    //     data: request,
    //     success: function(data){
            
    //         var items = data;
    //         makeStayList(items, '.list_style_01', reload);
    //         jqLazyObject.addItems('.lazy');
    //         jqLazyObject.update();
            
    //     },
    //     errror: function(error) {
    //         console.log(error)
    //     },
    //     complete: function(data){
    //     }
    // });	
}


function makeStayList(items, sectionName, isReload) {
    var parent = $(sectionName);
    if(isReload == "y") {
        parent.empty();
    } 
    $.each(items, function (index, item) { 
        var aTag = $('<a></a>').attr('herf', '')
                               .on('click', function (event) { 
                                   event.preventDefault();
                                   $('#pseq').val(item.PSEQ);
                                   frm.submit();

                                   return false;
                                });

        var wrapImgDivTag = makeWrapImgDivTag(item.imgintro, item.S_type);
        var wrapCnttDivTag = makeWrapCttDivTag(item.lodname, item.areaname, item.Npay, item.dispay, item.REVIEW_AVG)                                ;


        aTag = aTag.append(wrapImgDivTag)
                   .append(wrapCnttDivTag)
        var child = $('<li></li>').append(aTag);

        
        parent.append(child);
    });
}



// ------- 가격 태그 생성 함수 -------

function makeWrapCttDivTag(loadName, areaName, nPay, dispay, REVIEW_AVG) {
    var divTag = $('<div></div>').addClass('wrap_ctt');
    //var reviewCnt = $('<span style="border: solid 1px #ececec;font-size: .7rem;margin-left: 10px;padding: 2px 5px;background-color: #ff0000;color: #fff;"></span>').text('추천')
    //var reviewCnt = $('<span style="color: #828282;font-size: .7rem;font-weight: 600;padding-left:5px"></span>').text('리뷰(1234)');
    var emTag = $('<em></em>').text(loadName);
    var starLevel = $('<img></img>').attr('src', '/images/ico/' + getStarImg(REVIEW_AVG)).addClass("mt006 ml002");
    var reviewTag = REVIEW_AVG > 0 ? $('<span></span>').html('평점 ' + REVIEW_AVG).addClass('reviewAvgArea').append(starLevel) : '';
    var spanTag = $('<span></span>').text('지역: ' + areaName);
    var priceTag = makePriceDivTag(nPay, dispay);

    return divTag.append(emTag)
                 .append(reviewTag)
                 .append(spanTag)
                 .append(priceTag);
}

function makePriceDivTag(nPay, dispay) {
    var rootDivTag = $('<div></div>').addClass('priceWrap');
    
    var priceDivTag= $('<div></div>').addClass('price');
    
    
    var nPayTag = makePriceTag('온라인 판매가', nPay, '<b></b>', 'normalPrice');
    var dispayTag = makePriceTag('멤버스 특별가', dispay, '<strong></strong>', 'checkPrice');


    priceDivTag = priceDivTag.append(nPayTag)
                             .append(dispayTag);

    return rootDivTag.append(priceDivTag);

}


// 이미지 태그 생성 함수

function makeWrapImgDivTag(url, type) {
    var divTag = $('<div></div>').addClass('wrap_img');
    var imgTag = $('<img>').addClass('lazy')
                           .attr('data-src', url)
                           .attr('alt', '');
    var resuvationTag = makeResuvationTag(type);


    return divTag.append(imgTag)
                 .append(resuvationTag);
}

function makePriceTag(title, price, priceTagType, className) {
    var divTag = $('<div></div>').addClass(className);
    var titleTag = $('<span></span>').text(title);

    var priceTag = $('<span></span>');
    var boldTag = $(priceTagType).text(price);
    var smallTag = $('<small></small>').text('원')

    priceTag = priceTag.append(boldTag)
                       .append(smallTag);

    return divTag.append(titleTag)
                 .append(priceTag);
}           



function makeResuvationTag(type) {
    if(type == '1') {
        return $('<span></span>').addClass('real_time').text('실시간예약');
    }
    else {
        return $('<span></span>').addClass('happy_time').text('대기예약');
    }
}