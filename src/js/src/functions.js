$(function(){

  // Setup a timer
  var timeout;

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
      $(this).addClass('is-active').attr("aria-pressed", "true"); // Activate high contrast mode

      $('.comic-strip img').each(function(){
        var contrast_url = $(this).data('contrast');
        $(this).attr("src",contrast_url);
      });
    } else {
      $('.comic-strip').removeClass('is-high-contrast-mode');
      $(this).removeClass('is-active').attr("aria-pressed", "false");
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
      $(this).addClass('is-active').attr("aria-pressed", "true");
    } else {
      $('.comic-strip').removeClass('is-rtl-mode');
      $(this).removeClass('is-active').attr("aria-pressed", "false");
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
      $(this).addClass('is-active').attr("aria-pressed", "true");
    } else {
      $('.comic-strip').removeClass('is-closed-caption-mode');
      $(this).removeClass('is-active').attr("aria-pressed", "false");

      // Reset the font-size back to 100% and deactivate captions
      $('.comic-strip').data('fontsize', '100');
      $('.font-sizer .text strong').text('100%');
      $('.comic-strip .caption-closed').css('font-size', '100%');

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
      $('.js-closedcaptions').addClass('is-active').attr("aria-pressed", "true");
      $('.comic-strip').addClass('is-resized');
    } else {
      if( !$('.comic-strip').hasClass('is-browserZoom') ) {
        $('.comic-strip').removeClass('is-closed-caption-mode');
        $('.js-closedcaptions').removeClass('is-active').attr("aria-pressed", "false");
      }
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
    $('.comic-strip').data('fontsize', currentSize); // Update the data-attribute to reflect to increase / decrease.
    $('.font-sizer .text strong').text(currentSize + '%'); // Update the font size inline text.
    $('.comic-strip .caption-closed').css('font-size', currentSize + '%'); // Update the font-size css value on comic-strip.

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

  // Generate bubbles
  bubbles();
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

function bubbleBrowserZoom() {
  let para = document.querySelector('.bubble');
  let compStyles = window.getComputedStyle(para);
  
  if( parseInt(compStyles.getPropertyValue('font-size'), 10) > 23 ) {

    $('.comic-strip').addClass('is-closed-caption-mode is-browserZoom');
    $('.js-closedcaptions').addClass('is-active').attr('disabled', true).attr("aria-pressed", "true");

  }
}

function bubbles() {
  $('.comic-strip').addClass('is-loading'); // Force the desktop width and height to normalise the stroke width.

  bubblesResize(); // Resize font to the normalised desktop size
  bubbleBrowserZoom(); // Detect if the browser has zoom - if so remove bubbles and replace with captions
  
  $('.bubble svg').remove(); // Remove all current bubble SVG graphics.

  // Apply new bubble SVG graphics.
  $('.bubble').each(function(i){

    // -------------------------------------------------------
    // Bubble settings
    // -------------------------------------------------------
    xmlns = "http://www.w3.org/2000/svg";
    b_stroke = 4; // Bubble stroke thickness
    b_width = $(this).outerWidth(); // Bubble width
    b_height = $(this).outerHeight(); // Bubble height
    t_girth = b_width / 12; // Set a girth for the tail (how much it indents when drawing downwards)

    t_direction = $(this).data('direction'); // Tail direction - left or right

    // $l = Length // Elongate SVG to make room for the tail, while retaining the bubble dimensions - short, normal, long or numeric pixel dimension
    if( $(this).data('length') == "short" ) { t_length = 50; }
    else if( $(this).data('length') == "normal" ) { t_length = 100; }
    else if( $(this).data('length') == "long" ) { t_length = 200; }
    else { t_length = $(this).data('length'); } // Or numeric pixel dimension

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

    // If the tail is positioned on the left of the bubble
    if( $(this).data('position') == "left" ) {

      // Bezier calc - Needed to calculate X,Y along a curve
      // -------------------------------------------------------

      // The first point on curve
      bezier_point_0 = {
        x: b_width / 2,
        y: b_height - b_stroke
      };

      // Controller for point 0
      bezier_control_0 = {
        x: b_stroke,
        y: b_height - b_stroke
      };

      // The second point on curve
      bezier_point_1 = {
        x: b_stroke,
        y: b_height / 2
      };

      // Controller for point 1
      bezier_control_1 = {
        x: b_stroke,
        y: (b_height/2) + (b_height/10)
      }

      bezier_node_1 = Bezier(bezier_point_0, bezier_control_0, bezier_control_1, bezier_point_1, '.45'),      // Return X and Y coordinates based on node location on bezier curve (.45)
      bezier_node_2 = Bezier(bezier_point_0, bezier_control_0, bezier_control_1, bezier_point_1, '.2');      // Return X and Y coordinates based on node location on bezier curve (.2)


      // If the direction of the bubble is pointing to the left:
      // -------------------------------------------------------

      if ( t_direction == "left" ) {

        // Coordinates
        t_x0 = bezier_node_1.x;                      // Starting X coordinate
        t_y0 = bezier_node_1.y;                      // Starting Y coordinate
        t_x1 = bezier_node_2.x;                      // Horizontal line destination X coordinate
        t_y1 = bezier_node_2.y;                      // Horizontal line destination X coordinate
        t_x2 = '-'+ t_girth;                         // Diagonal line X coordinate
        t_y2 = t_length - b_stroke;                  // Diagonal line Y coordinate
        t_x3 = bezier_node_2.x - t_girth;            // Quadratic handle X coordinate
        t_y3 = bezier_node_2.y + (t_length /4);      // Quadratic handle Y coordinate
        t_x4 = bezier_node_1.x;                      // Quadratic end X coordinate - Should be the same as the first coordinate (t_x0)
        t_y4 = bezier_node_1.y;                      // Quadratic end Y coordinate - Should be the same as the first coordinate (t_y0)
  
        // Pattern
        t_path  = 'M' + t_x0 + ' ' + t_y0 + ' ';     // Move to x0 y0
        t_path += 'L' + t_x1 + ' ' + t_y1 + ' ';     // Draw horizontal line to x1 y1
        t_path += 'l' + t_x2 + ' ' + t_y2 + ' ';     // Draw a diagonal line to x2 y2
        t_path += 'Q' + t_x3 + ' ' + t_y3 + ' ';     // Quadratic bezier curve handle coordinates x3 y3
        t_path += ' ' + t_x4 + ' ' + t_y4 + ' ';     // Quadratic bezier curve end coordinate x4 y4
        t_path += 'z';                               // Close path
      }
      


      // If the direction of the bubble is pointing to the right:
      // -------------------------------------------------------

      if ( t_direction == "right" ) {
  
        // Coordinates
        t_x0 = bezier_node_1.x;                       // Starting X coordinate 
        t_y0 = bezier_node_1.y;                       // Starting Y coordinate
        t_x1 = t_girth;                               // Diagonal line X coordinate
        t_y1 = t_length - b_stroke;                   // Diagonal line Y coordinate
        t_x2 = bezier_node_1.x + t_girth;             // Quadratic handle X coordinate
        t_y2 = bezier_node_1.y + (t_length /4);       // Quadratic handle Y coordinate
        t_x3 = bezier_node_2.x;                       // Quadratic end X coordinate
        t_y3 = bezier_node_2.y;                       // Quadratic end Y coordinate
        t_x4 = bezier_node_1.x;                       // Horizontal line destination X coordinate - Should be the same as first coordinate (t_x0)
        t_y4 = bezier_node_1.y;                       // Horizontal line destination X coordinate - Should be the same as first coordinate (t_x0)
  
        // Pattern
        t_path  = 'M' + t_x0 + ' ' + t_y0 + ' ';      // Move to x0 y0
        t_path += 'l' + t_x1 + ' ' + t_y1 + ' ';      // Draw a diagonal line to x2 y2
        t_path += 'Q' + t_x2 + ' ' + t_y2 + ' ';      // Quadratic bezier curve handle coordinates x3 y3
        t_path += ' ' + t_x3 + ' ' + t_y3 + ' ';      // Quadratic bezier curve end coordinate x4 y4
        t_path += 'L' + t_x4 + ' ' + t_y4 + ' ';      // Draw horizontal line to x1 y1
        t_path += 'z';                                // Close path
      }

    }

    // If the tail is positioned on the right of the bubble
    if( $(this).data('position') == "right" ) {
      
      // Bezier calc - Needed to calculate X,Y along a curve
      // -------------------------------------------------------

      // The first point on curve
      bezier_point_0 = {
        x: b_width / 2,
        y: b_height - b_stroke
      };

      // Controller for point 0
      bezier_control_0 = {
        x: b_width - b_stroke,
        y: b_height - b_stroke
      };

      // The second point on curve
      bezier_point_1 = {
        x: b_width - b_stroke,
        y: (b_height/2) + (b_height/10)
      };

      // Controller for point 1
      bezier_control_1 = {
        x: b_width - b_stroke,
        y: b_height / 2
      }

      bezier_node_1 = Bezier(bezier_point_0, bezier_control_0, bezier_control_1, bezier_point_1, '.2'),      // Return X and Y coordinates based on node location on bezier curve (.2)
      bezier_node_2 = Bezier(bezier_point_0, bezier_control_0, bezier_control_1, bezier_point_1, '.45');      // Return X and Y coordinates based on node location on bezier curve (.45)


      // If the direction of the bubble is pointing to the left:
      // -------------------------------------------------------

      if ( t_direction == "left" ) {

        // Coordinates
        t_x0 = bezier_node_1.x;                      // Starting X coordinate
        t_y0 = bezier_node_1.y;                      // Starting Y coordinate
        t_x1 = bezier_node_2.x;                      // Horizontal line destination X coordinate
        t_y1 = bezier_node_2.y;                      // Horizontal line destination X coordinate
        t_x2 = '-'+ t_girth;                         // Diagonal line X coordinate
        t_y2 = t_length - b_stroke;                  // Diagonal line Y coordinate
        t_x3 = bezier_node_2.x - t_girth;            // Quadratic handle X coordinate
        t_y3 = bezier_node_2.y + (t_length /4);      // Quadratic handle Y coordinate
        t_x4 = bezier_node_1.x;                      // Quadratic end X coordinate - Should be the same as the first coordinate (t_x0)
        t_y4 = bezier_node_1.y;                      // Quadratic end Y coordinate - Should be the same as the first coordinate (t_y0)
  
        // Pattern
        t_path  = 'M' + t_x0 + ' ' + t_y0 + ' ';     // Move to x0 y0
        t_path += 'L' + t_x1 + ' ' + t_y1 + ' ';     // Draw horizontal line to x1 y1
        t_path += 'l' + t_x2 + ' ' + t_y2 + ' ';     // Draw a diagonal line to x2 y2
        t_path += 'Q' + t_x3 + ' ' + t_y3 + ' ';     // Quadratic bezier curve handle coordinates x3 y3
        t_path += ' ' + t_x4 + ' ' + t_y4 + ' ';     // Quadratic bezier curve end coordinate x4 y4
        t_path += 'z';                               // Close path
      }
      


      // If the direction of the bubble is pointing to the right:
      // -------------------------------------------------------

      if ( t_direction == "right" ) {
  
        // Coordinates
        t_x0 = bezier_node_1.x;                       // Starting X coordinate 
        t_y0 = bezier_node_1.y;                       // Starting Y coordinate
        t_x1 = t_girth;                               // Diagonal line X coordinate
        t_y1 = t_length - b_stroke;                   // Diagonal line Y coordinate
        t_x2 = bezier_node_1.x + t_girth;             // Quadratic handle X coordinate
        t_y2 = bezier_node_1.y + (t_length /4);       // Quadratic handle Y coordinate
        t_x3 = bezier_node_2.x;                       // Quadratic end X coordinate
        t_y3 = bezier_node_2.y;                       // Quadratic end Y coordinate
        t_x4 = bezier_node_1.x;                       // Horizontal line destination X coordinate - Should be the same as first coordinate (t_x0)
        t_y4 = bezier_node_1.y;                       // Horizontal line destination X coordinate - Should be the same as first coordinate (t_x0)
  
        // Pattern
        t_path  = 'M' + t_x0 + ' ' + t_y0 + ' ';      // Move to x0 y0
        t_path += 'l' + t_x1 + ' ' + t_y1 + ' ';      // Draw a diagonal line to x2 y2
        t_path += 'Q' + t_x2 + ' ' + t_y2 + ' ';      // Quadratic bezier curve handle coordinates x3 y3
        t_path += ' ' + t_x3 + ' ' + t_y3 + ' ';      // Quadratic bezier curve end coordinate x4 y4
        t_path += 'L' + t_x4 + ' ' + t_y4 + ' ';      // Draw horizontal line to x1 y1
        t_path += 'z';                                // Close path
      }

    }

    // If the tail is positioned in the middle of the bubble
    if( $(this).data('position') == "center" ) { 

      // If the direction of the bubble is pointing to the left:
      // -------------------------------------------------------

      if ( t_direction == "left" ) {

        // Coordinates
        t_x0 = (b_width / 2) - (t_girth * 2);        // Starting X coordinate
        t_y0 = b_height - 10;                        // Starting Y coordinate
        t_x1 = (b_width / 2) + (t_girth * 2);        // Horizontal line destination X coordinate
        t_y1 = b_height - 10;                        // Horizontal line destination X coordinate
        t_x2 = '-'+ t_girth * 2;                     // Diagonal line X coordinate
        t_y2 = t_length - b_stroke;                  // Diagonal line Y coordinate
        t_x3 = ((b_width /2) + (t_girth * 2)) - t_girth; // Quadratic handle X coordinate
        t_y3 = (b_height - 10) + (t_length /4);      // Quadratic handle Y coordinate
        t_x4 = (b_width / 2) - (t_girth * 2);        // Quadratic end X coordinate - Should be the same as the first coordinate (t_x0)
        t_y4 = b_height - 10;                        // Quadratic end Y coordinate - Should be the same as the first coordinate (t_y0)
  
        // Pattern
        t_path  = 'M' + t_x0 + ' ' + t_y0 + ' ';     // Move to x0 y0
        t_path += 'L' + t_x1 + ' ' + t_y1 + ' ';     // Draw horizontal line to x1 y1
        t_path += 'l' + t_x2 + ' ' + t_y2 + ' ';     // Draw a diagonal line to x2 y2
        t_path += 'Q' + t_x3 + ' ' + t_y3 + ' ';     // Quadratic bezier curve handle coordinates x3 y3
        t_path += ' ' + t_x4 + ' ' + t_y4 + ' ';     // Quadratic bezier curve end coordinate x4 y4
        t_path += 'z';                               // Close path
      }
      


      // If the direction of the bubble is pointing to the right:
      // -------------------------------------------------------

      if ( t_direction == "right" ) {
  
        // Coordinates
        t_x0 = (b_width / 2) - (t_girth * 2);         // Starting X coordinate
        t_y0 = b_height - 10;                         // Starting Y coordinate
        t_x1 = t_girth * 2;                           // Diagonal line X coordinate
        t_y1 = t_length - b_stroke;                   // Diagonal line Y coordinate
        t_x2 = ((b_width / 2) - (t_girth * 2)) + t_girth; // Quadratic handle X coordinate
        t_y2 = (b_height - 10) + (t_length /4);       // Quadratic handle Y coordinate
        t_x3 = (b_width / 2) + (t_girth * 2);         // Quadratic end X coordinate
        t_y3 = b_height - 10;                         // Quadratic end Y coordinate
        t_x4 = (b_width / 2) - (t_girth * 2);         // Horizontal line destination X coordinate - Should be the same as first coordinate (t_x0)
        t_y4 = b_height - 10;                         // Horizontal line destination X coordinate - Should be the same as first coordinate (t_x0)
  
        // Pattern
        t_path  = 'M' + t_x0 + ' ' + t_y0 + ' ';      // Move to x0 y0
        t_path += 'l' + t_x1 + ' ' + t_y1 + ' ';      // Draw a diagonal line to x2 y2
        t_path += 'Q' + t_x2 + ' ' + t_y2 + ' ';      // Quadratic bezier curve handle coordinates x3 y3
        t_path += ' ' + t_x3 + ' ' + t_y3 + ' ';      // Quadratic bezier curve end coordinate x4 y4
        t_path += 'L' + t_x4 + ' ' + t_y4 + ' ';      // Draw horizontal line to x1 y1
        t_path += 'z';                                // Close path
      }

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


/*
  * Get new x,y on curve by given x
  * @params a,b,c,d {x:x,y:y}
  * @params x 
  * @return {{x:new x on cruve ,y: new y on cruve}}
*/
function YBX(a,b,c,d,x){

  a = a.x;
  b = b.x;
  c = c.x;
  d = d.x;
  
  // Lets expand this 
  // x = a * (1-t)³ + b * 3 * (1-t)²t + c * 3 * (1-t)t² + d * t³
  //------------------------------------------------------------
  // x = a - 3at + 3at² - at³ 
  //       + 3bt - 6bt² + 3bt³
  //             + 3ct² - 3ct³
  //                    + dt³
  //--------------------------------
  // x = - at³  + 3bt³ - 3ct³ + dt³
  //     + 3at² - 6bt² + 3ct²
  //     - 3at + 3bt
  //     + a
  //--------------------------------
  // 0 = t³ (-a+3b-3c+d) +  => A
  //     t² (3a-6b+3c)   +  => B
  //     t  (-3a+3b)     +  => c
  //     a - x              => D
  //--------------------------------
  
  var A = d - 3*c + 3*b - a,
      B = 3*c - 6*b + 3*a,
      C = 3*b - 3*a,
      D = a-x;
      
  // So we need to solve At³ + Bt² + Ct + D = 0     
  var t =  cubic(A,B,C,D); 
  
  // Replace the t on Bezier function and get x,y 
  var p = Bezier(p0,c0,c1,p1,t);
  
  return p;
}

  
/*
  * Bezier Function
  * Get X,Y by t 
  * Refer to https://pomax.github.io/bezierinfo/
  * @params a,b,c,d {x:x,y:y}
  * @params t is between 0-1
  * @return {{x:x on curve ,y:y on curve}}
*/
function Bezier(a,b,c,d,t) {
  var point = {x:0,y:0},
      mt  = 1-t,
      mt2 = mt*mt,
      mt3 = mt2*mt;
      
  //fx(t) = x1 * (1-t)³ + x2 * 3 * (1-t)²t + x3 * 3 * (1-t)t² + x4 * t³
  point.x = a.x*mt3 + b.x*3*mt2*t + c.x*3*mt*t*t + d.x*t*t*t;

  //fy(t) = y1 * (1-t)³ + y2 * 3 * (1-t)²t + y3 * 3 * (1-t)t² + y4 * t³
  point.y = a.y*mt3 + b.y*3*mt2*t + c.y*3*mt*t*t + d.y*t*t*t;

  return point;
}


/*
  * Cubic Equation Calculator 
  * refer to http://www.1728.org/cubic.htm
  *
  * ax³ + bx² + cx + d = 0 
  * @params a,b,c,d
  * @return x
*/

function cubic(a,b,c,d){
  var m,m2,k,n,n2,x,r,rc,theta,sign,dans;
  
  var f = eval(((3*c)/a) - (((b*b)/(a*a))))/3;
  var g = eval((2*((b*b*b)/(a*a*a))-(9*b*c/(a*a)) + ((27*(d/a)))))/27;
  var h = eval(((g*g)/4) + ((f*f*f)/27));
  
  if (h > 0) {
    
    m = eval(-(g/2)+ (Math.sqrt(h)));
    k = m < 0 ? -1:1;
    m2 = eval(Math.pow((m*k),(1/3)));
    m2 = m2*k;
    n = eval(-(g/2)- (Math.sqrt(h)));
    k = n<0 ? -1:1;
    n2 = eval(Math.pow((n*k),(1/3)));
    n2 = n2*k;
    x= eval ((m2 + n2) - (b/(3*a)));
      
  } else {
    r = (eval(Math.sqrt((g*g/4)-h)));
    k = r<0 ? -1:1;
    rc = Math.pow((r*k),(1/3))*k;
    theta = Math.acos((-g/(2*r)));
    x=eval (2*(rc*Math.cos(theta/3))-(b/(3*a)));
    x=x*1E+14;
    x=Math.round(x);
    x=(x/1E+14);
  }
  
  if ((f+g+h)==0) {
    if (d<0) {sign=-1}
    if (d>=0) {sign=1}
    if (sign>0){dans=Math.pow((d/a),(1/3));dans=dans*-1}
    if (sign<0){d=d*-1;dans=Math.pow((d/a),(1/3))}
    x=dans;
  }
  return x;
}