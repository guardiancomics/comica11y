// Selectors
var comicStrip = document.querySelector('.comic-strip');
var comicFrame = document.querySelectorAll('.comic-frame');
var highContrastBtn = document.querySelector('.js-highcontrast');
var rtlBtn = document.querySelector('.js-rtl');
var ccBtn = document.querySelector('.js-closedcaptions');
var bubbleBtn = document.querySelector('.js-bubbles');

// Tabs
window.a11yTabs = (function tabsComponentIIFE(global, document) {
    'use strict';

    const tabInstances = new WeakMap();

    /**
     * Instantiates the component
     * @constructor
     * @param {DOM Node} element
     */
    const TabComponent = function TabComponent(element, options) {
        if (!element || !element.nodeType) {
            throw new Error(
                'The DOM element was not found when creating the tab component',
            );
        }
        const defaults = {
            tabList: '.tab-list',
            tabItem: '.tab-item',
            tabLink: '.tab-link',
            tabPanel: '.tab-panel',
        };
        this.options = Object.assign(defaults, options);

        this.element = element;
        this.tabList = element.querySelector(this.options.tabList);
        this.tabItems = [].slice.call(
            this.tabList.querySelectorAll(this.options.tabItem),
        );
        this.tabLinks = [].slice.call(
            this.tabList.querySelectorAll(this.options.tabLink),
        );
        this.tabPanels = [].slice.call(
            element.querySelectorAll(this.options.tabPanel),
        );

        this.currentIndex = 0;

        this.tabList.setAttribute('role', 'tablist');

        this.tabItems.forEach((item, index) => {
            item.setAttribute('role', 'presentation');

            if (index === 0) {
                item.setAttribute('data-tab-active', '');
            }
        });

        this.tabLinks.forEach((item, index) => {
            item.setAttribute('role', 'tab');
            item.setAttribute('id', 'tab' + index);

            if (index > 0) {
                item.setAttribute('tabindex', '-1');
            }
            else {
                item.setAttribute('aria-selected', 'true');
            }
        });

        this.tabPanels.forEach((item, index) => {
            item.setAttribute('role', 'tabpanel');
            item.setAttribute('aria-labelledby', 'tab' + index);
            item.setAttribute('tabindex', '-1');

            if (index > 0) {
                item.setAttribute('hidden', '');
            }
        });

        this.eventCallback = handleEvents.bind(this);
        this.tabList.addEventListener('click', this.eventCallback, false);
        this.tabList.addEventListener('keydown', this.eventCallback, false);

        tabInstances.set(this.element, this);
    };

    TabComponent.prototype = {
        /**
         * Event handler for all tab interactions
         * @param {number} index - Index of the tab being activiated
         * @param {string} direction -
         */
        handleTabInteraction: function handleTabInteraction(index, direction) {
            const currentIndex = this.currentIndex;
            var newIndex = index;

            // The click event does not pass in a direction. This is for
            // keyboard support
            if (direction) {
                if (direction === 37) {
                    newIndex = index - 1;
                }
                else {
                    newIndex = index + 1;
                }
            }

            // Supports continuous tabbing when reaching beginning or end of
            // tab list
            if (newIndex < 0) {
                newIndex = this.tabLinks.length - 1;
            }
            else if (newIndex === this.tabLinks.length) {
                newIndex = 0;
            }

            // update tabs
            this.tabLinks[currentIndex].setAttribute('tabindex', '-1');
            this.tabLinks[currentIndex].removeAttribute('aria-selected');
            this.tabItems[currentIndex].removeAttribute('data-tab-active');

            this.tabLinks[newIndex].setAttribute('aria-selected', 'true');
            this.tabItems[newIndex].setAttribute('data-tab-active', '');
            this.tabLinks[newIndex].removeAttribute('tabindex');
            this.tabLinks[newIndex].focus();

            // update tab panels
            this.tabPanels[currentIndex].setAttribute('hidden', '');
            this.tabPanels[newIndex].removeAttribute('hidden');

            this.currentIndex = newIndex;

            return this;
        },

        /**
         * Set tab panel focus
         * @param {number} index - Tab panel index to receive focus
         */
        handleTabpanelFocus: function handleTabPanelFocus(index) {
            this.tabPanels[index].focus();

            return this;
        },
    };

    /**
     * Creates or returns existing component
     * @param {string} selector
     */
    function createTabComponent(selector, options) {
        const element = document.querySelector(selector);
        return tabInstances.get(element) || new TabComponent(element, options);
    }

    /**
     * Destroys an existing component
     * @param {DOM Node} element
     */
    function destroyTabComponent(element) {
        if (!element || !element.nodeType) {
            throw new Error(
                'The DOM element was not found when deleting the tab component',
            );
        }

        var component = tabInstances.get(element);
        component.tabList.removeAttribute('role', 'tablist');

        component.tabItems.forEach((item, index) => {
            item.removeAttribute('role', 'presentation');

            if (index === 0) {
                item.removeAttribute('data-tab-active');
            }
        });

        component.tabLinks.forEach((item, index) => {
            item.removeAttribute('role', 'tab');
            item.removeAttribute('id', 'tab' + index);

            if (index > 0) {
                item.removeAttribute('tabindex', '-1');
            }
            else {
                item.removeAttribute('aria-selected', 'true');
            }
        });

        component.tabPanels.forEach((item, index) => {
            item.removeAttribute('role', 'tabpanel');
            item.removeAttribute('aria-labelledby', 'tab' + index);
            item.removeAttribute('tabindex', '-1');

            if (index > 0) {
                item.removeAttribute('hidden');
            }
        });

        component.tabList.removeEventListener('click', component.eventCallback);
        component.tabList.removeEventListener('keydown',
            component.eventCallback);
        tabInstances.delete(component.element);
    }

    /**
     * Handles all event listener callbacks
     * @param {event} event
     */
    function handleEvents(event) {
        if (event.type === 'click') {
            event.preventDefault();
            TabComponent.prototype.handleTabInteraction.call(
                this,
                this.tabLinks.indexOf(event.target),
            );
        }

        if (event.type === 'keydown') {
            const index = this.tabLinks.indexOf(event.target);

            // Left and right arrows
            if (event.which === 37 || event.which === 39) {
                event.preventDefault();
                TabComponent.prototype.handleTabInteraction.call(
                    this,
                    index,
                    event.which,
                );
            }

            // Down arrow
            if (event.which === 40) {
                event.preventDefault();
                TabComponent.prototype.handleTabpanelFocus.call(this, index);
            }
        }
    }

    return {
        create: createTabComponent,
        destroy: destroyTabComponent,
    };
})(window, document);

