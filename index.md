<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<title>ComicA11y - an all inclusive online comic experiment.</title>

		<meta name="title" content="ComicA11y" />
		<meta name="description" content="ComicA11y is an experiment that aims to achieve an all-inclusive online comic experience. Because comics should be universal." />
		<link rel="canonical" href="https://humaan.com/comica11y" />

		<link rel="stylesheet" href="dist/css/style.css" media="screen">
		<link rel="stylesheet" href="dist/css/print.css" media="print">

		<!-- Open Graph / Facebook -->
		<meta property="og:type" content="website">
		<meta property="og:url" content="http://humaan.com/comica11y">
		<meta property="og:title" content="humaan.com/comica11y">
		<meta property="og:description" content="ComicA11y is an experiment that aims to achieve an all-inclusive online comic experience. Because comics should be universal.">
		<meta property="og:image" content="http://humaan.com/comica11y/img/og.png"><!--  width 1200x1200 -->

		<!-- Twitter -->
		<meta property="twitter:card" content="summary">
		<meta property="twitter:url" content="http://humaan.com/comica11y">
		<meta property="twitter:title" content="humaan.com/comica11y">
		<meta property="twitter:description" content="ComicA11y is an experiment that aims to achieve an all-inclusive online comic experience. Because comics should be universal.">
		<meta property="twitter:image" content="http://humaan.com/comica11y/img/og.png"><!--  width 1200x1200 -->

		<!-- Favicons -->
		<link rel="shortcut icon" href="img/favicon.ico">
		<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
		<link rel="apple-touch-icon" sizes="72x72" href="img/apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="114x114" href="img/apple-touch-icon-114x114.png">

	</head>
	<body>

		<a class="skip-to-link" href="#skip-to-problem">Skip to: The problem</a>
		<a class="skip-to-link" href="#skip-to-objectives">Skip to: The objectives</a>
		<a class="skip-to-link" href="#skip-to-solution">Skip to: The solution</a>

		<header class="statement text-center">
			<div class="container">
				<h1 class="title">
					<img class="logo" src="img/logo.png" alt="ComicA11y logo">
					<span class="hidden">ComicA11y</span>
				</h1>
				<p>
					An experiment that aims to achieve an all-inclusive online comic experience.<br>
					Because comics should be universal.
				</p>
			</div>
		</header>

		<main class="main-content">

			<!-- // The problem -->
			<section id="skip-to-problem">
				<div class="container">
					<h2 class="text-center">The problem</h2>

					<div class="breakout">
						<img class="breakout" src="img/comics/basic.png" alt="Comic Image for 2011-12-07" title="A master of disguise, he blends into the shadows and is naught but a whisper on the winds. Just ignore the fact he has his name pinned to his work short." />
					</div>

					<div class="notes">
						<p><strong>Here's a typical example of how an online comic author might present their comic strip.</strong></p>
						<ul>
							<li>
								<p>Little to no information provided in the alt text or title.</p>
							</li>
							<li>
								<p>A high resolution image serving all screen and device sizes. This is often a high resolution asset ranging from 900 - ~3500px wide and file size anywhere between 100kb - 2.5mb.</p>
							</li>
							<li>
								<p>No keyboard ARIA information for assistive technologies.</p>
							</li>
							<li>
								<p>No colour options for people who struggle with colour blindness or vision impairments.</p>
							</li>
							<li>
								<p>No closed captions for assistive technology to convey the speech bubbles to text.</p>
							</li>
							<li>
								<p>No right to left reading mode.</p>
							</li>
							<li>
								<p>No way to translate text.</p>
							</li>
						</ul>
						<p>
							<small>
								<strong>Sources:</strong>
								<a href="https://www.penny-arcade.com/comic" target="_blank" title="Penny Arcade"><span class="hidden">Opens in a new window:</span> www.penny-arcade.com</a>,
								<a href="http://pvponline.com/comic/" target="_blank" title="PVP online"><span class="hidden">Opens in a new window:</span> www.pvponline.com</a>,
								<a href="http://www.explosm.net/comics" target="_blank" title="Explosm"><span class="hidden">Opens in a new window:</span> www.explosm.net</a>
							</small>
						</p>
						<p>
							<small>
								<strong>Credits:</strong> 
								<a href="https://deadtoride.com" target="_blank" title="This dead to ride"><span class="hidden">Opens in a new window:</span> www.deadtoride.com</a>,
								<a href="https://paulspencer.net.au" title="Paul Spencer" target="_blank"><span class="hidden">Opens in a new window:</span> www.paulspencer.net.au</a>, 
								<a href="http://webofink.com.au" title="Web of Ink" target="_blank"><span class="hidden">Opens in a new window:</span> www.webofink.com.au</a>
							</small>
						</p>
					</div><!-- // .notes -->
				</div><!-- .container -->
			</section><!-- // .comic-wrap -->

			<!-- // The objectives -->
			<section id="skip-to-objectives" class="objectives">
				<div class="container container--narrow">

					<h2 class="text-center">The objectives</h2>

					<div class="grid">
						<div class="grid-item">
							<h3>Must have features</h3>
							<ul>
								<li><del>Colour blind and high contrast mode.</del></li>
								<li><del>Closed captions.</del></li>
								<li><del>Translatable.</del></li>
								<li><del>RTL/LTR.</del></li>
								<li><del>Resizable text.</del></li>
								<li><del>Responsive / fluid layout.</del></li>
								<li><del>ARIA best practices.</del></li>
							</ul>
						</div><!-- // .grid-item -->
						<div class="grid-item">
							<h3>Nice to have features</h3>
							<ul>
								<li>Toggle closed captions on with browser zoom and <del>system zoom.</del></li>
								<li>Autoplay mode.</li>
								<li>Audio mode.</li>
								<li>Responsive image sizes.</li>
								<li>Keyboard commands.</li>
							</ul>
						</div><!-- // .grid-item -->
					</div><!-- // .grid -->

				</div><!-- // .container -->
			</section><!-- // .objectives -->

			<!-- // The solution -->
			<section id="skip-to-solution">
				<div class="container">
					<h2 class="text-center">The Solution</h2>

					<article class="comic-strip breakout" data-fontsize="100">

						<figure aria-labelledby="frame-1" aria-describedby="frame-1-desc" class="comic-frame">
							<h2 id="frame-1" class="hidden">Frame 1</h2>
							
							<picture class="comic-image">
								<img src="img/comics/colour-f1.png" data-src="img/comics/colour-f1.png" data-contrast="img/comics/contrast-f1.png" alt="">
							</picture><!-- .comic-image -->

							<div class="caption-closed" tabindex="-1" aria-hidden="true">
								<p>
									<img class="avatar" src="img/comics/avatar-dante.png" alt="Avatar for Dante">
									<strong>[Dante]</strong>: Sigh.
								</p>
							</div><!-- // .caption-closed -->

							<figcaption id="frame-1-desc" class="caption-sr" tabindex="0">
								<span class="caption-sr__inner">
									Dante, a lanky man with thinning dark hair and stubble is cautiously standing outside a shop titled Games Dungeon. An open sign hangs in the window. He sighs apprehensively.
								</span>
							</figcaption><!-- .caption-sr -->
						</figure>

						<figure aria-labelledby="frame-2" aria-describedby="frame-2-desc" class="comic-frame">
							<h2 id="frame-2" class="hidden">Frame 2</h2>

							<picture class="comic-image">
								<img src="img/comics/colour-f2.png" data-src="img/comics/colour-f2.png" data-contrast="img/comics/contrast-f2.png" alt="">
							</picture><!-- .comic-image -->

							<div class="bubble-wrap" aria-hidden="true">
								<div class="bubble" data-position="right" data-direction="left" data-length="normal">
									<span class="inner">
										Welcome to <strong>Games Dungeon!</strong><br>
										How can I <strong>help?</strong>
									</span>
								</div>
								<div class="bubble bubble--left" data-position="center" data-direction="right" data-length="short">
									<span class="inner">
										Uh, yeah. <br>
										I need something for <br>
										someone who's <strong>never</strong> <br>
										played dungeons and <br>
										dragons before.
									</span>
								</div>
							</div><!-- // .bubble-wrap -->

							<div class="caption-closed" tabindex="-1" aria-hidden="true">
								<p>
									<img class="avatar" src="img/comics/avatar-clerk.png" alt="Avatar for Clerk">
									<strong>[Clerk]:</strong> Welcome to Games Dungeon! How can I help?
								</p>
								<p>
									<img class="avatar" src="img/comics/avatar-dante.png" alt="Avatar for Dante">
									<strong>[Dante]:</strong> Uh, yeah. I need something for someone who's never played Dungeons and Dragons before.
								</p>
							</div><!-- // .caption-closed -->

							<figcaption id="frame-2-desc" class="caption-sr" tabindex="0">
								<span class="caption-sr__inner">
									"Welcome to Games Dungeon! How can I help?", a preppy dressed young asian woman asks Dante.
									"Uh, yeah. I need something for someone who's never played Dungeons and Dragons before.", Dante replies.
								</span>
							</figcaption><!-- .caption-sr -->
						</figure>

						<figure aria-labelledby="frame-3" aria-describedby="frame-3-desc" class="comic-frame">
							<h2 id="frame-3" class="hidden">Frame 3</h2>

							<picture class="comic-image">
								<img src="img/comics/colour-f3.png" data-src="img/comics/colour-f3.png" data-contrast="img/comics/contrast-f3.png" alt="">
							</picture><!-- // .comic-image -->

							<div class="bubble-wrap" aria-hidden="true">
								<div class="bubble" data-position="right" data-direction="left" data-length="normal">
									<span class="inner">
										Well, you need the <strong>redbox.</strong><br>
										Would you like me to bag <br>
										it up for you?
									</span>
								</div>
								<div class="bubble bubble--left" data-position="left" data-direction="right" data-length="short">
									<span class="inner">
										Yeah... actually, <br>
										<strong>two</strong> bags please.
									</span>
								</div>
							</div><!-- // .bubble-wrap -->

							<div class="caption-closed" tabindex="-1" aria-hidden="true">
								<p>
									<img class="avatar" src="img/comics/avatar-clerk.png" alt="Avatar for Clerk">
									<strong>[Clerk]</strong>: Well, you need the redbox. Would you like me to bag it up for you?
								</p>
								<p>
									<img class="avatar" src="img/comics/avatar-dante.png" alt="Avatar for Dante">
									<strong>[Dante]</strong>: Yeah... actually, two bags please.
								</p>
							</div><!-- // .caption-closed -->

							<figcaption id="frame-3-desc" class="caption-sr" tabindex="0">
								<span class="caption-sr__inner">
									"Well, you need the redbox. Would you like me to bag it up for you?" the attendant asks.
									"Yeah... actually, two bags please.", Dante replies.
								</span>
							</figcaption><!-- // .caption-sr -->
						</figure>

						<figure aria-labelledby="frame-4" aria-describedby="frame-4-desc" class="comic-frame">
							<h2 id="frame-4" class="hidden">Frame 4</h2>

							<picture class="comic-image">
								<img src="img/comics/colour-f4.png" data-src="img/comics/colour-f4.png" data-contrast="img/comics/contrast-f4.png" alt="">
							</picture><!-- .comic-image -->
							
							<div class="caption-closed" tabindex="-1" aria-hidden="true">
							</div><!-- // .caption-closed -->

							<figcaption id="frame-4-desc" class="caption-sr" tabindex="0">
								<span class="caption-sr__inner">
									Dante is now leaving the building holding a paper bag. The other bag has eye holes cut out and is worn like a mask.
								</span>
							</figcaption><!-- .caption-sr -->
						</figure>

					</article><!-- // .comic-strip -->
					
					<div class="comic-filter">
						<div class="buttons">
							<div class="font-sizer">
								<button class="btn js-resize-down" disabled><span class="hidden">Decrease the font</span></button>
								<p class="text">Font size: <strong>100%</strong></p>
								<button class="btn js-resize-up"><span class="hidden">Increase the font</span></button>
							</div><!-- // .font-sizer -->

							<label class="toggle">
								<input type="checkbox" name="closed captions" class="hidden toggle js-closedcaptions">
								<span class="checkbox"></span>
								Closed captions
							</label>

							<label class="toggle">
								<input type="checkbox" name="high contrast" class="hidden toggle js-highcontrast">
								<span class="checkbox"></span>
								High contrast
							</label>

							<label>
								<span class="hidden">Toggle colour blind mode</span>
								<select title="Colour blind" class="dropdown js-colourblind" name="colourblind">
									<option value="normal">Normal</option>
									<option value="protanopia">Protanopia</option>
									<option value="protanomaly">Protanomaly</option>
									<option value="deuteranopia">Deuteranopia</option>
									<option value="deuteranomaly">Deuteranomaly</option>
									<option value="tritanopia">Tritanopia</option>
									<option value="tritanomaly">Tritanomaly</option>
									<option value="achromatopsia">Achromatopsia</option>
									<option value="achromatomaly">Achromatomaly</option>
								</select>
							</label>

							<label class="toggle">
								<input type="checkbox" name="RTL/LTR toggle" class="hidden toggle js-rtl">
								<span class="checkbox"></span>
								RTL / LTR
							</label>

							<button class="btn js-bubbles" type="button">Refresh bubbles</button>
						</div><!-- .buttons -->

						<div class="translate">
							<!-- GTranslate: https://gtranslate.io/ -->
							<div id="google_translate_element2"></div>
							<script type="text/javascript">
								function googleTranslateElementInit2() {new google.translate.TranslateElement({pageLanguage: 'en',autoDisplay: false}, 'google_translate_element2');}
							</script>
							<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2"></script>


							<script type="text/javascript">
							/* <![CDATA[ */
							eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 7(a,b){n{4(2.9){3 c=2.9("o");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s(\'t\'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a==\'\')v;3 b=a.w(\'|\')[1];3 c;3 d=2.x(\'y\');z(3 i=0;i<d.5;i++)4(d[i].A==\'B-C-D\')c=d[i];4(2.j(\'k\')==E||2.j(\'k\').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,\'m\');7(c,\'m\')}}',43,43,'||document|var|if|length|function|GTranslateFireEvent|value|createEvent||||||true|else|doGTranslate||getElementById|google_translate_element2|innerHTML|change|try|HTMLEvents|initEvent|dispatchEvent|createEventObject|fireEvent|on|catch|return|split|getElementsByTagName|select|for|className|goog|te|combo|null|setTimeout|500'.split('|'),0,{}))
							/* ]]> */
							</script>
						</div><!-- // .translate -->
					</div><!-- // .comic-filter -->
					
					<div class="notes">
						<p><strong>Outcome</strong></p>
						<p></p>
						<p><strong>Helpful links:</strong></p>
						<ul>
							<li><a href="https://twitter.com/RobotHugsComic/status/949324465191694337" target="_blank" title="The importance of useful alt text in images"><span class="hidden">Opens in a new window:</span> https://twitter.com/RobotHugsComic/status/949324465191694337</a></li>
							<li><a href="https://veroniiiica.com/2018/11/29/how-to-write-alt-text-digital-comics/" title="How to write alt text for digital comics" target="_blank"><span class="hidden">Opens in a new window:</span> https://veroniiiica.com/2018/11/29/how-to-write-alt-text-digital-comics/</a></li>
						</ul>
					</div><!-- // .notes -->

					<div class="notes notes--log">
						<p><strong>Change log</strong></p>
						<ol>
							<li><strong class="date">02/06/2020</strong> Converted all filter buttons into native select and checkboxes where appropriate. Added focus management for the filters. Added javascript for input onchange event to toggle the colour blind modes correctly.</li>
							<li><strong class="date">29/05/2020</strong> Converted from jquery to javascript and removed dependencies. Thickened the border, improved the focus state for the frame to signify which frame you're currently reading. Added avatars to closed captions so to know which person the caption belongs to. Added fixed position for the closed captions.</li>
							<li><strong class="date">25/05/2020</strong> Validated markup. Removed all JS that was not needed to power the plugin. Still require jquery dependency to be eliminated. Restructured the bubbles to use cubic beziers instead of quadratic beziers. The tails are now positioned exactly. Tweeked and improved the tail constructor to draw the angles and curves of the spike better than before. Still not perfect.</li>
							<li><strong class="date">29/01/2020</strong> Fixed SVG filter bug for colour blind options by moving the filters inline and referring to simply the ID within the CSS.</li>
							<li><strong class="date">29/01/2020</strong> Reworked resize font function to only apply the font-size to the closed captions. The bubbles were toggling the browser zoom functionality when the font-size was increased using the buttons, which we don't want.</li>
							<li><strong class="date">29/01/2020</strong> Added a detection for browser font-size being set to large or very large. If so, it will remove the bubbles (they break), toggle captions and disable the toggle button. Resizing font-size still works. Reworked pixel padding to use em's so the layout of the page doesn't break when text is increased.</li>
							<li><strong class="date">29/01/2020</strong> Removed "click here" text from all buttons. Added "verb the noun" format for text resize buttons. Removed pale grey for toggles and update log dates. Removed the lime green on toggles and replaced with blue. Added aria-pressed attribute to all toggle switches. Added true to aria-hidden attributes to avoid axe errors.</li>
							<li><strong class="date">28/01/2020</strong> Added a function to the bubble SVG generator to fontsize-detector the beginning point and end point along the quadratic bezier arc - phew.</li>
							<li><strong class="date">23/01/2020</strong> Reworked the bubbles() function. The SVG generating of the bubbles is now a lot easier to read. Updated the path names so they work out of the box without a hostname.</li>
							<li><strong class="date">23/01/2020</strong> Reworked the bubbles() function. The SVG generating of the bubbles is now a lot easier to read. Updated the path names so they work out of the box without a hostname.</li>
							<li><strong class="date">23/01/2020</strong> Added some improvements to the aria attributes and markup.</li>
							<li><strong class="date">20/01/2020</strong> Replaced the artwork with dinosaurs and re-wrote the captions and screen reader text. Rejigged the logic for the closed caption toggle and the text resizing - Now when you increase the font size it defaults to closed caption mode and toggles off bubbles. Added the logic to the svg generator to flip the tails left and right.</li>
							<li><strong class="date">17/01/2020</strong> Added a tweak to the jquery so the bubbles are measured and drawn during a loading state, where the comic-strip width is normalised, to ensure the stroke width is always the same. Added a jquery function to measure the frame width and calculate an apprpriate em value that allows for fluid bubbles on resize, while also allowing for up and down resizing.</li>
							<li><strong class="date">17/01/2020</strong> Updated the jquery logic for resizing font-size, to cap between 100% - 200% - added disabled states where needed.</li>
							<li><strong class="date">17/01/2020</strong> Added responisve styles for the comic-strip. Just a simple 4 column, 2 column, 1 column breakdown.</li>
							<li><strong class="date">17/01/2020</strong> Removed all PHP and reverted to simple HTML to make the page more shareable.</li>
							<li><strong class="date">15/01/2020</strong> Adding some jquery, I added some simple buttons that allow you to resize the text as needed.</li>
							<li><strong class="date">15/01/2020</strong> Using SVG filters, I added the ability to filter out colours that effect the user with particular colour blindness. Added a dropdown to toggle them on/off. </li>
							<li><strong class="date">14/01/2020</strong> Added SVG bubbles and Digital Strip webfont to the comic strip. Added google translate. Replacing the graphical speech bubbles with SVG graphics as well as a comic book webfont was the major step to making the comic accessible to other languages.</li>
							<li><strong class="date">13/01/2020</strong> Added right to left reading mode. Inversed the images and the order of frames.</li>
							<li><strong class="date">13/01/2020</strong> Added screen reader caption text for when tabbing through the comic. Tested on OSX VoiceOver. When keyboard focus selects the screen reader text while the closed captions are on screen, the closed captions will disappear.</li>
							<li><strong class="date">13/01/2020</strong> Added closed caption toggle and closed caption text to each comic book frame. Added closed caption and ensured they can't be tabbed to - we don't want to double up on voice overs.</li>
							<li><strong class="date">08/01/2020</strong> Added high contrast images and toggle for people who have vision impairment.</li>
							<li><strong class="date">19/12/2019</strong> Split the comic into individual, borderless frames. Firstly. Let's split the comic into the individual frames and remove all text from the image - we want the text to be overlayed later.</li>
						</ol>
					</div><!-- // .notes -->
				</div><!-- .container -->
			</section><!-- // .comic-wrap -->

		</main>

		<footer class="credits">
			<p>This experiment brought to you by <a href="https://paulspencer.net.au" target="_blank"><span class="hidden">Opens in a new window:</span> Paul Spencer</a> at <a href="https://humaan.com" target="_blank" title="World-class digital for forward thinking brands – Websites, Apps, eCommerce and Software"><span class="hidden">Opens in a new window:</span> Humaan</a>.</p>
		</footer>

		<svg xmlns="http://www.w3.org/2000/svg" class="hidden">
		<defs>
		<filter id="protanopia">
		<feColorMatrix
		in="SourceGraphic"
		type="matrix"
		values="0.567, 0.433, 0,     0, 0
		0.558, 0.442, 0,     0, 0
		0,     0.242, 0.758, 0, 0
		0,     0,     0,     1, 0"/>
		</filter>
		<filter id="protanomaly">
		<feColorMatrix
		in="SourceGraphic"
		type="matrix"
		values="0.817, 0.183, 0,     0, 0
		0.333, 0.667, 0,     0, 0
		0,     0.125, 0.875, 0, 0
		0,     0,     0,     1, 0"/>
		</filter>
		<filter id="deuteranopia">
		<feColorMatrix
		in="SourceGraphic"
		type="matrix"
		values="0.625, 0.375, 0,   0, 0
		0.7,   0.3,   0,   0, 0
		0,     0.3,   0.7, 0, 0
		0,     0,     0,   1, 0"/>
		</filter>
		<filter id="deuteranomaly">
		<feColorMatrix
		in="SourceGraphic"
		type="matrix"
		values="0.8,   0.2,   0,     0, 0
		0.258, 0.742, 0,     0, 0
		0,     0.142, 0.858, 0, 0
		0,     0,     0,     1, 0"/>
		</filter>
		<filter id="tritanopia">
		<feColorMatrix
		in="SourceGraphic"
		type="matrix"
		values="0.95, 0.05,  0,     0, 0
		0,    0.433, 0.567, 0, 0
		0,    0.475, 0.525, 0, 0
		0,    0,     0,     1, 0"/>
		</filter>
		<filter id="tritanomaly">
		<feColorMatrix
		in="SourceGraphic"
		type="matrix"
		values="0.967, 0.033, 0,     0, 0
		0,     0.733, 0.267, 0, 0
		0,     0.183, 0.817, 0, 0
		0,     0,     0,     1, 0"/>
		</filter>
		<filter id="achromatopsia">
		<feColorMatrix
		in="SourceGraphic"
		type="matrix"
		values="0.299, 0.587, 0.114, 0, 0
		0.299, 0.587, 0.114, 0, 0
		0.299, 0.587, 0.114, 0, 0
		0,     0,     0,     1, 0"/>
		</filter>
		<filter id="achromatomaly">
		<feColorMatrix
		in="SourceGraphic"
		type="matrix"
		values="0.618, 0.320, 0.062, 0, 0
		0.163, 0.775, 0.062, 0, 0
		0.163, 0.320, 0.516, 0, 0
		0,     0,     0,     1, 0"/>
		</filter>
		</defs>
		</svg>

		<script src="dist/js/build.js"></script>

	</body>
</html>