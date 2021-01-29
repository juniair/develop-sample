$(function() {
    function tabCahngeEventHandler(target,...others) {
        return (e) => {
            let $targetHeader = $(`.tab-header.${target}`);
            $targetHeader.addClass("on");

            let $targetContent = $(`.tab-content.${target}`);
            $targetContent.addClass("on");
            for(const other of others) {
                let $otheHeader = $(`.tab-header.${other}`);
                $otheHeader.removeClass("on");

                let $otherContent = $(`.tab-content.${other}`);
                $otherContent.removeClass("on");
            }


        }
    }
    $(".btn_event_js.event_during").click(tabCahngeEventHandler("event_during", "event_end"));
    $(".btn_event_js.event_end").click(tabCahngeEventHandler("event_end", "event_during"));
});