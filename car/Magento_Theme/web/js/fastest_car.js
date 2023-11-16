(function (factory) {
    if (typeof define === "function" && define.amd) {
        define([
            "jquery","cdz_slider",'domReady!'
        ], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
	"use strict";
	$.widget('custom.FastedHandbag', {
		options: {
		},
		_create: function(){
			var self = this;
			/*if($('.bestseller-product').length > 0){
				$('.bestseller-product .product-items').each(function(id,el){
					var $ele = $(this);
					self._mobileSlider($ele);
					$(window).resize(function(){
						setTimeout(function(){
							self._mobileSlider($ele);
						},300);
					});
				});
			}*/
			$('.block-products-list').bind('contentUpdated',function(){
				self._sameHeightItems();
				$(this).find('.ajax-item .show-tooltip' ).tooltip({
					position: {
					  my: "center top-80%",
					  at: "center top",
					  using: function( position, feedback ) {
					    $( this ).css( position );
					    $(this).addClass("cdz-tooltip");
					  }
					}
		    			});
				$(this).find('.ajax-item').removeClass('ajax-item');
			});
			this._backTopButton();
			this._sameHeightItems();
			this._resize();
		},

		_backTopButton: function(){
			var $backTop = $('#back-top');
			if($backTop.length){
				$backTop.hide();
				$(window).scroll(function() {
					if ($(this).scrollTop() > 100) {
						$backTop.fadeIn();
					} else {
						$backTop.fadeOut();
					}
				});
				$('a', $backTop).click(function() {
					$('body,html').animate({
						scrollTop: 0
					}, 800);
					return false;
				});
			}
		},
		/*
		_mobileSlider: function($container){
			//setTimeout(function(){
				var wWidth = $(window).width();
				if(wWidth <= 767){
					$container.addClass('owl-carousel');
					$container.owlCarousel({
						loop: true,
						margin: 0,
						responsiveClass: true,
						nav: true,
						dots: false,
						responsive:{
							0:{items: 	1},
							320:{items:	1},
							360:{items:	2},
							768:{items:	2},
							980:{items:	7},
							1200:{items: 7}
						}
					});
				}else{
					if($container.hasClass('owl-carousel')){
						$container.data('owl.carousel').destroy();
						$container.removeClass('owl-carousel owl-loaded');
						$container.find('.owl-stage-outer').children().unwrap();
						$container.removeData();
					}
				}
			//},300);
		},*/
		_sameHeightItems: function(){
			var maxHeight = 0;
			if($('.same-height').length > 0){
				$('.same-height').each(function(){
					var $ul = $(this);
					//setTimeout(function () {
						$ul.find('.product-item-details').removeAttr('style');
						$ul.find('.product-item-details').each(function()
						{
							if($(this).height() > maxHeight){
								maxHeight = $(this).height();
							}
						});
						$ul.find('.product-item-details').height(maxHeight);
					//},100);
				});
			}
		},
		_resize: function () {
			var self = this;
			$(window).resize(function () {
				if(typeof timeResize != 'undefined'){
			        clearTimeout(timeResize);
			    }
			    var timeResize = setTimeout(function(){
					self._sameHeightItems();
			    },250);
			});
		}


	});
	return $.custom.FastedHandbag;
}));
