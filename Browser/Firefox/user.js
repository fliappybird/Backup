
// Set startup page [SETUP-CHROME]
// 0=blank, 1=home, 2=last visited page, 3=resume previous session
user_pref("browser.startup.page", 1);
// -------------------------------------
// Set HOME+NEWWINDOW page
user_pref("browser.startup.homepage", "about:home");
// -------------------------------------
// Set NEWTAB page
// true=Activity Stream (default), false=blank page
user_pref("browser.newtabpage.enabled", true);

// Disable link prefetching
user_pref("network.prefetch-next", true);
// Disable DNS prefetching
user_pref("network.dns.disablePrefetch", false);
// Disable predictor / prefetching
user_pref("network.predictor.enabled", true);
// Disable link-mouseover opening connection to linked server
user_pref("network.http.speculative-parallel-limit", 6);
// Disable mousedown speculative connections on bookmarks and history [FF98+]
user_pref("browser.places.speculativeConnect.enabled", true);

// Disable location bar making speculative connections [FF56+]
user_pref("browser.urlbar.speculativeConnect.enabled", true);
// Disable location bar contextual suggestions
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", true); // [FF95+]
// Disable live search suggestions
user_pref("browser.search.suggest.enabled", true);
user_pref("browser.urlbar.suggest.searches", true);
// Disable search and form history
user_pref("browser.formfill.enable", true);
// Disable tab-to-search [FF85+]
user_pref("browser.urlbar.suggest.engines", true);
// Disable coloring of visited links
user_pref("layout.css.visited_links_enabled", true);
// Enable separate default search engine in Private Windows and its UI setting
user_pref("browser.search.separatePrivateDefault", false); // [FF70+]
user_pref("browser.search.separatePrivateDefault.ui.enabled", false); // [FF71+]
// Disable merino
user_pref("browser.urlbar.merino.enabled", true);

// Disable auto-filling username & password form fields
user_pref("signon.autofillForms", true);

// Enable user interaction for security by always asking where to download
user_pref("browser.download.useDownloadDir", true);
// Enable user interaction for security by always asking how to handle new mimetypes [FF101+]
user_pref("browser.download.always_ask_before_handling_new_types", false);
// Disable webextension restrictions on certain mozilla domains [FF60+]
user_pref("extensions.webextensions.restrictedDomains", "");
// Enable Firefox to clear items on shutdown
user_pref("privacy.sanitize.sanitizeOnShutdown", false);
// Disable WebGL (Web Graphics Library)
user_pref("webgl.disabled", false);
// Disable favicons in history and bookmarks
user_pref("browser.chrome.site_icons", true);
// Disable location bar suggestion types
user_pref("browser.urlbar.suggest.history", true);
user_pref("browser.urlbar.suggest.bookmark", true);
user_pref("browser.urlbar.suggest.openpage", true);
// Disable location bar autofill
user_pref("browser.urlbar.autoFill", true);
// Disable browsing and download history
user_pref("places.history.enabled", true);
// Disable Form Autofill
user_pref("extensions.formautofill.addresses.enabled", true); // [FF55+]
user_pref("extensions.formautofill.creditCards.enabled", true); // [FF56+]
// Disable location bar using search
user_pref("keyword.enabled", true);
// Disable MathML (Mathematical Markup Language) [FF51+]
user_pref("mathml.disabled", false);
// Disable asm.js [FF22+]
user_pref("javascript.options.asmjs", true);
// Disable Ion and baseline JIT to harden against JS exploits
user_pref("javascript.options.ion", true);
user_pref("javascript.options.baselinejit", true);
user_pref("javascript.options.jit_trustedprincipals", false); // [FF75+] [HIDDEN PREF]
// Disable WebAssembly [FF52+]
user_pref("javascript.options.wasm", true);
// Disable rendering of SVG OpenType fonts
user_pref("gfx.font_rendering.opentype_svg.enabled", true);
// Disable widevine CDM (Content Decryption Module)
user_pref("media.gmp-widevinecdm.enabled", true);
// CONTENT BEHAVIOR
user_pref("accessibility.typeaheadfind", true); // enable "Find As You Type"
user_pref("clipboard.autocopy", true); // disable autocopy default [LINUX]
user_pref("layout.spellcheckDefault", 2); // 0=none, 1-multi-line, 2=multi-line & single-line
// user_pref("identity.fxaccounts.enabled", false); // Firefox Accounts & Sync [FF60+] [RESTART]
// user_pref("reader.parse-on-load.enabled", false); // Reader View
// 
user_pref("signon.rememberSignons", false);
user_pref("browser.cache.disk.enable", true); // DEFAULT
/** GENERAL ***/
user_pref("content.notify.interval", 100000);
/** GFX ***/
user_pref("gfx.canvas.accelerated.cache-items", 4096);
user_pref("gfx.canvas.accelerated.cache-size", 512);
user_pref("gfx.content.skia-font-cache-size", 20);
/** DISK CACHE ***/
user_pref("browser.cache.jsbc_compression_level", 3); 
/** NETWORK ***/
user_pref("network.buffer.cache.size", 262144);
user_pref("network.buffer.cache.count", 128);
user_pref("network.http.max-connections", 1800);
user_pref("network.http.max-persistent-connections-per-server", 10);
user_pref("network.http.max-urgent-start-excessive-connections-per-host", 5);
user_pref("network.http.pacing.requests.enabled", false);
user_pref("network.dnsCacheExpiration", 3600);
user_pref("network.dns.max_high_priority_threads", 8);
user_pref("network.ssl_tokens_cache_capacity", 10240); 
/** EXPERIMENTAL ***/
user_pref("layout.css.grid-template-masonry-value.enabled", true);
user_pref("dom.enable_web_task_scheduling", true);
user_pref("layout.css.has-selector.enabled", true);
user_pref("dom.security.sanitizer.enabled", true);
//
user_pref("network.cookie.sameSite.noneRequiresSecure", true);
user_pref("privacy.globalprivacycontrol.enabled", true);
user_pref("browser.sessionstore.interval", 60000);
/** SHUTDOWN & SANITIZING ***/
// user_pref("privacy.history.custom", true);
user_pref("browser.urlbar.update2.engineAliasRefresh", true);
user_pref("dom.security.https_first_schemeless", true); // [FF120+]
//
user_pref("browser.privatebrowsing.vpnpromourl", "");
/** THEME ADJUSTMENTS ***/
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("browser.compactmode.show", true);
user_pref("browser.display.focus_ring_on_anything", true);
user_pref("browser.display.focus_ring_style", 0);
user_pref("browser.display.focus_ring_width", 0);
user_pref("layout.css.prefers-color-scheme.content-override", 1);
user_pref("browser.privateWindowSeparation.enabled", false); // WINDOWS */
/** COOKIE BANNER HANDLING ***/
user_pref("cookiebanners.service.mode", 1);
user_pref("cookiebanners.service.mode.privateBrowsing", 1);

