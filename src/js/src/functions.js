// For debounce
var timeout;

// Selectors
comicStrip = document.querySelector('.comic-strip');
comicFrame = document.querySelectorAll('.comic-frame');
highContrastBtn = document.querySelector('.js-highcontrast');
rtlBtn = document.querySelector('.js-rtl');
ccBtn = document.querySelector('.js-closedcaptions');
bubbleBtn = document.querySelector('.js-bubbles');

// Generate bubbles
bubbles();

// Resize bubbles
window.addEventListener('resize', function (event) {
	if (timeout) { window.cancelAnimationFrame(timeout); }
	timeout = window.requestAnimationFrame(function () {
		bubbles();
	});
}, false);

document.querySelectorAll('.caption-sr').forEach(function(item){
	item.addEventListener('focus', (event) => {
		event.target.parentNode.classList.add('is-active');
	});
	item.addEventListener('blur', (event) => {
		event.target.parentNode.classList.remove('is-active');
	});
});


// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Toggle high contrast mode
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
highContrastBtn.addEventListener('click', function(e){
	if( !highContrastBtn.classList.contains('is-active') ) {
		highContrastBtn.classList.add('is-active');
		highContrastBtn.setAttribute('aria-pressed', 'true');
		comicStrip.classList.add('is-high-contrast-mode');

		comicImg = document.querySelectorAll('.comic-strip img');
		comicImg.forEach(function(strip){
			contrastUrl = strip.dataset.contrast;
			strip.setAttribute('src', contrastUrl);
		});
	} else {
		highContrastBtn.classList.remove('is-active');
		highContrastBtn.setAttribute('aria-pressed', 'false');
		comicStrip.classList.remove('is-high-contrast-mode');

		comicImg = document.querySelectorAll('.comic-strip img');
		comicImg.forEach(function(strip){
			srcUrl = strip.dataset.src;
			strip.setAttribute('src', srcUrl);
		});
	}

	e.preventDefault;
});


// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Toggle RTL / LTR mode
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
rtlBtn.addEventListener('click', function(){
	if( !rtlBtn.classList.contains('is-active') ) {
		rtlBtn.classList.add('is-active');
		rtlBtn.setAttribute('aria-pressed', 'true');
		comicStrip.classList.add('is-rtl-mode');
	} else {
		rtlBtn.classList.remove('is-active');
		rtlBtn.setAttribute('aria-pressed', 'false');
		comicStrip.classList.remove('is-rtl-mode');
	}
});


// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Toggle closed caption mode
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
ccBtn.addEventListener('click', function(){
	if( !ccBtn.classList.contains('is-active') ) {
		ccBtn.classList.add('is-active');
		ccBtn.setAttribute('aria-pressed', 'true');
		comicStrip.classList.add('is-closed-caption-mode');
	} else {
		ccBtn.classList.remove('is-active');
		ccBtn.setAttribute('aria-pressed', 'false');
		comicStrip.classList.remove('is-closed-caption-mode');

		// Reset the font-size back to 100% and deactive captions
		document.querySelector('.comic-strip').dataset.fontsize='100';
		document.querySelector('.font-sizer .text strong').innerHTML = '100%';
		document.querySelectorAll('.comic-strip .caption-closed').forEach(function(item){
			item.style.fontSize = "100%";
		});

		// Reset the buttons
		document.querySelector('.js-resize-up').disabled = false;
		document.querySelector('.js-resize-down').disabled = true;
	}
});


// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Increase / decrease font size
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
document.querySelectorAll('.font-sizer .btn').forEach(function(item){
	item.addEventListener('click', function(e){
		currentSize = document.querySelector('.comic-strip').dataset.fontsize;
		if( item.classList.contains('js-resize-up') ) {
			currentSize = parseFloat( currentSize ) + 10;
		}
		if( item.classList.contains('js-resize-down') ) {
			currentSize = parseFloat( currentSize ) - 10;
		}

		// Removed disbaled button state while we're in the 110% - 190% font-size state
		if( currentSize != 100 && currentSize != 200 ) {
			document.querySelector('.js-resize-down').disabled = false;
			document.querySelector('.js-resize-up').disabled = false;
		}

		// If it's font size above 100 add .is-resized
		if( currentSize != 100 ) {
			comicStrip.classList.add('is-closed-caption-mode', 'is-resized');
			ccBtn.classList.add('is-active');
			ccBtn.setAttribute('aria-pressed', 'true');
		  } else {
			  if( !comicStrip.classList.contains('is-browserZoom') ) {
				  comicStrip.classList.remove('is-closed-caption-mode');
				  ccBtn.classList.remove('is-active');
				  ccBtn.setAttribute('aria-pressed', 'false');
			  }
			  comicStrip.classList.remove('is-resized');
		  }
	  
		  // Add disabled state to resize down at font-size 100%
		  if( currentSize == 100 ) {
			document.querySelector('.js-resize-down').disabled = true;
		  }
		  
		  // Add disabled state to resize up at font-size 200%
		  if( currentSize == 200 ) {
			document.querySelector('.js-resize-up').disabled = true;
		  }
	  
		  // Upkeep
		  comicStrip.dataset.fontsize = currentSize; // Update the data-attribute to reflect to increase / decrease.
		  document.querySelector('.font-sizer .text strong').innerHTML = currentSize + '%'; // Update the font size inline text.
		  document.querySelectorAll('.comic-strip .caption-closed').forEach(function(item){
			  item.style.fontSize = currentSize + '%'; // Update the font-size css value on comic-strip.
		  });

		e.preventDefault;
	});
});


function colourblindReset() {
	if(
		comicStrip.classList.contains('is-cb-protanopia') ||
		comicStrip.classList.contains('is-cb-protanomaly') ||
		comicStrip.classList.contains('is-cb-deuteranopia') ||
		comicStrip.classList.contains('is-cb-deuteranomaly') ||
		comicStrip.classList.contains('is-cb-tritanopia') ||
		comicStrip.classList.contains('is-cb-tritanomaly') ||
		comicStrip.classList.contains('is-cb-achromatopsia') ||
		comicStrip.classList.contains('is-cb-achromatomaly')
	) {
		comicStrip.classList.remove('is-cb-protanopia','is-cb-protanomaly','is-cb-deuteranopia','is-cb-deuteranomaly','is-cb-tritanopia','is-cb-tritanomaly','is-cb-achromatopsia','is-cb-achromatomaly');
	}
}

// To refresh bubbles // Eventually this will be irrelevant
bubbleBtn.addEventListener('click', function(e){
	bubbles();
	e.preventDefault;
});

function bubblesResize() {
	
}

function bubbleBrowserZoom() {
  let para = document.querySelector('.bubble');
  let compStyles = window.getComputedStyle(para);
  
  if( parseInt(compStyles.getPropertyValue('font-size'), 10) > 23 ) {

    comicStrip.classList.add('is-closed-caption-mode', 'is-browserZoom');
	ccBtn.classList.add('is-active');
	ccBtn.setAttribute('aria-pressed', true);
	// ccBtn.disabled = true;

  }
}