const tabComponent = a11yTabs.create('[data-tab-component]');

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Resize bubbles
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
window.addEventListener('resize', function(event) {
    if (timeout) { window.cancelAnimationFrame(timeout); }
    timeout = window.requestAnimationFrame(function() {
        bubbles();
    });
}, false);

document.querySelectorAll('.caption-sr').forEach(function(item) {
    item.addEventListener('focus', (event) => {
        event.target.parentNode.classList.add('is-active');
    });
    item.addEventListener('blur', (event) => {
        event.target.parentNode.classList.remove('is-active');
    });
});

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// When clicking a comic-frame, send the focus to the caption
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
document.querySelectorAll('.comic-frame').forEach(function(item) {
    item.addEventListener('click', function(itemClick) {
        item.lastElementChild.focus();
    });
});

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Toggle high contrast mode
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
highContrastBtn.addEventListener('click', function(e) {
    if (!highContrastBtn.checked == false) {
        highContrastBtn.checked = true;
        highContrastBtn.setAttribute('aria-pressed', 'true');
        comicStrip.classList.add('is-high-contrast-mode');

        var comicImg = document.querySelectorAll('.comic-image img');
        comicImg.forEach(function(strip) {
            var contrastUrl = strip.dataset.contrast;
            strip.setAttribute('src', contrastUrl);
        });
    }
    else {
        highContrastBtn.checked = false;
        highContrastBtn.setAttribute('aria-pressed', 'false');
        comicStrip.classList.remove('is-high-contrast-mode');

        var comicImg = document.querySelectorAll('.comic-image img');
        comicImg.forEach(function(strip) {
            var srcUrl = strip.dataset.src;
            strip.setAttribute('src', srcUrl);
        });
    }

    e.preventDefault;
});

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Toggle RTL / LTR mode
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
rtlBtn.addEventListener('click', function() {
    if (!rtlBtn.checked == false) {
        rtlBtn.checked = true;
        rtlBtn.setAttribute('aria-pressed', 'true');
        comicStrip.classList.add('is-rtl-mode');
    }
    else {
        rtlBtn.checked = false;
        rtlBtn.setAttribute('aria-pressed', 'false');
        comicStrip.classList.remove('is-rtl-mode');
    }
});

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Toggle closed caption mode
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
ccBtn.addEventListener('click', function() {
    if (!ccBtn.checked == false) {
        ccBtn.checked = true;
        ccBtn.setAttribute('aria-pressed', 'true');
        comicStrip.classList.add('is-closed-caption-mode');

        document.querySelector('.comic-strip').
            firstElementChild.
            lastElementChild.
            focus();
    }
    else {
        ccBtn.checked = false;
        ccBtn.setAttribute('aria-pressed', 'false');
        comicStrip.classList.remove('is-closed-caption-mode');

        // Reset the font-size back to 100% and deactive captions
        document.querySelector('.comic-strip').dataset.fontsize = '100';
        document.querySelector('.font-sizer .label strong').innerHTML = '100%';
        document.querySelectorAll('.comic-strip .caption-closed').
            forEach(function(item) {
                item.style.fontSize = '100%';
            });

        // Send focus back to contrast button
        document.querySelector('.js-closedcaptions').focus();

        // Reset the buttons
        document.querySelector('.js-resize-up').disabled = false;
        document.querySelector('.js-resize-down').disabled = true;

        // Reset the font-size
        comicStrip.removeAttribute('style');
    }
});

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Increase / decrease font size
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
document.querySelectorAll('.font-sizer .btn').forEach(function(item) {
    item.addEventListener('click', function(e) {
        var currentSize = document.querySelector('.comic-strip').dataset.fontsize;
        if (item.classList.contains('js-resize-up')) {
            currentSize = parseFloat(currentSize) + 10;
        }
        if (item.classList.contains('js-resize-down')) {
            currentSize = parseFloat(currentSize) - 10;
        }

        // Removed disbaled button state while we're in the 110% - 190%
        // font-size state
        if (currentSize != 100 && currentSize != 200) {
            document.querySelector('.js-resize-down').disabled = false;
            document.querySelector('.js-resize-up').disabled = false;
        }

        // If it's font size above 100 add .is-resized
        if (currentSize != 100) {
            comicStrip.classList.add('is-closed-caption-mode', 'is-resized');
            ccBtn.checked = true;
            ccBtn.setAttribute('aria-pressed', 'true');
            document.querySelector('.comic-strip').
                firstElementChild.
                lastElementChild.
                focus();
        }
        else {
            if (!comicStrip.classList.contains('is-browserZoom')) {
                comicStrip.classList.remove('is-closed-caption-mode');
                ccBtn.checked = false;
                ccBtn.setAttribute('aria-pressed', 'false');
            }
            comicStrip.classList.remove('is-resized');
        }

        // Add disabled state to resize down at font-size 100%
        if (currentSize == 100) {
            document.querySelector('.js-resize-down').disabled = true;
            comicStrip.removeAttribute('style');
        }
        else {
            comicStrip.setAttribute('style', 'font-size: ' + currentSize + '%');
        }

        // Add disabled state to resize up at font-size 200%
        if (currentSize == 200) {
            document.querySelector('.js-resize-up').disabled = true;
        }

        // Upkeep
        comicStrip.dataset.fontsize = currentSize; // Update the data-attribute
                                                   // to reflect to increase /
                                                   // decrease.

        document.querySelector(
            '.font-sizer .label strong').innerHTML = currentSize + '%'; // Update
                                                                        // the
                                                                        // font
                                                                        // size
                                                                        // inline
                                                                        // text.
        // document.querySelectorAll('.comic-strip
        // .caption-closed').forEach(function (item) { item.style.fontSize =
        // currentSize + '%'; // Update the font-size css value on comic-strip.
        // });

        e.preventDefault;
    });
});

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// colourvision mode
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Colour blind reset
function colourvisionReset() {

    if (
        comicStrip.classList.contains('is-cb-protanopia') ||
        comicStrip.classList.contains('is-cb-protanomaly') ||
        comicStrip.classList.contains('is-cb-deuteranopia') ||
        comicStrip.classList.contains('is-cb-deuteranomaly') ||
        comicStrip.classList.contains('is-cb-tritanopia') ||
        comicStrip.classList.contains('is-cb-tritanomaly') ||
        comicStrip.classList.contains('is-cb-achromatopsia') ||
        comicStrip.classList.contains('is-cb-achromatomaly')
    ) {
        comicStrip.classList.remove('is-cb-protanopia', 'is-cb-protanomaly',
            'is-cb-deuteranopia', 'is-cb-deuteranomaly', 'is-cb-tritanopia',
            'is-cb-tritanomaly', 'is-cb-achromatopsia', 'is-cb-achromatomaly');
    }
}

