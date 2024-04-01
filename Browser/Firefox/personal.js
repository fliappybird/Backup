user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.startup.page", 1);
user_pref("browser.startup.homepage", "about:home");
user_pref("browser.newtabpage.enabled", true);
user_pref("browser.topsites.contile.enabled", false);
user_pref("browser.topsites.useRemoteSetting", false);

user_pref("geo.provider.network.url", "");
user_pref("geo.provider.geoclue.always_high_accuracy", false);
user_pref("browser.region.network.url", "");
user_pref("browser.region.update.enabled", false);

user_pref("browser.shopping.experience2023.opted", 2);
user_pref("browser.shopping.experience2023.active", false);

user_pref("corroborator.enabled", false);
// Disable WebVTT logging and test events
user_pref("media.webvtt.debug.logging", false);
user_pref("media.webvtt.testing.events", false);
user_pref("browser.contentblocking.database.enabled", false);
user_pref("browser.contentblocking.cfr-milestone.enabled", false);
user_pref("default-browser-agent.enabled", false); // [WINDOWS]

// Disable contentblocking reports
user_pref("browser.contentblocking.reportBreakage.url", "");
user_pref("browser.contentblocking.report.cookie.url", "");
user_pref("browser.contentblocking.report.cryptominer.url", "");
user_pref("browser.contentblocking.report.fingerprinter.url", "");
user_pref("browser.contentblocking.report.lockwise.enabled", false);
user_pref("browser.contentblocking.report.lockwise.how_it_works.url", "");
user_pref("browser.contentblocking.report.manage_devices.url", "");
user_pref("browser.contentblocking.report.monitor.enabled", false);
user_pref("browser.contentblocking.report.monitor.how_it_works.url", "");
user_pref("browser.contentblocking.report.monitor.sign_in_url", "");
user_pref("browser.contentblocking.report.monitor.url", "");
user_pref("browser.contentblocking.report.proxy.enabled", false);
user_pref("browser.contentblocking.report.proxy_extension.url", "");
user_pref("browser.contentblocking.report.social.url", "");
user_pref("browser.contentblocking.report.tracker.url", "");
user_pref("browser.contentblocking.report.endpoint_url", "");
user_pref("browser.contentblocking.report.monitor.home_page_url", "");
user_pref("browser.contentblocking.report.monitor.preferences_url", "");
user_pref("browser.contentblocking.report.vpn.enabled", false);
user_pref("browser.contentblocking.report.hide_vpn_banner", true);
user_pref("browser.contentblocking.report.show_mobile_app", false);
user_pref("browser.vpn_promo.enabled", false);
user_pref("browser.promo.focus.enabled", false);
// Block unwanted connections
user_pref("app.feedback.baseURL", "");
user_pref("app.support.baseURL", "");
user_pref("app.releaseNotesURL", "");
user_pref("app.update.url.details", "");
user_pref("app.update.url.manual", "");
user_pref("app.update.staging.enabled", false);
// Remove default handlers and translation engine
user_pref("gecko.handlerService.schemes.mailto.0.uriTemplate", "");
user_pref("gecko.handlerService.schemes.mailto.0.name", "");
user_pref("gecko.handlerService.schemes.mailto.1.uriTemplate", "");
user_pref("gecko.handlerService.schemes.mailto.1.name", "");
user_pref("gecko.handlerService.schemes.irc.0.uriTemplate", "");
user_pref("gecko.handlerService.schemes.irc.0.name", "");
user_pref("gecko.handlerService.schemes.ircs.0.uriTemplate", "");
user_pref("gecko.handlerService.schemes.ircs.0.name", "");
user_pref("browser.translation.engine", "");
user_pref("services.settings.server", "");

