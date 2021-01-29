function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(function () {

    /* 온라인 판매가, 쿠주선 판매가, 상품 할인가 계산 로직 */
    let $orderItemsEl = $(".cart_list_item");

    let totalOnlinePrice = 0;
    let totalMemberPrice = 0;

    for (const element of $orderItemsEl) {
        if(Object.hasOwnProperty.call(element.dataset, "onlinePrice")) {
            let onlinePrice = Number(element.dataset.onlinePrice)
            totalOnlinePrice += onlinePrice;
        }

        if(Object.hasOwnProperty.call(element.dataset, "memberPrice")) {
            let memberPrice = Number(element.dataset.memberPrice)
            totalMemberPrice += memberPrice;
        }
    }

    let totalDiscountPrice = totalMemberPrice - totalOnlinePrice;

    // 변동 알림 객체 생성
    let subject = new Subject();

    // 총 할인금액 변동 감시자 생성 및 등록
    let totalDiscountPriceDisplayer = new DisplayObjserver("discount-total", totalDiscountPrice, (value) => {
        let $updateTargetElement = $(".price_info.discount .txt.price");
        $updateTargetElement.text(`${numberWithCommas(value)}원`);
    });
    subject.registerObserver(totalDiscountPriceDisplayer);


    // 최종 결제 금액 변동 감시자 생성 및 등록
    let totalDisplayer = new DisplayObjserver("result", totalMemberPrice, (value) => {

        let $updateTargetElement = $(".price_info.total .txt.price strong");
        $updateTargetElement.text(`${numberWithCommas(value)}원`);

        $updateTargetElement = $(".btn_order_send__click_js span");
        $updateTargetElement.text(`${numberWithCommas(value)}`);
    });
    subject.registerObserver(totalDisplayer);

    // 쿠폰북 선택 갯수 감시자 생성 및 등록
    let couponBookCountDisplayer = new DisplayObjserver("coupon-checked-counter", 0, (value) => {
        let $updateTargetElement = $(".txt.selected em");
        $updateTargetElement.text(value);
    });
    subject.registerObserver(couponBookCountDisplayer);


    /*$(".coupon_checker__changed_js").change((e) => {
        let el = e.target;
        let couponBookPrice = Number(el.dataset.couponPrice);

        let checkedCountingFlag = -1;

        if(el.checked) {
            couponBookPrice *= -1;
            checkedCountingFlag = 1;
        }

        subject.notifyObservers({
            type: "coupon-checked-counter",
            value: checkedCountingFlag
        });

        subject.notifyObservers({
            type: "discount-total",
            value: couponBookPrice
        });

        subject.notifyObservers({
            type: "result",
            value: couponBookPrice
        });


    })*/
});


//쿠폰북 시작
function getCheckedCnt() {
    var obj = document.getElementsByName("couponch");
	var tmpgg = "";
	var tmpgg_arr = "";

    for(var i=0; i<obj.length; i++){
       if (obj[i].checked) {
		    kk = i+1;
			tmpgg = $("#tmpkk_"+kk).val();
			tmpgg_arr = tmpgg.split('/');

			if (tmpgg_arr[0] == '1') {
				$('#tmpkk_'+kk).prop('checked',false);
			}
	   }
    }
}

function getCheckedCnt1() {
    var obj = document.getElementsByName("couponch");
	var tmpgg = "";
	var tmpgg_arr = "";
	var tmpcnt = 0;

    for(var i=0; i<obj.length; i++){
       if (obj[i].checked) {
		    kk = i+1;
			tmpgg = $("#tmpkk_"+kk).val();
			tmpgg_arr = tmpgg.split('/');

			if (tmpgg_arr[0] == '0') {
				tmpcnt++;
			}
	   }
    }
	return tmpcnt;
}

function couponchoi(){
	var tmpnum = "";
	var tmpgg = "";
	var tmpgg_arr = "";
	var tmppay = 0;
    var obj = document.getElementsByName("couponch");
	var tmpdcorgpay = $("#dcorgpay").val(); //쿠폰북적용전총할인금액
	var tmprtotal	= $("#rTotal").val(); //총결제금액

    for(var i=0; i<obj.length; i++){
       if (obj[i].checked) {
		    kk = i+1;
			tmpgg = $("#tmpkk_"+kk).val();
			tmpgg_arr = tmpgg.split('/');

			tmppay = Number(tmpgg_arr[2])+tmppay;
			tmpnum = tmpgg_arr[3] + "," + tmpnum;
	   }
    }

	$("#couponbookpay").val(tmppay); //쿠폰북금액
	$("#couponbooknum").val(tmpnum); //쿠폰북참여고유번호

	//총할인금액표시
	tmpdcorgpay = Number(tmpdcorgpay) + Number(tmppay);
	let $updateTargetElement1 = $(".price_info.discount .txt.price");
    $updateTargetElement1.text(`-${numberWithCommas(tmpdcorgpay)}원`);

	//총결제금액표시
	tmprtotal = Number(tmprtotal) - Number(tmppay);
	let $updateTargetElement2 = $(".price_info.total .txt.price strong");
    $updateTargetElement2.text(`${numberWithCommas(tmprtotal)}원`);
}

function PayDiscount(tmpkk){
	var rTotal	= Number($("#orgpay").val().replace(/[^0-9]/g,'')); //총구매금액
	var tmpgg = $("#tmpkk_"+tmpkk).val();	//0:중복적용여부1:제한금액2:쿠폰금액3:쿠폰참여고유번호
	var tmpgg_arr = tmpgg.split('/');
	var yyy = 0;

	if (rTotal < Number(tmpgg_arr[1])) {
		alert(numberWithCommas(Number(tmpgg_arr[1]))+'원 이상 구매고객만 사용가능 합니다.');
		$('#tmpkk_'+tmpkk).prop('checked',false);
	} else if (tmpgg_arr[0] == '0') { //중복안됨
		alert('중복사용이 안되는 쿠폰 입니다.');
		getCheckedCnt();
	} else if (tmpgg_arr[0] == '1') { //중복됨
		yyy = getCheckedCnt1();
		if (Number(yyy) > 0) {
			alert('이미 중복사용이 안되는 쿠폰 선택되어습니다.');
			$('#tmpkk_'+tmpkk).prop('checked',false);
		}
	}
	couponchoi();
}
//쿠폰북관련 끝