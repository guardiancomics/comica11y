	
	<!-- Script Libraries and Resources -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="/dist/js/resources/jquery-3.3.1.min.js"><\/script>')</script>
	
	<?php

	// set to false to load build.js
	$js_dev = true;

	if ( $js_dev ) : ?>

		<!-- Libs -->
		<script src="/src/js/lib/jquery.easing.1.3.min.js"></script>
		<script src="/src/js/lib/current-device.min.js"></script>
		
		<!-- Custom JS -->
		<script src="/src/js/src/functions.js"></script>

	<?php else : ?>

		<script src="/dist/js/build.js"></script>

	<?php endif; ?>