/** FULLSCREEN NOTICE ***/
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");
//
// only sharpen scrolling
user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("mousewheel.min_line_scroll_amount", 10); // 10-40; adjust this number to your liking; default=5
user_pref("general.smoothScroll.mouseWheel.durationMinMS", 80); // default=50
user_pref("general.smoothScroll.currentVelocityWeighting", "0.15"); // default=.25
user_pref("general.smoothScroll.stopDecelerationWeighting", "0.6"); // default=.4

/****************************************************************************************
 * OPTION: INSTANT SCROLLING (SIMPLE ADJUSTMENT)                                       *
 ****************************************************************************************/
// recommended for 60hz+ displays
user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("general.smoothScroll", true); // DEFAULT
user_pref("mousewheel.default.delta_multiplier_y", 275); // 250-400; adjust this number to your liking

/****************************************************************************************
 * OPTION: SMOOTH SCROLLING                                                            *
 ****************************************************************************************/
// recommended for 90hz+ displays
user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("general.smoothScroll", true); // DEFAULT
user_pref("general.smoothScroll.msdPhysics.enabled", true);
user_pref("mousewheel.default.delta_multiplier_y", 300); // 250-400; adjust this number to your liking

/****************************************************************************************
 * OPTION: NATURAL SMOOTH SCROLLING V3 [MODIFIED]                                      *
 ****************************************************************************************/
// credit: https://github.com/AveYo/fox/blob/cf56d1194f4e5958169f9cf335cd175daa48d349/Natural%20Smooth%20Scrolling%20for%20user.js
// recommended for 120hz+ displays
// largely matches Chrome flags: Windows Scrolling Personality and Smooth Scrolling
user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("general.smoothScroll", true); // DEFAULT
user_pref("general.smoothScroll.msdPhysics.continuousMotionMaxDeltaMS", 12);
user_pref("general.smoothScroll.msdPhysics.enabled", true);
user_pref("general.smoothScroll.msdPhysics.motionBeginSpringConstant", 600);
user_pref("general.smoothScroll.msdPhysics.regularSpringConstant", 650);
user_pref("general.smoothScroll.msdPhysics.slowdownMinDeltaMS", 25);
user_pref("general.smoothScroll.msdPhysics.slowdownMinDeltaRatio", 2.0);
user_pref("general.smoothScroll.msdPhysics.slowdownSpringConstant", 250);
user_pref("general.smoothScroll.currentVelocityWeighting", 1.0);
user_pref("general.smoothScroll.stopDecelerationWeighting", 1.0);
user_pref("mousewheel.default.delta_multiplier_y", 300); // 250-400; adjust this number to your liking