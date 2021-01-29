jQuery(document).ready(function(){

  var swiper = new Swiper('.side_menu_imgslide', {
    spaceBetween: 30,
   centeredSlides: true,
   loop: true,
   autoplay: {
     delay: 2500,
     disableOnInteraction: false,
   },
   pagination: {
     el: '.swiper-pagination',
     type: 'custom',
     renderCustom: function (swiper, current, total) {
      
      return `${current}/${total}`;
    }
   },

 });

});


