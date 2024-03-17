// ==UserScript==
// @name               Imgur Redirect
// @namespace          me
// @description        Imgur Redirect
// @include            *.imgur.com/*
// @version            1.0
// @run-at             document-start
// @author             me
// @grant              none
// ==/UserScript==

window.location.replace("https://farside.link/https://i.imgur.com/" + window.location.pathname + window.location.search);