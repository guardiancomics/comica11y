$(function(){
  bubbles();
  
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
    bubbles();
    return false
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

function bubblesResize() {
  $w = ( $('.comic-frame').width() / 265 )+'em';
  $('.bubble').css({'font-size': $w});
}

function bubbles() {
  $('.comic-strip').addClass('is-loading'); // Force the desktop width and height to normalise the stroke width.
  bubblesResize(); // Resize font to the normalised desktop size
  $('.bubble svg').remove(); // Remove all current bubble SVG graphics.

  // Apply new bubble SVG graphics.
  $('.bubble').each(function(){

    // -------------------------------------------------------
    // Bubble settings
    // -------------------------------------------------------
    xmlns = "http://www.w3.org/2000/svg";
    b_stroke = 4; // Bubble stroke thickness
    b_width = $(this).outerWidth(); // Bubble width
    b_height = $(this).outerHeight(); // Bubble height

    t_direction = $(this).data('direction'); // Tail direction - left or right

    // $l = Length // Elongate SVG to make room for the tail, while retaining the bubble dimensions - short, normal, long or numeric pixel dimension
    if( $(this).data('length') == "short" ) { t_length = 40; }
    else if( $(this).data('length') == "normal" ) { t_length = 80; }
    else if( $(this).data('length') == "long" ) { t_length = 120; }
    else { t_length = $(this).data('length'); } // Or numeric pixel dimension

    // t_girth = Girth // Find the girth of the tail
    if( $(this).data('girth') == "wide" ) { t_girth = 80; }
    else if ( $(this).data('girth') == "normal" ) { t_girth = 50 }
    else if ( $(this).data('girth') == "thin" ) { t_girth = 20; }
    else { t_girth = $(this).data('girth'); } // Or numeric pixel dimension

    // t_position = Positon // Find the horizontal position of tail - left, center, right
    if( $(this).data('position') == "left" ) { t_position = 20; }
    else if( $(this).data('position') == "center" ) { t_position = (b_width / 2) - (t_girth / 2); }
    else if( $(this).data('position') == "right" ) { t_position = (b_width - t_girth) - 20; }


    // -------------------------------------------------------
    // Bubble
    // -------------------------------------------------------

    // Coordinates
    b_x0 = b_stroke / 2;                      // Starting X coordinate
    b_y0 = b_height / 2;                      // Starting Y coordinate
    b_x1 = b_stroke / 2;                      // Quadratic handle X coordinate
    b_y1 = b_stroke / 2;                      // Quadratic handle Y coordinate
    b_x2 = b_width / 2;                       // Quadratic bezier end X coordinate
    b_y2 = b_stroke / 2                       // Quadratic bezier end Y coordinate
    b_x3 = b_width - (b_stroke / 2);          // Second point X coordinate
    b_y3 = b_height / 2;                      // Second point Y coordinate
    b_x4 = b_width / 2;                       // Third point X cordinate
    b_y4 = b_height - (b_stroke / 2);         // Third point Y coordinate
    b_x5 = b_stroke / 2;                      // Fourth point X coordinate
    b_y5 = b_height / 2;                      // Fourth point Y coordinate

    // Pattern
    b_path  = 'M' +  b_x0 + ' ' + b_y0 + ' '; // Move to x0 y0
    b_path += 'Q' +  b_x1 + ' ' + b_y1 + ' '; // Quadratic bezier curve handle coordinates x1 y1
    b_path += ' ' +  b_x2 + ' ' + b_y2 + ' '; // Quadratic bezier curve end coordinates x2 y2
    b_path += 'T' +  b_x3 + ' ' + b_y3 + ' '; // Continue curve x3 y3
    b_path += 'T' +  b_x4 + ' ' + b_y4 + ' '; // Continue curve x4 y4
    b_path += 'T' +  b_x5 + ' ' + b_y5 + ' '; // Continue curve x5 y5
    b_path += 'z'; // Close path


    // -------------------------------------------------------
    // Tail
    // -------------------------------------------------------

    if ( t_direction == "left" ) {
      // Coordinates
      t_x0 = t_position;                      // Starting X coordinate
      t_y0 = b_height - (b_height / 4);       // Starting Y coordinate
      t_x1 = t_girth;                         // Horizontal line destination X coordinate
      t_x2 = "-"+ (t_girth/2);                // Diagonal line X coordinate
      t_y2 = t_length - b_stroke;             // Diagonal Y coordinate
      t_x3 = t_position + t_girth;            // Quadratic handle X coordinate
      t_y3 = b_height - (b_height / 4);       // Quadratic handle Y coordinate
      t_x4 = t_position;                      // Quadratic end X coordinate - Should be the same as the first coordinate (t_x0)
      t_y4 = b_height - (b_height / 4);       // Quadratic end Y coordinate - Should be the same as the first coordinate (t_y0)

      // Pattern
      t_path  = 'M' + t_x0 + ' ' + t_y0 + ' '; // Move to x0 y0
      t_path += 'h' + t_x1 + ' ';              // Draw horizontal line to x1 y1
      t_path += 'l' + t_x2 + ' ' + t_y2 + ' '; // Draw a diagonal line to x2 y2
      t_path += 'Q' + t_x3 + ' ' + t_y3 + ' '; // Quadratic bezier curve handle coordinates x3 y3
      t_path += ' ' + t_x4 + ' ' + t_y4 + ' '; // Quadratic bezier curve end coordinate x4 y4
      t_path += 'z'; // Close path
    }
    
    if ( t_direction == "right" ) {
      // Coordinates
      t_x0 = t_position;                       // Starting X coordinate 
      t_y0 = b_height - (b_height / 4);        // Starting Y coordinate
      t_x1 = t_girth/2;                        // Diagonal line X coordinate
      t_y1 = t_length - b_stroke;              // Diagonal line Y coordinate
      t_x2 = t_position;                       // Quadratic handle X coordinate
      t_y2 = b_height - (b_height / 4);        // Quadratic handle Y coordinate
      t_x3 = t_position + t_girth;             // Quadratic end X coordinate
      t_y3 = b_height - (b_height / 4);        // Quadratic end Y coordinate
      t_x4 = "-"+t_girth;                      // Horizontal line destination X coordinate - Should be the same as first coordinate (t_x0)

      // Pattern
      t_path  = 'M' + t_x0 + ' ' + t_y0 + ' '; // Move to x0 y0
      t_path += 'l' + t_x1 + ' ' + t_y1 + ' '; // Draw a diagonal line to x2 y2
      t_path += 'Q' + t_x2 + ' ' + t_y2 + ' '; // Quadratic bezier curve handle coordinates x3 y3
      t_path += ' ' + t_x3 + ' ' + t_y3 + ' '; // Quadratic bezier curve end coordinate x4 y4
      t_path += 'h' + t_x4 + ' ';              // Draw horizontal line to x1 y1
      t_path += 'z'; // Close path
    }


    // -------------------------------------------------------
    // Construction
    // -------------------------------------------------------
    b_svg = document.createElementNS(xmlns, "svg");
    b_svg_path = document.createElementNS(xmlns, "path");
    t_svg_path1 = document.createElementNS(xmlns, "path");
    t_svg_path2 = document.createElementNS(xmlns, "path");

    // Construct the SVG element
    b_svg.setAttribute("viewBox", "0 0 " + b_width + " " + (b_height + t_length));
    b_svg.setAttribute("width", b_width);
    b_svg.setAttribute("height", (b_height + t_length));

    // Construct the bubble path
    b_svg_path.setAttribute( 'd' , b_path );
    b_svg_path.setAttribute( 'stroke' , '#000' );
    b_svg_path.setAttribute( 'stroke-width' , b_stroke );
    b_svg_path.setAttribute( 'stroke-linecap' , 'round' );
    b_svg_path.setAttribute( 'stroke-linejoin' , 'round' );
    b_svg_path.setAttribute( 'fill' , '#fff' );

    // Construct the behind tail path
    t_svg_path1.setAttribute( 'd' , t_path );
    t_svg_path1.setAttribute( 'stroke' , '#000' );
    t_svg_path1.setAttribute( 'stroke-width' , (b_stroke*2) );
    t_svg_path1.setAttribute( 'stroke-linecap' , 'round' );
    t_svg_path1.setAttribute( 'stroke-linejoin' , 'round' );
    t_svg_path1.setAttribute( 'fill' , '#fff' );
    
    // Construct the front tail path
    t_svg_path2.setAttribute( 'd' , t_path );
    t_svg_path2.setAttribute( 'fill' , '#fff' );

    // Append the paths to the SVG
    b_svg.appendChild(t_svg_path1);
    b_svg.appendChild(b_svg_path);
    b_svg.appendChild(t_svg_path2);

    // Append the completed SVG into the DOM
    $(this).append(b_svg);
  });

  // Cleanup - remove the loading class
  $('.comic-strip').removeClass('is-loading');
  bubblesResize(); // Resize the font once more.
}