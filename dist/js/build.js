var timeout,comicWrap=document.querySelector(".comic-wrap"),comicStrip=document.querySelector(".comic-strip"),comicFrame=document.querySelectorAll(".comic-frame");window.a11yTabs=function(e,t){"use strict";const i=new WeakMap,_=function(e,t){if(!e||!e.nodeType)throw new Error("The DOM element was not found when creating the tab component");this.options=Object.assign({tabList:".tab-list",tabItem:".tab-item",tabLink:".tab-link",tabPanel:".tab-panel"},t),this.element=e,this.tabList=e.querySelector(this.options.tabList),this.tabItems=[].slice.call(this.tabList.querySelectorAll(this.options.tabItem)),this.tabLinks=[].slice.call(this.tabList.querySelectorAll(this.options.tabLink)),this.tabPanels=[].slice.call(e.querySelectorAll(this.options.tabPanel)),this.currentIndex=0,this.tabList.setAttribute("role","tablist"),this.tabItems.forEach((e,t)=>{e.setAttribute("role","presentation"),0===t&&e.setAttribute("data-tab-active","")}),this.tabLinks.forEach((e,t)=>{e.setAttribute("role","tab"),e.setAttribute("id","tab"+t),t>0?e.setAttribute("tabindex","-1"):e.setAttribute("aria-selected","true")}),this.tabPanels.forEach((e,t)=>{e.setAttribute("role","tabpanel"),e.setAttribute("aria-labelledby","tab"+t),e.setAttribute("tabindex","-1"),t>0&&e.setAttribute("hidden","")}),this.eventCallback=n.bind(this),this.tabList.addEventListener("click",this.eventCallback,!1),this.tabList.addEventListener("keydown",this.eventCallback,!1),i.set(this.element,this)};function n(e){if("click"===e.type&&(e.preventDefault(),_.prototype.handleTabInteraction.call(this,this.tabLinks.indexOf(e.target))),"keydown"===e.type){const t=this.tabLinks.indexOf(e.target);37!==e.which&&39!==e.which||(e.preventDefault(),_.prototype.handleTabInteraction.call(this,t,e.which)),40===e.which&&(e.preventDefault(),_.prototype.handleTabpanelFocus.call(this,t))}}return _.prototype={handleTabInteraction:function(e,t){const i=this.currentIndex;let _=e;return t&&(_=37===t?e-1:e+1),_<0?_=this.tabLinks.length-1:_===this.tabLinks.length&&(_=0),this.tabLinks[i].setAttribute("tabindex","-1"),this.tabLinks[i].removeAttribute("aria-selected"),this.tabItems[i].removeAttribute("data-tab-active"),this.tabLinks[_].setAttribute("aria-selected","true"),this.tabItems[_].setAttribute("data-tab-active",""),this.tabLinks[_].removeAttribute("tabindex"),this.tabLinks[_].focus(),this.tabPanels[i].setAttribute("hidden",""),this.tabPanels[_].removeAttribute("hidden"),this.currentIndex=_,this},handleTabpanelFocus:function(e){return this.tabPanels[e].focus(),this}},{create:function(e,n){const r=t.querySelector(e);return i.get(r)||new _(r,n)},destroy:function(e){if(!e||!e.nodeType)throw new Error("The DOM element was not found when deleting the tab component");let t=i.get(e);t.tabList.removeAttribute("role","tablist"),t.tabItems.forEach((e,t)=>{e.removeAttribute("role","presentation"),0===t&&e.removeAttribute("data-tab-active")}),t.tabLinks.forEach((e,t)=>{e.removeAttribute("role","tab"),e.removeAttribute("id","tab"+t),t>0?e.removeAttribute("tabindex","-1"):e.removeAttribute("aria-selected","true")}),t.tabPanels.forEach((e,t)=>{e.removeAttribute("role","tabpanel"),e.removeAttribute("aria-labelledby","tab"+t),e.removeAttribute("tabindex","-1"),t>0&&e.removeAttribute("hidden")}),t.tabList.removeEventListener("click",t.eventCallback),t.tabList.removeEventListener("keydown",t.eventCallback),i.delete(t.element)}}}(window,document);const tabComponent=a11yTabs.create("[data-tab-component]");document.querySelectorAll(".caption-sr").forEach(function(e){e.addEventListener("focus",e=>{e.target.parentNode.classList.add("is-active")}),e.addEventListener("blur",e=>{e.target.parentNode.classList.remove("is-active")})}),highContrastBtn=document.querySelector(".js-highcontrast"),highContrastBtn.addEventListener("click",function(e){0==!highContrastBtn.checked?(highContrastBtn.checked=!0,highContrastBtn.setAttribute("aria-pressed","true"),comicStrip.classList.add("is-high-contrast-mode"),comicImg=document.querySelectorAll(".comic-image img"),comicImg.forEach(function(e){contrastUrl=e.dataset.contrast,e.setAttribute("src",contrastUrl)})):(highContrastBtn.checked=!1,highContrastBtn.setAttribute("aria-pressed","false"),comicStrip.classList.remove("is-high-contrast-mode"),comicImg=document.querySelectorAll(".comic-image img"),comicImg.forEach(function(e){srcUrl=e.dataset.colour,e.setAttribute("src",srcUrl)})),e.preventDefault}),verticalBtn=document.querySelector(".js-vertical"),verticalBtn.addEventListener("click",function(e){0==!verticalBtn.checked?(verticalBtn.checked=!0,verticalBtn.setAttribute("aria-pressed","true"),comicStrip.classList.add("is-vertical-mode")):(verticalBtn.checked=!1,verticalBtn.setAttribute("aria-pressed","false"),comicStrip.classList.remove("is-vertical-mode")),e.preventDefault});const ccBtn=document.querySelector(".js-closedcaptions"),captions=document.querySelectorAll(".caption-closed"),captionDock=document.querySelector(".caption-dock"),figcaptions=document.querySelectorAll(".caption-sr"),prevCaptionBtn=document.querySelector(".caption-dock__prev"),nextCaptionBtn=document.querySelector(".caption-dock__next");function browserZoom(){let e=document.querySelector(".bubble"),t=window.getComputedStyle(e);parseInt(t.getPropertyValue("font-size"),10)>23&&comicStrip.classList.add("is-browserZoom")}function bubbles(){frameWidth=document.querySelector(".comic-frame").offsetWidth-10+"px",document.querySelectorAll(".bubble").forEach(function(e){bubbleAttribute=e.getAttribute("style"),bubbleAttribute=bubbleAttribute+", max-width"+frameWidth,e.setAttribute("style",bubbleAttribute)}),comicStrip.classList.add("is-loading"),document.querySelectorAll(".bubble svg").forEach(function(e){e.remove()}),document.querySelectorAll(".bubble").forEach(function(e){xmlns="http://www.w3.org/2000/svg",b_stroke=3,b_handle_length=e.dataset.curve,b_width=e.clientWidth,b_height=e.clientHeight,t_direction=e.dataset.direction,"short"==e.dataset.length?t_length=50:"normal"==e.dataset.length?t_length=100:"long"==e.dataset.length?t_length=200:t_length=parseInt(e.dataset.length),b_1_node_x=b_stroke/2,b_1_node_y=b_height/2,b_1_handle_in_x=b_1_node_x,b_1_handle_in_y=b_height/b_handle_length*(b_handle_length-1),b_1_handle_out_x=b_1_node_x,b_1_handle_out_y=b_height/b_handle_length,b_2_node_x=b_width/2,b_2_node_y=b_stroke/2,b_2_handle_in_x=b_width/b_handle_length,b_2_handle_in_y=b_2_node_y,b_2_handle_out_x=b_width/b_handle_length*(b_handle_length-1),b_2_handle_out_y=b_2_node_y,b_3_node_x=b_width-b_stroke/2,b_3_node_y=b_1_node_y,b_3_handle_in_x=b_3_node_x,b_3_handle_in_y=b_1_handle_out_y,b_3_handle_out_x=b_3_node_x,b_3_handle_out_y=b_1_handle_in_y,b_4_node_x=b_2_node_x,b_4_node_y=b_height-b_stroke/2,b_4_handle_in_x=b_2_handle_out_x,b_4_handle_in_y=b_4_node_y,b_4_handle_out_x=b_2_handle_in_x,b_4_handle_out_y=b_4_node_y,b_path="M"+b_1_node_x+","+b_1_node_y+" ",b_path+="C"+b_1_handle_out_x+","+b_1_handle_out_y,b_path+=" "+b_2_handle_in_x+","+b_2_handle_in_y,b_path+=" "+b_2_node_x+","+b_2_node_y,b_path+="S"+b_3_handle_in_x+","+b_3_handle_in_y,b_path+=" "+b_3_node_x+","+b_3_node_y+" ",b_path+="S"+b_4_handle_in_x+","+b_4_handle_in_y,b_path+=" "+b_4_node_x+","+b_4_node_y,b_path+="S"+b_1_handle_in_x+","+b_1_handle_in_y,b_path+=" "+b_1_node_x+","+b_1_node_y,b_path+=" z","left"==e.dataset.position&&(bezier_point_0={x:b_4_node_x-b_stroke/2,y:b_4_node_y-b_stroke/2},bezier_control_out={x:b_4_handle_out_x-b_stroke/2,y:b_4_handle_out_y-b_stroke/2},bezier_control_in={x:b_1_handle_in_x-b_stroke/2,y:b_1_handle_in_y-b_stroke/2},bezier_point_1={x:b_1_node_x-b_stroke/2,y:b_1_node_y-b_stroke/2},bezier_node_1=Bezier(bezier_point_0,bezier_control_out,bezier_control_in,bezier_point_1,".45"),bezier_node_2=Bezier(bezier_point_0,bezier_control_out,bezier_control_in,bezier_point_1,".2"),t_girth=(bezier_node_2.x-bezier_node_1.x)/4,"left"==t_direction&&(t_x0=bezier_node_1.x,t_y0=bezier_node_1.y,t_x1=bezier_node_2.x,t_y1=bezier_node_2.y,t_x2=bezier_node_1.x,t_y2=bezier_node_1.y+t_length/10,t_x3=bezier_node_1.x+t_girth,t_y3=bezier_node_1.y+t_length,t_x4=bezier_node_1.x,t_y4=bezier_node_1.y),"right"==t_direction&&(t_x0=bezier_node_2.x,t_y0=bezier_node_2.y,t_x1=bezier_node_1.x,t_y1=bezier_node_1.y,t_x2=bezier_node_2.x,t_y2=bezier_node_2.y+t_length/10,t_x3=bezier_node_2.x-t_girth,t_y3=bezier_node_2.y+t_length,t_x4=bezier_node_2.x,t_y4=bezier_node_2.y)),"right"==e.dataset.position&&(bezier_point_0={x:b_4_node_x-b_stroke/2,y:b_4_node_y-b_stroke/2},bezier_control_in={x:b_4_handle_in_x-b_stroke/2,y:b_4_handle_in_y-b_stroke/2},bezier_control_out={x:b_3_handle_out_x-b_stroke/2,y:b_3_handle_out_y-b_stroke/2},bezier_point_1={x:b_3_node_x-b_stroke/2,y:b_3_node_y-b_stroke/2},bezier_node_1=Bezier(bezier_point_0,bezier_control_in,bezier_control_out,bezier_point_1,".2"),bezier_node_2=Bezier(bezier_point_0,bezier_control_in,bezier_control_out,bezier_point_1,".45"),t_girth=(bezier_node_2.x-bezier_node_1.x)/4,"left"==t_direction&&(t_x0=bezier_node_2.x,t_y0=bezier_node_2.y,t_x1=bezier_node_1.x,t_y1=bezier_node_1.y,t_x2=bezier_node_2.x,t_y2=bezier_node_2.y+t_length/10,t_x3=bezier_node_2.x-t_girth,t_y3=bezier_node_2.y+t_length,t_x4=bezier_node_2.x,t_y4=bezier_node_2.y),"right"==t_direction&&(t_x0=bezier_node_1.x,t_y0=bezier_node_1.y,t_x1=bezier_node_2.x,t_y1=bezier_node_2.y,t_x2=bezier_node_1.x,t_y2=bezier_node_1.y+t_length/10,t_x3=bezier_node_1.x+t_girth,t_y3=bezier_node_1.y+t_length,t_x4=bezier_node_1.x,t_y4=bezier_node_1.y)),"center"==e.dataset.position&&(t_girth=10,bezier_node_2={x:b_width/2+2*t_girth-b_stroke/2,y:b_height-b_stroke/2-b_stroke/2},bezier_point_0={x:b_width/2-2*t_girth-b_stroke/2,y:b_height-b_stroke/2-b_stroke/2},bezier_control_out={x:b_4_handle_out_x-b_stroke/2-b_stroke/2,y:b_4_handle_out_y-b_stroke/2-b_stroke/2},bezier_control_in={x:b_1_handle_in_x-b_stroke/2-b_stroke/2,y:b_1_handle_in_y-b_stroke/2-b_stroke/2},bezier_point_1={x:b_width/2+2*t_girth-b_stroke/2,y:b_height-b_stroke/2-b_stroke/2},bezier_node_1=Bezier(bezier_point_0,bezier_control_out,bezier_control_in,bezier_point_1,"1"),bezier_node_2=Bezier(bezier_point_0,bezier_control_out,bezier_control_in,bezier_point_1,"0"),t_girth=(bezier_node_2.x-bezier_node_1.x)/2,"left"==t_direction&&(t_x0=bezier_node_1.x,t_y0=bezier_node_1.y,t_x1=bezier_node_2.x,t_y1=bezier_node_2.y,t_x2=bezier_node_1.x,t_y2=bezier_node_1.y+t_length/10,t_x3=bezier_node_1.x+t_girth,t_y3=bezier_node_1.y+t_length,t_x4=bezier_node_1.x,t_y4=bezier_node_1.y),"right"==t_direction&&(t_x0=bezier_node_2.x,t_y0=bezier_node_2.y,t_x1=bezier_node_1.x,t_y1=bezier_node_1.y,t_x2=bezier_node_2.x,t_y2=bezier_node_2.y+t_length/10,t_x3=bezier_node_2.x-t_girth,t_y3=bezier_node_2.y+t_length,t_x4=bezier_node_2.x,t_y4=bezier_node_2.y)),t_path="M"+t_x0+","+(t_y0-1),t_path+="L"+t_x1+","+(t_y1-1),t_path+="Q"+t_x2+","+t_y2,t_path+=" "+t_x3+","+t_y3,t_path+="L"+t_x4+","+(t_y4-1),t_path+="z",b_svg=document.createElementNS(xmlns,"svg"),b_svg_path=document.createElementNS(xmlns,"path"),t_svg_path1=document.createElementNS(xmlns,"path"),t_svg_path2=document.createElementNS(xmlns,"path"),b_svg.setAttribute("viewBox","0 0 "+b_width+" "+(b_height+t_length)),b_svg.setAttribute("width",b_width),b_svg.setAttribute("height",b_height+t_length),b_svg_path.setAttribute("d",b_path),b_svg_path.setAttribute("stroke","#000"),b_svg_path.setAttribute("stroke-width",b_stroke),b_svg_path.setAttribute("stroke-linecap","round"),b_svg_path.setAttribute("stroke-linejoin","round"),b_svg_path.setAttribute("fill","#fff"),t_svg_path1.setAttribute("d",t_path),t_svg_path1.setAttribute("stroke","#000"),t_svg_path1.setAttribute("stroke-width",2*b_stroke),t_svg_path1.setAttribute("stroke-linecap","round"),t_svg_path1.setAttribute("stroke-linejoin","round"),t_svg_path1.setAttribute("fill","#000"),t_svg_path2.setAttribute("d",t_path),t_svg_path2.setAttribute("fill","#fff"),b_svg.appendChild(t_svg_path1),b_svg.appendChild(b_svg_path),b_svg.appendChild(t_svg_path2),e.appendChild(b_svg)}),comicStrip.classList.remove("is-loading"),bubblesResize()}function bubblesResize(){w=document.querySelector(".comic-frame").offsetWidth/265+"em",bubbleSel=document.querySelectorAll(".bubble"),bubbleSel.forEach(function(e){e.setAttribute("style","font-size: "+w)})}function Bezier(e,t,i,_,n){var r={x:0,y:0},o=1-n,b=o*o,a=b*o;return r.x=e.x*a+3*t.x*b*n+3*i.x*o*n*n+_.x*n*n*n,r.y=e.y*a+3*t.y*b*n+3*i.y*o*n*n+_.y*n*n*n,r}ccBtn.addEventListener("click",function(){0==!ccBtn.checked?(ccBtn.checked=!0,ccBtn.setAttribute("aria-pressed","true"),comicStrip.classList.add("is-closed-caption-mode"),captionDock.setAttribute("aria-hidden","false"),figcaptions.forEach(function(e){e.setAttribute("tabindex","-1")}),captions.forEach(function(e){e.setAttribute("tabindex","0")}),document.querySelector(".captions").firstElementChild.focus()):(ccBtn.checked=!1,ccBtn.setAttribute("aria-pressed","false"),comicStrip.classList.remove("is-closed-caption-mode"),captionDock.setAttribute("aria-hidden","true"),figcaptions.forEach(function(e){e.setAttribute("tabindex","0")}),captions.forEach(function(e){e.setAttribute("tabindex","-1")}))}),captions&&captions.forEach(function(e){e.addEventListener("focus",t=>{document.querySelector("#"+t.target.dataset.frame);let i=document.querySelector("#"+t.target.dataset.actor),_=document.querySelector(".comic-image .is-active");_&&_.classList.remove("is-active"),i.classList.add("is-active");let n=document.querySelector(".caption-closed.is-active");n&&n.classList.remove("is-active"),e.classList.add("is-active"),prevCaptionBtn.disabled=!0,nextCaptionBtn.disabled=!0,document.querySelector(".caption-closed.is-active").previousElementSibling&&(prevCaptionBtn.disabled=!1),document.querySelector(".caption-closed.is-active").nextElementSibling&&(nextCaptionBtn.disabled=!1)})}),prevCaptionBtn&&prevCaptionBtn.addEventListener("click",e=>{let t=document.querySelector(".caption-closed.is-active").previousElementSibling,i=t.previousElementSibling;t&&(t.focus(),nextCaptionBtn.disabled=!1),i||(prevCaptionBtn.disabled=!0),e.preventDefault}),nextCaptionBtn&&nextCaptionBtn.addEventListener("click",e=>{let t=document.querySelector(".caption-closed.is-active").nextElementSibling,i=t.nextElementSibling;t&&(t.focus(),prevCaptionBtn.disabled=!1),i||(nextCaptionBtn.disabled=!0),e.preventDefault}),document.querySelectorAll(".font-sizer .btn").forEach(function(e){e.addEventListener("click",function(t){currentSize=document.querySelector(".comic-strip").dataset.fontsize,e.classList.contains("js-resize-up")&&(currentSize=parseFloat(currentSize)+10),e.classList.contains("js-resize-down")&&(currentSize=parseFloat(currentSize)-10),100!=currentSize&&200!=currentSize&&(document.querySelector(".js-resize-down").disabled=!1,document.querySelector(".js-resize-up").disabled=!1),100!=currentSize?comicStrip.classList.add("is-resized"):(comicStrip.classList.contains("is-browserZoom")||ccBtn.setAttribute("aria-pressed","false"),comicStrip.classList.remove("is-resized")),100==currentSize?(comicWrap.setAttribute("style","font-size: "+currentSize+"%"),document.querySelector(".js-resize-down").disabled=!0,comicStrip.removeAttribute("style")):comicWrap.setAttribute("style","font-size: "+currentSize+"%"),200==currentSize&&(document.querySelector(".js-resize-up").disabled=!0),comicStrip.dataset.fontsize=currentSize,document.querySelector(".font-sizer .label strong").innerHTML=currentSize+"%",t.preventDefault})}),bubbles(),window.addEventListener("resize",function(e){timeout&&window.cancelAnimationFrame(timeout),timeout=window.requestAnimationFrame(function(){bubbles()})},!1);