(function (factory) {
    if (typeof define === "function" && define.amd) {
        define([
            "jquery",
            "catalogAddToCart"
        ], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    "use strict";
    $.widget('codazon.AjaxLoad', {
        options: {
            trigger: '.cdz-ajax-trigger',
            itemsWrap: '.product-items',
            ajaxLoader: '.ajax-loader',
            ajaxUrl: null,
            jsonData: null,
            currentUrl: ''
        },
        _currentPage: 1,
        _create: function(){
            var self = this;
            self.element.find(self.options.trigger).on('click', function(){
                self._ajaxLoadProducts();
            });
        },
        _ajaxLoadProducts: function(){
            var self = this;
            var config = this.options;
            var $trigger = self.element.find(config.trigger);
            var $ajaxLoader = self.element.find(config.ajaxLoader);
            var hasLastPage = false;
            var startOffset = self.element.find('.product-item').length;
            $trigger.hide();
            $ajaxLoader.show();
            self._currentPage++;
            config.jsonData.cur_page = self._currentPage;
            config.jsonData.current_url = config.currentUrl;

            jQuery.ajax({
                url: config.ajaxUrl,
                type: "POST",
                //dataType:"json",
                data: config.jsonData,
                cache: false,
                success: function(res){
                    if(res.html)
                        var div = document.createElement('div');
                        div.innerHTML = res.html;
                        var content = $(config.itemsWrap, div);
                        $(config.itemsWrap,self.element).append(content.children());
                        $(div).remove();
                    if(res.last_page == self._currentPage){
                        hasLastPage = true;
                    }
                    self.element.find("[data-role=tocart-form], .form.map.checkout").catalogAddToCart();
                    if(typeof qsModal !== 'undefined'){
                        $('.qs-button',self.element).each(function(i,e){
                            if(i >= startOffset){
                                var $handler = $(this);
                                if(!$handler.data('quickshop')){
                                    $handler.data('quickshop',true);
                                    $handler.on('click', function(){
                                        window.qsUrl = $(this).data('href');
                                        qsModal.modal('openModal');
                                    });
                                }
                            }
                        });
                    }
                    $('body').trigger('contentUpdated');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    console.error(textStatus);
                }
            }).always(function(){
                $ajaxLoader.hide();
                if(!hasLastPage){
                    $trigger.show();
                }else{
                    self.element.find(config.trigger).hide();
                }
            });
        }
    });
    return $.codazon.AjaxLoad;
}));
