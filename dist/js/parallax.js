/***********************************************************\
|* Website: https://www.djordjejocic.com                   *|
|* Author: Djordje Jocic <office@djordjejocic.com>         *|
|* License: MIT License (MIT)                              *|
|* ------------------------------------------------------- *|
|* Permission is hereby granted, free of charge, to any    *|
|* person obtaining a copy of this software and associated *|
|* documentation files (the "Software"), to deal in the    *|
|* Software  without restriction, including without        *|
|* limitation the rights to use, copy, modify, merge,      *|
|* publish, distribute, sublicense, and/or sell copies of  *|
|* the Software, and to permit persons to whom the         *|
|* Software is furnished to do so, subject to the          *|
|* following conditions:                                   *|
|* ------------------------------------------------------- *|
|* The above copyright notice and this permission notice   *|
|* shall be included in all copies or substantial portions *|
|* of the Software.                                        *|
|* ------------------------------------------------------- *|
|* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT  WARRANTY OF  *|
|* ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED *|
|* TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A     *|
|* PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT     *|
|* SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR    *|
|* ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN    *|
|* ACTION OF CONTRACT, TORT OR OTHERWISE, RISING FROM, OUT *|
|* OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR     *|
|* OTHER DEALINGS IN THE SOFTWARE.                         *|
|* ------------------------------------------------------- *|
|* Copyright (C) 2018                                      *|
\***********************************************************/

// Parallax Logic.

