$(function() {
  let swiper = new Swiper(".product_detail_container.swiper-container", {
      spaceBetween: 0,
      slidesPerView: 1,
      loop: true,
      zoom:false,
      autoplay: {
        // 자동 재생
        delay: 3500 // 딜레이 0
      },
      speed: 500, // 슬라이드 속도 2초
      pagination: {
        el: ".product_image_pagination.swiper-pagination",
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return `${current}/${total}`;
      }
    }
  });
  $(".product_detail_container .swiper-wrapper").each(function (index, element) {
    let $element = $(element)
    let $slide = $element.find(".swiper-slide");
    let items = [].slice.call($slide).select((el) => el.querySelector("a"));
    let firstItemSrc = items.select(el => el.querySelector("img").src).firstOrDefault();
    let isAllSameItem = items.select(el => el.querySelector("img").src).all(src => src == firstItemSrc);



    if(isAllSameItem) {
      let target = [].slice.call(swiper).skip(index).firstOrDefault();
      if(!Array.isArray(swiper)) {
        target = swiper;
      }
      target.autoplay.stop();
    }
  });

  $(".reserve_container.swiper-container").each((index, element) => {
    let $element = $(element)
    let $slide = $element.find(".swiper-slide");
    let items = [].slice.call($slide).select((el) => el.querySelector("a"));
    let firstItemSrc = items.select(el => el.querySelector("img").src).firstOrDefault();
    let isAllSameItem = items.select(el => el.querySelector("img").src).all(src => src == firstItemSrc);

    let reservePseq = $element.attr("data-pseq");
    let reserveOseq = $element.attr("data-oseq");
    let targetSelector = `${reservePseq}_${reserveOseq}`
    let swiper2 = new Swiper(`#reserveContainer_${targetSelector}.reserve_container.swiper-container`, {
                              spaceBetween: 0,
                              slidesPerView: 1,
                              loop: !isAllSameItem,
                              zoom:false,
                              autoplay: {
                                // 자동 재생
                                delay: 3500 // 딜레이 0
                              },
                              speed: 500, // 슬라이드 속도 2초
                              pagination: {
                                el: `#reservePagination_${targetSelector}.reserve_pagination.swiper-pagination`,
                                type: 'custom',
                                renderCustom: function (swiper, current, total) {
                                  return `${current}/${total}`;
                              }
                            }
                          });
    console.log(swiper2)
  })

  $(".tabsSection ul.tabs li").click(function() {
    var tab_id = $(this).attr("data-tab");

    $(".tabsSection ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });

  $(".detail_section button").on("click", function() {
    let $wrap_ctt = $(this).closest(".wrap_ctt");
    let roomInfoText = $wrap_ctt.find(".roomInfo").html().replace("&nbsp;", "");
    let roomName = $wrap_ctt.find("p > em").text();

    let $modal = $(".modal");
    $modal.find(".modal_search_style .modal_search_body p").text(roomName);
    $modal.find(".modal_search_style .modal_search_body .room_info_section").append(roomInfoText);
    $modal.addClass("on");
    $modal.find(".modal_search_style").addClass("on");
  });
  $(".btn_close").on("click", function() {
    $(".modal .modal_search_style .modal_search_body .room_info_section").empty();
    let $modal = $(".modal");
    $modal.removeClass("on");
    $modal.find(".modal_search_style").removeClass("on");
  })
});
