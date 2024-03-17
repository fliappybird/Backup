// ==UserScript==
// @name         HN Redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redirect HN pages to pretty-news
// @author       me
// @match        https://news.ycombinator.com/item?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function redirect() {
        // Extract the article number from the current URL
        let urlParams = new URLSearchParams(window.location.search);
        let articleNumber = urlParams.get('id');

        if (articleNumber) {
            // Construct the new URL
            let newUrl = 'https://www.hckrnws.com/stories/' + articleNumber;

            // Redirect to the new URL
            window.location.href = newUrl;
        }
    }

    // Run the redirect function when the page loads
    window.addEventListener('load', redirect);

    // Also run the redirect function when the URL changes
    window.addEventListener('popstate', redirect);
})();
