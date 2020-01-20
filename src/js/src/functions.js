$(function(){
  bubblesInit();
  
  // Setup a timer
  var timeout;

  // Listen for scrolling events
  window.addEventListener('resize', function ( event ) {

      // If timer is null, reset it to 66ms and run your functions.
      // Otherwise, wait until timer is cleared
      if ( !timeout ) {
          timeout = setTimeout(function() {

              // Reset timeout
              timeout = null;

              // Run our scroll functions
              bubblesResize()

          }, 66);
      }
  }, false);

  $(document).keyup(function(e){

    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        if( $('.dropdown').hasClass('is-focussed') ) {
          e.preventDefault();
        }
      }
    }, false);

    // If esc key pressed
    if(e.keyCode === 27) {
      if( $('.dropdown').hasClass('is-focussed') ) {
        $('.dropdown').removeClass('is-focussed');
        $('.dropdown__selected').focus();
      }
    }
    // If up key is pressed
    if(e.keyCode === 38) {
      if( $('.dropdown').hasClass('is-focussed') ) {
        if( $(":focus").hasClass('js-cb-normal') ) {
          $(":focus").parents('ul').prev().focus();
        } else if ( !$(":focus").hasClass('dropdown__selected') ) {
          $(":focus").parent().prev().find('button').focus();
        }
        return false;
      }
    }
    // If down key is pressed
    if(e.keyCode === 40) {
      if( $('.dropdown').hasClass('is-focussed') ) {
        if( $(":focus").hasClass('dropdown__selected') ) {
          $(":focus").next().find('li:first-child > button').focus();
        } else if ( !$(":focus").hasClass('js-cb-achromatomaly') ) {
          $(":focus").parent().next().find('button').focus();
        } 
        return false;
      }
    }

  });

  $('body').on('click', function(){
    $(".dropdown").removeClass('is-focussed');
  });

  // High contrast mode
  $('.js-highcontrast').on('click', function(){
    if( !$('.comic-strip').hasClass('is-high-contrast-mode') ) {
      $('.comic-strip').addClass('is-high-contrast-mode');
      $(this).addClass('is-active'); // Activate high contrast mode

      $('.comic-strip img').each(function(){
        var contrast_url = $(this).data('contrast');
        $(this).attr("src",contrast_url);
      });
    } else {
      $('.comic-strip').removeClass('is-high-contrast-mode');
      $(this).removeClass('is-active');
      $('.comic-strip img').each(function(){
        var source_url = $(this).data('src');
        $(this).attr("src",source_url);
      });
    }
    return false;
  });

  // RTL / LTR toggle
  $('.js-rtl').on('click', function(){
    if( !$('.comic-strip').hasClass('is-rtl-mode') ) {
      $('.comic-strip').addClass('is-rtl-mode');
      $(this).addClass('is-active');
    } else {
      $('.comic-strip').removeClass('is-rtl-mode');
      $(this).removeClass('is-active');
    }
    return false;
  });

  // To refresh bubbles
  $('.js-bubbles').on('click', function(){
    $('.bubble svg').remove();
    $('.comic-strip').addClass('is-loading');
    bubblesInit();
    return false;
  });

  // Closed caption mode
  $('.js-closedcaptions').on('click', function(){
    if( !$('.comic-strip').hasClass('is-closed-caption-mode') ) {
      $('.comic-strip').addClass('is-closed-caption-mode');
      $(this).addClass('is-active');
    } else {
      $('.comic-strip').removeClass('is-closed-caption-mode');
      $(this).removeClass('is-active');

      // Reset the font-size back to 100% and deactivate captions
      $('.comic-strip').data('fontsize', '100');
      $('.comic-strip').css('font-size', '100%');
      $('.font-sizer .text strong').text('100%');

      // Reset the buttons
      $('.js-resize-up').attr("disabled", false);
      $('.js-resize-down').attr("disabled", true);
    }
    return false;
  });
 
  // Increase / decrease Font Size
  $(".font-sizer .btn").on('click', function(){
    var currentSize = $('.comic-strip').data('fontsize');
    if( $(this).hasClass('js-resize-up') ) { currentSize = parseFloat(currentSize)+10; }
    if( $(this).hasClass('js-resize-down') ) { currentSize = parseFloat(currentSize)-10; }

    // Removed disbaled button state while we're in the 110% - 190% font-size state
    if( currentSize != 100 && currentSize != 200 ) {
      $('.js-resize-down').attr("disabled", false);
      $('.js-resize-up').attr("disabled", false);
    }

    // If it's font size above 100 add .is-resized
    if( currentSize != 100 ) {
      $('.comic-strip').addClass('is-closed-caption-mode');
      $('.js-closedcaptions').addClass('is-active');
      $('.comic-strip').addClass('is-resized');
    } else {
      $('.comic-strip').removeClass('is-closed-caption-mode');
      $('.js-closedcaptions').removeClass('is-active');
      $('.comic-strip').removeClass('is-resized');
    }

    // Add disabled state to resize down at font-size 100%
    if( currentSize == 100 ) {
      $('.js-resize-down').attr("disabled", true);
    }
    
    // Add disabled state to resize up at font-size 200%
    if( currentSize == 200 ) {
      $('.js-resize-up').attr("disabled", true);
    }

    // Upkeep
    $('.comic-strip').css('font-size', currentSize + '%'); // Update the font-size css value on comic-strip.
    $('.comic-strip').data('fontsize', currentSize); // Update the data-attribute to reflect to increase / decrease.
    $('.font-sizer .text strong').text(currentSize + '%'); // Update the font size inline text.

    return false;
  });
  



  $('.dropdown__selected').on('click', function(e){
    if( !$(this).parent().hasClass('is-focussed') ) {
      $(this).parent().addClass('is-focussed');
    } else {
      $(this).parent().removeClass('is-focussed');
    }

    e.stopPropagation();
  });

  $('.btn-option').on('click', function(){
    $text = $(this).text();
    $(this).parents('.dropdown').find('.dropdown__selected strong').text($text);
    $(this).parents('.dropdown').removeClass('is-focussed');
    $(this).parents('.dropdown').find('.dropdown__selected').focus();

    $text = $text.toLowerCase();
    if( $(this).hasClass('js-cb-normal') ) {
      colourblindReset();
    } else if ( !$('.comic-strip').hasClass('is-cb-'+$text) ) {
      colourblindReset()
      $('.comic-strip').addClass('is-cb-'+$text);
    }
    return false
  });
});

