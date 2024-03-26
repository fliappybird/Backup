// ==UserScript==
// @name         网站签到工具
// @version      1.1.3
// @description  用于各种论坛和网站自动签到\n论坛签到工具,签到工具,整合吾爱破解,飘云阁,卡饭论坛,网易云音乐，天使动漫论坛等论坛和网站自动点击签到\n根据论坛签到工具 二次开发 需要添加其他网站请在反馈里留言
// @author       Fxy
// @homepage     https://greasyfork.org/zh-CN/scripts/439136-%E7%BD%91%E7%AB%99%E7%AD%BE%E5%88%B0%E5%B7%A5%E5%85%B7
// @icon         https://ae01.alicdn.com/kf/U0b4f37bdfa1c41a68fdf6a63a973a4427.jpg
// @match        https://www.52pojie.cn/*
// @match        https://www.chinapyg.com*
// @match        https://music.163.com/*
// @match        https://www.acfun.cn/*
// @match        https://www.wenshushu.cn/*
// @match        https://www.itsk.com/*
// @match        http*://bbs.kafan.cn/*
// @match        http*://bbs.wstx.com/*
// @match        http://www.biliacg218.xyz/*
// @match        http*://bbs.acg520*
// @match        http://www.uzacg.fun/*
// @match        http*://googlewk*
// @match        https://jiuyh.com/*
// @match        https://www.hifini.com/*
// @match        https://hifini.com/*
// @match        https://www.manlou99.com*
// @match        https://*zhutix.com/*
// @match        http*://www.tsdm39.net/*
// @match        http*://www.tsdm39.com/*
// @match        https://www.smzdm.com/
// @match        https://www.gtloli.gay/*
// @match        https://www.iya.app/*
// @match        https://sq.wgrid.cn/*
// @match        http://tzsqacg.top/*
// @match        http://www.1000qm.vip/*
// @match        https://legado.cn/*
// @match        https://www.mydigit.cn/*
// @match        https://bbs.jqhdd.com/*
// @match        http://www.chinadsl.net/*
// @match        http://www.hanbao520.com/*
// @match        https://www.chenyuanqingshui.cn/*
// @match        https://www.weme.pw/*
// @match        https://www.52weme.org/*
// @match        https://bbs.wcccc.cc/
// @match        https://www.sayhuahuo.xyz/*
// @match        https://bbs.binmt.cc/*
// @match        https://coklw.com/
// @match        http://lzone.moe/
// @match        https://hggard.com/
// @match        https://keyshot.pro/*
// @match        https://www.wnflb2023.com/*
// @match        https://wnflb2023.com/*
// @match        https://littleskin.cn/user
// @match        https://www.cunhua.work/*
// @match        https://www.cunhua.moe/*
// @match        http://www.2cycd.com/*
// @match        http*://*/plugin.php?id=*sign*
// @exclude      https://leaves.red/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.deleteValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// @copyright 	 2022+, Fxy
// @copyright 	 2016+, wycaca
// @copyright 	 2014+, jasonshaw
// @copyright 	 2013+, Coolkid

// @namespace http://tampermonkey.net/
// @downloadURL https://update.greasyfork.org/scripts/439136/%E7%BD%91%E7%AB%99%E7%AD%BE%E5%88%B0%E5%B7%A5%E5%85%B7.user.js
// @updateURL https://update.greasyfork.org/scripts/439136/%E7%BD%91%E7%AB%99%E7%AD%BE%E5%88%B0%E5%B7%A5%E5%85%B7.meta.js
// ==/UserScript==

