$(function () {
  var count = 0
    let swiper = new Swiper(".product_detail_container.swiper-container", {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        zoom:false,
        autoplay: {
          // 자동 재생
          delay: 2000 // 딜레이 0
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
    $(".swiper-wrapper").each(function (index, element) {
      let $element = $(element)
      let $slide = $element.find(".swiper-slide");
      let items = [].slice.call($slide).select((el) => el.querySelector("a"));
      let firstItemSrc = items.select(el => el.querySelector("img").src).firstOrDefault();
      let isAllSameItem = items.select(el => el.querySelector("img").src).all(src => src == firstItemSrc);
      
  
  
      if(isAllSameItem) {
        let target = null
        if(typeof swiper === "object") {
          target = swiper;
        } else {
          target = swiper.skip(index).firstOrDefault();
        }
        
        
        let hasImg = items.select(el => el.dataset.hasimage.toLowerCase() == "true")
                              .all(item => item);
        if(!hasImg) {
          // target.params.loop = false;
          // target.params.pagination = null;
          // target.pagination.update();
        }
        target.autoplay.stop();
      }
    });
});