// Colour blind toggle
document.querySelector('.js-colourvision').
    addEventListener('change', function(e) {
        var sel = e.srcElement;
        var opt = sel.options[sel.selectedIndex];
        var mode = opt.value;

        // Reset colourvision mode
        colourvisionReset();
        if (mode != 'normal') {
            document.querySelector('.comic-strip').
                classList.
                add('is-cb-' + mode);
        }
        else {
            colourvisionReset();
        }
    });

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Bubbles
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Generate the bubbles
function bubbles() {

    var frameWidth = document.querySelector('.comic-frame').offsetWidth - 10 +
        'px';
    document.querySelectorAll('.bubble').forEach(function(item) {

        var bubbleAttribute = item.getAttribute('style');
        bubbleAttribute = bubbleAttribute + ', max-width' + frameWidth;
        item.setAttribute('style', bubbleAttribute);

    });

    comicStrip.classList.add('is-loading'); // Force the desktop width and
                                            // height to normalise the stroke
                                            // width.

    // bubblesResize(); // Resize font to the normalised desktop size
    // browserZoom(); // Detect if the browser has zoom - if so remove bubbles
    // and replace with captions

    document.querySelectorAll('.bubble svg').forEach(function(item) {
        item.remove(); // Remove all current bubble SVG graphics.
    });

    // Apply new bubble SVG graphics.
    document.querySelectorAll('.bubble').forEach(function(i) {

        // -------------------------------------------------------
        // Bubble settings
        // -------------------------------------------------------
        var xmlns = 'http://www.w3.org/2000/svg';
        var b_stroke = 4; // Bubble stroke thickness
        var b_handle_length = 8; // This is how much curvature the bubble will
                                 // have.
        var b_width = i.clientWidth; // Bubble width
        var b_height = i.clientHeight; // Bubble height

        // Tail direction - left or right
        var t_direction = i.dataset.direction;

        // $l = Length // Elongate SVG to make room for the tail, while
        // retaining the bubble dimensions - short, normal, long or numeric
        // pixel dimension
        var t_length = i.dataset.length;
        if (i.dataset.length == 'short') { t_length = 50; }
        else if (i.dataset.length == 'normal') { t_length = 100; }
        else if (i.dataset.length == 'long') { t_length = 200; }

        // -------------------------------------------------------
        // Bubble coordinates
        // -------------------------------------------------------

        // Node 1 coordinates
        var b_1_node_x = b_stroke / 2;                                                  // Node 1 X coordinate
        var b_1_node_y = b_height / 2;                                                  // Node 1 Y coordinate

        var b_1_handle_in_x = b_1_node_x;                                               // Node 1 in controller X coordinate
        var b_1_handle_in_y = (b_height / b_handle_length) *
            (b_handle_length - 1);     // Node 1 in controller Y coordinate

        var b_1_handle_out_x = b_1_node_x;                                              // Node 1 out controller X coordinate
        var b_1_handle_out_y = b_height / b_handle_length;                              // Node 1 out controller Y coordinate

        // Node 2 coordinates
        var b_2_node_x = b_width / 2;                                                   // Node 2 X coordinate
        var b_2_node_y = b_stroke / 2;                                                  // Node 2 Y coordinate

        var b_2_handle_in_x = b_width / b_handle_length;                                // Node 2 in controller X coordinate
        var b_2_handle_in_y = b_2_node_y;                                               // Node 2 in controller Y coordinate;

        var b_2_handle_out_x = (b_width / b_handle_length) * (b_handle_length - 1);     // Node 2 out controller X coordinate
        var b_2_handle_out_y = b_2_node_y;                                              // Node 2 out controller Y coordinate

        // Node 3 coordinates
        var b_3_node_x = b_width - (b_stroke / 2);                                      // Node 3 X coordinate
        var b_3_node_y = b_1_node_y;                                                    // Node 3 Y coordinate

        var b_3_handle_in_x = b_3_node_x;                                               // Node 3 in controller X coordinate
        var b_3_handle_in_y = b_1_handle_out_y;                                         // Node 3 in controller Y coordinate

        var b_3_handle_out_x = b_3_node_x;                                              // Node 3 out controller X coordinate
        var b_3_handle_out_y = b_1_handle_in_y;                                         // Node 3 out controller Y coordinate

        // Node 4 coordinates
        var b_4_node_x = b_2_node_x;                                                    // Node 4 X coordinate
        var b_4_node_y = b_height - (b_stroke / 2);                                     // Node 4 Y coordinate

        var b_4_handle_in_x = b_2_handle_out_x;                                         // Node 4 in controller X coordinate
        var b_4_handle_in_y = b_4_node_y;                                               // Node 4 in controller Y coordinate

        var b_4_handle_out_x = b_2_handle_in_x;                                         // Node 4 out controller X coordinate
        var b_4_handle_out_y = b_4_node_y;                                              // Node 4 out controller Y coordinate

        // -------------------------------------------------------
        // Bubble pattern
        // -------------------------------------------------------

        // Move to Node 1
        var b_path = 'M' + b_1_node_x + ',' + b_1_node_y + ' ';                         // Move to node 1 X,Y coordinate

        // Draw the first curve to node 2
        b_path += 'C' + b_1_handle_out_x + ',' + b_1_handle_out_y;                  // Cubic bezier node1 OUT handle X,Y coordinate
        b_path += ' ' + b_2_handle_in_x + ',' + b_2_handle_in_y;                    // Cubic bezier node2 IN handle X,Y coordinate
        b_path += ' ' + b_2_node_x + ',' + b_2_node_y;                              // Cubic bezier node2 X,Y coordinate

        // // Draw the second curve to node 3 - Continuing the curve does not
        // require the OUT handle
        b_path += 'S' + b_3_handle_in_x + ',' + b_3_handle_in_y;                    // Cubic bezier node 3 IN handle X,Y coordinate
        b_path += ' ' + b_3_node_x + ',' + b_3_node_y + ' ';                        // Cubic bezier node 3 X,Y coordinate

        // // Draw the third curve to node 4 - Continuing the curve does not
        // require the OUT handle
        b_path += 'S' + b_4_handle_in_x + ',' + b_4_handle_in_y;                    // Cubic bezier node 4 IN handle X,Y coordinate
        b_path += ' ' + b_4_node_x + ',' + b_4_node_y;                              // Cubic bezier node 4 X,Y coordinate

        // // Draw the fourth curve to node 1 - Continuing the curve does not
        // require the OUT handle
        b_path += 'S' + b_1_handle_in_x + ',' + b_1_handle_in_y;                    // Cubic bezier node 4 IN handle X,Y coordinate
        b_path += ' ' + b_1_node_x + ',' + b_1_node_y;                              // Cubic bezier node 4 X,Y coordinate

        // // Close the path
        b_path += ' ' + 'z';

        // -------------------------------------------------------
        // Tail coordinates
        // -------------------------------------------------------

        // If the tail is positioned on the left of the bubble
        if (i.dataset.position === 'left') {

            // -------------------------------------------------------
            // Bezier calc - Needed to calculate X,Y along a curve
            // -------------------------------------------------------

            // Node 1 x,y
            var bezier_point_0 = {
                x: b_4_node_x - (b_stroke / 2),
                y: b_4_node_y - (b_stroke / 2),
            };

            // Controller Node 4 OUT
            var bezier_control_out = {
                x: b_4_handle_out_x - (b_stroke / 2),
                y: b_4_handle_out_y - (b_stroke / 2),
            };

            // Controller Node 2 IN
            var bezier_control_in = {
                x: b_1_handle_in_x - (b_stroke / 2),
                y: b_1_handle_in_y - (b_stroke / 2),
            };

            // Node 2 x,y
            var bezier_point_1 = {
                x: b_1_node_x - (b_stroke / 2),
                y: b_1_node_y - (b_stroke / 2),
            };

            var bezier_node_1 = Bezier(bezier_point_0, bezier_control_out,
                bezier_control_in, bezier_point_1, '.45');      // Return X and
                                                                // Y
                                                                // coordinates
                                                                // based on
                                                                // node
                                                                // location on
                                                                // bezier curve
                                                                // (.45)
            var bezier_node_2 = Bezier(bezier_point_0, bezier_control_out,
                    bezier_control_in, bezier_point_1, '.2');      // Return X
                                                                   // and Y
                                                                   // coordinates
                                                                   // based on
                                                                   // node
                                                                   // location
                                                                   // on bezier
                                                                   // curve
                                                                   // (.2)
            // This is in quarter segments, add the correct alignment to the tail
            // spike
            var t_girth = (bezier_node_2.x - bezier_node_1.x) / 4;

        } else if (i.dataset.position === 'right') {
            // If the tail is positioned on the right of the bubble
            // else if (i.dataset.position == 'right') {

            // Bezier calc - Needed to calculate X,Y along a curve
            // -------------------------------------------------------

            // Node 1 x,y
            var bezier_point_0 = {
                x: b_4_node_x - (b_stroke / 2),
                y: b_4_node_y - (b_stroke / 2),
            };

            // Controller Node 1 IN
            var bezier_control_in = {
                x: b_4_handle_in_x - (b_stroke / 2),
                y: b_4_handle_in_y - (b_stroke / 2),
            };

            // Controller Node 3 OUT
            var bezier_control_out = {
                x: b_3_handle_out_x - (b_stroke / 2),
                y: b_3_handle_out_y - (b_stroke / 2),
            };

            // The second point on curve
            var bezier_point_1 = {
                x: b_3_node_x - (b_stroke / 2),
                y: b_3_node_y - (b_stroke / 2),
            };

            var bezier_node_1 = Bezier(bezier_point_0, bezier_control_in,
                bezier_control_out, bezier_point_1, '.2');      // Return X and
                                                                // Y
                                                                // coordinates
                                                                // based on
                                                                // node
                                                                // location on
                                                                // bezier curve
                                                                // (.45)
            var bezier_node_2 = Bezier(bezier_point_0, bezier_control_in,
                    bezier_control_out, bezier_point_1, '.45');      // Return
                                                                     // X and Y
                                                                     // coordinates
                                                                     // based
                                                                     // on node
                                                                     // location
                                                                     // on
                                                                     // bezier
                                                                     // curve
                                                                     // (.2)

            // This is in quarter segments, add the correct alignment to the tail
            // spike
            var t_girth = (bezier_node_2.x - bezier_node_1.x) / 4;

        } else {
            // If the tail is positioned in the middle of the bubble
            // else if (i.dataset.position == 'center') {

            var t_girth = 10;

            // Node 1 x,y
            var bezier_point_0 = {
                x: (b_width / 2) - (t_girth * 2) - (b_stroke / 2),
                y: b_height - (b_stroke / 2) - (b_stroke / 2),
            };

            // Controller Node 4 OUT
            var bezier_control_out = {
                x: b_4_handle_out_x - (b_stroke / 2) - (b_stroke / 2),
                y: b_4_handle_out_y - (b_stroke / 2) - (b_stroke / 2),
            };

            // Controller Node 2 IN
            var bezier_control_in = {
                x: b_1_handle_in_x - (b_stroke / 2) - (b_stroke / 2),
                y: b_1_handle_in_y - (b_stroke / 2) - (b_stroke / 2),
            };

            // Node 2 x,y
            var bezier_point_1 = {
                x: (b_width / 2) + (t_girth * 2) - (b_stroke / 2),
                y: b_height - (b_stroke / 2) - (b_stroke / 2),
            };

            var bezier_node_1 = Bezier(bezier_point_0, bezier_control_out,
                bezier_control_in, bezier_point_1, '1');      // Return X and Y
                                                              // coordinates
                                                              // based on node
                                                              // location on
                                                              // bezier curve
                                                              // (1)
            var bezier_node_2 = Bezier(bezier_point_0, bezier_control_out,
                    bezier_control_in, bezier_point_1, '0');      // Return X
                                                                  // and Y
                                                                  // coordinates
                                                                  // based on
                                                                  // node
                                                                  // location
                                                                  // on bezier
                                                                  // curve (0)

            // This is in quarter segments, add the correct alignment to the
            // tail spike
            t_girth = (bezier_node_2.x - bezier_node_1.x) / 2;

        }

        // -------------------------------------------------------
        // If the direction of the bubble is pointing to the left:
        // -------------------------------------------------------
        if (t_direction == 'left') {

            // Coordinates
            var t_x0 = bezier_node_2.x;                       // Starting X
                                                          // coordinate
            var t_y0 = bezier_node_2.y;                       // Starting Y
                                                          // coordinate
            var t_x1 = bezier_node_1.x;                       // Horizontal line
                                                          // destination X
                                                          // coordinate
            var t_y1 = bezier_node_1.y;                       // Horizontal line
                                                          // destination Y
                                                          // coordinate
            var t_x2 = bezier_node_2.x;                       // Quadratic handle X
                                                          // coordinate
            var t_y2 = bezier_node_2.y + (t_length / 10);     // Quadratic handle Y
                                                          // coordinate
            var t_x3 = bezier_node_2.x - t_girth;             // Quadratic end X
                                                          // coordinate
            var t_y3 = bezier_node_2.y + t_length;            // Quadratic end Y
                                                          // coordinate
            var t_x4 = bezier_node_2.x;                       // Diagonal line X
                                                          // coordinate
            var t_y4 = bezier_node_2.y;                       // Diagonal line Y
                                                          // coordinate
        }

        // -------------------------------------------------------
        // If the direction of the bubble is pointing to the right:
        // -------------------------------------------------------
        // else if (t_direction == 'right') {
        else {

            // Coordinates
            var t_x0 = bezier_node_1.x;                       // Starting X
                                                          // coordinate
            var t_y0 = bezier_node_1.y;                       // Starting Y
                                                          // coordinate
            var t_x1 = bezier_node_2.x;                       // Horizontal line
                                                          // destination X
                                                          // coordinate
            var t_y1 = bezier_node_2.y;                       // Horizontal line
                                                          // destination Y
                                                          // coordinate
            var t_x2 = bezier_node_1.x;                       // Quadratic handle X
                                                          // coordinate
            var t_y2 = bezier_node_1.y + (t_length / 10);     // Quadratic handle Y
                                                          // coordinate
            var t_x3 = bezier_node_1.x + t_girth;             // Quadratic end X
                                                          // coordinate
            var t_y3 = bezier_node_1.y + t_length;            // Quadratic end Y
                                                          // coordinate
            var t_x4 = bezier_node_1.x;                       // Diagonal line X
                                                          // coordinate
            var t_y4 = bezier_node_1.y;                       // Diagonal line Y
                                                          // coordinate
        }

        // -------------------------------------------------------
        // Tail Pattern
        // -------------------------------------------------------
        var t_path = 'M' + t_x0 + ',' + (t_y0 - 1);      // Move to x0 y0
        t_path += 'L' + t_x1 + ',' + (t_y1 - 1);      // Draw horizontal line
                                                      // to x1 y1
        t_path += 'Q' + t_x2 + ',' + t_y2;      // Quadratic bezier curve
                                                // handle coordinates x3 y3
        t_path += ' ' + t_x3 + ',' + t_y3;      // Quadratic bezier curve end
                                                // coordinate x4 y4
        t_path += 'L' + t_x4 + ',' + (t_y4 - 1);      // Draw a diagonal line
                                                      // to x2 y2
        t_path += 'z';                          // Close path

        // -------------------------------------------------------
        // Construction
        // -------------------------------------------------------
        var b_svg = document.createElementNS(xmlns, 'svg');
        var b_svg_path = document.createElementNS(xmlns, 'path');
        var t_svg_path1 = document.createElementNS(xmlns, 'path');
        var t_svg_path2 = document.createElementNS(xmlns, 'path');

        // Construct the SVG element
        b_svg.setAttribute('viewBox',
            '0 0 ' + b_width + ' ' + (b_height + t_length));
        b_svg.setAttribute('width', b_width);
        b_svg.setAttribute('height', (b_height + t_length));

        // Construct the bubble path
        b_svg_path.setAttribute('d', b_path);
        b_svg_path.setAttribute('stroke', '#000');
        b_svg_path.setAttribute('stroke-width', b_stroke);
        b_svg_path.setAttribute('stroke-linecap', 'round');
        b_svg_path.setAttribute('stroke-linejoin', 'round');
        b_svg_path.setAttribute('fill', '#fff');

        // Construct the behind tail path
        t_svg_path1.setAttribute('d', t_path);
        t_svg_path1.setAttribute('stroke', '#000');
        t_svg_path1.setAttribute('stroke-width', (b_stroke * 2));
        t_svg_path1.setAttribute('stroke-linecap', 'round');
        t_svg_path1.setAttribute('stroke-linejoin', 'round');
        t_svg_path1.setAttribute('fill', '#000');

        // Construct the front tail path
        t_svg_path2.setAttribute('d', t_path);
        t_svg_path2.setAttribute('fill', '#fff');

        // Append the paths to the SVG in this order: tail behind, bubble, tail
        // in front
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

// Init the bubbles
bubbles();

// Re-generate the bubbles on resize
var timeout; // For debouncing
function bubblesResize() {
    // Need to rework this functionality
    var w = document.querySelector('.comic-frame').offsetWidth / 265 + 'em';
    var bubbleSel = document.querySelectorAll('.bubble');

    bubbleSel.forEach(function(item) {
        item.setAttribute('style', 'font-size: ' + w);
    });
}

// If the zoom level has been set via the browser, activate the closed captions
function browserZoom() {
    var para = document.querySelector('.bubble');
    var compStyles = window.getComputedStyle(para);

    if (parseInt(compStyles.getPropertyValue('font-size'), 10) > 23) {
        comicStrip.classList.add('is-closed-caption-mode', 'is-browserZoom');
        ccBtn.checked = true;
        ccBtn.setAttribute('aria-pressed', true);
        // ccBtn.disabled = true;
    }
}

// To refresh bubbles // Eventually this will be irrelevant
bubbleBtn.addEventListener('click', function(e) {
    bubbles();
    e.preventDefault;
});

/*
  * Bezier Function
  * Get X,Y by t 
  * Refer to https://pomax.github.io/bezierinfo/
  * @params a,b,c,d {x:x,y:y}
  * @params t is between 0-1
  * @return {{x:x on curve ,y:y on curve}}
*/
function Bezier(a, b, c, d, t) {
    var point = {x: 0, y: 0},
        mt = 1 - t,
        mt2 = mt * mt,
        mt3 = mt2 * mt;

    //fx(t) = x1 * (1-t)³ + x2 * 3 * (1-t)²t + x3 * 3 * (1-t)t² + x4 * t³
    point.x = a.x * mt3 + b.x * 3 * mt2 * t + c.x * 3 * mt * t * t + d.x * t *
        t * t;

    //fy(t) = y1 * (1-t)³ + y2 * 3 * (1-t)²t + y3 * 3 * (1-t)t² + y4 * t³
    point.y = a.y * mt3 + b.y * 3 * mt2 * t + c.y * 3 * mt * t * t + d.y * t *
        t * t;

    return point;
}