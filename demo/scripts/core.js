/***********************************************************\
|* Website: https://www.majesticode.com                    *|
|* Developer: Djordje Jocic <office@djordjejocic.com>      *|
|* ------------------------------------------------------- *|
|* Filename: core.js                                       *|
|* ------------------------------------------------------- *|
|* Copyright (C) 2018                                      *|
\***********************************************************/

/*********\
|* LOGIC *|
\*********/

$(document).ready(function() {
    
    // Enable Scroller.
    
    $(document).scroll(function() {
        
        // Core Variables.
        
        var position = $("html, body").scrollTop();
        var scroller = $("#scroller");
        
        // Logic.
        
        if (position > 100) {
            scroller.fadeIn();
        }
        else {
            scroller.fadeOut();
        }
        
    });
    
    $(document).scroll();
    
    $("#scroller").click(function() {
        
        $("html, body").stop().animate({
            scrollTop : 0
        });
        
    });
    
    // Highlight Code.
    
    $("pre.highlighter code").each(function(blockIndex, blockValue) {
        
        // Core Variables.
        
        var codeDom = $(this);
        
        // Trim Content.
        
        codeDom.text(codeDom.text().trim());
        
        // Highlight Content.
        
        hljs.highlightBlock(blockValue);
        
    });
    
    // Example 1.
    
    $("#example-1").parallax();
    
    // Example 2.
    
    $("#example-2").parallax({
        image : "./images/samples/2.jpg",
        height : "200",
        scroll : "default"
    });
    
    // Example 3.
    
    $("#example-3").parallax({
        image : "./images/samples/4.jpg",
        height : "200",
        scroll : "manual"
    });
    
    $(document).scroll(function() {
        
        // Core Variables.
        
        var scrollPosition = $(this).scrollTop();
        
        // Logic.
        
        $("#example-3").parallaxScroll(scrollPosition);
        
    });
    
});