// Disable SB (Safe Browsing)
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);
user_pref("browser.safebrowsing.passwords.enabled", false);
user_pref("browser.safebrowsing.allowOverride", false);
// Disable SB checks for downloads (both local lookups + remote)
user_pref("browser.safebrowsing.downloads.enabled", false);
// Disable SB checks for downloads (remote)
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.url", "");
// Disable SB checks for unwanted software
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
// Disable "ignore this warning" on SB warnings [FF45+]
// user_pref("browser.safebrowsing.allowOverride", false);
// Google connections
user_pref("browser.safebrowsing.downloads.remote.block_dangerous", false);
user_pref("browser.safebrowsing.downloads.remote.block_dangerous_host", false);
user_pref("browser.safebrowsing.provider.google.updateURL", "");
user_pref("browser.safebrowsing.provider.google.gethashURL", "");
user_pref("browser.safebrowsing.provider.google4.updateURL", "");
user_pref("browser.safebrowsing.provider.google4.gethashURL", "");
user_pref("browser.safebrowsing.provider.google.reportURL", "");
user_pref("browser.safebrowsing.reportPhishURL", "");
user_pref("browser.safebrowsing.provider.google4.reportURL", "");
user_pref("browser.safebrowsing.provider.google.reportMalwareMistakeURL", "");
user_pref("browser.safebrowsing.provider.google.reportPhishMistakeURL", "");
user_pref("browser.safebrowsing.provider.google4.reportMalwareMistakeURL", "");
user_pref("browser.safebrowsing.provider.google4.reportPhishMistakeURL", "");
user_pref("browser.safebrowsing.provider.google4.dataSharing.enabled", false);
user_pref("browser.safebrowsing.provider.google4.dataSharingURL", "");
user_pref("browser.safebrowsing.provider.google.advisory", "");
user_pref("browser.safebrowsing.provider.google.advisoryURL", "");
user_pref("browser.safebrowsing.provider.google.gethashURL", "");
user_pref("browser.safebrowsing.provider.google4.advisoryURL", "");
user_pref("browser.safebrowsing.blockedURIs.enabled", false);
user_pref("browser.safebrowsing.provider.mozilla.gethashURL", "");
user_pref("browser.safebrowsing.provider.mozilla.updateURL", "");

user_pref("network.prefetch-next", true);
user_pref("network.predictor.enabled", true);
user_pref("network.http.speculative-parallel-limit", 6);
user_pref("browser.places.speculativeConnect.enabled", true);

// Disable DNS-over-HTTPS (DoH)[FF60+]
user_pref("network.trr.mode", 5);
user_pref("network.trr.confirmationNS", "");
// -------------------------------------
// Disable skipping DoH when parental controls are enabled
user_pref("network.trr.uri", "");
user_pref("network.trr.custom_uri", "");

user_pref("browser.urlbar.speculativeConnect.enabled", true);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", true); 
user_pref("browser.search.suggest.enabled", true);
user_pref("browser.urlbar.suggest.searches", true);
user_pref("browser.urlbar.clipboard.featureGate", true);
user_pref("browser.formfill.enable", true);
user_pref("browser.urlbar.suggest.engines", true);
user_pref("layout.css.visited_links_enabled", true);
user_pref("browser.search.separatePrivateDefault", false);
user_pref("browser.search.separatePrivateDefault.ui.enabled", false);
user_pref("browser.urlbar.merino.enabled", true);

user_pref("signon.rememberSignons", true);
user_pref("signon.generation.enabled", true);
user_pref("signon.management.page.breach-alerts.enabled", false);
user_pref("signon.management.page.breachAlertUrl", "");
user_pref("security.ask_for_password", 2);
user_pref("security.password_lifetime", 5); 
user_pref("signon.autofillForms", true);

user_pref("browser.cache.disk.enable", true);

user_pref("security.OCSP.enabled", 0);
ser_pref("security.OCSP.require", false);
user_pref("security.cert_pinning.enforcement_level", 1);
user_pref("security.remote_settings.intermediates.enabled", false);
user_pref("security.remote_settings.intermediates.bucket", "");
user_pref("security.remote_settings.intermediates.collection", "");
user_pref("security.remote_settings.intermediates.signer", "");
user_pref("security.remote_settings.crlite_filters.enabled", false);
user_pref("security.remote_settings.crlite_filters.bucket", "");
user_pref("security.remote_settings.crlite_filters.collection", "");
user_pref("security.remote_settings.crlite_filters.signer", "");
user_pref("security.pki.crlite_mode", 0);

user_pref("dom.security.https_only_mode", false);
user_pref("dom.security.https_only_mode_pbm", false);
user_pref("security.certerrors.mitm.priming.enabled", false);
user_pref("security.certerrors.mitm.priming.endpoint", "");
user_pref("security.pki.mitm_canary_issuer", "");
user_pref("security.pki.mitm_canary_issuer.enabled", false);
user_pref("security.pki.mitm_detected", false);

user_pref("browser.download.start_downloads_in_tmp_dir", false);
user_pref("beacon.enabled", false);
user_pref("browser.tabs.searchclipboardfor.middleclick", true);
// Disable the default checkedness for "Save card and address to Firefox" checkboxes
user_pref("dom.payments.defaults.saveAddress", false);
user_pref("dom.payments.defaults.saveCreditCard", false);
user_pref("browser.urlbar.filter.javascript", true);

