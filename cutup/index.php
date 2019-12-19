<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title>ComicA11y - An experiment aiming to achieve a full accessible comic reading experience.</title>

	<?php include 'parts/header-common.php' ?>

</head>
<body>

	<a class="skip-to-link" href="#skip-to-problem">Skip to: The problem</a>
	<a class="skip-to-link" href="#skip-to-objectives">Skip to: The objectives</a>
	<a class="skip-to-link" href="#skip-to-solution">Skip to: The solution</a>

	<div class="container-page">

		<header class="statement text-center">
			<div class="container">
				<h1>ComicA11y</h1>
				<p>
					An experiment aiming to achieve an all inclusive online comic reading experience.
					<br>
					Because comics shouldn't just be for the abled.
				</p>
			</div><?php // .container ?>
		</header>

		<main class="main-content">

			<section id="skip-to-problem" class="comic-frame">
				<div class="comic-frame__inner">

					<h2 class="text-center">The problem</h2>
					<img src="img/comics/basic.png" alt="Comic Image for 2011-12-07" title="A master of disguise, he blends into the shadows and is naught but a whisper on the winds. Just ignore the fact he has his name pinned to his work short." />
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
								<p>No closed captions for assistive technology to convey the speach bubbles to text.</p>
							</li>							
							<li>
								<p>No right to left reading mode.</p>
							</li>
							<li>
								<p>No way to translate text.</p>
							</li>
						</ul>
						<p><small><strong>Sources:</strong> <a href="https://www.penny-arcade.com/comic" target="_blank" title="Penny Arcade"><span class="hidden">Opens in a new window:</span> www.penny-arcade.com</a>, <a href="https://www.pvponline.com/comic" target="_blank" title="PVP online"><span class="hidden">Opens in a new window:</span> www.pvponline.com</a>, <a href="https://www.explosm.net/comics" target="_blank" title="Explosm"><span class="hidden">Opens in a new window:</span> www.explosm.net</a></small></p>
					</div><?php // .notes ?>
					
				</div><?php // .comic-frome__inner ?>
			</section><?php // .comic-frame ?>

			<section id="skip-to-objectives" class="objectives">
				<div class="container container--narrow">

					<h2 class="text-center">The objectives</h2>

					<div class="grid">
						<div class="grid-item">
							<h3>Must have features</h3>
							<ul>
								<li>Responsive / fluid layout.</li>
								<li>RTL/LTR.</li>
								<li>Translatable.</li>
								<li>Closed captions.</li>
								<li>Colour blind and high contrast mode.</li>
								<li>Keyboard commands.</li>
								<li>ARIA best practices.</li>
							</ul>
						</div>
						<div class="grid-item">
							<h3>Nice to have features</h3>
							<ul>
								<li>Autoplay mode.</li>
								<li>Audio-book mode.</li>
								<li>Responsive image sizes.</li>
							</ul>
						</div><?php // .grid-item ?>
					</div><?php // .grid ?>

				</div><?php // .container ?>
			</section><?php // .objectives ?>
			
			<section id="skip-to-solution" class="comic-frame">
				<div class="comic-frame__inner">

					<h2 class="text-center">The Solution</h2>
					<img src="img/comics/basic.png" alt="Comic Image for 2011-12-07" title="A master of disguise, he blends into the shadows and is naught but a whisper on the winds. Just ignore the fact he has his name pinned to his work short." />
					<div class="notes">
						<p><strong></strong></p>
						<ul>
							<li>
							</li>
						</ul>
						<p><small><strong>Sources:</strong> </small></p>
					</div><?php // .notes ?>

				</div><?php // .comic-frome__inner ?>
			</section><?php // .comic-frame ?>

		</main>

		<footer class="credits">

		</footer>

	</div><?php // .container-page ?>

	<?php include 'parts/footer-scripts.php'; ?>

</body>
</html>