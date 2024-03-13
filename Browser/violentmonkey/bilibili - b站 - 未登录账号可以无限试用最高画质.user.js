// ==UserScript==
// @name         bilibili - b站 - 未登录账号可以无限试用最高画质
// @description  未登录账号可以使用最高画质，可以看评论，原作者DD1969，https://greasyfork.org/zh-CN/users/675901-dd1969
// @namespace    https://bilibili.com/
// @version      1.4 - tidy
// @license      GPL-3.0
// @author       DD1969
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/list/*
// @match        https://www.bilibili.com/festival/*
// @match        https://space.bilibili.com/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://www.bilibili.com/festival*
// @match        https://www.bilibili.com/bangumi/play/*
// @match        https://t.bilibili.com/*
// @match        https://www.bilibili.com/opus/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        unsafeWindow
// @require      https://lib.baomitu.com/viewerjs/1.11.4/viewer.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.2/spark-md5.min.js
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/470714/bilibili%20-%20b%E7%AB%99%20-%20%E6%9C%AA%E7%99%BB%E5%BD%95%E8%B4%A6%E5%8F%B7%E5%8F%AF%E4%BB%A5%E6%97%A0%E9%99%90%E8%AF%95%E7%94%A8%E6%9C%80%E9%AB%98%E7%94%BB%E8%B4%A8.user.js
// @updateURL https://update.greasyfork.org/scripts/470714/bilibili%20-%20b%E7%AB%99%20-%20%E6%9C%AA%E7%99%BB%E5%BD%95%E8%B4%A6%E5%8F%B7%E5%8F%AF%E4%BB%A5%E6%97%A0%E9%99%90%E8%AF%95%E7%94%A8%E6%9C%80%E9%AB%98%E7%94%BB%E8%B4%A8.meta.js
// ==/UserScript==

; (async () => {
    'use strict'

    // 用户登录检测，如果已登录，则不执行脚本
    if (document.cookie.includes('DedeUserID')) return;

    // 监听页面 URL 变化，适用于播放列表或节日页面
    const oldHref = unsafeWindow.location.href
    const urlChangeTimer = setInterval(() => {
        const newHref = unsafeWindow.location.href;
        if (newHref !== oldHref) {
            clearInterval(urlChangeTimer);
            unsafeWindow.location.reload();
        }
    }, 2000)

    // 修改 setTimeout 函数，用于延长试用最高画质的时间
    const originSetTimeout = unsafeWindow.setTimeout
    unsafeWindow.setTimeout = (func, delay) => {
        if (delay === 3e4) {
            delay = 3e8
        }
        return originSetTimeout(func, delay)
    }

    // 播放器的参数
    const profileString = unsafeWindow.localStorage.getItem('bpx_player_profile')
    if (profileString) {
        const profile = JSON.parse(profileString)
        profile.lastView = Date.now() - 864e5
        unsafeWindow.localStorage.setItem('bpx_player_profile', JSON.stringify(profile))
    } else {
        let playerProfile = {
            lastView: Date.now() - 864e5,
            lastUid: 0,
            media: {
                quality: 0,
                volume: 1,
                nonzeroVol: 1,
                hideBlackGap: true,
                dolbyAudio: true,
                audioQuality: null,
                autoplay: false,
                handoff: 0,
                seniorTip: true,
            },
            dmSend: {
                upDm: false,
                dmChecked: false,
            },
            blockList: [],
            dmSetting: {
                status: true,
                dmSwitch: true,
                aiSwitch: false,
                aiLevel: 3,
                preventshade: false,
                dmask: true,
                typeTop: true,
                typeScroll: true,
                typeBottom: true,
                typeColor: true,
                typeSpecial: true,
                opacity: 0.8,
                dmarea: 50,
                speedplus: 1,
                fontsize: 0.8,
                fullscreensync: true,
                speedSync: false,
                fontfamily: "SimHei, 'Microsoft JhengHei'",
                bold: true,
                fontborder: 0,
                seniorModeSwitch: 0,
            },
            basEditorData: {},
            audioEffect: null,
            boceTimes: [],
            interaction: {
                rookieGuide: null,
                showedDialog: false,
            },
            iswide: null,
            widesave: null,
            subtitle: {
                fade: false,
                scale: true,
                fontsize: 1,
                opacity: 0.4,
                bilingual: false,
                color: '16777215',
                shadow: '0',
                position: 'bottom-center',
            },
            progress: {
                precisionGuide: null,
                pbpstate: true,
                pinstate: false,
            },
            panorama: true,
            ksInfo: {
                ts: 0,
                kss: null,
            },
        }
        unsafeWindow.localStorage.setItem('bpx_player_profile', JSON.stringify(playerProfile, null, 4))
    }

    const trialButtonTimer = setInterval(() => {
        const trialBtn = document.querySelector('.bpx-player-toast-confirm-login')
        if (trialBtn) {
            trialBtn.click() // 点击试用按钮
            clearInterval(trialButtonTimer)
        }
    }, 2000)

    /*
        防止视频被自动暂停及弹出登录窗口
    */
    // 针对不同的页面执行不同的操作
    if (window.location.hostname === 'space.bilibili.com') {
        // 在用户空间页面隐藏登录模态框
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `.bili-mini-mask, .login-panel-popover, .login-tip { display: none !important; }`;
        document.head.appendChild(styleElement);

        // 如果登录模态框出现，则重新加载页面
        setInterval(() => {
            const maskElement = document.querySelector('.bili-mini-mask');
            if (maskElement) window.location.reload();
        }, 1000);

        // 处理错误的重复请求
        let lastRequestTimestamp = 0;
        const originFetch = window.fetch;
        window.fetch = function () {
            if (!arguments[0].includes('space/wbi/arc/search')) return originFetch.apply(this, arguments);
            if (Date.now() - lastRequestTimestamp < 200) return Promise.reject(new Error('repeated request with wrong page number'));
            lastRequestTimestamp = Date.now();
            return originFetch.apply(this, arguments);
        }
    } else if (window.location.hostname === 'www.bilibili.com') {
        // 在主页或视频页阻止 miniLogin.js 脚本加载
        const originAppendChild = Node.prototype.appendChild;
        Node.prototype.appendChild = function (childElement) {
            return childElement.tagName === 'SCRIPT' && childElement.src.includes('miniLogin')
                ? null
                : originAppendChild.call(this, childElement);
        };

        // 等待 player 的 getMediaInfo 方法可用
        await new Promise(resolve => {
            const timer = setInterval(() => {
                if (unsafeWindow.player && unsafeWindow.player.getMediaInfo) {
                    clearInterval(timer);
                    resolve();
                }
            }, 1000);
        });

        // 修改 getMediaInfo 方法，防止视频时间被重置
        const originGetMediaInfo = unsafeWindow.player.getMediaInfo;
        unsafeWindow.player.getMediaInfo = function () {
            const mediaInfo = originGetMediaInfo.apply(this, arguments);
            mediaInfo.absolutePlayTime = 0;
            return mediaInfo;
        };

        // 监听页面点击事件，防止非用户操作导致的视频暂停
        let isClickedRecently = false;
        document.body.addEventListener('click', () => {
            isClickedRecently = true;
            setTimeout(() => isClickedRecently = false, 500);
        });

        // 修改 pause 方法，仅当最近发生点击时才允许暂停
        const originPause = unsafeWindow.player.pause;
        unsafeWindow.player.pause = function () {
            if (!isClickedRecently) return;
            return originPause.apply(this, arguments);
        };
    }

    /*
        在未登录的情况下照常加载评论
    */
    const enableReplyPagination = false // 是否启用评论分页功能
    const enableLoadAllSubRepliesAtOnce = false // 是否一次性加载所有子评论

    const { oid, createrID, rootReplyHash, subReplyHash, replyList } = await new Promise(resolve => {
        const timer = setInterval(() => {
            const oid = unsafeWindow?.__INITIAL_STATE__?.aid // 获取视频ID
            const createrID = unsafeWindow?.__INITIAL_STATE__?.upData?.mid // 获取创作者ID
            // 匹配用于选择主评论和子评论的数据属性
            const rootReplyHashMatchResult = document.head.innerHTML.match(/\.reply-item\[(?<rootReplyHash>data-v-[a-z0-9]{8})\]/);
            const subReplyHashMatchResult = document.head.innerHTML.match(/\.sub-reply-item\[(?<subReplyHash>data-v-[a-z0-9]{8})\]/);
            const replyList = document.querySelector('.reply-list'); // 获取评论列表元素
            // 当所有必要的数据和元素都可用时，清除定时器并解析结果
            if (oid && createrID && rootReplyHashMatchResult && subReplyHashMatchResult && replyList) {
                clearInterval(timer)
                resolve({
                    oid,
                    createrID: parseInt(createrID),
                    rootReplyHash: rootReplyHashMatchResult.groups.rootReplyHash,
                    subReplyHash: subReplyHashMatchResult.groups.subReplyHash,
                    replyList,
                })
            }
        }, 1000)
    })

    // 定义排序类型常量
    const sortTypeConstant = { LATEST: 0, HOT: 2 }

    let currentSortType = 1
    await enableSwitchingSortType() // 允许用户切换排序类型

    let replyPool = {} // 用于存储已加载的评论，避免重复加载

    await addStyle() // 添加自定义样式

    await loadFirstPagination() // 加载第一页评论

    async function loadFirstPagination() {
        const { data: firstPaginationData, code: resultCode } = await getPaginationData(1)

        replyList.innerHTML = '' // 清空评论列表

        replyPool = {} // 重置评论池

        // 如果无法获取分页数据，显示错误信息
        if (resultCode !== 0) {
            replyList.innerHTML =
                '<p style="padding: 100px 0; text-align: center; color: #999;">无法从API获取评论数据</p>'
            return
        }

        // 加载置顶评论（如果存在）
        if (firstPaginationData.top_replies && firstPaginationData.top_replies.length !== 0) {
            const topReplyData = firstPaginationData.top_replies[0]
            appendReplyItem(topReplyData, true)
        }

        // 如果没有评论，直接返回
        if (firstPaginationData.replies.length === 0) {
            return
        }

        // 加载普通评论
        for (const replyData of firstPaginationData.replies) {
            appendReplyItem(replyData)
        }

        // 根据设置添加页面加载器或锚点
        enableReplyPagination ? addReplyPageSwitcher() : addAnchor()
    }

    // 根据分页号获取评论数据
    async function getPaginationData(paginationNumber) {
        return await fetch(
            `https://api.bilibili.com/x/v2/reply?oid=${oid}&type=1&sort=${currentSortType}&pn=${paginationNumber}`,
        )
            .then(res => res.json())
            .then(json => {
                console.log(json.data)
                return {
                    data: json.data,
                    code: json.code,
                }
            })
    }

    // 添加评论项到页面
    function appendReplyItem(replyData, isTopReply) {
        if (!enableReplyPagination && replyPool[replyData.rpid_str]) {
            return
        }

        // 创建评论元素并设置其HTML内容
        const replyItemElement = document.createElement('div')
        replyItemElement.classList.add('reply-item')
        replyItemElement.innerHTML = `
      <div class="root-reply-container" ${rootReplyHash}>
        <div class="root-reply-avatar" data-user-id="${replyData.mid}" data-root-reply-id="${replyData.rpid
            }" ${rootReplyHash}>
          <div class="avatar" ${rootReplyHash}>
            <div class="bili-avatar">
              <img class="bili-avatar-img bili-avatar-face bili-avatar-img-radius" data-src="${replyData.member.avatar
            }@160w_160h_1c_1s_!web-avatar-comment.avif" alt="" src="${replyData.member.avatar
            }@160w_160h_1c_1s_!web-avatar-comment.avif">
              ${replyData.member.pendant.image
                ? `
                <div class="bili-avatar-pendent-dom" style="transform: scale(0.85);">
                  <img class="bili-avatar-img" data-src="${replyData.member.pendant.image}@240w_240h_!web-avatar-comment.avif" alt="" src="${replyData.member.pendant.image}@240w_240h_!web-avatar-comment.avif">
                </div>
                `
                : ''
            }
              <span class="bili-avatar-icon bili-avatar-right-icon  bili-avatar-size-40"></span>
            </div>
          </div>
        </div>
        <div class="content-warp" ${rootReplyHash}>
          <div class="reply-decorate" ${rootReplyHash}>
            <div class="user-sailing" ${rootReplyHash}>
              ${replyData.member.user_sailing?.cardbg
                ? `
                <img class="user-sailing-img" src="${replyData.member.user_sailing.cardbg.image
                }@576w.webp" ${rootReplyHash}>
                <div class="user-sailing-text" ${rootReplyHash} style="color: ${replyData.member.user_sailing.cardbg.fan.color
                }">
                  <span class="sailing-text" ${rootReplyHash}>NO.</span>
                  <br ${rootReplyHash}>
                  <span class="sailing-text" ${rootReplyHash}>${replyData.member.user_sailing.cardbg.fan.number
                    .toString()
                    .padStart(6, '0')}</span>
                </div>
                `
                : ''
            }
            </div>
          </div>
          <div class="user-info" ${rootReplyHash}>
            <div class="user-name" data-user-id="${replyData.mid}" data-root-reply-id="${replyData.rpid
            }" ${rootReplyHash} style="color: ${replyData.member.vip.nickname_color ? replyData.member.vip.nickname_color : '#61666d'
            }">${replyData.member.uname}</div>
            <span style="height: 16px; padding: 0 2px; margin-right: 4px; display: flex; align-items: center; font-size: 12px; color: white; border-radius: 2px; background-color: ${getMemberLevelColor(
                replyData.member.level_info.current_level,
            )};">LV${replyData.member.level_info.current_level}</span>
            ${createrID === replyData.mid
                ? '<i class="svg-icon up-web up-icon" ${rootReplyHash} style="width: 24px; height: 24px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="4" width="24" height="16" rx="2" fill="#FF6699"></rect><path d="M5.7 8.36V12.79C5.7 13.72 5.96 14.43 6.49 14.93C6.99 15.4 7.72 15.64 8.67 15.64C9.61 15.64 10.34 15.4 10.86 14.92C11.38 14.43 11.64 13.72 11.64 12.79V8.36H10.47V12.81C10.47 13.43 10.32 13.88 10.04 14.18C9.75 14.47 9.29 14.62 8.67 14.62C8.04 14.62 7.58 14.47 7.3 14.18C7.01 13.88 6.87 13.43 6.87 12.81V8.36H5.7ZM13.0438 8.36V15.5H14.2138V12.76H15.9838C17.7238 12.76 18.5938 12.02 18.5938 10.55C18.5938 9.09 17.7238 8.36 16.0038 8.36H13.0438ZM14.2138 9.36H15.9138C16.4238 9.36 16.8038 9.45 17.0438 9.64C17.2838 9.82 17.4138 10.12 17.4138 10.55C17.4138 10.98 17.2938 11.29 17.0538 11.48C16.8138 11.66 16.4338 11.76 15.9138 11.76H14.2138V9.36Z" fill="white"></path></svg></i>'
                : ''
            }
          </div>
          <div class="root-reply" ${rootReplyHash}>
            <span class="reply-content-container root-reply" ${rootReplyHash} style="padding-bottom: 8px;">
              <span class="reply-content">${isTopReply ? '<i class="top-icon">置顶</i>' : ''}${replyData.content.pictures
                ? `<div class="note-prefix" style="transform: translateY(-2px);"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="#BBBBBB"><path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM3.5 6.25a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm.75 2.25h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5Z"></path></svg><div style="margin-left: 3px;">笔记</div></div>`
                : ''
            }${getConvertedMessage(replyData.content)}</span>
            </span>
            ${replyData.content.pictures
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
              <span class="reply-time" ${rootReplyHash} style="margin-right: 20px;">${getFormattedTime(
                replyData.ctime,
            )}</span>
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
              ${replyData.card_label
                ? replyData.card_label.reduce(
                    (acc, cur) =>
                        acc +
                        `<span class="reply-tag-item" ${rootReplyHash} style="font-size: 12px; background-color: ${cur.label_color_day}; color: ${cur.text_color_day};">${cur.text_content}</span>`,
                    '',
                )
                : ''
            }
            </div>
          </div>
        </div>
      </div>
      <div class="sub-reply-container" ${rootReplyHash}>
        <div class="sub-reply-list" ${rootReplyHash}>
          ${getSubReplyItems(replyData.replies) || ''}
          ${replyData.rcount > 3
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
    `
        replyList.appendChild(replyItemElement)
        if (!enableReplyPagination) {
            replyPool[replyData.rpid_str] = true
        }

        // 图片预览功能
        const previewImageContainer = replyItemElement.querySelector('.preview-image-container')
        if (previewImageContainer) {
            new Viewer(previewImageContainer, { title: false, toolbar: false, tooltip: false, keyboard: false })
        }

        // 加载子评论或添加点击加载更多回复的事件监听
        const subReplyList = replyItemElement.querySelector('.sub-reply-list')
        const viewMoreBtn = replyItemElement.querySelector('.view-more-btn')
        viewMoreBtn &&
            viewMoreBtn.addEventListener('click', () => {
                enableLoadAllSubRepliesAtOnce
                    ? loadAllSubReplies(replyData.rpid, subReplyList)
                    : loadPaginatedSubReplies(replyData.rpid, subReplyList, replyData.rcount, 1)
            })
    }

    function getFormattedTime(ms) {
        const time = new Date(ms * 1000)
        const year = time.getFullYear()
        const month = (time.getMonth() + 1).toString().padStart(2, '0')
        const day = time.getDate().toString().padStart(2, '0')
        const hour = time.getHours().toString().padStart(2, '0')
        const minute = time.getMinutes().toString().padStart(2, '0')
        return `${year}-${month}-${day} ${hour}:${minute}`
    }

    function getMemberLevelColor(level) {
        return {
            1: '#BBBBBB',
            2: '#8BD29B',
            3: '#7BCDEF',
            4: '#FEBB8B',
            5: '#EE672A',
            6: '#F04C49',
        }[level]
    }

    function getConvertedMessage(content) {
        let result = content.message

        if (content.emote) {
            for (const [key, value] of Object.entries(content.emote)) {
                const imageElementHTML = `<img class="emoji-${['', 'small', 'large'][value.meta.size]}" src="${value.url
                    }" alt="${key}">`
                result = result.replaceAll(key, imageElementHTML)
            }
        }

        result = result.replaceAll(/\d{1,2}(:|：)\d{1,2}/g, timestamp => {
            const [minute, second] = timestamp.replace('：', ':').split(':')
            const totalSecond = parseInt(minute) * 60 + parseInt(second)
            if (Number.isNaN(totalSecond)) {
                return timestamp
            }
            return `<a class="jump-link video-time" href="${unsafeWindow.location.origin + unsafeWindow.location.pathname + '?t=' + totalSecond
                }">${timestamp.replace('：', ':')}</a>`
        })

        if (Object.keys(content.jump_url).length) {
            for (const [key, value] of Object.entries(content.jump_url)) {
                const href = key.startsWith('BV') ? `https://www.bilibili.com/video/${key}` : value.pc_url || key
                const linkElementHTML = `<img class="icon normal" src="${value.prefix_icon}" style="${value.extra && value.extra.is_word_search && 'width: 12px;'
                    }"><a class="jump-link normal" href="${href}" target="_blank" noopener noreferrer>${value.title}</a>`
                result = result.replaceAll(key, linkElementHTML)
            }
        }

        if (content.at_name_to_mid) {
            for (const [key, value] of Object.entries(content.at_name_to_mid)) {
                const linkElementHTML = `<a class="jump-link user" data-user-id="${value}" href="https://space.bilibili.com/${value}" target="_blank" noopener noreferrer>@${key}</a>`
                result = result.replaceAll(`@${key}`, linkElementHTML)
            }
        }

        return result
    }

    function getImageItems(images) {
        images = images.slice(0, 3)
        const imageSizeConfig = {
            1: 'max-width: 280px; max-height: 180px;',
            2: 'width: 128px; height: 128px;',
            3: 'width: 96px; height: 96px;',
        }[images.length]

        let result = ''
        for (const image of images) {
            result += `<div class="image-item-wrap" style="margin-right: 4px; cursor: zoom-in;"><img src="${image.img_src}" style="border-radius: 4px; ${imageSizeConfig}"></div>`
        }
        return result
    }

    function getSubReplyItems(subReplies) {
        if (!subReplies || subReplies.length === 0) {
            return
        }

        let result = ''
        for (const replyData of subReplies) {
            result += `
        <div class="sub-reply-item" ${subReplyHash}>
          <div class="sub-user-info" ${subReplyHash}>
            <div class="sub-reply-avatar" data-user-id="${replyData.mid}" data-root-reply-id="${replyData.rpid
                }" ${subReplyHash}>
              <div class="avatar" ${subReplyHash}>
                <div class="bili-avatar">
                  <img class="bili-avatar-img bili-avatar-face bili-avatar-img-radius" data-src="${replyData.member.avatar
                }@160w_160h_1c_1s_!web-avatar-comment.avif" alt="" src="${replyData.member.avatar
                }@160w_160h_1c_1s_!web-avatar-comment.avif">
                  <span class="bili-avatar-icon bili-avatar-right-icon  bili-avatar-size-24"></span>
                </div>
              </div>
            </div>
            <div class="sub-user-name" data-user-id="${replyData.mid}" data-root-reply-id="${replyData.rpid
                }" ${subReplyHash} style="color: ${replyData.member.vip.nickname_color ? replyData.member.vip.nickname_color : '#61666d'
                }">${replyData.member.uname}</div>
            <span style="height: 16px; padding: 0 2px; margin-right: 4px; display: flex; align-items: center; font-size: 12px; color: white; border-radius: 2px; background-color: ${getMemberLevelColor(
                    replyData.member.level_info.current_level,
                )};">LV${replyData.member.level_info.current_level}</span>
            ${createrID === replyData.mid
                    ? `<i class="svg-icon up-web up-icon" ${subReplyHash} style="width: 24px; height: 24px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="4" width="24" height="16" rx="2" fill="#FF6699"></rect><path d="M5.7 8.36V12.79C5.7 13.72 5.96 14.43 6.49 14.93C6.99 15.4 7.72 15.64 8.67 15.64C9.61 15.64 10.34 15.4 10.86 14.92C11.38 14.43 11.64 13.72 11.64 12.79V8.36H10.47V12.81C10.47 13.43 10.32 13.88 10.04 14.18C9.75 14.47 9.29 14.62 8.67 14.62C8.04 14.62 7.58 14.47 7.3 14.18C7.01 13.88 6.87 13.43 6.87 12.81V8.36H5.7ZM13.0438 8.36V15.5H14.2138V12.76H15.9838C17.7238 12.76 18.5938 12.02 18.5938 10.55C18.5938 9.09 17.7238 8.36 16.0038 8.36H13.0438ZM14.2138 9.36H15.9138C16.4238 9.36 16.8038 9.45 17.0438 9.64C17.2838 9.82 17.4138 10.12 17.4138 10.55C17.4138 10.98 17.2938 11.29 17.0538 11.48C16.8138 11.66 16.4338 11.76 15.9138 11.76H14.2138V9.36Z" fill="white"></path></svg></i>`
                    : ''
                }
          </div>
          <span class="reply-content-container sub-reply-content" ${subReplyHash}>
            <span class="reply-content">${getConvertedMessage(replyData.content)}</span>
          </span>
          <div class="sub-reply-info" ${subReplyHash} style="margin: 4px 0;">
            <span class="sub-reply-time" ${subReplyHash} style="margin-right: 20px;">${getFormattedTime(
                    replyData.ctime,
                )}</span>
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
      `
        }
        return result
    }

    async function loadAllSubReplies(rootReplyID, subReplyList) {
        let subPaginationCounter = 1
        while (true) {
            const subReplyData = await fetch(
                `https://api.bilibili.com/x/v2/reply/reply?oid=${oid}&pn=${subPaginationCounter++}&ps=20&root=${rootReplyID}&type=1`,
            )
                .then(res => res.json())
                .then(json => json.data)
            if (subPaginationCounter - 1 === 1) {
                subReplyList.innerHTML = ''
            }
            if (subReplyData.replies) {
                subReplyList.innerHTML += getSubReplyItems(subReplyData.replies)
            } else {
                break
            }
        }
    }

    async function loadPaginatedSubReplies(rootReplyID, subReplyList, subReplyAmount, paginationNumber) {
        // replace reply list with new replies
        const subReplyData = await fetch(
            `https://api.bilibili.com/x/v2/reply/reply?oid=${oid}&pn=${paginationNumber}&ps=10&root=${rootReplyID}&type=1`,
        )
            .then(res => res.json())
            .then(json => json.data)
        if (subReplyData.replies) {
            subReplyList.innerHTML = getSubReplyItems(subReplyData.replies)
        }

        // add page switcher
        addSubReplyPageSwitcher(rootReplyID, subReplyList, subReplyAmount, paginationNumber)

        // scroll to the top of replyItem
        let elemTop = subReplyList.parentElement.parentElement.offsetTop
        let parentElem = subReplyList.parentElement.parentElement.offsetParent
        while (parentElem) {
            elemTop += parentElem.offsetTop
            parentElem = parentElem.offsetParent
        }
        unsafeWindow.scrollTo(0, elemTop - 60)
    }

    function addSubReplyPageSwitcher(rootReplyID, subReplyList, subReplyAmount, currentPageNumber) {
        if (subReplyAmount <= 10) {
            return
        }

        const pageAmount = Math.ceil(subReplyAmount / 10)
        const pageSwitcher = document.createElement('div')
        pageSwitcher.classList.add('view-more')
        pageSwitcher.innerHTML = `
      <div class="view-more-pagination">
        <span class="pagination-page-count">共${pageAmount}页</span>
        ${currentPageNumber !== 1 ? '<span class="pagination-btn pagination-to-prev-btn">上一页</span>' : ''}
        ${(() => {
                // 4 on the left, 4 on the right, then merge
                const left = [
                    currentPageNumber - 4,
                    currentPageNumber - 3,
                    currentPageNumber - 2,
                    currentPageNumber - 1,
                ].filter(num => num >= 1)
                const right = [
                    currentPageNumber + 1,
                    currentPageNumber + 2,
                    currentPageNumber + 3,
                    currentPageNumber + 4,
                ].filter(num => num <= pageAmount)
                const merge = [].concat(left, currentPageNumber, right)

                // chosen 5(if able)
                let chosen
                if (currentPageNumber <= 3) {
                    chosen = merge.slice(0, 5)
                } else if (currentPageNumber >= pageAmount - 3) {
                    chosen = merge.reverse().slice(0, 5).reverse()
                } else {
                    chosen = merge.slice(merge.indexOf(currentPageNumber) - 2, merge.indexOf(currentPageNumber) + 3)
                }

                // add first and dots
                let final = JSON.parse(JSON.stringify(chosen))
                if (!final.includes(1)) {
                    let front = [1]
                    if (final.at(0) !== 2) {
                        front = [1, '...']
                    }
                    final = [].concat(front, final)
                }

                // add last and dots
                if (!final.includes(pageAmount)) {
                    let back = [pageAmount]
                    if (final.at(-1) !== pageAmount - 1) {
                        back = ['...', pageAmount]
                    }
                    final = [].concat(final, back)
                }

                // assemble to html
                return final.reduce((acc, cur) => {
                    if (cur === '...') {
                        return acc + '<span class="pagination-page-dot">...</span>'
                    }
                    if (cur === currentPageNumber) {
                        return acc + `<span class="pagination-page-number current-page">${cur}</span>`
                    }
                    return acc + `<span class="pagination-page-number">${cur}</span>`
                }, '')
            })()}
        ${currentPageNumber !== pageAmount ? '<span class="pagination-btn pagination-to-next-btn">下一页</span>' : ''}
      </div>
    `

        pageSwitcher
            .querySelector('.pagination-to-prev-btn')
            ?.addEventListener('click', () =>
                loadPaginatedSubReplies(rootReplyID, subReplyList, subReplyAmount, currentPageNumber - 1),
            )
        pageSwitcher
            .querySelector('.pagination-to-next-btn')
            ?.addEventListener('click', () =>
                loadPaginatedSubReplies(rootReplyID, subReplyList, subReplyAmount, currentPageNumber + 1),
            )
        pageSwitcher.querySelectorAll('.pagination-page-number:not(.current-page)')?.forEach(pageNumberElement => {
            const number = parseInt(pageNumberElement.textContent)
            pageNumberElement.addEventListener('click', () =>
                loadPaginatedSubReplies(rootReplyID, subReplyList, subReplyAmount, number),
            )
        })

        subReplyList.appendChild(pageSwitcher)
    }

    async function addReplyPageSwitcher() {
        const oldPageSwitcher = document.querySelector('#comment .reply-warp .page-switcher')
        oldPageSwitcher && oldPageSwitcher.remove()

        let isPageAmountFound = false
        let currentMaxPageNumber = 1
        let currentPageNumber = 1

        const { data: nextPaginationData } = await getPaginationData(currentPageNumber + 1)
        if (!nextPaginationData.replies || nextPaginationData.replies.length === 0) {
            return
        }

        const pageSwitcher = document.createElement('div')
        pageSwitcher.classList.add('page-switcher')
        pageSwitcher.style = `
      width: 100%;
      display: flex;
      justify-content: center;
      transform: translateY(-60px);
    `
        pageSwitcher.appendChild(generatePageSwitcher())
        document.querySelector('#comment .reply-warp').appendChild(pageSwitcher)

        function generatePageSwitcher() {
            const wrapper = document.createElement('div')
            wrapper.classList.add('page-switcher-wrapper')
            wrapper.innerHTML = `
        ${currentPageNumber === 1
                    ? '<span class="page-switcher-prev-btn__disabled">上一页</span>'
                    : '<span class="page-switcher-prev-btn">上一页</span>'
                }
        ${(() => {
                    // 4 on the left, 4 on the right, then merge
                    const left = [
                        currentPageNumber - 4,
                        currentPageNumber - 3,
                        currentPageNumber - 2,
                        currentPageNumber - 1,
                    ].filter(num => num >= 1)
                    const right = [
                        currentPageNumber + 1,
                        currentPageNumber + 2,
                        currentPageNumber + 3,
                        currentPageNumber + 4,
                    ].filter(num => num <= currentMaxPageNumber)
                    const merge = [].concat(left, currentPageNumber, right)

                    // chosen 5(if able)
                    let chosen
                    if (currentPageNumber <= 3) {
                        chosen = merge.slice(0, 5)
                    } else if (currentPageNumber >= currentMaxPageNumber - 3) {
                        chosen = merge.reverse().slice(0, 5).reverse()
                    } else {
                        chosen = merge.slice(merge.indexOf(currentPageNumber) - 2, merge.indexOf(currentPageNumber) + 3)
                    }

                    // add first and dots
                    let final = JSON.parse(JSON.stringify(chosen))
                    if (!final.includes(1)) {
                        let front = [1]
                        if (final.at(0) !== 2) {
                            front = [1, 'dot']
                        }
                        final = [].concat(front, final)
                    }

                    // add last and dots
                    if (!final.includes(currentMaxPageNumber)) {
                        let back = [currentMaxPageNumber]
                        if (final.at(-1) !== currentMaxPageNumber - 1) {
                            back = ['dot', currentMaxPageNumber]
                        }
                        final = [].concat(final, back)
                    }

                    // assemble to html
                    return final.reduce((acc, cur) => {
                        if (cur === 'dot') {
                            return acc + '<span class="page-switcher-dot">•••</span>'
                        }
                        if (cur === currentPageNumber) {
                            return acc + `<span class="page-switcher-number page-switcher-current-page">${cur}</span>`
                        }
                        return acc + `<span class="page-switcher-number">${cur}</span>`
                    }, '')
                })()}
        ${isPageAmountFound && currentPageNumber === currentMaxPageNumber
                    ? '<span class="page-switcher-next-btn__disabled">下一页</span>'
                    : '<span class="page-switcher-next-btn">下一页</span>'
                }
      `

            wrapper.querySelector('.page-switcher-prev-btn')?.addEventListener('click', async () => {
                currentPageNumber -= 1

                const { data: prevPaginationData } = await getPaginationData(currentPageNumber)
                replyList.innerHTML = ''

                // if loading page 1, load top reply if it exists
                if (
                    currentPageNumber === 1 &&
                    prevPaginationData.top_replies &&
                    prevPaginationData.top_replies.length !== 0
                ) {
                    const topReplyData = prevPaginationData.top_replies[0]
                    appendReplyItem(topReplyData, true)
                }

                for (const replyData of prevPaginationData.replies) {
                    appendReplyItem(replyData)
                }

                pageSwitcher.innerHTML = ''
                pageSwitcher.appendChild(generatePageSwitcher())

                scrollToTopOfReplyList()
            })

            // next button click event
            wrapper
                .querySelector('.page-switcher-next-btn')
                ?.addEventListener('click', async function nextButtonOnClickHandler(e) {
                    if (currentPageNumber === currentMaxPageNumber && isPageAmountFound) {
                        return
                    }

                    const { data: nextPaginationData } = await getPaginationData(currentPageNumber + 1)
                    if (!nextPaginationData.replies || nextPaginationData.replies.length === 0) {
                        isPageAmountFound = true
                        e.target.classList.add('page-switcher-next-btn__disabled')
                        e.target.classList.remove('page-switcher-next-btn')
                        return
                    }

                    if (currentPageNumber === currentMaxPageNumber) {
                        currentMaxPageNumber += 1
                    }
                    currentPageNumber += 1

                    replyList.innerHTML = ''
                    for (const replyData of nextPaginationData.replies) {
                        appendReplyItem(replyData)
                    }

                    pageSwitcher.innerHTML = ''
                    pageSwitcher.appendChild(generatePageSwitcher())

                    scrollToTopOfReplyList()
                })

            // number button click event
            wrapper
                .querySelectorAll('.page-switcher-number:not(.page-switcher-current-page)')
                ?.forEach(numberElement => {
                    numberElement.addEventListener('click', async () => {
                        const targetPageNumber = parseInt(numberElement.textContent)
                        currentPageNumber = targetPageNumber

                        const { data: paginationData } = await getPaginationData(targetPageNumber)
                        replyList.innerHTML = ''

                        // if loading page 1, load top reply if it exists
                        if (
                            targetPageNumber === 1 &&
                            paginationData.top_replies &&
                            paginationData.top_replies.length !== 0
                        ) {
                            const topReplyData = paginationData.top_replies[0]
                            appendReplyItem(topReplyData, true)
                        }

                        for (const replyData of paginationData.replies) {
                            appendReplyItem(replyData)
                        }

                        pageSwitcher.innerHTML = ''
                        pageSwitcher.appendChild(generatePageSwitcher())

                        scrollToTopOfReplyList()
                    })
                })

            return wrapper
        }

        // scroll to the top of reply list
        function scrollToTopOfReplyList() {
            let elemTop = replyList.offsetTop
            let parentElem = replyList.offsetParent
            while (parentElem) {
                elemTop += parentElem.offsetTop
                parentElem = parentElem.offsetParent
            }
            unsafeWindow.scrollTo(0, elemTop - 196)
        }
    }

    function addAnchor() {
        // clear old anchor
        const oldAnchor = document.querySelector('#comment .reply-warp .anchor-for-loading')
        oldAnchor && oldAnchor.remove()

        const anchorElement = document.createElement('div')
        anchorElement.classList.add('anchor-for-loading')
        anchorElement.textContent = '正在加载...'
        anchorElement.style = `
      width: calc(100% - 22px);
      height: 40px;
      margin-left: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(-60px);
      color: #61666d;
    `
        document.querySelector('#comment .reply-warp').appendChild(anchorElement)

        let paginationCounter = 1
        const ob = new IntersectionObserver(async entries => {
            if (!entries[0].isIntersecting) {
                return
            }

            const { data: newPaginationData } = await getPaginationData(++paginationCounter)
            if (!newPaginationData.replies || newPaginationData.replies.length === 0) {
                anchorElement.textContent = '所有评论已加载完毕'
                ob.disconnect()
                return
            }

            for (const replyData of newPaginationData.replies) {
                appendReplyItem(replyData)
            }
        })

        ob.observe(anchorElement)
    }

    async function enableSwitchingSortType() {
        const { hotSortElement, timeSortElement, navSelectReply } = await new Promise(resolve => {
            const timer = setInterval(() => {
                const hotSortElement = document.querySelector('#comment .reply-header .hot-sort')
                const timeSortElement = document.querySelector('#comment .reply-header .time-sort')
                const navSelectReply = document.querySelector('#comment .reply-header .nav-select-reply')
                if ((hotSortElement && timeSortElement) || navSelectReply) {
                    clearInterval(timer)
                    resolve({ hotSortElement, timeSortElement, navSelectReply })
                }
            }, 1000)
        })

        if (navSelectReply) {
            return
        }

        hotSortElement.addEventListener('click', async () => {
            if (currentSortType === sortTypeConstant.HOT) {
                return
            }
            currentSortType = sortTypeConstant.HOT
            hotSortElement.style.color = '#18191C'
            timeSortElement.style.color = '#9499A0'
            await loadFirstPagination()
        })

        timeSortElement.addEventListener('click', async () => {
            if (currentSortType === sortTypeConstant.LATEST) {
                return
            }
            currentSortType = sortTypeConstant.LATEST
            hotSortElement.style.color = '#9499A0'
            timeSortElement.style.color = '#18191C'
            await loadFirstPagination()
        })
    }

    async function addStyle() {
        const avatarCSS = document.createElement('style')
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
    `
        document.head.appendChild(avatarCSS)

        const viewMoreCSS = document.createElement('style')
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
    `
        document.head.appendChild(viewMoreCSS)

        const pageSwitcherCSS = document.createElement('style')
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
    `
        document.head.appendChild(pageSwitcherCSS)

        const viewerjsCSS = document.createElement('style')
        viewerjsCSS.textContent = await fetch('https://lib.baomitu.com/viewerjs/1.11.4/viewer.min.css').then(res =>
            res.text(),
        )
        document.head.appendChild(viewerjsCSS)
    }


})()