user_pref("browser.download.useDownloadDir", true);
user_pref("browser.download.always_ask_before_handling_new_types", false);

user_pref("extensions.webextensions.restrictedDomains", "");

user_pref("privacy.sanitize.sanitizeOnShutdown", false);

user_pref("privacy.resistFingerprinting", false); 
user_pref("privacy.window.maxInnerWidth", 1600);
user_pref("privacy.window.maxInnerHeight", 900);
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);
user_pref("privacy.resistFingerprinting.letterboxing", false);

user_pref("browser.chrome.site_icons", true);
user_pref("browser.download.forbid_open_with", true);
user_pref("browser.urlbar.suggest.addons", false);
user_pref("browser.urlbar.suggest.mdn", true);
user_pref("browser.urlbar.suggest.pocket", true)
user_pref("browser.urlbar.suggest.weather", false);
user_pref("browser.urlbar.suggest.treading", false);
user_pref("browser.urlbar.suggest.yelp", false);

user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
user_pref("extensions.formautofill.creditCards.enabled", false);

// Disable Firefox blocklist
user_pref("extensions.blocklist.enabled", false); // [DEFAULT: true]
user_pref("extensions.blocklist.addonItemURL", ""); 
user_pref("extensions.blocklist.detailsURL", "");
user_pref("extensions.blocklist.itemURL", "");
user_pref("services.blocklist.addons.collection", "");
user_pref("services.blocklist.addons.signer", "");
user_pref("services.blocklist.plugins.collection", ""); 
user_pref("services.blocklist.plugins.signer", "");
user_pref("services.blocklist.gfx.collection", "");
user_pref("services.blocklist.gfx.signer", "");

user_pref("extensions.quarantinedDomains.enabled", false); 

user_pref("geo.enabled", false);
user_pref("permissions.default.geo", 2);
user_pref("permissions.default.camera", 2);
user_pref("permissions.default.microphone", 2);
user_pref("permissions.default.desktop-notification", 2);
user_pref("permissions.default.xr", 2); // Virtual Reality
user_pref("canvas.capturestream.enabled", false);
user_pref("gfx.offscreencanvas.enabled", false);
user_pref("privacy.query_stripping.strip_list", "__hsfp __hssc __hstc __s _hsenc _openstat dclid fbclid gbraid gclid hsCtaTracking igshid mc_eid ml_subscriber ml_subscriber_hash msclkid oft_c oft_ck oft_d oft_id oft_ids oft_k oft_lk oft_sk oly_anon_id oly_enc_id rb_clickid s_cid twclid vero_conv vero_id wbraid wickedid yclid");
user_pref("dom.push.enabled", false);
user_pref("dom.push.connection.enabled", false);
user_pref("dom.push.serverURL", "");
user_pref("dom.push.userAgentID", "");
user_pref("media.peerconnection.enabled", false);

user_pref("startup.homepage_welcome_url", "");
user_pref("startup.homepage_welcome_url.additional", "");
user_pref("startup.homepage_override_url", "");
user_pref("browser.tabs.warnOnClose", false); // [DEFAULT: false FF94+]
user_pref("browser.tabs.warnOnCloseOtherTabs", false);
user_pref("browser.tabs.warnOnOpen", false);
user_pref("browser.warnOnQuitShortcut", false); // [FF94+]
user_pref("full-screen-api.warning.delay", 0);
user_pref("full-screen-api.warning.timeout", 0);
user_pref("browser.warnOnQuit", false);
user_pref("app.update.auto", false);
user_pref("extensions.update.enabled", false);
user_pref("extensions.update.autoUpdateDefault", false);
user_pref("extensions.getAddons.cache.enabled", false);
user_pref("browser.search.update", false);
user_pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);
user_pref("extensions.pocket.enabled", false); // Pocket Account [FF46+]
user_pref("extensions.screenshots.disabled", true); // [FF55+]
user_pref("reader.parse-on-load.enabled", false); // Reader View
user_pref("browser.tabs.firefox-view", false); // Firefox-view
user_pref("browser.sessionstore.interval", 30000); // minimum interval between session save operations
user_pref("network.manage-offline-status", false);
user_pref("browser.preferences.moreFromMozilla", false);
user_pref("browser.disableResetPrompt", true);
user_pref("security.ssl.enable_ocsp_stapling", false);
user_pref("security.family_safety.mode", 0);


