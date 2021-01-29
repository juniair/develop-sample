/**
 * File : join.js
 * Date : 2020-08-25
 * Author : Kim kyeng jun
 * Email : juniair.develop@gmail.com
 * Description : 회원 가입 관련 로직 정보 파일
 */
$(function () {

    let passwordRegexCheck = (value) => {
        let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;?@\[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;?@\[\\\]^_`{|}~]{8,20}$/
        return regex.test(value);
    };

    let emailRegexCheck = value => {
        let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return regex.test(value);
    }

    let isCompareValue = (x, y) => x === y;
    let isPhoneNumber = (phoneNumber) => {
        let regex = /(010|011|016|017|018|019)([0-9]{3,4})([0-9]{4})/;
        return regex.test(phoneNumber);
    };

    let isStringNullOrWhiteSpace = (value) => {
        if(!(typeof value === "string" || value instanceof String || value === null)) {
            throw new TypeError(`${value} is not string type`)
        }

        if(value === null) {
            return true;
        }

        let checkValue = value.replace(" ", "");
        return (checkValue.length === 0 || !checkValue.trim());
    }

    let getDefaultUserInfo = () => {
        let $txtUserName = $("#joinName");
        let $txtUserPhone = $("#joinHp");
        let $txtUserId = $("#joinId");
        let $txtPwd = $("#joinPwd");
        let $txtEmailPrefix = $("#joinEmail");
        let $txtEmailPosfix = $("#joinEmailDomain");
        let $txtRecomUser = $("#recomUser");
        
        let $cbUserGender = $("#cb_gender");
        let $cbUserRegion = $("#cb_region");

        let userName = $txtUserName.val();
        let userPhone = $txtUserPhone.val();
        let userId = $txtUserId.val();
        let userPwd = $txtPwd.val();
        let emailPrefix = $txtEmailPrefix.val();
        let emailPosfix = $txtEmailPosfix.val();
        let recomUser = $txtRecomUser.val();
        let userGender = $cbUserGender.val();
        let userRegion = $cbUserRegion.val();

        return {
            userName,
            userPhone,
            userId,
            userPwd,
            recomUser,
            email:`${emailPrefix}@${emailPosfix}`,
            userGender,
            userRegion,
        }
    };

    let getUserInfomation = () =>{
        
        let $chkSmsmSertFlag = $("#smsSertFlag");
        let $chkId = $("#idChk");
        let $chkAgree = $("input:checkbox[id='agreeAll']");
        let $chkAuth = $('#authChk');
        let $confirmPwd = $("input[name=joinPwdCompare]");
        let $agentCi = $('#agent_ci');
        let $agentDi = $('#agent_di');

        let isSmsChecked = $chkSmsmSertFlag.val() == "1" ? true : false;
        let isIdChecked = $chkId.val() === "1" ? true : false;
        let isAgree = $chkAgree.is(":checked");
        let isAuthChecked = $chkAuth.val() == "1"
        let confirmPwd = $confirmPwd.val();
        let agentCi = $agentCi.val();
        let agentDi = $agentDi.val();

        let defaultUserData = getDefaultUserInfo();
        return {
            userName: defaultUserData.userName,
            userPhone: defaultUserData.userPhone,
            userId: defaultUserData.userId,
            userPwd: defaultUserData.userPwd,
            recomUser: defaultUserData.recomUser,
            email: defaultUserData.email,
            userGender: defaultUserData.userGender,
            userRegion: defaultUserData.userRegion,
            isSmsChecked,
            confirmPwd,
            isIdChecked,
            isAgree,
            isAuthChecked,
            ci:agentCi,
            di:agentDi
        }
    }

    let checkingUserInfomation = (userData) => {
        
        

        if(!userData.isAuthChecked || !userData.ci) {
            alert("본인인증을 해주세요.");
            return false;
        }

        if(isStringNullOrWhiteSpace(userData.userName)) {
            $("#joinName").focus();
            alert("이름을 입력하세요.");
            return false;
        }

        if(!isPhoneNumber(userData.userPhone)) {
            $("#joinHp").focus();
            alert("핸드폰번호를 입력하세요.");
            return false;
        }

        if(isStringNullOrWhiteSpace(userData.userId)) {
            $("#joinId").focus();
            alert("아이디를 입력하세요.");
            return false;
        }
        
        if(!userData.isIdChecked){
            alert('아이디 중복확인이 필요합니다.');
            $("#idChk").focus();
            return false;		
        }

        let isPassword = passwordRegexCheck(userData.userPwd);
        if(!isPassword) {
            alert('비밀번호는 8~20자의 영문자, 숫자, 특수문자를 사용해야 합니다.');
            $("#joinPwd").focus();
            return false;
        }

        if(isStringNullOrWhiteSpace(userData.confirmPwd)) {
            alert('비밀번호 확인을 입력해주세요.');
            $("input[name=joinPwdCompare]").focus();
            return false;
        }

        if(!isCompareValue(userData.userPwd, userData.confirmPwd)) {
            alert('비밀번호가 일치하지 않습니다.');
            $("#joinPwd").focus();
            return false;
        }

        if(isStringNullOrWhiteSpace(userData.email)){
            alert("이메일을 입력하세요.");
            $("#joinEmail").focus();
            return false;
        }
    
        
        if(!emailRegexCheck(userData.email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            $("#joinEmail").focus();
            return false;
        }

        if(!userData.userRegion) {
            alert('지역을 선택해주세요.')
            $('select').focus();
            return false;
        }

        if(!userData.isAgree) {
            alert('약관 동의에 체크해주세요.');
            return false;
        }

        return true;
    };

    let $btnNext = $(".btn_next_js");
    $btnNext.click((e) => {

        let userData = getUserInfomation();

        let canNext = checkingUserInfomation(userData);
        if(!canNext) return;

        $(".frm_user").addClass("di_no");
        $(".member_report_layer").removeClass("di_no")


    }); 

    let $cboEmail = $(".cbo_join_email_domain_js");
    $cboEmail.change((e) => {
        let email = $cboEmail.val();
        let $joinEmailDomain = $("#joinEmailDomain");
		$joinEmailDomain.val(email);
		if(email !== "") {
			$joinEmailDomain.attr("readonly", true);
		} else {
            $joinEmailDomain.attr("readonly", false);
        }
    });

    let $btnAuth = $(".btn_auth_js");
    $btnAuth.click(() => {
        // TODO : 본인 인증 관련 로직을 작성하세요.
    
        let joinName = $('#joinName').val();
        let joinHp = $('#joinHp').val();
        let joinId = $('#joinId').val();
        let joinIdFake = $('#joinIdFake').val();
        let joinPwdFake = $('#joinPwdFake').val();
        let joinPwdCompare = $('#joinPwdCompare').val();
        let joinGender = $('input[type=radio]:checked').val();
        let joinRegion = $('select').val();
        let smsIdx = $('#smsIdx').val();
        let smsSertFlag = $('#smsSertFlag').val();
        let idChk = $('#idChk').val();
        let pwdSameChk = $('#pwdSameChk').val();
        let joinEmail = $('#joinEmail').val();
        let joinEmailDomain = $('#joinEmailDomain').val();
        let joinRecomId = $('#recomUser').val();
    
    
        $('#authJoinName').val(joinName);
        $('#authJoinHp').val(joinHp);
        $('#authJoinId').val(joinId);
        $('#authJoinIdFake').val(joinIdFake);
        $('#authJoinIdPwdFake').val(joinPwdFake);
        $('#authJoinPwdCompare').val(joinPwdCompare);
        $('#authJoinEmail').val(joinEmail);
        $('#authJoinGender').val(joinGender);
        $('#authJoinRegion').val(joinRegion);
        $('#authSmsSertFlag').val(smsIdx);
        $('#authSmsIdx').val(smsSertFlag);
        $('#authIdChk').val(idChk);
        $('#authPwdSameChk').val(pwdSameChk);
        $('#authJoinRecomId').val(joinRecomId);
        $("#authJoinEmailDomain").val(joinEmailDomain);
        
    
        $('#authJoin').submit();
    });

    let $btnIdCheck = $(".btn_id_check_js");
    $btnIdCheck.click(function (){
        if($("#joinId").val() == ""){
            $("#joinId").focus();
            alert("아이디를 입력하세요.");
            return false;
        }
    
        jQuery.ajax({
            type: "post",
            url : "/member/idChk.asp",
            data: {id:$("#joinId").val()},
            success:function(data){
                if(data == "Y"){
                    alert("사용가능한 아이디입니다.");
                    $("#idChk").val("1");
                }
                else{
                    alert("사용 불가 아이디입니다.");
                    $("#idChk").val("0");
                }
            }
        });	
        
    });


    



    // 설문지 로직

	let isReportAllChecked = function() {
		let $checkedOpt = $(".opt_value_js:checked");

		let checkedOptCount = $checkedOpt.length;
		
		return checkedOptCount === 4;
	};

	let buttonStateChange = function() {
		
		if(isReportAllChecked()) {
			$btnJoin.removeClass("btn_disabled");
		} else {
			$btnJoin.addClass("btn_disabled");
		}
	}

	let optStateChengeCallback = () => buttonStateChange();

	let $optValues = $(".opt_value_js");
    $optValues.change(optStateChengeCallback);
    

    function isIE(){
		let ua = window.navigator.userAgent;
	
		return ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0
	}

	let oldvalue = ""
	let reportTxtChangeCallback = function(event) {
		
		let $target = $(this);
		
		let text = "";

		if(event.type == "paste") {
			if(isIE()) {
				text = window.clipboardData.getData('text');
			} else {
				text = event.originalEvent.clipboardData.getData('text/plain');
			}
		} else {
			text = $target.val();
			
		}

		if(oldvalue == text) {
			return;
		} else {
			oldvalue = text;
			let textLength = text.length;
		
			let $displayMinCounter = $(".txt_min");
			$displayMinCounter.text(textLength);
			
		}
	};

	let $txtRequest = $(".txt_request");

	$txtRequest.on({
		keypress:reportTxtChangeCallback,
		keyup:reportTxtChangeCallback,
		paste:reportTxtChangeCallback
    });
    
    let $btnJoin = $(".btn_join_js");
	let joinCallback = function() {
		let isDisabled = $btnJoin.hasClass("btn_disabled");

        if(isDisabled) return;

        let userData = getUserInfomation();

        let canNext = checkingUserInfomation(userData);
        if(!canNext) {
            let $reportLayer = $(".member_report_layer");
            let $userInfoLayer = $(".frm_user");
            if(!$reportLayer.hasClass("di_no")) {
                $reportLayer.addClass("di_no");
                $userInfoLayer.removeClass("di_no");
                scrollY(0);
                return ;
            }
        };


        let $checkedValues = $(".opt_value_js:checked");
        $checkedValues.each(function (index, el) { 
             let tagName = el.name;
             let value = el.value;
             switch (tagName.toLowerCase()) {
                case "opt_age":
                    userData.question1 = value;
                    break;
                case "opt_path":
                    userData.question2 = value;
                    break;
                case "opt_reason":
                    userData.question3 = value;
                    break;
                case "opt_style":
                    userData.question4 = value;
                    break;
                default:
                    break;
            }
        });

        let $txtRequest = $(".txt_request")
        userData.question5 = $txtRequest.val();

		if(200 < userData.question5.length) {
			alert("200자 이내로 작성해주세요.");
			return;
		}

		let requestData = {
            joinName: userData.userName,
            joinHp: userData.userPhone,
            joinId: userData.userId,
            joinPwd: userData.userPwd,
            joinEmail: userData.email,
            joinGender: userData.userGender,
            joinRegion: userData.userRegion,
            recomUser: userData.recomUser,
            question1: userData.question1,
            question2: userData.question2,
            question3: userData.question3,
            question4: userData.question4,
            question5: userData.question5,
        };
        

		jQuery.ajax({
            type: "post",
            url : "/api/member/default.asp",
            data: requestData,
            success:function(data){
                let isVip = data.isVip;
    
                let registerLink = "/member/addMemberInfo.asp?name=" + requestData.joinName
                let complateLink = "/member/joinComplete.asp"
    
                if(isVip) {
                    location.href = registerLink;
                } else {
                    location.href = complateLink;
                }			
            },
            error: function(response, status, errorThrown){
                let msg = response.errorMsg;
                alert(msg);
            }
        });	
	};
	$btnJoin.click(joinCallback);

});


// 본인인증 버튼 클릭


// 본인 인증 완료후 텍스트 표기
// isAuth : 인정처리 여부 확인(true : 인증 완료, false: 인증 실패)
function joinAuthDisplay(isAuth) {
    if(isAuth) {
        $('#joinAuth').css("display", "");
        $('#authChk').val("1");
    }
}



function smsSend(flag){

    $("#joinSmsReSend").css("visibility", "hidden");
    var joinHp = $("#joinHp").val();
    var hpParttern = /(010|011|016|017|018|019)([0-9]{3,4})([0-9]{4})/
    if(hpParttern.test(joinHp)){
        $("#joinHp").focus();
        alert("핸드폰번호를 입력하세요.");
        return false;
    }

    if(flag == "S" && $("#sertNumber").val() == ""){
        $("#sertNumber").focus();
        alert("인증번호를 입력하세요.");
        return false;		
    }

    var smsIdx = $("#smsIdx").val()
    var sertNumber = $("#sertNumber").val()
    jQuery.ajax({
        type: "post",
        url : "/member/sndSms.asp",
        data: {flag:flag, idxId:"<%=idxId%>", joinHp:joinHp, smsIdx:smsIdx, sertNumber:sertNumber},
        success:function(data){
            if(data.split(":")[0] == "Y" && flag == "J"){
                $("#joinSmsSend").hide();
                $("#smsIdx").val(data.split(":")[1]);
                $("#smsSndMsg").css("visibility", "visible");
                startTimer();
            }
            else if(data.split(":")[0] == "Y" && flag == "S"){
                $("#joinHp").prop("readonly", true);
                $("#sertChkSpan").hide();
                $("#smsSndMsg").html("휴대폰 인증이 완료되었습니다.");
                $("#joinSmsReSend").css("visibility", "hidden");
                $("#smsSertFlag").val("1");
                clearInterval(timerID);				
            }
            else{
                alert(data.split(":")[1]);
            }			
        }
    });	
}


var timerID;
var time = 0;
function startTimer(){	
    time = 120;
    timerID = setInterval("decrementTime()", 1000);
}

function decrementTime(){
    $("#smsTimer").html(toMinSec(time));

    if(time > 0){
        time--;
    }
    else{
        clearInterval(timerID);
        $("#joinSmsReSend").css("visibility", "visible");
    }
}

function toMinSec(t) { 

    var hour;
    var min;
    var sec;

    // 정수로부터 남은 시, 분, 초 단위 계산
    hour = Math.floor(t / 3600);
    min = Math.floor( (t-(hour*3600)) / 60 );
    sec = t - (hour*3600) - (min*60);

    // hh:mm:ss 형태를 유지하기 위해 한자리 수일 때 0 추가
    if(hour < 10) hour = "0" + hour;
    if(min < 10) min = "0" + min;
    if(sec < 10) sec = "0" + sec;

    return(min + ":" + sec);
}


function fnPwdSameMsg(){
    if($("#joinPwdCompare").val() == "" || $("#joinPwd").val() == ""){
        return false;
    }

    if($("#joinPwdCompare").val() == $("#joinPwd").val()){
        $("#pwdSameChk").val("1");
        $("#pwdSameMsg").css("visibility", "visible");
        return false;
    }
    else{
        $("#pwdSameChk").val("0");
        $("#pwdSameMsg").css("visibility", "hidden");
        return false;
    }
}




function joinChk(){	


    let userName = $("#joinName").val();
    let userPhone = $("#joinHp").val();
    let isSmsCheck = $("#smsSertFlag").val() == "0" ? false : true;
    let userId = $("#joinId").val();
    let isIdCheck = $("#idChk").val() == "0" ? false : true;
    let userPw = $("#joinPwd").val();
    let isAgree = $("input:checkbox[id='agreeAll']").is(":checked");
    let recomUser = $("#recomUser").val();
    let userEmail = $("#joinEmail").val();
    let userGender = $("input[type=radio]:checked").val();
    let userRegion = $('select').val();
    let authChk = $('#authChk').val()
    
    if (!authChk) {
        alert("본인인증을 해주세요.");
        return false;
    }

    if(userName == ""){
        $("#joinName").focus();
        alert("이름을 입력하세요.");
        return false;
    }

    if(!/(010|011|016|017|018|019)([0-9]{3,4})([0-9]{4})/.test(userPhone)){
        $("#joinHp").focus();
        alert("핸드폰번호를 입력하세요.");
        return false;
    }

    // if(isSmsCheck){
    //     alert('휴대폰 인증이 필요합니다.');
    //     $("#idChk").focus();
    //     return false;		
    // }

    if(userId == ""){
        $("#joinId").focus();
        alert("아이디를 입력하세요.");
        return false;
    }

    if(!isIdCheck){
        alert('아이디 중복확인이 필요합니다.');
        $("#idChk").focus();
        return false;		
    }

    var pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;?@\[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;?@\[\\\]^_`{|}~]{8,20}$/
	// var pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})$/

	if(!pwRegex.test($("#joinPwd").val()))
    {
       alert('비밀번호는 8~20자의 영문자, 숫자, 특수문자를 사용해야 합니다.');
	   $("#joinPwd").focus();
       return false;
	}

    // if(!/^[a-zA-Z0-9]{8,20}$/.test(userPw))
    // { 
    //     alert('비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.');
    //     $("#joinPwd").focus();
    //     return false;
    // }

    var $confirmPwd = $("input[name=joinPwdCompare]")
	var confirmPwd = $confirmPwd.val()
	if(!confirmPwd) {
		alert('비밀번호 확인을 입력해주세요.');
		$confirmPwd.focus();
	}
	
	var isComparePwd = ($("#joinPwdCompare").val() == $("#joinPwd").val())
	if(!isComparePwd) {
		alert('비밀번호가 일치하지 않습니다.');
		$("#joinPwd").focus();
	}

    // var chk_num = $("#joinPwd").val().search(/[0-9]/g);
    // var chk_eng = $("#joinPwd").val().search(/[a-z]/ig);

    // if(chk_num < 0 || chk_eng < 0)
    // {
    // alert('비밀번호는 숫자와 영문자를 혼용하여야 합니다.');
    // $("#joinPwd").focus();
    // return false;
    // }

    if(!userEmail){
        alert("이메일을 입력하세요.");
        $("#joinEmail").focus();
        return false;
    }

    let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if(!emailRegex.test(userEmail)) {
        alert("이메일 형식이 올바르지 않습니다.");
        $("#joinEmail").focus();
        return false;
    }

    if(!userRegion) {
        alert('지역을 선택해주세요.')
        $('select').focus();
        return false;
    }

    if(!isAgree){
        alert('약관 동의에 체크해주세요.');
        return false;
    }
    let jsonData = {
        joinName: userName,
        joinHp: userPhone,
        joinId: userId,
        joinPwd: userPw,
        joinEmail: userEmail,
        joinGender: userGender,
        joinRegion: userRegion,
        recomUser: recomUser
    };
    jQuery.ajax({
        type: "post",
        url : "/member/joinProc.asp",
        data: jsonData,
        success:function(data){
            if(data.split(":")[0] == "Y"){
                if(recomUser) {
                    location.href = "/member/joinComplete.asp";
                } else {
                    location.href="/member/addMemberInfo.asp?name=" + userName;
                }
                
            }
            else{
                alert(data.split(":")[1]);
            }			
        }
    });	
}
