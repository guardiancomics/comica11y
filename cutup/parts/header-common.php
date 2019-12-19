	<meta name="title" content="" />
	<meta name="description" content="" />
	
	<script>
		window.addEventListener('DOMContentLoaded', function() {
			document.documentElement.classList.remove('no-js');
			document.documentElement.classList.add('js');
		});

		var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

		if (prefersReducedMotion.matches) {
			document.documentElement.classList.add('reduced-motion');
		}

		function reducedMotionHandler(e) {
			if (e.matches) {
				document.documentElement.classList.add('reduced-motion');
			} else {
				document.documentElement.classList.remove('reduced-motion');
			}
		}

		prefersReducedMotion.addListener(reducedMotionHandler);
	</script>
	
	<?php
		// set to false to load build.js
		$css_dev = false;
		$css_path = '/dist/css/style';

		// append if minified file
		if ( $css_dev ) {
			$css_path .= '.min';
		}
		
		$css_path .= '.css';

		// fetch file last updated value to use as version
		$ver = filemtime( __DIR__ . '/..' . $css_path );

		// Append version to file path
		$css_path .= '?v=' . $ver;
	?>
	<link rel="stylesheet" href="<?php echo $css_path ?>" media="screen">
	<link rel="stylesheet" href="/dist/css/print.css" media="print">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="">
	<meta property="og:title" content="">
	<meta property="og:description" content="">
	<meta property="og:image" content=""><!--  width 1200x1200 -->

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="">
	<meta property="twitter:title" content="">
	<meta property="twitter:description" content="">
	<meta property="twitter:image" content=""><!--  width 1200x1200 -->

	<!-- Favicons -->
	<link rel="shortcut icon" href="/img/favicon.ico">
	<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/img/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/img/apple-touch-icon-114x114.png">

	<!-- Made by Humaan http://humaan.com @wearehumaan -->


<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js"></script>
<![endif]-->

<!--[if IE 9]>
	<script src="/dist/js/resources/matchMedia-addListener.min.js"></script>
	<script src="/dist/js/resources/matchMedia.min.js"></script>
<![endif]-->

<!--[if (gte IE 9)|!(IE)]><!-->
<script src="/dist/js/resources/focus-visible.min.js"></script>
<!--<![endif]-->