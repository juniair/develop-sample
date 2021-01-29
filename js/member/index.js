$(function () {
    $(".btn_more").on("click", function() {
        $("#joinCom").css("display", "block");
    })
    $(".btn_close").on("click",function() {
        $("#joinCom").css("display", "")
    })

    $(".btn_next").on("click", function() {
        if(confirm('추가정보를 다음에 기입하시겠습니까?'))
        {
            location.href='/member/joinComplete.asp';
        }
    })
    function getFile($file) {
        let file = null
        if(window.FileReader) {
            if($file[0].files.length > 0) {
                file = $file[0].files[0];
            }
        } else {
            file = $file.val();
        }

        return file;
    }

    function getFileName($file) {
        let fileName = null;
        if(window.FileReader) {
            if($file[0].files.length > 0) {
                fileName = $file[0].files[0].name;
            }
            
        } else {
            fileName = $file.val().split('/').pop().split('\\').pop();
        }

        return fileName;
    }

    let $fileUploder = $("input[type=file]");
    $fileUploder.on("change", function() {
        $this = $(this);
        
        let fileName = getFileName($this);

        let $filaNameLabel = $this.siblings(".upload_name");
        $filaNameLabel.val(fileName);

    });

    let btnConfirm = $(".btn_confirm");
    btnConfirm.on("click", function() {

        let $bankBookFile = $("#bankBook");
        let bankBookFile = getFile($bankBookFile)

        if(!bankBookFile) {
            alert("통장 사본을 등록해주시길 바랍니다.");
            return;
        }

        let $idCardFile = $("#idCard");
        let idCardFile = getFile($idCardFile)

        if(!idCardFile) {
            alert("주민등록 사본을 등록해주시길 바랍니다.");
            return;
        }
        let staff_No = $("input[name=staff_No]").val();
        let agent_no = $("input[name=agent_no]").val();
        
        
        let formData = new FormData();
        formData.append("agent_file1", bankBookFile);
        formData.append("agent_file2", idCardFile);
        formData.append("staff_no", staff_No);
        formData.append("agent_no", agent_no);
        
        $.ajax({
            type: "PUT",
            url: "/api/member/default.asp",
            data: formData,
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
            cache: false,
            success: function (response) {
                alert("등록이 완료 되었습니다.");
                location.href = "/member/joinComplete.asp"
            },
            error: function(error) {
                alert("error");
                console.error(error);
                
            }
        });
    })
});

