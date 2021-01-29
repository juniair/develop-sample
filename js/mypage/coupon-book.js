$(function () {
    
    let $tabHeader = $(".btn_tab_header__click_js");
    $tabHeader.click(e => {
        let $this = $(e.target)
        let targetTabName = $this.attr("data-tab-name");

        $tabHeader.each((index, element) => {
            
            let tabName = null
            if(Object.hasOwnProperty.call(element.dataset, "tabName")) {
                tabName = element.dataset["tabName"];
            }

            if(tabName == null) {
                return true;
            }

            let parentElement = element.parentElement;
            if(targetTabName != tabName) {
                parentElement.classList.remove("active");
            } else {
                parentElement.classList.add("active")
            }
        });


        let tabDetailElements = document.getElementsByClassName("tab-detail");
        for (const element of tabDetailElements) {
            let tabName = null 
            if(Object.hasOwnProperty.call(element.dataset, "tabName")) {
                tabName = element.dataset["tabName"];
            }

            if(tabName == null) {
                continue;
            }

            if(targetTabName != tabName) {
                element.classList.remove("active");
            } else {
                element.classList.add("active");
            }
        }

        window.scrollTo(0,0);
    });
});