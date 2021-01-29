$(function () {
    const FORBIDDEN = 403;
    const NOT_FOUND = 404
    const INTERAL_SERVER = 500;

    function btnCreateFeesEventHendler() {
        $.ajax({
            type: "POST",
            url: "/api/fees/default.asp",
            success: function (response) {
                let message = response.message
                let errorCode = response.errorCode
                switch (errorCode) {
                    case FORBIDDEN:
                        if (confirm(message)) {
                            location.href = "/mypage"
                        }
                        break;
                    case NOT_FOUND:
                        alert(message);
                        break
                    case INTERAL_SERVER:
                        alert(message);
                        break;
                    default:
                        {
                            alert(message);
                        }
                        break;
                }
            },
            error: function (xhr) {
                try {
                    let statusCode = xhr.status;
                    let message = xhr.responseJSON.message;
                    
                } catch (error) {

                }
            }
        });
    }

    $(".btn_request_profits_js").click(btnCreateFeesEventHendler)
});