(function () {

    var APPNAME="网站签到工具1.1.3";
    var NOLOGIN="-----------------------------\n["+APPNAME+"]\n状态异常或未登录，登录后自动签到\n-----------------------------";
    var QIANDAO="-----------------------------\n["+APPNAME+"]\n签到完成！\n-----------------------------";
    var QIANDAOTEXT="-----------------------------\n["+APPNAME+"]\n领取完成！\n-----------------------------";

    //吾爱破解
    if (isURL("52pojie.cn")) {
        if(isURL("search.php")){
            return;
        }
        window.setTimeout(function(){
            if (document.body.textContent.indexOf('注册[Register]') != -1){
                return;
            }else if(document.getElementById("g_upmine")==null && document.body.textContent.indexOf('Forbidden') == -1){
                window.setTimeout(function(){
                  alert(NOLOGIN);
                },1200);
            }else{
                var qq_bind = $("#um p:eq(1) a:eq(0) img").attr('src');
                var g_upmine =document.getElementById("g_upmine");
                console.log("xx")
                if (qq_bind.indexOf("qds.png") != -1) {//未签到
                    console.log("wei")
                    window.setTimeout(function(){$("#um p:eq(1) a:eq(0) img").click();},1000);
                    return;
                }
            }
        },2000);
    }

    //飘云阁
    else if (isURL("chinapyg.com")) {
        qd4('签到领奖!', 'kx_s');
    }

    //网易云音乐
    else if (isURL("music.163.com")) {
        window.setTimeout(function(){
            if(!window.find("登录") && !window.find("登录网易云音乐")){
                var imgs2 = document.getElementsByClassName('sign')[0];
                if (imgs2.text.indexOf("签 到") == 0) {
                    imgs2.click();
                    return;
                }
                return;
            }else{
                alert(NOLOGIN);
                return;
            }
        },3000);
    }

    //acfun
    else if (isURL("www.acfun.cn")) {
        var acfun_main = 'https://www.acfun.cn/';
        var acfun_member = 'https://www.acfun.cn/member/';
        if (isURL(acfun_member)) {
            setTimeout(function () {
                var ischecked = function (doc) {
                    return (document.getElementsByClassName("sign-in-btn")[0].textContent.indexOf("已签到") != -1);
                };
                if (!ischecked(document)) {
                    document.getElementsByClassName("sign-in-btn")[0].click();
                    window.setTimeout(function(){
                        document.getElementById("signin-modal-show").checked = true;
                        document.getElementsByClassName("signin-web-btn")[0].click();
                        window.location.reload();
                    },1000);
                }
            }, 2000);
        }
    }

    //文叔叔
    else if (isURL("wenshushu.cn")) {
        window.setTimeout(function(){
            for (var i=0; i<5; i++)
            {
                if (typeof $(".btn-icon")[i] != 'undefined') {
                    $(".btn-icon")[i].click();
                }
            }
            document.getElementsByClassName('icon-cont_clock')[0].click();
        },3000);
        return;
    }

    //IT天空
    else if (isURL("itsk.com")) {
        window.setTimeout(function(){
            document.getElementsByClassName('qiandao')[0].click();
            document.getElementsByClassName('signin-close')[0].click();
        },3000);
        return;
    }

    //卡饭论坛
    else if (isURL("bbs.kafan.cn")) {
        var imgs3 = document.getElementById("pper_a").getElementsByTagName("IMG");
        if (imgs3[0].src.indexOf("wb.png") == -1) {
            document.getElementById("pper_a").click();
            return;
        }
    }

    //WK综合论坛
    else if (isURL("googlewk")) {
        window.setTimeout(function(){document.getElementById('JD_sign').click();},2000);
        return;
    }

    //二次元圣地
    else if (isURL("bbs.acg520")) {
        window.setTimeout(function(){document.getElementsByClassName('right')[0].click();},2000);
        return;
    }

   //uzacg
    else if (isURL("uzacg")) {
        window.setTimeout(function(){
            if(!window.find("已签到")){
                document.getElementById('checkin_button2').click();
            }
        },2000);
    }

    //樱花萌ACG
    else if (isURL("jiuyh")) {
        if (isURL("yinxingfei_zzza-yinxingfei_zzza_hall.html")) {
            window.setTimeout(function(){document.getElementById('zzza_go').click();},3000);
        }
        return;
    }

    //HiFiNi
    else if (isURL("hifini.com")) {
        window.setTimeout(function(){
            var imgs5 = document.getElementById("sg_sign");
            if(imgs5.textContent.indexOf("请登录") != -1) {
                alert(NOLOGIN);
                return;
            }else if(imgs5.textContent.indexOf("已签") != -1){
                return;
            }else if(imgs5.textContent.indexOf("签到") != -1){
                imgs5.click();
                return;
            }
        },2000);
    }

    //致美化
    else if (isURL("zhutix.com")) {
        var task_day_list=document.getElementsByClassName("task-day-list")[0];
        var task_day_list_ul=task_day_list.childNodes.item(0);
        var task_day_list_ul_lis=task_day_list_ul.childNodes;
        var task_day_list_ul_lis_lison4=null;
        for(var i=0;i<task_day_list_ul_lis.length;i++){
            if(i==3){
                task_day_list_ul_lis_lison4=task_day_list_ul_lis.item(i).innerHTML;
            }
        }
        var task_day_list_spanno15=document.getElementsByClassName("task-day-list")[0].getElementsByTagName('span')[15];
        if(task_day_list_spanno15.className.trim() == 'task-finish-icon-go') {
            document.getElementsByClassName("task-day-list")[0].getElementsByTagName('i')[7].click();
            return;
        }else if(task_day_list_spanno15.className.trim() == 'task-finish-icon'){
            alert(NOLOGIN);
            return;
        }
    }

    //天使动漫论坛
    else if (isURL("tsdm")) {
        qd4('签到领奖!', 'kx_s');
    }

    //什么值得买
    else if (isURL("smzdm")) {
        window.setTimeout(function(){
            if(!window.find("登录") && !window.find("注册")){
                var imgs6 = document.getElementsByClassName('J_punch')[0];
                if (imgs6.text.indexOf("签到领奖") == 0) {
                    imgs6.click();
                    return;
                }
            }else{
                alert(NOLOGIN);
                return;
            }
        },2800);
    }

    //哥特萝莉
    else if (isURL("gtloli")) {
        window.setTimeout(function(){
            if(window.find("已签到")){
                return;
            }else{
                document.getElementById('JD_sign').click();
                return;
            }
        },2800);
    }

    //iYa.App 软件交流社区
    else if (isURL("www.iya.app")) {
        if (window.find("签到领奖!")) {
    		window.location.href = "https://www.iya.app/plugin.php?id=dsu_paulsign:sign";
    		return;
    	}
    	qd();
    }

    //书满楼
    else if (isURL("manlou99")) {
        window.setTimeout(function(){
            if (isURL('sign')) {
                if (window.find("您今天还没有签到")) {
                    $("#JD_sign").click();
                    return;
                }
            }
        },1000);
    }

    //桃子论坛
    //else if (isURL("tzsqacg")) {
    //    window.setTimeout(function(){
    //        if(window.find("已签到")){
    //            return;
    //        }else{
    //            document.getElementById('JD_sign').click();
    //            return;
    //        }
    //    },2800);
    //}

    //阡陌居
    else if (isURL("1000qm")) {
        qd4('签到领奖!', 'kx_s');
        toURL_once('/home.php?mod=task&do=apply&id=1')
    }

    //阅读
    else if (isURL("legado")) {
        window.setTimeout(function(){
            if (isURL('k_misign-sign.html')) {
                if (window.find("您今天还没有签到")) {
                    $("#JD_sign").click();
                    return;
                }
            }
        },1000);
    }

    //数码之家
    else if (isURL("mydigit")) {
        window.setTimeout(function(){
            if (isURL('k_misign-sign.html')) {
                if (window.find("您今天还没有签到")) {
                    $("#JD_sign").click();
                    return;
                }
            }
        },1000);
    }

    //宽带技术网
    else if (isURL("chinadsl")) {
        window.setTimeout(function(){
            if (isURL('home.php?mod=task&do=view&id=1')) {
                var taskbtn = document.getElementsByClassName('taskbtn')[0].href;
                if (taskbtn.indexOf("javascript") == -1) {
                    $(".taskbtn")[0].click();
                    return;
                }
            }
        },1000);
    }

    //轻之文库
    else if (isURL("hanbao520")) {
        if (isURL('task')) {
          window.setTimeout(function(){
             document.getElementsByClassName('link-block')[9].click();
          },2800);
        }
    }

    //尘缘轻水
    else if (isURL("chenyuanqingshui")) {
        window.setTimeout(function(){
            if (window.find("点击领取今天的签到奖励")) {
                $(".user-w-qd.cur")[0].click();
                return;
            }
        },1000);
    }

    //weme
    else if (isURL("weme")) {
        if (isURL('user')) {
           window.setTimeout(function(){
               if (window.find("今日签到")) {
                   $(".usercheck.checkin")[0].click();
                   return;
               }
           },2000);
        }
    }

    //月曦论坛
     else if (isURL("wcccc")) {
         window.setTimeout(function(){
            if (isURL('plugin.php?id=k_misign:sign')) {
                if (window.find("您今天还没有签到")) {
                    $("#JD_sign").click();
                    return;
                }
            }
        },1000);
     }

    //如此玩
    //else if (isURL("ruciwan")) {
    //    window.setTimeout(function(){
    //       if (isURL('plugin.php?id=k_misign:sign')) {
    //           if (window.find("您今天还没有签到")) {
    //               $("#JD_sign").click();
    //               return;
    //           }
    //       }
    //   },1000);
    //}

    //MT论坛
    else if (isURL("binmt")) {
         window.setTimeout(function(){
            if (isURL('k_misign-sign.html')) {
                 if (window.find("您今天还没有签到")) {
                    $("#JD_sign").click();
                    return;
                }
            }
        },1000);
     }

    //coklw
    else if (isURL("coklw")) {
        window.setTimeout(function(){
            if(window.find("已签到")){
                return;
            }else{
                $(".poi-tooltip.inn-nav__point-sign-daily__btn")[0].click();
                document.getElementById('inn-nav__point-sign-daily__btn').click();
                return;
            }
        },2000);
    }

    //绅士之庭
    else if (isURL("lzone.moe") || isURL("hggard.com")) {
    	if(window.find("连续签到") || window.find("登录")){
            return;
        }else{
            $("#checkw").click();
            return;
        }
    }

    //keyshot
    else if (isURL("keyshot.pro/qiandao")) {
        window.setTimeout(function(){
            if(window.find("注册")){
                return;
            }else{
                $(".jinsom-qiandao3")[0].click();
                return;
            }
        },2000);
    }

    //wnflb2023
    else if (isURL("wnflb2023")) {
        window.setTimeout(function(){
            if(!window.find("自动登录")){
                var imgs6 = document.getElementById("fx_checkin_b");
                if (imgs6.alt.indexOf("签到领奖") == 0) {
                    $("#fx_checkin_b").click();
                }
            }
        },2000);
    }

    //LittleSkin
    else if (isURL("littleskin")) {
        window.setTimeout(function(){
            if(window.find("签到")){
                 $(".bg-gradient-primary")[0].click();
            }
        },2000);
    }

    //村花
    else if (isURL("cunhua")) {
        window.setTimeout(function(){
            if (isURL('k_misign-sign.html')) {
                $("#JD_sign").click();
                return;
            }
        },1000);
    }

    //二次元虫洞
    else if (isURL("2cycd")) {
        if ($('#dcsignin_tips').attr("style").indexOf("signin_no")!=-1){
            $("#dcsignin_tips").click();
            window.setTimeout(function(){
                $(".dcsignin_list li")[14].click();
                $('#emotid').val('10');
                $('.pnc')[0].click();
            },2000);
        }
    }

    else {
        //其他论坛
        //数据恢复基地论坛
        //火花学园
        //qd();
        qd2();
        qd3();
    }
})();

