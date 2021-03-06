/*! center plugin for Cycle2;  version: BETA-20120910 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    centerHorz: false,
    centerVert: false
});

$(document).on( 'cycle-pre-initialize', function( e, opts ) {
    if ( !opts.centerHorz && !opts.centerVert )
        return;

    // throttle resize event
    var timeout, timeout2;
    $(window).on( 'resize', function() {
        clearTimeout( timeout );
        timeout = setTimeout( adjustActive, 50 );
    });

    opts.container.on( 'cycle-slide-added', function( e, opts, slideOpts, slide ) {
        adjustSlide.apply(slide);
    });

    adjustAll();

    function adjustAll() {
        opts.slides.each( adjustSlide ); 
    }

    function adjustActive() {
        /*jshint validthis: true */
        adjustSlide.apply( opts.container.find( opts.slideActiveClass ) );
        clearTimeout( timeout2 );
        timeout2 = setTimeout( adjustAll, 50 );
    }

    function adjustSlide() {
        /*jshint validthis: true */
        var slide = $(this);
        var contW = opts.container.width();
        var contH = opts.container.height();
        var w = slide.width();
        var h = slide.height();
        if (opts.centerHorz && w < contW)
            slide.css( 'marginLeft', (contW - w) / 2 );
        if (opts.centerVert && h < contH)
            slide.css( 'marginTop', (contH - h) / 2 );
    }
});

})(jQuery);
