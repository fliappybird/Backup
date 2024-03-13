// ==UserScript==
// @name         Bilibili - 防止视频被自动暂停及弹出登录窗口
// @namespace    https://bilibili.com/
// @version      0.9
// @description  让您在未登录的情况下看B站视频时不再被自动暂停视频及要求登录账号 | V0.9 新增对播放列表页面的支持
// @license      GPL-3.0
// @author       DD1969
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/list/*
// @match        https://space.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/467474/Bilibili%20-%20%E9%98%B2%E6%AD%A2%E8%A7%86%E9%A2%91%E8%A2%AB%E8%87%AA%E5%8A%A8%E6%9A%82%E5%81%9C%E5%8F%8A%E5%BC%B9%E5%87%BA%E7%99%BB%E5%BD%95%E7%AA%97%E5%8F%A3.user.js
// @updateURL https://update.greasyfork.org/scripts/467474/Bilibili%20-%20%E9%98%B2%E6%AD%A2%E8%A7%86%E9%A2%91%E8%A2%AB%E8%87%AA%E5%8A%A8%E6%9A%82%E5%81%9C%E5%8F%8A%E5%BC%B9%E5%87%BA%E7%99%BB%E5%BD%95%E7%AA%97%E5%8F%A3.meta.js
// ==/UserScript==

(async function() {
  'use strict';

  // no need to continue this script if user already logged in
  if (document.cookie.includes('DedeUserID')) return;

  // in user space
  if (window.location.hostname === 'space.bilibili.com') {
    // add CSS to hide the login modal
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.bili-mini-mask, .login-panel-popover, .login-tip { display: none !important; }`;
    document.head.appendChild(styleElement);

    // reload page if login modal appears
    setInterval(() => {
      const maskElement = document.querySelector('.bili-mini-mask');
      if (maskElement) window.location.reload();
    }, 1000);

    // deal with repeated request with wrong page number
    let lastRequestTimestamp = 0;
    const originFetch = window.fetch;
    window.fetch = function() {
      if (!arguments[0].includes('space/wbi/arc/search')) return originFetch.apply(this, arguments);
      if (Date.now() - lastRequestTimestamp < 200) return Promise.reject(new Error('repeated request with wrong page number'));
      lastRequestTimestamp = Date.now();
      return originFetch.apply(this, arguments);
    }
  }

  //  in home page or video page
  if (window.location.hostname === 'www.bilibili.com') {
    // prevent miniLogin.js from appending to document
    const originAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function (childElement) {
      return childElement.tagName === 'SCRIPT' && childElement.src.includes('miniLogin')
        ? null
        : originAppendChild.call(this, childElement);
    }

    // wait until the 'getMediaInfo' method appears
    await new Promise(resolve => {
      const timer = setInterval(() => {
        if (window.player && window.player.getMediaInfo) {
          clearInterval(timer);
          resolve();
        }
      }, 1000);
    });
  
    // modify the 'getMediaInfo' method
    const originGetMediaInfo = window.player.getMediaInfo;
    window.player.getMediaInfo = function () {
      const { absolutePlayTime, relativePlayTime, playUrl } = originGetMediaInfo();
      return { absolutePlayTime: 0, relativePlayTime, playUrl };
    }
  
    // 'isClickedRecently' will be 'true' shortly if user clicked somewhere on the page
    let isClickedRecently = false;
    document.body.addEventListener('click', () => {
      isClickedRecently = true;
      setTimeout(() => isClickedRecently = false, 500);
    });
  
    // prevent pausing video by scripts
    const originPause = window.player.pause;
    window.player.pause = function () {
      if (!isClickedRecently) return;
      return originPause.apply(this, arguments);
    }
  }

})();