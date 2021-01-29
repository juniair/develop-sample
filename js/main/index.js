$(function () {
    new Swiper('.wrap_banner.swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: 'custom',
            renderCustom: function (swiper, current, total) {
              return `${current}/${total}`;
          }
        }
    });

    new Swiper('.container.swiper-container', {
        slidesPerView: 'auto',
        direction:'vertical',
        simulateTouch:false,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
    });


    // 최근 본 상품 swiper
    try {
        let recentySwiper = new Swiper('.swiper-container.recently', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            loop: false,
            // Disable preloading of all images
            preloadImages: false,
            // Enable lazy loading
            lazy: {
                loadPrevNext:true
            }
        });
    } catch (error) {
    }

    $(".btn_more_js").click(() => {
        $('.total_search_section').addClass("on");
    })

});