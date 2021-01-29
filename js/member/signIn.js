$(function () {
    $("html, body").scrollTop(0);

    let isApp = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /APP_COUJUSEON_A|APP_COUJUSEON_I/i.test(userAgent);
    }
    let isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod|macintosh/i.test(userAgent);
    }
                                    
    // Detects if device is on iOS
    let isSafari = () => {
        return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
            navigator.userAgent &&
            navigator.userAgent.indexOf('CriOS') === -1 &&
            navigator.userAgent.indexOf('FxiOS') === -1;
    }     

    if(isApp()) {
        $(".side_menu_item.download").remove();
        $(".addition_link.google").remove();
        $(".addition_link.apple").remove();
    }

    $sideBar = $(".side_menu");
    $slideContent = $(".container .slide_content");
    $infomationContent = $(".container .infomation_content");
    $btnLoginFormToggle = $(".btn_login_form__toogle_js");
    $(".btn_side_menu__show_js").click(() => {
        $sideBar.addClass("open");
        // $("body").addClass("fixed_scroll");
    });
    $(".btn_side_menu__close_js").click(() => {
        $sideBar.removeClass("open");
        // $("body").removeClass("fixed_scroll");
    });

    $btnLoginFormToggle.click(() => {
        loginFormFocus();
    });

    $(".btn_infomation__show_js").click(() => {
        $infomationContent.toggleClass("show")
    })
    $(".btn_infomation_content__close_js").click(() => {
        $infomationContent.toggleClass("show")
    })

    let $body = $("body");
    let loginFormFocus = () => {
        // if($body.hasClass("fixed_scroll")) {
        //     $body.removeClass("fixed_scroll");
        // }
        
        
        let scrollPosY = 0
        if(!$btnLoginFormToggle.hasClass("focus")) {
            scrollPosY = $(".login_form_content_js").offset().top
        } else {
        }
        $("html, body").animate({ scrollTop: scrollPosY }, 0.2);
        setTimeout(() => {
            $btnLoginFormToggle.toggleClass("focus");
            $(".icon_slide_arrow").toggleClass("down").toggleClass("up");
        })
    }

    $(".btn_sub_menu__show_js").click(function() {
        let $this = $(this);
        let $parent = $this.parent()
        let menuType = $parent.attr("data-type");
        let isActive = $parent.hasClass("active");
        let $sideMenuElements = $(".side_menu_item_js");
        $parent.toggleClass("active");
        if(!isActive) {
            $sideMenuElements.each(function (index, element) {
            let $el = $(element);
            let elMenuType = $el.attr("data-type");
            let elHasActive = $el.hasClass("active");
            if(menuType != elMenuType && elHasActive) {
                $el.toggleClass("active")
            }
        });
        }
        
    });
    $(".btn_sign_in__focus_js").click(function () {
        let $this = $(this);
        if(!$this.hasClass("other")) {
            loginFormFocus();
            setTimeout(() => {
                $sideBar.removeClass("open");
            }, 150);
        } else {
            $sideBar.removeClass("open");
        }

        
    })

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
    let $btnSignIn = $(".btn_sign_in__click_js ");

    $(".login_form_js").on("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();
        let isSignable = loginChecker();

        if(isSignable) {

            // Define request data.
            let userId = $("#userId").val();
            let userPwd = $("#userPwd").val();
            let procFlag = "logIn";
            let isAutoLogin = $("#login_chk").prop("checked")
		    let isIdSave = $("#id_chk").prop("checked")
		    let idSaveFlag = isIdSave ? 1 : 0;
            let loginFlag = isAutoLogin ? 1 : 0;
            let requestData = {
                userId,
                userPwd,
                procFlag,
                loginFlag,
                idSaveFlag
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
    })
    
    
});