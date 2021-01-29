$(function () {
    function tabCahngeEventHandler(target, ...others) {
            return (e) => {
                let $targetHeader = $(`.tab-header.${target}`);
                $targetHeader.addClass("on");

                let $targetContent = $(`.tab-content.${target}`);
                $targetContent.addClass("on");
                for (const other of others) {
                    let $otheHeader = $(`.tab-header.${other}`);
                    $otheHeader.removeClass("on");

                    let $otherContent = $(`.tab-content.${other}`);
                    $otherContent.removeClass("on");
                }

                
            }
    }

    

    function removeCheckedItemEventHandler(target) {
        return (e) => {
            let $selectors = document.querySelectorAll(`input[name=favorite_item]:checked.${target}`)
            let removeItems = Array.from($selectors, (el) => el.value);
            
            if(removeItems.length === 0) {
                alert("삭제 할 찜 목록은 선택해주세요.");
                return false;
            }

            let requestData = {
                removeItems: removeItems.join()
            }
            
            
            $.ajax({
                type: "POST",
                url: "/api/favorite/remove.asp",
                data: requestData,
                success: function (response) {
                    alert("선택하신 찜 상품을 삭제 했습니다.")
                    itemListUpdate(target, removeItems);
                }
            });
        }
    }

    function itemListUpdate(target, removeItems) {
        console.log(removeItems);
        for (const removeItem of removeItems) {
            let $item = $(`.favorite_item.${target}[data-favorite-id=${removeItem}]`);
            let favoriteId = $item.attr("data-favorite-id");
            
            if(favoriteId === removeItem) {
                $item.remove();
            }
        }

        let $items = $(`.favorite_item.${target}`);
        let $itemsAllCheckContainer = $(`.all_check_content.${target}`);
        let $itemContainer = $(`.favorite_items.${target}`)
        let $emptyContainer = $(`.empty-content.${target}`);
        if($items.length === 0) {
            $itemsAllCheckContainer.remove();
            $itemContainer.remove();
            $emptyContainer.addClass("on")
        }
    }

    function checkAllChangeEventHandler(target) {
        return (e) => {
            let $checkBox = $(`input[name=${target}_favorite_item_all].${target}`);
            let isChecked = $checkBox.prop("checked");
            $(`input[name=favorite_item].${target}`).each(function (index, element) {
                // element == this
                element.checked = isChecked;
            });
        }
    }
    function updateCheckAll(target) {
        return (e) => {
                let $checkBox = $(`input[name=${target}_favorite_item_all].${target}`);
                let isAllChecked = true;
                $(`input[name=favorite_item].${target}`).each(function (index, element) {
                        // element == this
                        if(!element.checked) {
                            isAllChecked = false;
                            return false;
                        }
                });

                $checkBox.prop("checked", isAllChecked);
            };
    }


    $(".btn_favorite_js.product").click(tabCahngeEventHandler("product", "around"));
    $(".btn_favorite_js.around").click(tabCahngeEventHandler("around", "product"));
    $(".chk_all_js.product").change(checkAllChangeEventHandler("product"));
    $(".chk_item_js.product").change(updateCheckAll("product"))

    $(".chk_all_js.around").change(checkAllChangeEventHandler("around"));
    $(".chk_item_js.around").change(updateCheckAll("around"));

    $(".btn_remove_js.product").click(removeCheckedItemEventHandler("product"));
    $(".btn_remove_js.around").click(removeCheckedItemEventHandler("around"));
});