// TODO : 쿠폰 받기 작성
function StayEvent(PCODE){
	location.href="/stay/default.asp?chkqseq="+PCODE;
}

function RouletteCheck(){
	var tmpnumr		= $("#tmpnumr").val();
	var strurl		= "/event/coupon/XML.asp";
	var CHK			= "RouletteCheck";
	jQuery.ajax({
		type: "post",
		url : strurl,
		dataType : 'json',
		data: {CHK:CHK,tmpnumr:tmpnumr},
		success:function(data){

			if (data._resyntype == 'N') {
				//$("#Guidance").show();
				RouletteSend();
			} else if (data._resyntype == 'Y') {
				alert('이미 참여한 내역이 있습니다.');
				return;
			} else {
				alert('파라미터오류! 페이지를 새로고침해주시기 바랍니다');
				return;
			}

		},
		error : function(err) {		
			alert(err);			
		}
	});
}

function RouletteSend(){
	var tmpnumr		= $("#tmpnumr").val();
	var tmppay		= $("#tmppay").val();

	var strurl	= "/event/coupon/XML.asp";
	var CHK		= "RouletteSend";
	jQuery.ajax({
		type: "post",
		url : strurl,
		data: {CHK:CHK,tmppay:tmppay,tmpnumr:tmpnumr},
		success:function(data){
			//alert("금액할인쿠폰등록이 처리되었습니다.");
			var Rouletteche = confirm("그랜드 하얏트 제주 쿠폰 1장이 발급되었습니다. 해당 상품을 살펴보시겠습니까?");
			if(Rouletteche == true){
			  StayEvent('HPj2CPIg');
			} else if(Rouletteche == false){
			  return;
			}
		},
		error : function(err) {
			if (Master==1)
			{
				alert(err);
			}
		}
	});
}

