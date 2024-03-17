// ==UserScript==
// @name         Bilibili - 在未登录的情况下照常加载评论
// @namespace    https://bilibili.com/
// @version      2.5
// @description  在未登录的情况下照常加载评论 | V2.5 移除对专栏评论区的DOM修改
// @license      GPL-3.0
// @author       DD1969
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/play/*
// @match        https://t.bilibili.com/*
// @match        https://www.bilibili.com/opus/*
// @match        https://space.bilibili.com/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://www.bilibili.com/festival*
// @match        https://www.bilibili.com/list/*
// @icon         https://www.bilibili.com/favicon.ico
// @require      https://lib.baomitu.com/viewerjs/1.11.4/viewer.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.2/spark-md5.min.js
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/473498/Bilibili%20-%20%E5%9C%A8%E6%9C%AA%E7%99%BB%E5%BD%95%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E7%85%A7%E5%B8%B8%E5%8A%A0%E8%BD%BD%E8%AF%84%E8%AE%BA.user.js
// @updateURL https://update.greasyfork.org/scripts/473498/Bilibili%20-%20%E5%9C%A8%E6%9C%AA%E7%99%BB%E5%BD%95%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E7%85%A7%E5%B8%B8%E5%8A%A0%E8%BD%BD%E8%AF%84%E8%AE%BA.meta.js
// ==/UserScript==

(async function() {
  'use strict';

  // 如需使用分页加载主评论，请将下一行等号右边的 false 改为 true，然后保存
  const enableReplyPagination = false;

  // 如需一次性加载所有子评论，请将下一行等号右边的 false 改为 true，然后保存
  const enableLoadAllSubRepliesAtOnce = false;

  // no need to continue this script if user already logged in
  if (document.cookie.includes('DedeUserID')) return; 

  // RegExp
  const videoRE = /https:\/\/www\.bilibili\.com\/video\/.*/;
  const bangumiRE = /https:\/\/www.bilibili.com\/bangumi\/play\/.*/;
  const quoteRE = /https:\/\/t.bilibili.com\/\d+/;
  const opusRE = /https:\/\/www.bilibili.com\/opus\/\d+/;
  const spaceRE = /https:\/\/space.bilibili.com\/\d+/;
  const articleRE = /https:\/\/www.bilibili.com\/read\/cv\d+.*/;
  const festivalRE = /https:\/\/www.bilibili.com\/festival\/.*/;
  const listRE = /https:\/\/www.bilibili.com\/list\/.*/;

  // make comment buttons in dynamic page do their job
  if (spaceRE.test(window.location.href)) {
    setupCommentBtnModifier();
    return;
  }

  // redirect to new page if video source changed in festival page
  if (festivalRE.test(window.location.href)) {
    let record;
    const getBVID = () => window?.__INITIAL_STATE__?.videoInfo?.bvid;
    setInterval(() => {
      if (!record) record = getBVID();
      else if (record !== getBVID()) window.location.href = `${window.location.origin}${window.location.pathname}?bvid=${getBVID()}`;
    }, 1000);
  }

  // reload page when url changed
  if (videoRE.test(window.location.href) || bangumiRE.test(window.location.href) || listRE.test(window.location.href)) {
    const getHref = () => {
      const p = new URLSearchParams(window.location.search).get('p');
      const oid = new URLSearchParams(window.location.search).get('oid');
      return window.location.origin + window.location.pathname + (p ? `?p=${p}` : '') + (oid ? `?oid=${oid}` : '');
    }

    let oldHref = getHref();
    setInterval(() => {
      const newHref = getHref();
      if (oldHref !== newHref) {
        oldHref = newHref;
        start();
      }
    }, 1000);
  }

  // essential data or elements
  let oid, createrID, commentType, replyList, rootReplyHash, subReplyHash;

  // define sort types
  const sortTypeConstant = { LATEST: 0, HOT: 2 };
  let currentSortType;

  // use to prevent loading duplicated main reply
  let replyPool;

  // add style patch
  await addStyle();

  // start loading comments
  start();

  // ---------- functions below ----------

  async function start() {
    // initialize
    oid = createrID = commentType = replyList = rootReplyHash = subReplyHash = undefined;
    replyPool = {};
    currentSortType = sortTypeConstant.HOT;

    // special modification on old comment module
    if (festivalRE.test(window.location.href)) {
      await new Promise(resolve => {
        const timer = setInterval(() => {
          const replyCount = document.querySelector('.comment-wrapper .b-head .b-head-t.results')?.textContent;
          const replyHeaderHash = document.head.innerHTML.match(/\.reply-navigation\[(?<replyHeaderHash>data-v-[a-z0-9]{8})\]/)?.groups?.replyHeaderHash;
          const commentContainerElement = document.querySelector('.comment-wrapper .article-comment') || document.querySelector('.comment-wrapper .comment');
          const bbCommentElement = document.querySelector('.comment-wrapper .bb-comment');
          const commentHeaderElement = document.querySelector('.comment-wrapper .comment-header');
          const commentListElement = document.querySelector('.comment-wrapper .comment-list');

          if (replyCount && replyHeaderHash && commentContainerElement && bbCommentElement && commentHeaderElement && commentListElement) {
            commentContainerElement.classList.add('comment-container');
            bbCommentElement.classList.add('reply-warp');
            commentHeaderElement.classList.add('reply-header');
            commentHeaderElement.innerHTML = `
              <div ${replyHeaderHash} class="reply-navigation">
                <ul ${replyHeaderHash} class="nav-bar">
                  <li ${replyHeaderHash} class="nav-title">
                    <span ${replyHeaderHash} class="nav-title-text">评论</span>
                    <span ${replyHeaderHash} class="total-reply" style="color: var(--text3); font-size: 16px; transform: translateY(1px);">${replyCount}</span>
                  </li>
                  <li ${replyHeaderHash} class="nav-sort" style="font-size: 16px;">
                    <div ${replyHeaderHash} class="hot-sort" style="color: var(--text1);">最热</div>
                    <div ${replyHeaderHash} class="part-symbol" style="height: 14px; transform: translateY(1px);"></div>
                    <div ${replyHeaderHash} class="time-sort">最新</div>
                  </li>
                </ul>
              </div>
            `;
            commentListElement.classList.add('reply-list');
            clearInterval(timer);
            resolve();
          }
        }, 200);
      });
    }

    // collect essential data or elements
    await new Promise(resolve => {
      const timer = setInterval(async () => {
        // collect oid, createrID, commentType
        if (videoRE.test(window.location.href)) {
          const videoID = window.location.pathname.replace('/video/', '').replace('/', '');
          if (videoID.startsWith('av')) oid = videoID.slice(2);
          if (videoID.startsWith('BV')) oid = b2a(videoID);
          createrID = window?.__INITIAL_STATE__?.upData?.mid;
          commentType = 1;
        } else if (bangumiRE.test(window.location.href)) {
          oid = b2a(document.querySelector('a[class*=mediainfo_avLink]')?.textContent);
          createrID = document.querySelector('a[class*=upinfo_upLink]')?.href?.split('/').filter(item => !!item).pop() || -1;
          commentType = 1
        } else if (quoteRE.test(window.location.href)) {
          oid = window.location.pathname.replace('/', '');
          createrID = await fetch(`https://api.bilibili.com/x/polymer/web-dynamic/v1/detail?id=${oid}`).then(res => res.json()).then(json => json.data.item.modules.module_author.mid).catch(err => console.log('无法获取UP主ID'));
          commentType = 17;
          const videoLinkElement = document.querySelector('.content .bili-dyn-item .bili-dyn-item__body .bili-dyn-content__orig:not(.reference) .bili-dyn-card-video');
          if (videoLinkElement) {
            oid = b2a(new URL(videoLinkElement.href).pathname.replace('/video/', '').replace('/', ''));
            commentType = 1;
          }
        } else if (opusRE.test(window.location.href)) {
          oid = window?.__INITIAL_STATE__?.detail?.basic?.comment_id_str;
          createrID = window?.__INITIAL_STATE__?.detail?.basic?.uid;
          commentType = window?.__INITIAL_STATE__?.detail?.basic?.comment_type; // should be '11'
        } else if (articleRE.test(window.location.href)) {
          oid = window?.__INITIAL_STATE__?.cvid;
          createrID = window?.__INITIAL_STATE__?.readInfo?.author?.mid;
          commentType = 12;
        } else if (festivalRE.test(window.location.href)) {
          oid = window?.__INITIAL_STATE__?.videoInfo?.aid;
          createrID = window?.__INITIAL_STATE__?.videoInfo?.upMid;
          commentType = 1;
        } else if (listRE.test(window.location.href)) {
          oid = new URLSearchParams(window.location.search).get('oid');
          createrID = document.querySelector('.up-panel-container .up-avatar')?.getAttribute('href')?.split('/')?.pop();
          commentType = 1;
        }

        // collect reply container and data-v-hash
        replyList = document.querySelector('.reply-list');
        const rootReplyHashMatchResult = document.head.innerHTML.match(/\.reply-item\[(?<rootReplyHash>data-v-[a-z0-9]{8})\]/);
        const subReplyHashMatchResult = document.head.innerHTML.match(/\.sub-reply-item\[(?<subReplyHash>data-v-[a-z0-9]{8})\]/);

        // final check
        if (oid && createrID && commentType && replyList && rootReplyHashMatchResult && subReplyHashMatchResult) {
          createrID = parseInt(createrID);
          rootReplyHash = rootReplyHashMatchResult.groups.rootReplyHash;
          subReplyHash = subReplyHashMatchResult.groups.subReplyHash;
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });

    // enable switching sort type
    await enableSwitchingSortType();

    // load first pagination
    await loadFirstPagination();
  }

  // bvid to aid
  // ref: https://greasyfork.org/scripts/394296
  function b2a(bvid) {
    const XOR_CODE = 23442827791579n;
    const MASK_CODE = 2251799813685247n;
    const BASE = 58n;
    const BYTES = ["B", "V", 1, "", "", "", "", "", "", "", "", ""];
    const BV_LEN = BYTES.length;
    const ALPHABET = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf'.split('');
    const DIGIT_MAP = [0, 1, 2, 9, 7, 5, 6, 4, 8, 3, 10, 11];

    let r = 0n;
    for (let i = 3; i < BV_LEN; i++) {
      r = r * BASE + BigInt(ALPHABET.indexOf(bvid[DIGIT_MAP[i]]));
    }
    return `${r & MASK_CODE ^ XOR_CODE}`;
  }

  // load first pagination
  async function loadFirstPagination() {
    // get data of first pagination
    const { data: firstPaginationData, code: resultCode } = await getPaginationData(1);

    // make sure 'replyList' exists
    await new Promise(resolve => {
      const timer = setInterval(() => {
        document.body.contains(replyList)
        ? (clearInterval(timer), resolve())
        : (replyList = document.querySelector('.reply-list'));
      }, 200);
    });

    // clear replyList
    replyList.innerHTML = '';

    // clear replyPool
    replyPool = {};

    // script ends here if not able to fetch pagination data
    if (resultCode !== 0) {
      replyList.innerHTML = '<p style="padding: 100px 0; text-align: center; color: #999;">无法从API获取评论数据</p>';
      return;
    }

    // load the top reply if it exists
    if (firstPaginationData.top_replies && firstPaginationData.top_replies.length !== 0) {
      const topReplyData = firstPaginationData.top_replies[0];
      appendReplyItem(topReplyData, true);
    }

    // script ends here if there is no reply of this video
    if (firstPaginationData.replies.length === 0) return;

    // load normal replies
    for (const replyData of firstPaginationData.replies) {
      appendReplyItem(replyData);
    }

    // add page loader
    enableReplyPagination
    ? addReplyPageSwitcher()
    : addAnchor();
  }

  // get reply data according to pagination number
  async function getPaginationData(paginationNumber) {
    return await fetch(`https://api.bilibili.com/x/v2/reply?oid=${oid}&type=${commentType}&sort=${currentSortType}&pn=${paginationNumber}`)
      .then(res => res.json())
      .then(json => ({
        data: json.data,
        code: json.code
      }));
  }

  function appendReplyItem(replyData, isTopReply) {
    if (!enableReplyPagination && replyPool[replyData.rpid_str]) return;

    const replyItemElement = document.createElement('div');
    replyItemElement.classList.add('reply-item');
    replyItemElement.innerHTML = `
      <div class="root-reply-container" ${rootReplyHash}>
        <a class="root-reply-avatar" href="https://space.bilibili.com/${replyData.mid}" target="_blank" data-user-id="${replyData.mid}" data-root-reply-id="${replyData.rpid}" ${rootReplyHash}>
          <div class="avatar" ${rootReplyHash}>
            <div class="bili-avatar">
              <img class="bili-avatar-img bili-avatar-face bili-avatar-img-radius" data-src="${replyData.member.avatar}" alt="" src="${replyData.member.avatar}">
              ${
                replyData.member.pendant.image
                ? `
                <div class="bili-avatar-pendent-dom" style="transform: scale(0.85);">
                  <img class="bili-avatar-img" data-src="${replyData.member.pendant.image}" alt="" src="${replyData.member.pendant.image}">
                </div>
                `
                : ''
              }
              <span class="bili-avatar-icon bili-avatar-right-icon  bili-avatar-size-40"></span>
            </div>
          </div>
        </a>
        <div class="content-warp" ${rootReplyHash}>
          <div class="reply-decorate" ${rootReplyHash}>
            <div class="user-sailing" ${rootReplyHash}>
              ${
                replyData.member.user_sailing?.cardbg
                ? `
                <img class="user-sailing-img" src="${replyData.member.user_sailing.cardbg.image}@576w.webp" ${rootReplyHash}>
                <div class="user-sailing-text" ${rootReplyHash} style="color: ${replyData.member.user_sailing.cardbg.fan.color}">
                  <span class="sailing-text" ${rootReplyHash}>NO.</span>
                  <br ${rootReplyHash}>
                  <span class="sailing-text" ${rootReplyHash}>${replyData.member.user_sailing.cardbg.fan.number.toString().padStart(6, '0')}</span>
                </div>
                `
                : ''
              }
            </div>
          </div>
          <div class="user-info" ${rootReplyHash}>
            <a class="user-name" href="https://space.bilibili.com/${replyData.mid}" target="_blank" data-user-id="${replyData.mid}" data-root-reply-id="${replyData.rpid}" ${rootReplyHash} style="color: ${replyData.member.vip.nickname_color ? replyData.member.vip.nickname_color : '#61666d'}">${replyData.member.uname}</a>
            <span style="height: 16px; padding: 0 2px; margin-right: 4px; display: flex; align-items: center; font-size: 12px; color: white; border-radius: 2px; background-color: ${getMemberLevelColor(replyData.member.level_info.current_level)};">LV${replyData.member.level_info.current_level}</span>
            ${
              createrID === replyData.mid
              ? '<i class="svg-icon up-web up-icon" ${rootReplyHash} style="width: 24px; height: 24px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="4" width="24" height="16" rx="2" fill="#FF6699"></rect><path d="M5.7 8.36V12.79C5.7 13.72 5.96 14.43 6.49 14.93C6.99 15.4 7.72 15.64 8.67 15.64C9.61 15.64 10.34 15.4 10.86 14.92C11.38 14.43 11.64 13.72 11.64 12.79V8.36H10.47V12.81C10.47 13.43 10.32 13.88 10.04 14.18C9.75 14.47 9.29 14.62 8.67 14.62C8.04 14.62 7.58 14.47 7.3 14.18C7.01 13.88 6.87 13.43 6.87 12.81V8.36H5.7ZM13.0438 8.36V15.5H14.2138V12.76H15.9838C17.7238 12.76 18.5938 12.02 18.5938 10.55C18.5938 9.09 17.7238 8.36 16.0038 8.36H13.0438ZM14.2138 9.36H15.9138C16.4238 9.36 16.8038 9.45 17.0438 9.64C17.2838 9.82 17.4138 10.12 17.4138 10.55C17.4138 10.98 17.2938 11.29 17.0538 11.48C16.8138 11.66 16.4338 11.76 15.9138 11.76H14.2138V9.36Z" fill="white"></path></svg></i>'
              : ''
            }
          </div>
          <div class="root-reply" ${rootReplyHash}>
            <span class="reply-content-container root-reply" ${rootReplyHash} style="padding-bottom: 8px;">
              <span class="reply-content">${isTopReply? '<i class="top-icon">置顶</i>': ''}${replyData.content.pictures ? `<div class="note-prefix" style="transform: translateY(-2px);"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="#BBBBBB"><path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM3.5 6.25a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm.75 2.25h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5Z"></path></svg><div style="margin-left: 3px;">笔记</div></div>` : ''}${getConvertedMessage(replyData.content)}</span>
            </span>
            ${
              replyData.content.pictures
              ? `
              <div class="image-exhibition" ${rootReplyHash} style="margin: 8px 0; user-select: none;">
                <div class="preview-image-container" style="display: flex;">
                  ${getImageItems(replyData.content.pictures)}
                </div>
              </div>
              `
              : ''
            }
            <div class="reply-info" ${rootReplyHash}>
              <span class="reply-time" ${rootReplyHash} style="margin-right: 20px;">${getFormattedTime(replyData.ctime)}</span>
              <span class="reply-like" ${rootReplyHash}>
                <i class="svg-icon like use-color like-icon" ${rootReplyHash} style="width: 16px; height: 16px;"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3323" width="200" height="200"><path d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z" p-id="3324" fill="#9499a0"></path></svg></i>
                <span>${replyData.like}</span>
              </span>
              <span class="reply-dislike" ${rootReplyHash}>
                <i class="svg-icon dislike use-color dislike-icon" ${rootReplyHash} style="width: 16px; height: 16px;"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3933" width="200" height="200"><path d="M594.112 872.768a34.048 34.048 0 0 1-29.12-10.816c-11.264-13.248-15.872-24.064-21.504-40.064l-1.92-5.632c-5.632-16.128-12.8-36.864-27.712-63.232-25.344-44.928-50.24-74.432-86.144-97.024-23.104-14.528-43.648-26.432-65.024-32.64V203.84a4570.24 4570.24 0 0 1 339.072 4.672c38.656 2.048 72 21.12 88.896 52.032 21.504 39.36 47.232 95.744 63.552 163.008 16.448 67.52 21.568 123.776 22.592 163.008 0.448 16.832-13.44 32.256-35.392 32.256h-197.248a32 32 0 0 0-28.608 46.336l0.128 0.32 0.64 1.28 2.56 5.568c2.176 4.8 5.12 11.776 8.384 20.16 6.528 17.088 13.568 39.04 16.768 60.416 4.928 33.344 3.712 60.16-9.344 84.992-14.08 26.688-30.016 33.728-40.576 34.944z m97.728-190.016h149.568c52.8 0 100.864-40.128 99.392-97.92a846.336 846.336 0 0 0-24.32-176.448 742.016 742.016 0 0 0-69.632-178.56c-29.248-53.44-84.48-82.304-141.824-85.248-55.68-2.88-138.24-5.952-235.712-5.952-96 0-183.488 3.008-244.672 5.76-66.368 3.136-123.328 51.392-130.944 119.872a1380.608 1380.608 0 0 0-0.768 296.704c7.68 72.768 70.4 121.792 140.032 121.792h97.728c13.76 0 28.16 5.504 62.976 27.392 24.064 15.168 42.432 35.264 64.448 74.368 11.968 21.12 17.472 36.864 22.976 52.736l2.048 5.888c6.656 18.88 14.336 38.4 33.216 60.416 19.456 22.72 51.456 36.736 85.184 32.768 35.2-4.096 67.776-26.88 89.792-68.672 22.208-42.112 21.888-84.8 16-124.288a343.04 343.04 0 0 0-15.488-60.608zM298.688 205.568v413.184H232.96c-40.512 0-72.448-27.712-76.352-64.512a1318.912 1318.912 0 0 1 0.64-282.88c3.904-34.816 32.896-61.248 70.4-62.976 20.8-0.96 44.736-1.92 71.04-2.816z" p-id="3934" fill="#9499a0"></path></svg></i>
              </span>
              <span class="reply-btn" ${rootReplyHash}>回复</span>
            </div>
            <div class="reply-tag-list" ${rootReplyHash}">
              ${
                replyData.card_label
                ? replyData.card_label.reduce((acc, cur) => acc + `<span class="reply-tag-item" ${rootReplyHash} style="font-size: 12px; background-color: ${cur.label_color_day}; color: ${cur.text_color_day};">${cur.text_content}</span>`, '')
                : ''
              }
            </div>
          </div>
        </div>
      </div>
      <div class="sub-reply-container" ${rootReplyHash}>
        <div class="sub-reply-list" ${rootReplyHash}>
          ${getSubReplyItems(replyData.replies) || ''}
          ${
            replyData.rcount > 3
            ? `
            <div class="view-more" style="padding-left: 8px; font-size: 13px; color: #9499A0;">
              <div class="view-more-default">
                <span>共${replyData.rcount}条回复, </span>
                <span class="view-more-btn" style="cursor: pointer;">点击查看</span>
              </div>
            </div>
            `
            : ''
          }
        </div>
      </div>
      <div class="bottom-line" ${rootReplyHash}></div>
    `;
    replyList.appendChild(replyItemElement);
    if (!enableReplyPagination) replyPool[replyData.rpid_str] = true;

    // setup image viewer
    const previewImageContainer = replyItemElement.querySelector('.preview-image-container');
    if (previewImageContainer) new Viewer(previewImageContainer, { title: false, toolbar: false, tooltip: false, keyboard: false });

    // setup view more button
    const subReplyList = replyItemElement.querySelector('.sub-reply-list');
    const viewMoreBtn = replyItemElement.querySelector('.view-more-btn');
    viewMoreBtn && viewMoreBtn.addEventListener('click', () => {
      enableLoadAllSubRepliesAtOnce
      ? loadAllSubReplies(replyData.rpid, subReplyList)
      : loadPaginatedSubReplies(replyData.rpid, subReplyList, replyData.rcount, 1);
    });
  }

  function getFormattedTime(ms) {
    const time = new Date(ms * 1000);
    const year = time.getFullYear();
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const day = time.getDate().toString().padStart(2, '0');
    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  function getMemberLevelColor(level) {
    return ({
      1: '#BBBBBB',
      2: '#8BD29B',
      3: '#7BCDEF',
      4: '#FEBB8B',
      5: '#EE672A',
      6: '#F04C49'
    })[level];
  }

  function getConvertedMessage(content) {
    let result = content.message;

    // convert emote tag to image
    if (content.emote) {
      for (const [key, value] of Object.entries(content.emote)) {
        const imageElementHTML = `<img class="emoji-${['', 'small', 'large'][value.meta.size]}" src="${value.url}" alt="${key}">`;
        result = result.replaceAll(key, imageElementHTML);
      }
    }

    // convert timestamp to link
    result = result.replaceAll(/(\d{1,2}[:：]){1,2}\d{1,2}/g, (timestamp) => {
      timestamp = timestamp.replaceAll('：', ':');

      // return plain text if no video in page
      if(!(videoRE.test(window.location.href) || bangumiRE.test(window.location.href) || festivalRE.test(window.location.href) || listRE.test(window.location.href))) return timestamp;

      const parts = timestamp.split(':');
      // return plain text if any part of timestamp equal to or bigger than 60
      if (parts.some(part => parseInt(part) >= 60)) return timestamp;
      
      let totalSecond;
      if (parts.length === 2) totalSecond = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      else if (parts.length === 3) totalSecond = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
      // return plain text if failed to get vaild number of second
      if (Number.isNaN(totalSecond)) return timestamp;

      return `<a class="jump-link video-time" onclick="window.player.mediaElement().currentTime = ${totalSecond}; window.scrollTo(0, 0); window.player.play();">${timestamp}</a>`;
    });

    // convert url to link
    if (Object.keys(content.jump_url).length) {
      for (const [key, value] of Object.entries(content.jump_url)) {
        const href = key.startsWith('BV') ? `https://www.bilibili.com/video/${key}` : (value.pc_url || key);
        const linkElementHTML = `<img class="icon normal" src="${value.prefix_icon}" style="${value.extra && value.extra.is_word_search && 'width: 12px;'}"><a class="jump-link normal" href="${href}" target="_blank" noopener noreferrer>${value.title}</a>`;
        result = result.replaceAll(key, linkElementHTML);
      }
    }

    // convert @ user
    if (content.at_name_to_mid) {
      for (const [key, value] of Object.entries(content.at_name_to_mid)) {
        const linkElementHTML = `<a class="jump-link user" data-user-id="${value}" href="https://space.bilibili.com/${value}" target="_blank" noopener noreferrer>@${key}</a>`;
        result = result.replaceAll(`@${key}`, linkElementHTML);
      }
    }

    return result;
  }

  function getImageItems(images) {
    images = images.slice(0, 3);
    const imageSizeConfig = ({
      1: 'max-width: 280px; max-height: 180px;',
      2: 'width: 128px; height: 128px;',
      3: 'width: 96px; height: 96px;',
    })[images.length];

    let result = '';
    for (const image of images) {
      result += `<div class="image-item-wrap" style="margin-right: 4px; cursor: zoom-in;"><img src="${image.img_src}" style="border-radius: 4px; ${imageSizeConfig}"></div>`;
    }
    return result;
  }

  function getSubReplyItems(subReplies) {
    if (!subReplies || subReplies.length === 0) return;

    let result = '';
    for (const replyData of subReplies) {
      result += `
        <div class="sub-reply-item" ${subReplyHash}>
          <div class="sub-user-info" ${subReplyHash}>
            <a class="sub-reply-avatar" href="https://space.bilibili.com/${replyData.mid}" target="_blank" data-user-id="${replyData.mid}" data-root-reply-id="${replyData.rpid}" ${subReplyHash}>
              <div class="avatar" ${subReplyHash}>
                <div class="bili-avatar">
                  <img class="bili-avatar-img bili-avatar-face bili-avatar-img-radius" data-src="${replyData.member.avatar}" alt="" src="${replyData.member.avatar}">
                  <span class="bili-avatar-icon bili-avatar-right-icon  bili-avatar-size-24"></span>
                </div>
              </div>
            </a>
            <a class="sub-user-name" href="https://space.bilibili.com/${replyData.mid}" target="_blank" data-user-id="${replyData.mid}" data-root-reply-id="${replyData.rpid}" ${subReplyHash} style="color: ${replyData.member.vip.nickname_color ? replyData.member.vip.nickname_color : '#61666d'}">${replyData.member.uname}</a>
            <span style="height: 16px; padding: 0 2px; margin-right: 4px; display: flex; align-items: center; font-size: 12px; color: white; border-radius: 2px; background-color: ${getMemberLevelColor(replyData.member.level_info.current_level)};">LV${replyData.member.level_info.current_level}</span>
            ${
              createrID === replyData.mid
              ? `<i class="svg-icon up-web up-icon" ${subReplyHash} style="width: 24px; height: 24px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="4" width="24" height="16" rx="2" fill="#FF6699"></rect><path d="M5.7 8.36V12.79C5.7 13.72 5.96 14.43 6.49 14.93C6.99 15.4 7.72 15.64 8.67 15.64C9.61 15.64 10.34 15.4 10.86 14.92C11.38 14.43 11.64 13.72 11.64 12.79V8.36H10.47V12.81C10.47 13.43 10.32 13.88 10.04 14.18C9.75 14.47 9.29 14.62 8.67 14.62C8.04 14.62 7.58 14.47 7.3 14.18C7.01 13.88 6.87 13.43 6.87 12.81V8.36H5.7ZM13.0438 8.36V15.5H14.2138V12.76H15.9838C17.7238 12.76 18.5938 12.02 18.5938 10.55C18.5938 9.09 17.7238 8.36 16.0038 8.36H13.0438ZM14.2138 9.36H15.9138C16.4238 9.36 16.8038 9.45 17.0438 9.64C17.2838 9.82 17.4138 10.12 17.4138 10.55C17.4138 10.98 17.2938 11.29 17.0538 11.48C16.8138 11.66 16.4338 11.76 15.9138 11.76H14.2138V9.36Z" fill="white"></path></svg></i>`
              : ''
            }
          </div>
          <span class="reply-content-container sub-reply-content" ${subReplyHash}>
            <span class="reply-content">${getConvertedMessage(replyData.content)}</span>
          </span>
          <div class="sub-reply-info" ${subReplyHash} style="margin: 4px 0;">
            <span class="sub-reply-time" ${subReplyHash} style="margin-right: 20px;">${getFormattedTime(replyData.ctime)}</span>
            <span class="sub-reply-like" ${subReplyHash}>
              <i class="svg-icon like use-color sub-like-icon" ${subReplyHash} style="width: 16px; height: 16px;"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3323" width="200" height="200"><path d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z" p-id="3324" fill="#9499a0"></path></svg></i>
              <span>${replyData.like}</span>
            </span>
            <span class="sub-reply-dislike" ${subReplyHash}>
              <i class="svg-icon dislike use-color sub-dislike-icon" ${subReplyHash} style="width: 16px; height: 16px;"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3933" width="200" height="200"><path d="M594.112 872.768a34.048 34.048 0 0 1-29.12-10.816c-11.264-13.248-15.872-24.064-21.504-40.064l-1.92-5.632c-5.632-16.128-12.8-36.864-27.712-63.232-25.344-44.928-50.24-74.432-86.144-97.024-23.104-14.528-43.648-26.432-65.024-32.64V203.84a4570.24 4570.24 0 0 1 339.072 4.672c38.656 2.048 72 21.12 88.896 52.032 21.504 39.36 47.232 95.744 63.552 163.008 16.448 67.52 21.568 123.776 22.592 163.008 0.448 16.832-13.44 32.256-35.392 32.256h-197.248a32 32 0 0 0-28.608 46.336l0.128 0.32 0.64 1.28 2.56 5.568c2.176 4.8 5.12 11.776 8.384 20.16 6.528 17.088 13.568 39.04 16.768 60.416 4.928 33.344 3.712 60.16-9.344 84.992-14.08 26.688-30.016 33.728-40.576 34.944z m97.728-190.016h149.568c52.8 0 100.864-40.128 99.392-97.92a846.336 846.336 0 0 0-24.32-176.448 742.016 742.016 0 0 0-69.632-178.56c-29.248-53.44-84.48-82.304-141.824-85.248-55.68-2.88-138.24-5.952-235.712-5.952-96 0-183.488 3.008-244.672 5.76-66.368 3.136-123.328 51.392-130.944 119.872a1380.608 1380.608 0 0 0-0.768 296.704c7.68 72.768 70.4 121.792 140.032 121.792h97.728c13.76 0 28.16 5.504 62.976 27.392 24.064 15.168 42.432 35.264 64.448 74.368 11.968 21.12 17.472 36.864 22.976 52.736l2.048 5.888c6.656 18.88 14.336 38.4 33.216 60.416 19.456 22.72 51.456 36.736 85.184 32.768 35.2-4.096 67.776-26.88 89.792-68.672 22.208-42.112 21.888-84.8 16-124.288a343.04 343.04 0 0 0-15.488-60.608zM298.688 205.568v413.184H232.96c-40.512 0-72.448-27.712-76.352-64.512a1318.912 1318.912 0 0 1 0.64-282.88c3.904-34.816 32.896-61.248 70.4-62.976 20.8-0.96 44.736-1.92 71.04-2.816z" p-id="3934" fill="#9499a0"></path></svg></i>
            </span>
            <span class="sub-reply-btn" ${subReplyHash}>回复</span>
          </div>
        </div>
      `;
    }
    return result;
  }

  async function loadAllSubReplies(rootReplyID, subReplyList) {
    let subPaginationCounter = 1;
    while(true) {
      const subReplyData = await fetch(`https://api.bilibili.com/x/v2/reply/reply?oid=${oid}&pn=${subPaginationCounter++}&ps=20&root=${rootReplyID}&type=${commentType}`).then(res => res.json()).then(json => json.data);
      if (subPaginationCounter - 1 === 1) subReplyList.innerHTML = '';
      if (subReplyData.replies && subReplyData.replies.length > 0) {
        subReplyList.innerHTML += getSubReplyItems(subReplyData.replies);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        break;
      }
    }
  }

  async function loadPaginatedSubReplies(rootReplyID, subReplyList, subReplyAmount, paginationNumber) {
    // replace reply list with new replies
    const subReplyData = await fetch(`https://api.bilibili.com/x/v2/reply/reply?oid=${oid}&pn=${paginationNumber}&ps=10&root=${rootReplyID}&type=${commentType}`).then(res => res.json()).then(json => json.data);
    if (subReplyData.replies) subReplyList.innerHTML = getSubReplyItems(subReplyData.replies);

    // add page switcher
    addSubReplyPageSwitcher(rootReplyID, subReplyList, subReplyAmount, paginationNumber);

    // scroll to the top of replyItem
    let elemTop = subReplyList.parentElement.parentElement.offsetTop;
    let parentElem = subReplyList.parentElement.parentElement.offsetParent;
    while (parentElem) {
      elemTop += parentElem.offsetTop;
      parentElem = parentElem.offsetParent;
    }
    window.scrollTo(0, elemTop - 60);
  }

  function addSubReplyPageSwitcher(rootReplyID, subReplyList, subReplyAmount, currentPageNumber) {
    if (subReplyAmount <= 10) return;

    const pageAmount = Math.ceil(subReplyAmount / 10);
    const pageSwitcher = document.createElement('div');
    pageSwitcher.classList.add('view-more');
    pageSwitcher.innerHTML = `
      <div class="view-more-pagination">
        <span class="pagination-page-count">共${pageAmount}页</span>
        ${ currentPageNumber !== 1 ? '<span class="pagination-btn pagination-to-prev-btn">上一页</span>' : '' }
        ${
          (() => {
            // 4 on the left, 4 on the right, then merge
            const left = [currentPageNumber - 4, currentPageNumber - 3, currentPageNumber - 2, currentPageNumber - 1].filter(num => num >= 1);
            const right = [currentPageNumber + 1, currentPageNumber + 2, currentPageNumber + 3, currentPageNumber + 4].filter(num => num <= pageAmount);
            const merge = [].concat(left, currentPageNumber, right);

            // chosen 5(if able)
            let chosen;
            if (currentPageNumber <= 3) chosen = merge.slice(0, 5);
            else if (currentPageNumber >= pageAmount - 3) chosen = merge.reverse().slice(0, 5).reverse();
            else chosen = merge.slice(merge.indexOf(currentPageNumber) - 2, merge.indexOf(currentPageNumber) + 3);

            // add first and dots
            let final = JSON.parse(JSON.stringify(chosen));
            if (!final.includes(1)) {
              let front = [1];
              if (final.at(0) !== 2) front = [1, '...'];
              final = [].concat(front, final);
            }

            // add last and dots
            if (!final.includes(pageAmount)) {
              let back = [pageAmount];
              if (final.at(-1) !== pageAmount - 1) back = ['...', pageAmount];
              final = [].concat(final, back);
            }

            // assemble to html
            return final.reduce((acc, cur) => {
              if (cur === '...') return acc + '<span class="pagination-page-dot">...</span>';
              if (cur === currentPageNumber) return acc + `<span class="pagination-page-number current-page">${cur}</span>`;
              return acc + `<span class="pagination-page-number">${cur}</span>`;
            }, '');
          })()
        }
        ${ currentPageNumber !== pageAmount ? '<span class="pagination-btn pagination-to-next-btn">下一页</span>': '' }
      </div>
    `;
    
    // add click event listener
    pageSwitcher.querySelector('.pagination-to-prev-btn')?.addEventListener('click', () => loadPaginatedSubReplies(rootReplyID, subReplyList, subReplyAmount, currentPageNumber - 1));
    pageSwitcher.querySelector('.pagination-to-next-btn')?.addEventListener('click', () => loadPaginatedSubReplies(rootReplyID, subReplyList, subReplyAmount, currentPageNumber + 1));
    pageSwitcher.querySelectorAll('.pagination-page-number:not(.current-page)')?.forEach(pageNumberElement => {
      const number = parseInt(pageNumberElement.textContent);
      pageNumberElement.addEventListener('click', () => loadPaginatedSubReplies(rootReplyID, subReplyList, subReplyAmount, number));
    });

    // append page switcher
    subReplyList.appendChild(pageSwitcher);
  }

  async function addReplyPageSwitcher() {
    // clear old page switcher
    const oldPageSwitcher = document.querySelector('.comment-container .reply-warp .page-switcher');
    oldPageSwitcher && oldPageSwitcher.remove();

    let isPageAmountFound = false;
    let currentMaxPageNumber = 1;
    let currentPageNumber = 1;

    // check if there is no reply in page 2
    const { data: nextPaginationData } = await getPaginationData(currentPageNumber + 1);
    if (!nextPaginationData.replies || nextPaginationData.replies.length === 0) return;

    const pageSwitcher = document.createElement('div');
    pageSwitcher.classList.add('page-switcher');
    pageSwitcher.style = `
      width: 100%;
      display: flex;
      justify-content: center;
      transform: translateY(-60px);
    `;
    pageSwitcher.appendChild(generatePageSwitcher());
    document.querySelector('.comment-container .reply-warp').appendChild(pageSwitcher);

    function generatePageSwitcher() {
      const wrapper = document.createElement('div');
      wrapper.classList.add('page-switcher-wrapper');
      wrapper.innerHTML = `
        ${
          currentPageNumber === 1
          ? '<span class="page-switcher-prev-btn__disabled">上一页</span>'
          : '<span class="page-switcher-prev-btn">上一页</span>'
        }
        ${
          (() => {
            // 4 on the left, 4 on the right, then merge
            const left = [currentPageNumber - 4, currentPageNumber - 3, currentPageNumber - 2, currentPageNumber - 1].filter(num => num >= 1);
            const right = [currentPageNumber + 1, currentPageNumber + 2, currentPageNumber + 3, currentPageNumber + 4].filter(num => num <= currentMaxPageNumber);
            const merge = [].concat(left, currentPageNumber, right);

            // chosen 5(if able)
            let chosen;
            if (currentPageNumber <= 3) chosen = merge.slice(0, 5);
            else if (currentPageNumber >= currentMaxPageNumber - 3) chosen = merge.reverse().slice(0, 5).reverse();
            else chosen = merge.slice(merge.indexOf(currentPageNumber) - 2, merge.indexOf(currentPageNumber) + 3);

            // add first and dots
            let final = JSON.parse(JSON.stringify(chosen));
            if (!final.includes(1)) {
              let front = [1];
              if (final.at(0) !== 2) front = [1, 'dot'];
              final = [].concat(front, final);
            }

            // add last and dots
            if (!final.includes(currentMaxPageNumber)) {
              let back = [currentMaxPageNumber];
              if (final.at(-1) !== currentMaxPageNumber - 1) back = ['dot', currentMaxPageNumber];
              final = [].concat(final, back);
            }

            // assemble to html
            return final.reduce((acc, cur) => {
              if (cur === 'dot') return acc + '<span class="page-switcher-dot">•••</span>';
              if (cur === currentPageNumber) return acc + `<span class="page-switcher-number page-switcher-current-page">${cur}</span>`;
              return acc + `<span class="page-switcher-number">${cur}</span>`;
            }, '');
          })()
        }
        ${
          isPageAmountFound && currentPageNumber === currentMaxPageNumber
          ? '<span class="page-switcher-next-btn__disabled">下一页</span>'
          : '<span class="page-switcher-next-btn">下一页</span>'
        }
      `;

      // prev button click event
      wrapper.querySelector('.page-switcher-prev-btn')?.addEventListener('click', async () => {
        currentPageNumber -= 1;

        const { data: prevPaginationData } = await getPaginationData(currentPageNumber);
        replyList.innerHTML = '';

        // if loading page 1, load top reply if it exists
        if (currentPageNumber === 1 && prevPaginationData.top_replies && prevPaginationData.top_replies.length !== 0) {
          const topReplyData = prevPaginationData.top_replies[0];
          appendReplyItem(topReplyData, true);
        }

        for (const replyData of prevPaginationData.replies) {
          appendReplyItem(replyData);
        }

        pageSwitcher.innerHTML = '';
        pageSwitcher.appendChild(generatePageSwitcher());

        scrollToTopOfReplyList();
      });

      // next button click event
      wrapper.querySelector('.page-switcher-next-btn')?.addEventListener('click', async function nextButtonOnClickHandler(e) {
        if (currentPageNumber === currentMaxPageNumber && isPageAmountFound) return;

        const { data: nextPaginationData } = await getPaginationData(currentPageNumber + 1);
        if (!nextPaginationData.replies || nextPaginationData.replies.length === 0) {
          isPageAmountFound = true;
          e.target.classList.add('page-switcher-next-btn__disabled');
          e.target.classList.remove('page-switcher-next-btn');
          return;
        }

        if (currentPageNumber === currentMaxPageNumber) currentMaxPageNumber += 1;
        currentPageNumber += 1;
        
        replyList.innerHTML = '';
        for (const replyData of nextPaginationData.replies) {
          appendReplyItem(replyData);
        }

        pageSwitcher.innerHTML = '';
        pageSwitcher.appendChild(generatePageSwitcher());

        scrollToTopOfReplyList();
      });

      // number button click event
      wrapper.querySelectorAll('.page-switcher-number:not(.page-switcher-current-page)')?.forEach(numberElement => {
        numberElement.addEventListener('click', async () => {
          const targetPageNumber = parseInt(numberElement.textContent);
          currentPageNumber = targetPageNumber;
          
          const { data: paginationData } = await getPaginationData(targetPageNumber);
          replyList.innerHTML = '';

            // if loading page 1, load top reply if it exists
          if (targetPageNumber === 1 && paginationData.top_replies && paginationData.top_replies.length !== 0) {
            const topReplyData = paginationData.top_replies[0];
            appendReplyItem(topReplyData, true);
          }

          for (const replyData of paginationData.replies) {
            appendReplyItem(replyData);
          }

          pageSwitcher.innerHTML = '';
          pageSwitcher.appendChild(generatePageSwitcher());

          scrollToTopOfReplyList();
        });
      });

      return wrapper;
    }

    // scroll to the top of reply list
    function scrollToTopOfReplyList() {
      let elemTop = replyList.offsetTop;
      let parentElem = replyList.offsetParent;
      while (parentElem) {
        elemTop += parentElem.offsetTop;
        parentElem = parentElem.offsetParent;
      }
      window.scrollTo(0, elemTop - 196);
    }
  }

  function addAnchor() {
    // clear old anchor
    const oldAnchor = document.querySelector('.comment-container .reply-warp .anchor-for-loading');
    oldAnchor && oldAnchor.remove();

    const anchorElement = document.createElement('div');
    anchorElement.classList.add('anchor-for-loading');
    anchorElement.textContent = '正在加载...';
    anchorElement.style = `
      width: calc(100% - 22px);
      height: 40px;
      margin-left: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(-60px);
      color: #61666d;
    `;
    document.querySelector('.comment-container .reply-warp').appendChild(anchorElement);

    let paginationCounter = 1;
    const ob = new IntersectionObserver(async (entries) => {
      if (!entries[0].isIntersecting) return;

      const { data: newPaginationData } = await getPaginationData(++paginationCounter);
      if (!newPaginationData.replies || newPaginationData.replies.length === 0) {
        anchorElement.textContent = '所有评论已加载完毕';
        ob.disconnect();
        return;
      }

      for (const replyData of newPaginationData.replies) {
        appendReplyItem(replyData);
      }
    });

    ob.observe(anchorElement);
  }

  async function enableSwitchingSortType() {
    // collect elements
    const { selectedReplyElement, hotSortElement, timeSortElement } = await new Promise(resolve => {
      const timer = setInterval(() => {
        const selectedReplyElement = document.querySelector('.comment-container .reply-header .nav-select-reply');
        const hotSortElement = document.querySelector('.comment-container .reply-header .hot-sort');
        const timeSortElement = document.querySelector('.comment-container .reply-header .time-sort');
        if (selectedReplyElement || (hotSortElement && timeSortElement)) {
          clearInterval(timer);
          resolve({ selectedReplyElement, hotSortElement, timeSortElement });
        }
      }, 200);
    });

    // no need to setup click event listener if replies are selected
    if (selectedReplyElement) return;

    // setup click event listener
    hotSortElement.addEventListener('click', async () => {
      if (currentSortType === sortTypeConstant.HOT) return;
      currentSortType = sortTypeConstant.HOT;
      hotSortElement.style.color = '#18191C';
      timeSortElement.style.color = '#9499A0';
      await loadFirstPagination();
    });

    timeSortElement.addEventListener('click', async () => {
      if (currentSortType === sortTypeConstant.LATEST) return;
      currentSortType = sortTypeConstant.LATEST;
      hotSortElement.style.color = '#9499A0';
      timeSortElement.style.color = '#18191C';
      await loadFirstPagination();
    });
  }

  async function addStyle() {
    // avatar CSS
    const avatarCSS = document.createElement('style');
    avatarCSS.textContent = `
      .reply-item .root-reply-avatar .avatar .bili-avatar {
        width: 48px;
        height: 48px;
      }

      .sub-reply-item .sub-reply-avatar .avatar .bili-avatar {
        width: 30px;
        height: 30px;
      }

      @media screen and (max-width: 1620px) {
        .reply-item .root-reply-avatar .avatar .bili-avatar {
          width: 40px;
          height: 40px;
        }

        .sub-reply-item .sub-reply-avatar .avatar .bili-avatar {
          width: 24px;
          height: 24px;
        }
      }
    `;
    document.head.appendChild(avatarCSS);

    // view-more CSS
    const viewMoreCSS = document.createElement('style');
    viewMoreCSS.textContent = `
      .sub-reply-container .view-more-btn:hover {
        color: #00AEEC;
      }

      .view-more {
        padding-left: 8px;
        color: #222;
        font-size: 13px;
        user-select: none;
      }

      .pagination-page-count {
        margin-right: 10px;
      }

      .pagination-page-dot,
      .pagination-page-number {
        margin: 0 4px;
      }

      .pagination-btn,
      .pagination-page-number {
        cursor: pointer;
      }

      .current-page,
      .pagination-btn:hover,
      .pagination-page-number:hover {
        color: #00AEEC;
      }
    `;
    document.head.appendChild(viewMoreCSS);

    // page switcher CSS
    const pageSwitcherCSS = document.createElement('style');
    pageSwitcherCSS.textContent = `
      .page-switcher-wrapper {
        display: flex;
        font-size: 14px;
        color: #666;
        user-select: none;
      }

      .page-switcher-wrapper span {
        margin-right: 6px;
      }

      .page-switcher-wrapper span:not(.page-switcher-dot){
        display: flex;
        padding: 0 14px;
        height: 38px;
        align-items: center;
        border: 1px solid #D7DDE4;
        border-radius: 4px;
        cursor: pointer;
        transition: border-color 0.2s;
      }

      .page-switcher-prev-btn:hover,
      .page-switcher-next-btn:hover,
      .page-switcher-number:hover {
        border-color: #00A1D6 !important;
      }

      .page-switcher-current-page {
        color: white;
        background-color: #00A1D6;
        border-color: #00A1D6 !important;
      }

      .page-switcher-dot {
        padding: 0 5px;
        display: flex;
        align-items: center;
        color: #CCC;
      }

      .page-switcher-prev-btn__disabled,
      .page-switcher-next-btn__disabled {
        color: #D7DDE4 !important;
        cursor: not-allowed !important;
      }
    `;
    document.head.appendChild(pageSwitcherCSS);

    // add other CSS
    const otherCSS = document.createElement('style');
    otherCSS.textContent = `
      .login-tip,
      .fixed-reply-box,
      .v-popover:has(.login-panel-popover) {
        display: none;
      }
    `;
    document.head.appendChild(otherCSS);

    // dynamic page CSS
    const dynPageCSS = document.createElement('style');
    dynPageCSS.textContent = `
      #app .opus-detail {
        min-width: 960px;
      }

      #app .opus-detail .right-sidebar-wrap {
        margin-left: 980px !important;
        transition: none;
      }

      #app > .content {
        min-width: 960px;
      }

      .v-popover:has(.login-panel-popover),
      .fixed-reply-box,
      .login-tip {
        display: none;
      }
    `;
    if (quoteRE.test(window.location.href) || opusRE.test(window.location.href)) document.head.appendChild(dynPageCSS);

    // viewerjs
    const viewerjsCSS = document.createElement('style');
    viewerjsCSS.textContent = await fetch('https://lib.baomitu.com/viewerjs/1.11.4/viewer.min.css').then(res => res.text());
    document.head.appendChild(viewerjsCSS);

    // comment-pc-vue-next.js
    if (articleRE.test(window.location.href) || festivalRE.test(window.location.href)) {
      const commentCSS = document.createElement('style');
      commentCSS.textContent = await fetch('https://s1.hdslb.com/bfs/seed/jinkela/commentpc/comment-pc-vue.next.js')
        .then(res => res.text())
        .then(text => {
          const startIndex = text.indexOf('elementStyle.appendChild(document.createTextNode("');
          const endIndex = text.indexOf('")); document.head.appendChild(elementStyle);');
          return text.slice(startIndex, endIndex).replace('elementStyle.appendChild(document.createTextNode("', '');
        });
      document.head.appendChild(commentCSS);

      const miscCSS = document.createElement('style');
      miscCSS.textContent = `
        :root {
          --text1: #18191C;
          --text3: #9499A0;
          --brand_pink: #FF6699;
          --graph_bg_thick: #e3e5e7;
        }

        .bb-comment {
          font-family: inherit;
        }

        .top-icon {
          font-style: normal;
        }

        .page-switcher {
          margin-top: 100px;
        }

        .anchor-for-loading {
          font-size: 14px;
          margin-top: 120px;
          margin-bottom: 20px; 
        }

        .comment-wrapper .b-head,
        .comment-container .loading-state,
        .comment-container .comment-send-lite,
        .login-tip,
        .van-popover:has(.unlogin-popover) {
          display: none !important;
        }
      `;
      document.head.appendChild(miscCSS);
    }
  }

  function setupCommentBtnModifier() {
    setInterval(() => {
      const dynItems = document.querySelectorAll('.bili-dyn-list .bili-dyn-item');
      dynItems.forEach(dynItem => {
        if (dynItem.classList.contains('comment-btn-modified')) return;
        const dynContentElement = dynItem.querySelector('.bili-dyn-item__body div[data-module=desc]') || dynItem.querySelector('.bili-dyn-item__body a.bili-dyn-card-video');
        const commentBtnElement = dynItem.querySelector('.bili-dyn-item__footer .bili-dyn-action.comment');
        if (dynContentElement && commentBtnElement) {
          commentBtnElement.onclick = () => dynContentElement.click();
          dynItem.classList.add('comment-btn-modified');
        }
      });
    }, 1000);
  }

})();