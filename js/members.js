

$(function () {



    const questionBunttionClick = function () { 

        $('.modalWindow').fadeIn();
        $('.modalWindow .helpCTMembers').fadeIn();
     }

    $('.btnQustion02').on('click', questionBunttionClick);

    $('.close').on('click', function () { 
        $('.modalWindow').fadeOut();
        $('.modalWindow .helpCTMembers').fadeOut();
    });

    let hasNotId = () => $("#userId").val() == "";
    let hasNotPw = () => $("#userPwd").val() == "";

    let loginChecker = () => {
        if(hasNotId()) {
            alert("아이디를 입력해주세요.");
            $("#userId").focus();
            return false;
        }
        else if(hasNotPw()) {
            alert("비밀번호를 입력해주세요.");
            $("#userPwd").focus();
            return false;
        } else {

        }

        return true;
    }

    $txtUserId = $("#userId");
    $txtUserId.keydown((e) => {
        let keyCode = e.keyCode;
        if(keyCode == 13) {
            loginChecker();
        }
    });
    $txtPw = $("#userPwd");
    $txtPw.keydown((e) => {
        let keyCode = e.keyCode;
        if(keyCode == 13 && hasNotPw()) {
            loginChecker();
        }
    });
    let $btnSignIn = $(".btn_sign_in_js");
    $btnSignIn.click(e => {
        let isSignable = loginChecker();

        if(isSignable) {

            // Define request data.
            let userId = $("#userId").val();
            let userPwd = $("#userPwd").val();
            let procFlag = $("#procFlag").val();
            let loginFlag = $("#login_ck_cb").is(":checked") ? 1 : 0;
            let requestData = {
                userId,
                userPwd,
                procFlag,
                loginFlag
            };
            
            // Request sign in
            $.ajax({
                type: "POST",
                url: "/member/loginChk.asp",
                data: requestData,
                success: function (response) {
                    location.href = "/"
                },
                error: function (xmlHttpResponse) { 
                    let httpStatusCode = xmlHttpResponse.status;
                    switch (httpStatusCode) {
                        case 403:
                            alert("※승인 대기 중 입니다.");
                            break;
                        case 404:
                        default:
                            alert("※아이디와 비밀번호가 일치하지 않습니다.");
                            break;
                    }
                }
            });
        }
    });    
});
