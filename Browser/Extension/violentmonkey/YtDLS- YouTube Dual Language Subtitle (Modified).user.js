// ==UserScript==
// @name                YtDLS: YouTube Dual Language Subtitle (Modified)
// @name:zh-CN          YtDLS: Youtube 双语字幕（改）
// @name:zh-TW          YtDLS: Youtube 雙語字幕（改）
// @version             2.1.2
// @description         Enhances YouTube with dual language subtitles.
// @description:zh-CN   为YouTube添加双语字幕增强功能。
// @description:zh-TW   增強YouTube的雙語字幕功能。
// @author              CY Fung
// @author              Coink Wang
// @match               https://www.youtube.com/*
// @match               https://m.youtube.com/*
// @exclude             /^https?://\S+\.(txt|png|jpg|jpeg|gif|xml|svg|manifest|log|ini|webp|webm)[^\/]*$/
// @exclude             /^https?://\S+_live_chat*$/
// @require             https://cdn.jsdelivr.net/gh/culefa/xhProxy@eaa2e84b40290fc63af1ca777f3f545008bf79bb/dist/xhProxy.min.js
// @grant               none
// @inject-into         page
// @allFrames           true
// @run-at              document-start
// @namespace           Y2BDoubleSubs
// @license             MIT
// @supportURL          https://github.com/cyfung1031/Y2BDoubleSubs/tree/translation-api
// @downloadURL https://update.greasyfork.org/scripts/473130/YtDLS%3A%20YouTube%20Dual%20Language%20Subtitle%20%28Modified%29.user.js
// @updateURL https://update.greasyfork.org/scripts/473130/YtDLS%3A%20YouTube%20Dual%20Language%20Subtitle%20%28Modified%29.meta.js
// ==/UserScript==

/* global xhProxy */

/*

original script: https://greasyfork.org/scripts/397363
based on v1.8.0 + PR#18 ( https://github.com/CoinkWang/Y2BDoubleSubs/pull/18 ) [v2.0.0]
added m.youtube.com support based on two scripts (https://greasyfork.org/scripts/457476 & https://greasyfork.org/scripts/464879 ) which are fork from v1.8.0

*/




(() => {

    let localeLangFn = () => document.documentElement.lang || navigator.language || 'en' // follow the language used in YouTube Page
        localeLangFn = () => 'zh'  // uncomment this line to define the language you wish here

    function isValidForHook() {
      try {
        if (location.pathname === '/live_chat' || location.pathname === '/live_chat_replay') return false;
        return true;
      } catch (e) {
        return false;
      }
    }
    if (!isValidForHook()) return;

    const Promise = (async () => { })().constructor;
    const fetch = window.fetch.bind(window)

    let enableFullWidthSpaceSeparation = true
    function encodeFullwidthSpace(text) {
      if (!enableFullWidthSpaceSeparation) return text
      return text.replace(/\n/g, '\n®\n').replace(/\u3000/g, '\n©\n')
    }
    function decodeFullwidthSpace(text) {
      if (!enableFullWidthSpaceSeparation) return text
      return text.replace(/\n©\n/g, '\u3000').replace(/\n®\n/g, '\n')
    }
    let requestDeferred = Promise.resolve()

    xhProxy.hook({
      onConfig(xhr, config) {

        const originalReqUrl = config.url;

        if (typeof ytcfg !== 'object' || !originalReqUrl.includes('/api/timedtext') || originalReqUrl.includes('&translate_h00ked')){
          this.byPassRequest = true;

        }


        // config.byPassRequest = true;



        // console.log(xhr, config)

      },
      onRequest(xhr, config) {

        // console.log(xhr, config)
      },
      async onResponse(xhr, config) {

        const o = {}
        try {

          const originalReqUrl = config.url;
          if (!originalReqUrl.includes('/api/timedtext') || originalReqUrl.includes('&translate_h00ked')) return;

          if (typeof ytcfg !== 'object') return; // not a valid youtube page
          let defaultJson = null
          const jsonResponse = xhr.xhJson;
          if (jsonResponse && jsonResponse.events) defaultJson = jsonResponse;
          if (defaultJson === null) return;
          const localeLang = localeLangFn()
          const langIdx = originalReqUrl.indexOf('lang=')
          if (langIdx > 5) {

            // &key=yt8&lang=en&fmt=json3&xorb=2&xobt=3&xovt=3
            // &key=yt8&lang=ja&fmt=json3&xorb=2&xobt=3&xovt=3
            // &key=yt8&lang=ja&name=Romaji&fmt=json3&xorb=2&xobt=3

            let ulc = originalReqUrl.charAt(langIdx - 1)
            if (ulc === '?' || ulc === '&') {
              let usp = new URLSearchParams(originalReqUrl.substring(langIdx))
              let uspLang = usp.get('lang')
              let uspName = usp.get('name')
              if (uspName === 'Romaji') return defaultAction()
              if (typeof uspLang === 'string' && uspLang.toLocaleLowerCase() === localeLang.toLocaleLowerCase()) return;
            }

          }

          const lines = []
          for (const event of defaultJson.events) {
            for (const seg of event.segs) {
              if (seg && typeof seg.utf8 === 'string') {
                lines.push(...seg.utf8.split('\n'))
              }
            }
          }
          if (lines.length === 0) return defaultAction()
          let linesText = lines.join('\n')
          linesText = encodeFullwidthSpace(linesText)
          const q = encodeURIComponent(linesText)
          o.defaultJson = defaultJson
          o.lines = lines
          o.requestURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${localeLang}&dj=1&dt=t&dt=rm&q=${q}`


        } catch (e) {

          console.warn(e)
          return;
        }


        return new Promise(xhrResolve => {


          function fetchData() {
            return new Promise(requestDeferredResolve => {

              fetch(o.requestURL, {
                method: "GET",
                headers: {
                  "Accept": "application/json",
                  "Accept-Encoding": "gzip, deflate, br"
                },
                credentials: "omit",
                referrerPolicy: "no-referrer",
                redirect: "error",
                keepalive: false,
                cache: "default"
              })
                .then(res => {
                  requestDeferredResolve()
                  return res.json()
                })
                .then(result => {
                  let resultText = result.sentences.map((function (s) {
                    return "trans" in s ? s.trans : ""
                  })).join("")
                  resultText = decodeFullwidthSpace(resultText)
                  return resultText.split("\n")
                })
                .then(translatedLines => {
                  const { lines, defaultJson } = o
                  o.lines = null
                  o.defaultJson = null
                  const addTranslation = (line, idx) => {
                    if (line !== lines[i + idx]) return line
                    let translated = translatedLines[i + idx]
                    if (line === translated) return line
                    return `${line}\n${translated}`
                  }
                  let i = 0
                  for (const event of defaultJson.events) {
                    for (const seg of event.segs) {
                      if (seg && typeof seg.utf8 === 'string') {
                        let s = seg.utf8.split('\n')
                        let st = s.map(addTranslation)
                        seg.utf8 = st.join('\n')
                        i += s.length
                      }
                    }
                  }
                  xhr.xhJson = defaultJson;


                  xhrResolve()
                }).catch(e => {
                  console.warn(e)
                  xhrResolve()
                })

            })

          }

          requestDeferred = requestDeferred.then(fetchData)


        })



      }
    })

  })();