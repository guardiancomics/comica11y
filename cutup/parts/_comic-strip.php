<div class="comic-strip breakout" data-fontsize="100">

  <figure class="comic-frame">
    <img 
      src="img/comics/colour-f1.png" 
      data-src="img/comics/colour-f1.png" 
      data-contrast="img/comics/contrast-f1.png" 
      alt=""
    >
    <figcaption class="caption-sr" tabindex="0">
      Dante, a lanky man with thinning dark hair and stubble is cautiously standing outside a shop titled Games Dungeon. An open sign hangs in the window. He sighs apprehensively.
    </figcaption>
    <div class="caption-closed" tabindex="-1" aria-hidden>
      <p><strong>[Dante]</strong>: Sigh.</p>
    </div><?php // .caption-closed ?>
    <!-- <div class="bubble-wrap" aria-hidden>
      <div class="bubble">Sigh</div>
    </div><?php // .bubble-wrap ?> -->
  </figure>

  <figure class="comic-frame">
    <img 
      src="img/comics/colour-f2.png" 
      data-src="img/comics/colour-f2.png" 
      data-contrast="img/comics/contrast-f2.png" 
      alt=""
    >
    <figcaption class="caption-sr" tabindex="0">
      "Welcome to Games Dungeon! How can I help?", a preppy dressed young asian woman asks Dante.
      "Uh, yeah. I need something for someone who's never played Dungeons and Dragons before.", Dante replies.
    </figcaption>
    <div class="caption-closed" tabindex="-1" aria-hidden>
      <p><strong>[Clerk]:</strong> Welcome to Games Dungeon! How can I help?</p>
      <p><strong>[Dante]:</strong> Uh, yeah. I need something for someone who's never played Dungeons and Dragons before.</p>
    </div><?php // .caption-closed ?>
    <div class="bubble-wrap" aria-hidden>
      <div class="bubble" data-position="right" data-direction="left" data-length="normal">
        <span class="inner">
          Welcome to <strong>Games Dungeon!</strong><br>
          How can I <strong>help?</strong>
        </span>
      </div>
      <div class="bubble" data-position="center" data-direction="left" data-length="short">
        <span class="inner">
          Uh, yeah. <br>
          I need something for <br>
          someone who's <strong>never</strong> <br>
          played dungeons and <br>
          dragons before.
        </span>

      </div>
    </div><?php // .bubble-wrap ?>
  </figure>

  <figure class="comic-frame">
    <img 
      src="img/comics/colour-f3.png" 
      data-src="img/comics/colour-f3.png" 
      data-contrast="img/comics/contrast-f3.png" 
      alt=''
    >
    <figcaption class="caption-sr" tabindex="0">
      "Well, you need the redbox. Would you like me to bag it up for you?" the attendant asks.
      "Yeah... actually, two bags please.", Dante replies.
    </figcaption>
    <div class="caption-closed" tabindex="-1" aria-hidden>
      <p><strong>[Clerk]</strong>: Well, you need the redbox. Would you like me to bag it up for you?</p>
      <p><strong>[Dante]</strong>: Yeah... actually, two bags please.</p>
    </div><?php // .caption-closed ?>
    <div class="bubble-wrap" aria-hidden>
      <div class="bubble" data-position="right" data-direction="left" data-length="normal">
        <span class="inner">
          Well, you need the 
          <strong>redbox.</strong> <br>
          Would you like me to bag <br>
          it up for you?
        </span>
      </div>
      <div class="bubble" data-position="center" data-direction="left" data-length="short">
        <span class="inner">
          Yeah... actually, <br>
          <strong>two</strong> bags please.
        </span>
      </div>
    </div><?php // .bubble-wrap ?>
  </figure>

  <figure class="comic-frame">
    <img 
      src="img/comics/colour-f4.png" 
      data-src="img/comics/colour-f4.png" 
      data-contrast="img/comics/contrast-f4.png" 
      alt=""
    >
    <figcaption class="caption-sr" tabindex="0">
      Dante is now leaving the building holding a paper bag. The other bag has eye holes cut out and is worn like a mask.
    </figcaption>
    <div class="caption-closed" tabindex="-1" aria-hidden>
    </div><?php // .caption-closed ?>
  </figure>

</div><?php // .comic-strip ?>

<div class="comic-filter">
  <div class="buttons">
    <button class="btn-toggle js-closedcaptions" type="button"><span class="hidden">Click here to toggle </span>Closed captions</button>
    <button class="btn-toggle js-rtl" type="button"><span class="hidden">Click here to toggle </span>RTL/LTR</button>
    <button class="btn-toggle js-highcontrast" type="button"><span class="hidden">Click here to toggle </span>High contrast</button>
    <div class="dropdown">
      <button type="button" class="dropdown__selected"><span class="hidden">Click to open dropdown menu. Current option selected: </span>Colour blindness: <strong>Normal</strong></button>
      <ul>
        <li><button class="btn-option js-cb-normal" type="button">Normal</button></li>
        <li><button class="btn-option js-cb-protanopia" type="button">Protanopia</button></li>
        <li><button class="btn-option js-cb-protanomaly" type="button">Protanomaly</button></li>
        <li><button class="btn-option js-cb-deuteranopia" type="button">Deuteranopia</button></li>
        <li><button class="btn-option js-cb-deuteranomaly" type="button">Deuteranomaly</button></li>
        <li><button class="btn-option js-cb-tritanopia" type="button">Tritanopia</button></li>
        <li><button class="btn-option js-cb-tritanomaly" type="button">Tritanomaly</button></li>
        <li><button class="btn-option js-cb-achromatopsia" type="button">Achromatopsia</button></li>
        <li><button class="btn-option js-cb-achromatomaly" type="button">Achromatomaly</button></li>
      </ul>
    </div>
    <div class="font-sizer">
      <button class="btn js-resize-down"><span class="hidden">Click here to resize comic font down a size</span></button>
      <p class="text">Font size: <strong>100%</strong></p>
      <button class="btn js-resize-up"><span class="hidden">Click here to resize comic font up a size</span></button>
    </div>
    <button class="btn js-bubbles" type="button"><span class="hidden">Click here to </span>Refresh bubbles</button>
  </div>
  <div class="translate">
    <?php include('parts/gtranslate.php'); ?>
  </div>
</div><?php // .comic-filter ?>