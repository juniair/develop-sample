

$(function () {
    let $tabButtons = $(".btn_tab__change_js");
    let $tabContents = $(".tab-detail")
    $tabButtons.click((e) => {
        let el = e.target;

        let targerTabName = el.dataset.tabName;
        
        $tabButtons.each((index, element) => {
            let tabName = element.dataset.tabName;
            let isActive = $(element).parent().hasClass("active")
            if(targerTabName === tabName && !isActive) {
                $(element).parent().addClass("active");
            } else if(targerTabName !== tabName && isActive) {
                $(element).parent().removeClass("active");
            }
        });

        $tabContents.each((index, element) => {
            let tabName = element.dataset.tabName;
            let isActive = $(element).hasClass("active")
            if(targerTabName === tabName && !isActive) {
                $(element).addClass("active");
                window.scrollTo(0,0);
            } else if(targerTabName !== tabName && isActive) {
                $(element).removeClass("active");
            }
        });
    })

});

