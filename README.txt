AMMA FOREVER — BIRTHDAY SURPRISE WEBSITE
========================================

A lightweight, offline-friendly birthday website built with plain HTML, CSS and JavaScript.

HOW TO RUN
----------
1. Extract the ZIP file.
2. Open the amma_forever folder.
3. Double-click index.html (Chrome or Edge recommended).
4. For best results, keep the assets folder beside index.html.

WHAT'S INCLUDED
---------------
- Full-screen hero section using your uploaded short video.
- Amma's portrait in an animated glowing circular frame.
- Five-photo memory gallery with clickable full-screen viewing.
- Heartfelt letter section.
- Interactive cake: blow out candles, then cut the cake.
- Your uploaded audio plays when the cake is cut. Browsers require a user click before audio playback.
- Five-question quiz with a 5/5 special surprise unlock.
- Responsive background: landscape image on desktop, portrait image on mobile.
- Responsive layouts, animated reveals, confetti and glowing details.

YOUR MEDIA
----------
assets/hero-memory-video.mp4  : supplied video used in the hero background
assets/birthday-song.mp3      : supplied audio used during the cake celebration
assets/background-desktop.webp: supplied landscape birthday background
assets/background-mobile.webp : supplied portrait birthday background
assets/amma-portrait.webp     : solo portrait used in the hero circle
assets/memory-01.webp ... memory-04.webp: the other four supplied family photos

CUSTOMIZATION
-------------
- Edit the letter in index.html to add your own personal words.
- Edit photo captions in index.html and script.js.
- Change quiz questions and answers in the questions array in script.js.
- If you want the site to be hosted online, upload the extracted folder to a static host. It also runs locally without hosting.

NOTES
-----
- The website uses Google Fonts when internet is available; system fallback fonts are included.
- The video is muted and loops in the hero because browsers generally block autoplay with sound.
- The birthday audio starts after the visitor taps the cake-cut button (or Sound control).
- No backend, database, API key or account is required.