function bubbles() {
	comicStrip.classList.add('is-loading'); // Force the desktop width and height to normalise the stroke width.

	// bubblesResize(); // Resize font to the normalised desktop size
	// bubbleBrowserZoom(); // Detect if the browser has zoom - if so remove bubbles and replace with captions
  
	document.querySelectorAll('.bubble svg').forEach(function(item){
		item.remove(); // Remove all current bubble SVG graphics.
	});

  // Apply new bubble SVG graphics.
  document.querySelectorAll('.bubble').forEach(function(i){

    // -------------------------------------------------------
    // Bubble settings
    // -------------------------------------------------------
    xmlns = "http://www.w3.org/2000/svg";
    b_stroke = 4; // Bubble stroke thickness
    b_handle_length = 8; // This is how much curvature the bubble will have.
    b_width = i.clientWidth; // Bubble width
    b_height = i.clientHeight; // Bubble height

    // Tail direction - left or right
    t_direction = i.dataset.direction;

    // $l = Length // Elongate SVG to make room for the tail, while retaining the bubble dimensions - short, normal, long or numeric pixel dimension
    if( i.dataset.length == "short" ) { t_length = 50; }
    else if( i.dataset.length == "normal" ) { t_length = 100; }
    else if( i.dataset.length == "long" ) { t_length = 200; }
    else { t_length = i.dataset.length; } // Or numeric pixel dimension

    // -------------------------------------------------------
    // Bubble coordinates
    // -------------------------------------------------------

    // Node 1 coordinates
    b_1_node_x = b_stroke / 2;                                                  // Node 1 X coordinate
    b_1_node_y = b_height / 2;                                                  // Node 1 Y coordinate

    b_1_handle_in_x = b_1_node_x;                                               // Node 1 in controller X coordinate
    b_1_handle_in_y = (b_height / b_handle_length) * (b_handle_length - 1);     // Node 1 in controller Y coordinate

    b_1_handle_out_x = b_1_node_x;                                              // Node 1 out controller X coordinate
    b_1_handle_out_y = b_height / b_handle_length;                              // Node 1 out controller Y coordinate

    // Node 2 coordinates
    b_2_node_x = b_width / 2;                                                   // Node 2 X coordinate
    b_2_node_y = b_stroke / 2;                                                  // Node 2 Y coordinate

    b_2_handle_in_x = b_width / b_handle_length;                                // Node 2 in controller X coordinate
    b_2_handle_in_y = b_2_node_y;                                               // Node 2 in controller Y coordinate;

    b_2_handle_out_x = (b_width / b_handle_length) * (b_handle_length - 1);     // Node 2 out controller X coordinate
    b_2_handle_out_y = b_2_node_y;                                              // Node 2 out controller Y coordinate
    
    // Node 3 coordinates
    b_3_node_x = b_width - (b_stroke / 2);                                      // Node 3 X coordinate
    b_3_node_y = b_1_node_y;                                                    // Node 3 Y coordinate

    b_3_handle_in_x = b_3_node_x;                                               // Node 3 in controller X coordinate
    b_3_handle_in_y = b_1_handle_out_y;                                         // Node 3 in controller Y coordinate

    b_3_handle_out_x = b_3_node_x;                                              // Node 3 out controller X coordinate
    b_3_handle_out_y = b_1_handle_in_y;                                         // Node 3 out controller Y coordinate
    
    // Node 4 coordinates
    b_4_node_x = b_2_node_x;                                                    // Node 4 X coordinate
    b_4_node_y = b_height - (b_stroke / 2);                                     // Node 4 Y coordinate
    
    b_4_handle_in_x = b_2_handle_out_x;                                         // Node 4 in controller X coordinate
    b_4_handle_in_y = b_4_node_y;                                               // Node 4 in controller Y coordinate

    b_4_handle_out_x = b_2_handle_in_x;                                         // Node 4 out controller X coordinate
    b_4_handle_out_y = b_4_node_y;                                              // Node 4 out controller Y coordinate

    // -------------------------------------------------------
    // Bubble pattern
    // -------------------------------------------------------

    // Move to Node 1
    b_path = 'M' + b_1_node_x + ',' + b_1_node_y + ' ';                         // Move to node 1 X,Y coordinate
    
    // Draw the first curve to node 2
    b_path += 'C' + b_1_handle_out_x + ',' + b_1_handle_out_y;                  // Cubic bezier node1 OUT handle X,Y coordinate
    b_path += ' ' + b_2_handle_in_x + ',' + b_2_handle_in_y;                    // Cubic bezier node2 IN handle X,Y coordinate
    b_path += ' ' + b_2_node_x + ',' + b_2_node_y;                              // Cubic bezier node2 X,Y coordinate
    
    // // Draw the second curve to node 3 - Continuing the curve does not require the OUT handle
    b_path += 'S' + b_3_handle_in_x + ',' + b_3_handle_in_y;                    // Cubic bezier node 3 IN handle X,Y coordinate
    b_path += ' ' + b_3_node_x + ',' + b_3_node_y + ' ';                        // Cubic bezier node 3 X,Y coordinate
    
    // // Draw the third curve to node 4 - Continuing the curve does not require the OUT handle
    b_path += 'S' + b_4_handle_in_x + ',' + b_4_handle_in_y;                    // Cubic bezier node 4 IN handle X,Y coordinate
    b_path += ' ' + b_4_node_x + ',' + b_4_node_y;                              // Cubic bezier node 4 X,Y coordinate
    
    // // Draw the fourth curve to node 1 - Continuing the curve does not require the OUT handle
    b_path += 'S' + b_1_handle_in_x + ',' + b_1_handle_in_y;                    // Cubic bezier node 4 IN handle X,Y coordinate
    b_path += ' ' + b_1_node_x + ',' + b_1_node_y;                              // Cubic bezier node 4 X,Y coordinate
    
    // // Close the path
    b_path += ' ' + 'z';


    // -------------------------------------------------------
    // Tail coordinates
    // -------------------------------------------------------

    // If the tail is positioned on the left of the bubble
    if( i.dataset.position == "left" ) {

      // -------------------------------------------------------
      // Bezier calc - Needed to calculate X,Y along a curve
      // -------------------------------------------------------

      // Node 1 x,y
      bezier_point_0 = {
        x: b_4_node_x  - ( b_stroke / 2 ),
        y: b_4_node_y - ( b_stroke / 2 )
      };

      // Controller Node 4 OUT
      bezier_control_out = {
        x: b_4_handle_out_x - ( b_stroke / 2 ),
        y: b_4_handle_out_y - ( b_stroke / 2 )
      };

      // Controller Node 2 IN
      bezier_control_in = {
        x: b_1_handle_in_x - ( b_stroke / 2 ),
        y: b_1_handle_in_y - ( b_stroke / 2 )
      }

      // Node 2 x,y
      bezier_point_1 = {
        x: b_1_node_x - ( b_stroke / 2 ),
        y: b_1_node_y - ( b_stroke / 2 )
      };  

      bezier_node_1 = Bezier(bezier_point_0, bezier_control_out, bezier_control_in, bezier_point_1, '.45'),      // Return X and Y coordinates based on node location on bezier curve (.45)
      bezier_node_2 = Bezier(bezier_point_0, bezier_control_out, bezier_control_in, bezier_point_1, '.2');      // Return X and Y coordinates based on node location on bezier curve (.2)
    }

    // If the tail is positioned on the right of the bubble
    if( i.dataset.position == "right" ) {
      
      // Bezier calc - Needed to calculate X,Y along a curve
      // -------------------------------------------------------

      // Node 1 x,y
      bezier_point_0 = {
        x: b_4_node_x - ( b_stroke / 2 ),
        y: b_4_node_y - ( b_stroke / 2 )
      };

      // Controller Node 1 IN
      bezier_control_in = {
        x: b_4_handle_in_x - ( b_stroke / 2 ),
        y: b_4_handle_in_y - ( b_stroke / 2 )
      }

      // Controller Node 3 OUT
      bezier_control_out = {
        x: b_3_handle_out_x - ( b_stroke / 2 ),
        y: b_3_handle_out_y - ( b_stroke / 2 )
      };

      // The second point on curve
      bezier_point_1 = {
        x: b_3_node_x - ( b_stroke / 2 ),
        y: b_3_node_y - ( b_stroke / 2 )
      };

      bezier_node_1 = Bezier(bezier_point_0, bezier_control_in, bezier_control_out, bezier_point_1, '.2'),      // Return X and Y coordinates based on node location on bezier curve (.45)
      bezier_node_2 = Bezier(bezier_point_0, bezier_control_in, bezier_control_out, bezier_point_1, '.45');      // Return X and Y coordinates based on node location on bezier curve (.2)
    }

    // This is in quarter segments, add the correct alignment to the tail spike
    t_girth = (bezier_node_2.x - bezier_node_1.x) / 4;

    // If the tail is positioned in the middle of the bubble
    if( i.dataset.position == "center" ) { 

      t_girth = 10;

      bezier_node_2 = {
        x: (b_width / 2) + (t_girth * 2) - (b_stroke / 2),
        y: b_height - (b_stroke / 2) - (b_stroke / 2)
      }

      // Node 1 x,y
      bezier_point_0 = {
        x: (b_width / 2) - (t_girth * 2)  - (b_stroke / 2),
        y: b_height - (b_stroke / 2) - (b_stroke / 2)
      };

      // Controller Node 4 OUT
      bezier_control_out = {
        x: b_4_handle_out_x - ( b_stroke / 2 ) - (b_stroke / 2),
        y: b_4_handle_out_y - ( b_stroke / 2 ) - (b_stroke / 2)
      };

      // Controller Node 2 IN
      bezier_control_in = {
        x: b_1_handle_in_x - ( b_stroke / 2 ) - (b_stroke / 2),
        y: b_1_handle_in_y - ( b_stroke / 2 ) - (b_stroke / 2)
      }

      // Node 2 x,y
      bezier_point_1 = {
        x: (b_width / 2) + (t_girth * 2) - (b_stroke / 2),
        y: b_height - (b_stroke / 2) - (b_stroke / 2)
      };  

      bezier_node_1 = Bezier(bezier_point_0, bezier_control_out, bezier_control_in, bezier_point_1, '1'),      // Return X and Y coordinates based on node location on bezier curve (1)
      bezier_node_2 = Bezier(bezier_point_0, bezier_control_out, bezier_control_in, bezier_point_1, '0');      // Return X and Y coordinates based on node location on bezier curve (0)

      // This is in quarter segments, add the correct alignment to the tail spike
      t_girth = (bezier_node_2.x - bezier_node_1.x) / 2;

    }

    // -------------------------------------------------------
    // If the direction of the bubble is pointing to the left:
    // -------------------------------------------------------
    if ( t_direction == "left" ) {

      // Coordinates
      t_x0 = bezier_node_2.x;                       // Starting X coordinate
      t_y0 = bezier_node_2.y;                       // Starting Y coordinate
      t_x1 = bezier_node_1.x;                       // Horizontal line destination X coordinate
      t_y1 = bezier_node_1.y;                       // Horizontal line destination Y coordinate
      t_x2 = bezier_node_2.x;                       // Quadratic handle X coordinate
      t_y2 = bezier_node_2.y + (t_length / 10);     // Quadratic handle Y coordinate
      t_x3 = bezier_node_2.x - t_girth;             // Quadratic end X coordinate
      t_y3 = bezier_node_2.y + t_length;            // Quadratic end Y coordinate
      t_x4 = bezier_node_2.x;                       // Diagonal line X coordinate
      t_y4 = bezier_node_2.y;                       // Diagonal line Y coordinate
    }

    // -------------------------------------------------------
    // If the direction of the bubble is pointing to the right:
    // -------------------------------------------------------
    if ( t_direction == "right" ) {

      // Coordinates
      t_x0 = bezier_node_1.x;                       // Starting X coordinate
      t_y0 = bezier_node_1.y;                       // Starting Y coordinate
      t_x1 = bezier_node_2.x;                       // Horizontal line destination X coordinate
      t_y1 = bezier_node_2.y;                       // Horizontal line destination Y coordinate
      t_x2 = bezier_node_1.x;                       // Quadratic handle X coordinate
      t_y2 = bezier_node_1.y + (t_length / 10);     // Quadratic handle Y coordinate
      t_x3 = bezier_node_1.x + t_girth;             // Quadratic end X coordinate
      t_y3 = bezier_node_1.y + t_length;            // Quadratic end Y coordinate
      t_x4 = bezier_node_1.x;                       // Diagonal line X coordinate
      t_y4 = bezier_node_1.y;                       // Diagonal line Y coordinate
    }

    // -------------------------------------------------------
    // Tail Pattern
    // -------------------------------------------------------
    t_path  = 'M' + t_x0 + ',' + (t_y0 - 1);      // Move to x0 y0
    t_path += 'L' + t_x1 + ',' + (t_y1 - 1);      // Draw horizontal line to x1 y1
    t_path += 'Q' + t_x2 + ',' + t_y2;      // Quadratic bezier curve handle coordinates x3 y3
    t_path += ' ' + t_x3 + ',' + t_y3;      // Quadratic bezier curve end coordinate x4 y4
    t_path += 'L' + t_x4 + ',' + (t_y4 - 1);      // Draw a diagonal line to x2 y2
    t_path += 'z';                          // Close path


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
    t_svg_path1.setAttribute( 'fill' , '#000' );
    
    // Construct the front tail path
    t_svg_path2.setAttribute( 'd' , t_path );
    t_svg_path2.setAttribute( 'fill' , '#fff' );

    // Append the paths to the SVG in this order: tail behind, bubble, tail in front
    b_svg.appendChild(t_svg_path1);
    b_svg.appendChild(b_svg_path);
    b_svg.appendChild(t_svg_path2);

    // Append the completed SVG into the DOM
    i.appendChild(b_svg);
  });


  // Cleanup - remove the loading class
  comicStrip.classList.remove('is-loading');

  bubblesResize(); // Resize the font once more.
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


// /*
//   * Get new x,y on curve by given x
//   * @params a,b,c,d {x:x,y:y}
//   * @params x 
//   * @return {{x:new x on curve, y:new y on curve}}
// */
// function YBX(a,b,c,d,x){

// 	a = a.x;
// 	b = b.x;
// 	c = c.x;
// 	d = d.x;
	
// 	// Lets expand this 
// 	// x = a * (1-t)³ + b * 3 * (1-t)²t + c * 3 * (1-t)t² + d * t³
// 	//------------------------------------------------------------
// 	// x = a - 3at + 3at² - at³ 
// 	//       + 3bt - 6bt² + 3bt³
// 	//             + 3ct² - 3ct³
// 	//                    + dt³
// 	//--------------------------------
// 	// x = - at³  + 3bt³ - 3ct³ + dt³
// 	//     + 3at² - 6bt² + 3ct²
// 	//     - 3at + 3bt
// 	//     + a
// 	//--------------------------------
// 	// 0 = t³ (-a+3b-3c+d) +  => A
// 	//     t² (3a-6b+3c)   +  => B
// 	//     t  (-3a+3b)     +  => c
// 	//     a - x              => D
// 	//--------------------------------
	
// 	var A = d - 3*c + 3*b - a,
// 		B = 3*c - 6*b + 3*a,
// 		C = 3*b - 3*a,
// 		D = a-x;
		
// 	// So we need to solve At³ + Bt² + Ct + D = 0     
// 	var t =  cubic(A,B,C,D); 
	
// 	// Replace the t on Bezier function and get x,y 
// 	var p = Bezier(p0,c0,c1,p1,t);
	
// 	return p;
//   }

// /*
//   * Cubic Equation Calculator 
//   * refer to http://www.1728.org/cubic.htm
//   *
//   * ax³ + bx² + cx + d = 0 
//   * @params a,b,c,d
//   * @return x
// */
// function cubic(a,b,c,d){
//   var m,m2,k,n,n2,x,r,rc,theta,sign,dans;
  
//   var f = eval(((3*c)/a) - (((b*b)/(a*a))))/3;
//   var g = eval((2*((b*b*b)/(a*a*a))-(9*b*c/(a*a)) + ((27*(d/a)))))/27;
//   var h = eval(((g*g)/4) + ((f*f*f)/27));
  
//   if (h > 0) {
    
//     m = eval(-(g/2)+ (Math.sqrt(h)));
//     k = m < 0 ? -1:1;
//     m2 = eval(Math.pow((m*k),(1/3)));
//     m2 = m2*k;
//     n = eval(-(g/2)- (Math.sqrt(h)));
//     k = n<0 ? -1:1;
//     n2 = eval(Math.pow((n*k),(1/3)));
//     n2 = n2*k;
//     x= eval ((m2 + n2) - (b/(3*a)));
      
//   } else {
//     r = (eval(Math.sqrt((g*g/4)-h)));
//     k = r<0 ? -1:1;
//     rc = Math.pow((r*k),(1/3))*k;
//     theta = Math.acos((-g/(2*r)));
//     x=eval (2*(rc*Math.cos(theta/3))-(b/(3*a)));
//     x=x*1E+14;
//     x=Math.round(x);
//     x=(x/1E+14);
//   }
  
//   if ((f+g+h)==0) {
//     if (d<0) {sign=-1}
//     if (d>=0) {sign=1}
//     if (sign>0){dans=Math.pow((d/a),(1/3));dans=dans*-1}
//     if (sign<0){d=d*-1;dans=Math.pow((d/a),(1/3))}
//     x=dans;
//   }
//   return x;
// }