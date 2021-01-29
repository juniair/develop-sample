$(function () {
    $(".btn_detail_favorite_js").click(function() {
        let $this = $(this);
        let pseq = $this.attr("data-pseq");
        let productCode = $this.attr("data-product-code");
        let productTop = $this.attr("data-product-top");
        let productSub = $this.attr("data-product-sub");
        let type = $this.attr("data-type");
        let requestData = {
            pseq: pseq,
            productCode: productCode,
            productType: productTop,
            productSubType: productSub,
            type:type
        }
        let $favorite = $this.find(".icon_favorite");
        let isDeleting = $favorite.hasClass("icon_on");

        let url = "/api/favorite";

        if(isDeleting) {
            url = `${url}/delete.asp`;
        } else {
            url = `${url}/add.asp`;
        }

        $.ajax({
            type: "POST",
            url: url,
            data: requestData,
            success: function (response) {
                if(isDeleting) {
                    $favorite.removeClass("icon_on");
                    $favorite.addClass("icon_off");
                    alert("상품이 제거되었습니다.");
                } else {
                    $favorite.addClass("icon_on");
                    $favorite.removeClass("icon_off");
                    alert("상품이 저장되었습니다.");
                }
            },
            error: function(error){}
        });

    })


    $(".btn_around_favorite_js").click(function() {
        let $this = $(this);
        let pseq = $this.attr("data-pseq");
        let productCode = $this.attr("data-product-code");
        let productTop = $this.attr("data-product-top");
        let productSub = $this.attr("data-product-sub");
        let aroundName = $this.attr("data-around-name");
        let type = $this.attr("data-type");
        let requestData = {
            pseq: pseq,
            productCode: productCode,
            productType: productTop,
            productSubType: productSub,
            aroundName: aroundName,
            type:type
        }
        let $favorite = $this.find(".icon_favorite");
        let isDeleting = $favorite.hasClass("icon_on");

        let url = "/api/favorite";

        if(isDeleting) {
            url = `${url}/delete.asp`;
        } else {
            url = `${url}/add.asp`;
        }

        $.ajax({
            type: "POST",
            url: url,
            data: requestData,
            success: function (response) {
                if(isDeleting) {
                    $favorite.removeClass("icon_on");
                    $favorite.addClass("icon_off");
                    alert("상품이 제거되었습니다.");
                } else {
                    $favorite.addClass("icon_on");
                    $favorite.removeClass("icon_off");
                    alert("상품이 저장되었습니다.");
                }
            },
            error: function(error){
                alert("이미 저장된 상품 정보가 있습니다.")
            },
            complete:function(res) {
                $(".around_overlay_modal").toggle();
            }
        });

    })
});