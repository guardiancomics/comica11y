<section id="skip-to-solution" class="comic-wrap">
  <div class="comic-wrap__inner">

    <h2 class="text-center">The Solution</h2>

    <?php include('_comic-strip.php'); ?>

    <div class="notes">
      <p><strong></strong></p>
      <ul>
        <li>Firstly. Let's split the comic into the individual frames and remove all text from the image - we want the text to be overlayed later.</li>
        <li>Add a high contrast mode for people who have vision impairment.</li>
        <li>Added descriptive screen reader text for when tabbing through the comic. Tested on OSX VoiceOver.</li>
        <li>Added closed caption and ensured they can't be tabbed to - we don't want to double up on voice overs.</li>
        <li>When keyboard focus selects the screen reader text while the closed captions are on screen, the closed captions will disappear.</li>
        <li>Added a right to left reading mode. Inversed the images and the order of frames.</li>
        <li>Replacing the graphical speech bubbles with SVG graphics as well as a comic book webfont was the major step to making the comic accessible to other languages.</li>
        <li>Using SVG filters, I added the ability to filter out colours that effect the user with particular colour blindness.</li>
        <li>Adding some jquery, I added some simple buttons that allow you to resize the text as needed.</li>
      </ul>
    </div><?php // .notes ?>

    <div class="notes notes--changelog">
      <p><strong>Change log</strong></p>
      <ol>
        <li>15/01/2020 - Added text resizing buttons.</li>
        <li>15/01/2020 - Added colour blind svg filters and a dropdown to toggle them on/off.</li>
        <li>14/01/2020 - Added SVG bubbles and Digital Strip webfont to the comic strip. Added google translate</li>
        <li>13/01/2020 - Added RTL mode.</li>
        <li>13/01/2020 - Added screen reader caption text.</li>
        <li>13/01/2020 - Added closed caption toggle and closed caption text to each comic book frame.</li>
        <li>08/01/2020 - Added high contrast images and toggle.</li>
        <li>19/12/2019 - Split the comic into individual, borderless frames.</li>
      </ol>
    </div><?php // .notes .notes--changelog ?>

  </div><?php // .comic-wrap__inner ?>
</section><?php // .comic-wrap ?>