function colourblindReset() {
  if( $('.comic-strip').hasClass('is-cb-protanopia') || $('.comic-strip').hasClass('is-cb-protanomaly') || $('.comic-strip').hasClass('is-cb-deuteranopia') || $('.comic-strip').hasClass('is-cb-deuteranomaly') || $('.comic-strip').hasClass('is-cb-tritanopia') || $('.comic-strip').hasClass('is-cb-tritanomaly') || $('.comic-strip').hasClass('is-cb-achromatopsia') || $('.comic-strip').hasClass('is-cb-achromatomaly') ) {
    $('.comic-strip').removeClass('is-cb-protanopia is-cb-protanomaly is-cb-deuteranopia is-cb-deuteranomaly is-cb-tritanopia is-cb-tritanomaly is-cb-achromatopsia is-cb-achromatomaly');
  }
}

function bubblesInit() {
  // Apply bubble svg
  $('.bubble').each(function(){

    $t = 4; // Bubble stroke thickness
    $w = $(this).outerWidth(); // Bubble width
    $h = $(this).outerHeight(); // Bubble height
    
    // Bubble tail
    // -------------------------------------------------------

    // Elongate SVG to make room for the tail, while retaining the bubble dimensions - short, normal or long
    if( $(this).data('length') == "short" ) { $l = 40; }
    if( $(this).data('length') == "normal" ) { $l = 80; }
    if( $(this).data('length') == "long" ) { $l = 120; }

    // Find the horizontal position of tail - left, center or right
    if( $(this).data('position') == "left" ) { $o = 25; $p = $o; }
    if( $(this).data('position') == "center" ) { $o = 8; $p = ($w/2) - ($l/2); }
    if( $(this).data('position') == "right" ) { $o = 25; $p = $w-$l-$o; }

    $d = $(this).data('direction'); // Which direction the tail curves to the speaker
    if ( $d == "left" ) {
      $path = 'M'+$p+','+($h-$o)+' h'+$l+' l-'+($l/2)+','+($l+$o-$t)+' Q'+($p+($l/1.5))+','+($h-$o)+' '+$p+','+($h-$o)+'z';
    } else {
      $path = 'M'+$p+','+($h-$o)+' l'+($l/2)+','+($l+$o-$t)+' Q'+($p+($l/1.5))+','+($h-$o)+' '+($p+$l)+','+($h-$o)+' h-'+$l+'z';
    }

    
    $(this).append('<svg xmlns="http://www.w3.org/2000/svg" width="'+$w+'" height="'+($h+$l)+'" viewBox="0 0 '+$w+' '+($h+$l)+'"><path d="'+$path+'" stroke-width="'+($t*2)+'" fill="#000" stroke="#000" stroke-linecap="round" stroke-linejoin="round" /><path d="M'+($t/2)+' '+($h/2)+' Q'+($t/2)+' '+($t/2)+', '+($w/2)+' '+($t/2)+' T'+($w-($t/2))+' '+($h/2)+' T'+($w/2)+' '+($h-($t/2))+' T'+($t/2)+' '+($h/2)+'z" stroke-width="'+$t+'" fill="#fff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" /><path d="'+$path+'" fill="#fff" /></svg>');
    
  });

  $('.comic-strip').removeClass('is-loading');
  bubblesResize();
}

function bubblesResize() {
  $w = ( $('.comic-frame').width() / 265 )+'em';
  $('.bubble').css({'font-size': $w});
}

/*
  <svg width="400" height="400" viewBox="0 0 400 400">
    <path d="M200,150 h150 l-10,150 Q350,150 200,150z" fill="#000" stroke="#000" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M0,100 Q0,0 200,0 T400,100 T200,200 T0,100z" fill="#fff" stroke="#000" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M200,150 h150 l-10,150 Q350,150 200,150z" fill="#fff" />
  </svg>

<svg xmlns="http://www.w3.org/2000/svg" width="'+$w+'" height="'+($h+$l)+'" viewBox="0 0 '+$w+' '+($h+$l)+'">
  <path d="M'+$p+','+($h-$o)+' h'+$l+' l-'+($l/2)+','+($l+$o-$t)+' Q'+($p+($l/1.5))+','+($h-$o)+' '+$p+','+($h-$o)+'z" stroke-width="'+($t*2)+'" fill="#000" stroke="#000" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M'+($t/2)+' '+($h/2)+' Q'+($t/2)+' '+($t/2)+', '+($w/2)+' '+($t/2)+' T'+($w-($t/2))+' '+($h/2)+' T'+($w/2)+' '+($h-($t/2))+' T'+($t/2)+' '+($h/2)+'z" stroke-width="'+$t+'" fill="#fff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M'+$p+','+($h-$o)+' h'+$l+' l-'+($l/2)+','+($l+$o-$t)+' Q'+($p+($l/1.5))+','+($h-$o)+' '+$p+','+($h-$o)+'z" fill="#fff" />
</svg>
*/