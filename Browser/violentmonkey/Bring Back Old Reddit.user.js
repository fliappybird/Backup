// ==UserScript==
// @name               Bring Back Old Reddit
// @namespace          https://greasyfork.org/en/users/105361-randomusername404
// @description        Always redirects to old-Reddit, avoiding Reddit's redesign.
// @include            *://www.reddit.com/*
// @exclude            *://www.reddit.com/poll/*
// @version            1.02
// @run-at             document-start
// @author             RandomUsername404
// @grant              none
// @icon               https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-76x76.png
// @downloadURL https://update.greasyfork.org/scripts/44669/Bring%20Back%20Old%20Reddit.user.js
// @updateURL https://update.greasyfork.org/scripts/44669/Bring%20Back%20Old%20Reddit.meta.js
// ==/UserScript==

window.location.replace("https://old.reddit.com" + window.location.pathname + window.location.search);