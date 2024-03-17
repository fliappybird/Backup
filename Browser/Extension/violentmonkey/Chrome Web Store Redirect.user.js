// ==UserScript==
// @name               Chrome Web Store Redirect
// @namespace          me
// @description        Chrome Web Store Redirect
// @include            *://chromewebstore.google.com/*
// @version            1.0
// @run-at             document-start
// @author             me
// @grant              none
// ==/UserScript==

window.location.replace("https://www.crxsoso.com/webstore/" + window.location.pathname + window.location.search);