function ParallaxRenderer() {
    
    this.render = function(position, element, settings) {
        
        if (!settings.parallaxInit) {
            return;
        }
        
        var ratio = this.calculateParallaxRatio(position, settings.start, settings.end);
        
        position -= element.offset().top;
        
        var newPos = - Math.floor(ratio * settings.offset);
        var bgPos  = this.parsePosition(element.css("background-position"));
        
        bgPos.left += "px";
        bgPos.top  = newPos + "px";
        
        element.css("background-position", bgPos.left + " " + bgPos.top);
        
    };
    
    this.parseLocation = function(value) {
        
        return value.trim().replace(/^((url\()+(`|'|"))/, "").replace(/((`|'|")+(\)))$/, "");
        
    };
    
    this.parsePosition = function(value) {
        
        var parsedValue = {
            left : 0,
            top : 0
        };
        
        value = value.replace(/[^0-9\s]/g, "").trim().split(" ", 2);
        
        parsedValue.left = value[0];
        parsedValue.top  = value[1];
        
        return parsedValue;
        
    };
    
    this.clamp = function(value, minValue, maxValue) {
        
        return (value < minValue) ? minValue : (value > maxValue) ? maxValue : value;
        
    };
    
    this.calculateOffset = function(image, element) {
        
        if (element.height >= image.height) {
            
            return 0;
            
        }
        else {
            
            var imgRatio  = element.width() / image.width;
            var imageHeight = Math.floor(image.height * imgRatio);
            
            return imageHeight - element.height();
            
        }
        
    };
    
    this.calculateParallaxRatio = function(position, start, end) {
        
        start = start < 0 ? 0 : start;
        
        position -= start;
        end -= start;
        
        return position / end;
        
    };
    
}

// Extending JQuery.

(function($) {
    
    // Data Needed For The Library To Work.
    
    $.fn.parallaxCore = {
        scrollDefault : [
        ],
        scrollManual : [
        ],
        countDefault : 0,
        countManual : 0,
        refreshTimeout : null,
        renderer : new ParallaxRenderer()
    };
    
    // JQuery Parallax Function (Used For Initialization).
    
    $.fn.parallax = function(settings) {
        
        var element         = $(this);
        var elementSettings = $(this).data("parallaxSettings");
        
        if (typeof elementSettings === "undefined") {
            
            var image     = new Image();
            var preloader = $("<div />", { class : "parallax-preloader", style : "display: none;" });
            
            if (typeof settings === "undefined") {
                
                settings = {
                    image : null,
                    height : null,
                    billboard : true,
                    scroll : "default"
                };
                
            }
            
            settings.parallaxInit = true;
            
            image.onload = function() {
                
                preloader.remove();
                
                settings.offset = $.fn.parallaxCore.renderer.calculateOffset(image, element);
                
                element.data("parallaxSettings", settings);
                
                if (settings.scroll === "default") {
                    
                    $.fn.parallaxCore.scrollDefault.push(element);
                    $.fn.parallaxCore.countDefault ++;
                    
                }
                else if (settings.scroll === "manual") {
                    
                    $.fn.parallaxCore.scrollManual.push(element);
                    $.fn.parallaxCore.countManual ++;
                    
                }
            
            };
            
            preloader.appendTo(element);
            
            setTimeout(function() { // Don't Display The Preloader On Machines With Fast Connection.
                
                preloader.show();
                
            }, 1000);
            
            if (settings.image == null) {
                
                image.src = $.fn.parallaxCore.renderer.parseLocation(element.css("background-image"));
                
            }
            else {
                
                element.css({
                    "background-image" : "url(" + settings.image + ")",
                    "background-size" : "100% auto"
                });
                
                image.src = settings.image;
                
            }
            
            if (settings.height == null) {
                
                settings.height = element.height();
                
            }
            else {
                
                element.height(settings.height);
                
            }
            
            settings.start = element.offset().top - $(window).height();
            settings.end   = element.height() + element.offset().top;
            
        }
        
    };
    
    // JQuery Parallax Scroll Function (Used For Moving The Background).
    
    $.fn.parallaxScroll = function(scrollPosition) {
        
        var currentElement  = $(this);
        var currentSettings = $(this).data("parallaxSettings");
        
        if (!$.isEmptyObject(currentSettings)) {
            
            if (scrollPosition >= currentSettings.start && scrollPosition <= currentSettings.end) {
                
                $.fn.parallaxCore.renderer.render(scrollPosition, currentElement, currentSettings);
                
            }
            
        }
        
    };
    
    // JQuery Parallax Scroll Event.
    
    $(document).scroll(function() {
        
        var scrollPosition  = $(this).scrollTop();
        var currentElement  = null;
        var currentSettings = null;
        
        for (var i = 0; i < $.fn.parallaxCore.countDefault; i ++) {
            
            currentElement  = $.fn.parallaxCore.scrollDefault[i];
            currentSettings = $.fn.parallaxCore.scrollDefault[i].data("parallaxSettings");
            
            if (scrollPosition >= currentSettings.start && scrollPosition <= currentSettings.end) {
                
                $.fn.parallaxCore.renderer.render(scrollPosition, currentElement, currentSettings);
                
            }
            
        }
        
    });
    
    // JQuery Parallax Resize Event.
    
    $(window).resize(function() {
        
        if ($.fn.parallaxCore.refreshTimeout == null) {
            
            $.fn.parallaxCore.refreshTimeout = setTimeout(function() { // Recalculating Can Be Done Once Per Second.
                
                var currentElement  = null;
                var currentSettings = null;
                
                for (var i = 0; i < $.fn.parallaxCore.countDefault; i ++) {
                    
                    currentElement  = $.fn.parallaxCore.scrollDefault[i];
                    currentSettings = $.fn.parallaxCore.scrollDefault[i].data("parallaxSettings");
                    
                    currentSettings.start = currentElement.offset().top - $(window).height();
                    
                    $.fn.parallaxCore.scrollDefault[i].data("parallaxSettings", currentSettings);
                }
                
                for (var i = 0; i < $.fn.parallaxCore.countManual; i ++) {
                    
                    currentElement  = $.fn.parallaxCore.scrollManual[i];
                    currentSettings = $.fn.parallaxCore.scrollManual[i].data("parallaxSettings");
                    
                    currentSettings.start = currentElement.offset().top - $(window).height();
                    
                    $.fn.parallaxCore.scrollManual[i].data("parallaxSettings", currentSettings);
                }
                
                $.fn.parallaxCore.refreshTimeout = null;
                
            }, 1000);
            
        }
        
    });
    
}(jQuery));
