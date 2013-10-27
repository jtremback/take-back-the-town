'use strict';

/* global $ */


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var parallax = function() {
  var scroll_top = $(window).scrollTop(),
      scroll_bottom = scroll_top + $(window).height();

  $('[data-scroll]').each(function () {
    var el_top_offset = $(this).offset().top
      , opts = $(this).data('scroll')
      , el_bottom_offset = (el_top_offset + $(this).height())
      , top_to_top = (el_top_offset - scroll_top)
      , bottom_to_top = (el_bottom_offset - scroll_top)
      , top_to_bottom = (el_top_offset - scroll_bottom)
    ;

    if ((top_to_bottom < 0) && (bottom_to_top > 0)) {
      $(this).addClass('scroll-visible');
    } else {
      $(this).removeClass('scroll-visible');
    }

    if (opts === 'diagonal-seperator') {
      if ((top_to_bottom * 0.3) > -170) {
        // console.log('margin-top', (top_to_bottom * 0.3))
        $(this).css('margin-top', (top_to_bottom * 0.3));
      }
    }

    if (opts === 'jumbotron-sign') {
      // if ((top_to_bottom * 0.3) > -170) {
        // console.log('margin-top', (top_to_bottom * 0.3))
        var opacity = (scroll_top - 350) * -0.003;
        $(this).css('transform', 'translate(0, ' + (scroll_top * -0.3) + 'px)');
        $(this).css('opacity', opacity);

      // }
    }

  });
};

//PARALLAX
$( window ).scroll(function() {
  parallax();
});

//INIT
$(document).ready(function(){
  parallax();
});
