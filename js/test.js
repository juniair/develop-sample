$(document).ready(function() {
	$window = $(window);
	// 메인 페이지 사이즈 조절, modal CSS height
	var windowHeight;

	// 메인 페이지 사이즈 조절 [start]
	var pathname = document.location.pathname;

	if(pathname === "/"){
		windowHeight = $window.height();
		var headerHeight = $('.header').height();
		var footerHeight = $('.footer').height();
		var mainMenuSectionHeight = $('.main_menu_section').height();
		var mainSliderSectionHeightValue = windowHeight - (headerHeight + mainMenuSectionHeight + footerHeight);
		var mainSliderSectionDiv = $('.main_slider_section > div');
	
		mainSliderSectionDiv.css('min-height',mainSliderSectionHeightValue);

		$window.resize(function() {
			windowHeight = $window.height();

			headerHeight = $('.header').height();
			footerHeight = $('.footer').height();
			mainMenuSectionHeight = $('.main_menu_section').height();
			mainSliderSectionHeightValue = windowHeight - (headerHeight + mainMenuSectionHeight + footerHeight);
			mainSliderSectionDiv = $('.main_slider_section > div');
		
			mainSliderSectionDiv.css('min-height',mainSliderSectionHeightValue);
		})
	}
	// 메인 페이지 사이즈 조절 [end]


	
});