//传递的url和当前url是否包含
function isURL(x) {
    return window.location.href.indexOf(x) != -1;
}

//取消前后空格
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

//跳转到传递的地址
function toURL(x) {
    window.location.href=x;
}

function qd() {
    if (window.find("今天签到了吗") && window.find("写下今天最想说的话")) {
        var kxImg = document.getElementById("kx_s");
        var todaySayTextArea = document.getElementById("todaysay");
        if (kxImg == null) {
            return;
        }
        kxImg.setAttribute('checked', true);
        todaySayTextArea.value = "今天天气真好~签到。";
        var button = document.getElementById("qiandao");
        button.submit();
        return;
    }
}

function qd2() {
    document.getElementById("kx").click();
    var todaySayTextArea = document.getElementById("todaysay");
    if (todaySayTextArea != null) {
        todaySayTextArea.value = "今天天气真好~签到。";
    }
    unsafeWindow.showWindow('qwindow', 'qiandao', 'post', '0');
    return;
}

function qd3() {
    var elements = p.elements,i = 0;
    setTimeout(function () {
        try {
            var els;
            if (elements instanceof Array){ els = p.elements;}
            else {
                els = p.elements();
            }
            while (els[i]) {
                var obj = (p.elements instanceof Array) ? document.querySelector(els[i]) : els[i];
                if (obj == null) return;
                if (obj.tagName == "A" && obj.href.indexOf("javascript") < 0 && obj.onclick == "undefined") GM_openInTab(obj.href);
                else obj.click();
                i++;
            }
        } catch (e) {
            alert(e);
        }
    }, 400);
    setTimeout(function () {
        if (autoClose) window.close();
    }, delay + 100);
    return;
}

function qd4(checkElement, emojiImg) {
    if (isURL('dsu_paulsign:sign')) {
        if (window.find("今天签到了吗") && window.find("写下今天最想说的话")) {
            $("#" + emojiImg).attr('checked', true);
            $("#todaysay").val("每天签到水一发。。。");
            $("#qiandao").submit();
        }
    } else if (window.find(checkElement)) {
        toURL("plugin.php?id=dsu_paulsign:sign");
    }
}

function qd5(checkElement, emojiImg) {
    if (isURL('dsu_paulsign-sign.html')) {
        if (window.find("今天签到了吗") && window.find("写下今天最想说的话")) {
            $("#" + emojiImg).click();
            $("#todaysay").val("每天签到水一发。。。");
            $("#qiandao").submit();
        }
    } else if (window.find(checkElement)) {
        toURL("dsu_paulsign-sign.html");
    }
}

function toURL_once(url,name='time'){
    const t = new Date();
    const time = [t.getFullYear(),t.getMonth()+1,t.getDate()].join("/");
    const itemName = "qd_"+name;
    if(localStorage.getItem(itemName) != time){
        localStorage.setItem(itemName,time);
        toURL(url);
    }
}