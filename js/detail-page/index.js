$(function () {
    let $sections = $(".section_summay_js");
    let scrollY = 0;
    $sections.each((index, el) => {
        let h = $(el).height();
        scrollY += h;
    });

    window.scroll(0, scrollY);
    
});
