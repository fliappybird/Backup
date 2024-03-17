// ==UserScript==
// @name        Fix image links on Old Reddit
// @namespace   https://github.com/abdurazaaqmohammed
// @version     1.0.1
// @description Fix opening redd.it image links on Old Reddit
// @author      Abdurazaaq Mohammed
// @homepage    https://github.com/abdurazaaqmohammed/userscripts
// @license     The Unlicense
// @supportURL  https://github.com/abdurazaaqmohammed/userscripts/issues
// @match       https://old.reddit.com/*
// @match       https://abdurazaaqmohammed.github.io/website/imgviewer
// @grant       GM_getValue
// @grant       GM_setValue
// @downloadURL https://update.greasyfork.org/scripts/484871/Fix%20image%20links%20on%20Old%20Reddit.user.js
// @updateURL https://update.greasyfork.org/scripts/484871/Fix%20image%20links%20on%20Old%20Reddit.meta.js
// ==/UserScript==

(function () {
  'use strict';
  const url = window.location.href;

  function openImageViewer(imgLink) {
    GM_setValue('img', imgLink);
    // Uncomment below and comment/delete the other line if you want to redirect to the image directly instead of opening in a new tab.
    //window.location.href = 'https://abdurazaaqmohammed.github.io/website/imgviewer';
    window.open('https://abdurazaaqmohammed.github.io/website/imgviewer');
  }

  function fixImageLinks(mutationsList, observer) {
    const imageLinks = document.querySelectorAll('a[href^="https://preview.redd.it"], a[href^="https://i.redd.it"]');
    imageLinks.forEach(link => {
      const imgLink = link.href;
      // Overwriting the href will break copying the image link
      link.removeAttribute("href");
      link.addEventListener("click", function() { openImageViewer(imgLink); });
    });
  }

  if (url.startsWith('https://old.reddit.com/')) {
    const observer = new MutationObserver(fixImageLinks);
    observer.observe(document.body, { subtree: true, childList: true });
  } else {
    document.getElementById('urlInput').value = GM_getValue('img');
    document.getElementById('displayButton').click();
  }
})();