// ==UserScript==
// @name         Bilibili - 在未登录的情况下自动并无限试用最高画质
// @namespace    https://bilibili.com/
// @version      1.4
// @description  在未登录的情况下自动并无限试用最高画质 | V1.4 新增对播放列表页面的支持
// @license      GPL-3.0
// @author       DD1969
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/list/*
// @match        https://www.bilibili.com/festival/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/467511/Bilibili%20-%20%E5%9C%A8%E6%9C%AA%E7%99%BB%E5%BD%95%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E8%87%AA%E5%8A%A8%E5%B9%B6%E6%97%A0%E9%99%90%E8%AF%95%E7%94%A8%E6%9C%80%E9%AB%98%E7%94%BB%E8%B4%A8.user.js
// @updateURL https://update.greasyfork.org/scripts/467511/Bilibili%20-%20%E5%9C%A8%E6%9C%AA%E7%99%BB%E5%BD%95%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E8%87%AA%E5%8A%A8%E5%B9%B6%E6%97%A0%E9%99%90%E8%AF%95%E7%94%A8%E6%9C%80%E9%AB%98%E7%94%BB%E8%B4%A8.meta.js
// ==/UserScript==

(async function() {
  'use strict';

  // 如果希望以其他分辨率来观看视频，请将下一行等号右边的数字 1080 改为 720 或者 480，然后保存
  const preferQuality = 1080;

  // 如果希望避免看到切换高画质时的音画不同步现象，请将下一行等号右边的 false 改为 true，然后保存
  const isWaitUntilHighQualityLoaded = false;

  // apply configs from scriptStorage to localStorage
  const bilibili_player_codec_prefer_type = GM_getValue('bilibili_player_codec_prefer_type');
  const b_miniplayer = GM_getValue('b_miniplayer');
  const recommend_auto_play = GM_getValue('recommend_auto_play');
  const bpx_player_profile = GM_getValue('bpx_player_profile');
  if (bilibili_player_codec_prefer_type && b_miniplayer && recommend_auto_play && bpx_player_profile) {
    window.localStorage.setItem('bilibili_player_codec_prefer_type', bilibili_player_codec_prefer_type);
    window.localStorage.setItem('b_miniplayer', b_miniplayer);
    window.localStorage.setItem('recommend_auto_play', recommend_auto_play);
    window.localStorage.setItem('bpx_player_profile', bpx_player_profile);
  }

  // override 'setItem'
  const originSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    // fix TypeError: Cannot read properties of null (reading 'offLoudness') at turnOffLoudnessNormalization
    if (key === 'bpx_player_profile') {
      const profile = JSON.parse(value);
      if (!profile.audioEffect) profile.audioEffect = {};
      value = JSON.stringify(profile);
    }
    originSetItem.call(this, key, value);

    // save configs into scriptStorage
    if (key === 'bilibili_player_codec_prefer_type' || key === 'b_miniplayer' || key === 'recommend_auto_play' || key === 'bpx_player_profile') {
      setTimeout(() => {
        GM_setValue('bilibili_player_codec_prefer_type', window.localStorage.getItem('bilibili_player_codec_prefer_type') || '0');
        GM_setValue('b_miniplayer', window.localStorage.getItem('b_miniplayer') || '1');
        GM_setValue('recommend_auto_play', window.localStorage.getItem('recommend_auto_play') || 'open');
        GM_setValue('bpx_player_profile', window.localStorage.getItem('bpx_player_profile') || `{ lastView: ${Date.now() - 864e5}, lastUid: 0 }`);
      }, 100);
    }
  }

  // no need to continue this script if user has logged in
  if (document.cookie.includes('DedeUserID')) return;

  // enable trial every time a new video loaded
  const originDefineProperty = Object.defineProperty;
  Object.defineProperty = function(obj, prop, descriptor) {
    if (prop === 'isViewToday' || prop === 'isVideoAble') {
      descriptor = {
        get: () => true,
        enumerable: !1,
        configurable: !0
      }
    }
    return originDefineProperty.call(this, obj, prop, descriptor);
  }

  // extend trial time by overriding "setTimeout"
  const originSetTimeout = unsafeWindow.setTimeout;
  unsafeWindow.setTimeout = function(func, delay) {
    if (delay === 3e4) delay = 3e8;
    return originSetTimeout.call(this, func, delay);
  }

  // click the trial button automatically
  setInterval(async () => {
    const trialBtn = document.querySelector('.bpx-player-toast-confirm-login');
    if (!trialBtn) return;

    // start trialling
    await new Promise(resolve => setTimeout(resolve, 1000));
    trialBtn.click();

    // avoid audio and video out of sync
    if (isWaitUntilHighQualityLoaded) {
      // stop playing first
      const isPlaying = !unsafeWindow.player.mediaElement().paused;
      if (isPlaying) unsafeWindow.player.mediaElement().pause();

      // search for end signal
      const timer4Toast = setInterval(() => {
        const toasts = Array.from(document.querySelectorAll('.bpx-player-toast-text'));
        if (toasts.some(toast => toast.textContent.endsWith('试用中'))) {
          if (isPlaying) unsafeWindow.player.mediaElement().play();;
          clearInterval(timer4Toast);
        }
      }, 100);
    }

    // switch to preferred video quality
    const preferQualityNum = ({ 1080: 80, 720: 64, 480: 32 })[preferQuality] || 80;
    setTimeout(() => {
      if (unsafeWindow.player.getQuality().nowQ <= preferQualityNum) return;
      unsafeWindow.player.requestQuality(preferQualityNum)
    }, 5000);
  }, 1500);

})();