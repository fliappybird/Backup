// **********************************************************************************
// user.js | Firefox desktop
// https://git.nixnet.services/Narsil/desktop_user.js
// **********************************************************************************
//
// Author    : Narsil    : https://git.nixnet.services/Narsil
//
// Based on  : arkenfox  : https://github.com/arkenfox/user.js
//
// License   : https://git.nixnet.services/Narsil/desktop_user.js/raw/branch/master/LICENSE
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// START: internal custom pref to test for syntax error
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable about:config warning
user_pref("browser.aboutConfig.showWarning", false);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// STARTUP
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable default browser check
user_pref("browser.shell.checkDefaultBrowser", false);
// -------------------------------------
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
// -------------------------------------
// Disable sponsored content on Firefox Home (Activity Stream)
user_pref("browser.newtabpage.activity-stream.showSponsored", false); // [FF58+] Pocket > Sponsored Stories
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false); // [FF83+] Sponsored shortcuts
// -------------------------------------
// Clear default topsites
user_pref("browser.newtabpage.activity-stream.default.sites", "");
// user_pref("browser.topsites.contile.enabled", false);
// user_pref("browser.topsites.useRemoteSetting", false);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// GEOLOCATION
// >>>>>>>>>>>>>>>>>>>>>
//
// Use Mozilla geolocation service instead of Google if permission is granted [FF74+]
user_pref("geo.provider.network.url", "");
// user_pref("geo.provider.network.logging.enabled", true); // [HIDDEN PREF]
// -------------------------------------
// Disable using the OS's geolocation service
user_pref("geo.provider.ms-windows-location", false); // [WINDOWS]
user_pref("geo.provider.use_corelocation", false); // [MAC]
user_pref("geo.provider.use_gpsd", false); // [LINUX] [HIDDEN PREF]
user_pref("geo.provider.geoclue.always_high_accuracy", false); // [LINUX]
user_pref("geo.provider.use_geoclue", false); // [FF102+] [LINUX]
// -------------------------------------
// Disable region updates
user_pref("browser.region.network.url", ""); // [FF78+] Defense-in-depth
user_pref("browser.region.update.enabled", false); // [FF79+]
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// QUIETER FOX
// >>>>>>>>>>>>>>>>>>>>>
//
// RECOMMENDATIONS
//
// Disable recommendation pane in about:addons (uses Google Analytics)
user_pref("extensions.getAddons.showPane", false); // [HIDDEN PREF]
// -------------------------------------
// Disable recommendations in about:addons' Extensions and Themes panes [FF68+]
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
// -------------------------------------
// Disable personalized Extension Recommendations in about:addons and AMO [FF65+]
user_pref("browser.discovery.enabled", false);
// -------------------------------------
// Disable shopping experience [FF116+]
user_pref("browser.shopping.experience2023.enabled", false); // [DEFAULT: false]
user_pref("browser.shopping.experience2023.opted", 2);
user_pref("browser.shopping.experience2023.active", false);
//
// TELEMETRY
//
// Disable new data submission [FF41+]
user_pref("datareporting.policy.dataSubmissionEnabled", false);
// -------------------------------------
// Disable Health Reports
user_pref("datareporting.healthreport.uploadEnabled", false);
// -------------------------------------
// Disable telemetry
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
// -------------------------------------
// Skip checking omni.ja and other files
user_pref("corroborator.enabled", false);
// -------------------------------------
// Disable Telemetry Coverage
user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
user_pref("toolkit.coverage.endpoint.base", "");
// -------------------------------------
// Disable PingCentre telemetry (used in several System Add-ons) [FF57+]
user_pref("browser.ping-centre.telemetry", false);
// -------------------------------------
// Disable Firefox Home (Activity Stream) telemetry
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
// -------------------------------------
// Disable WebVTT logging and test events
user_pref("media.webvtt.debug.logging", false);
user_pref("media.webvtt.testing.events", false);
// -------------------------------------
// Disable send content blocking log to about:protections
user_pref("browser.contentblocking.database.enabled", false);
// -------------------------------------
// Disable celebrating milestone toast when certain numbers of trackers are blocked
user_pref("browser.contentblocking.cfr-milestone.enabled", false);
// -------------------------------------
// Disable Default Browser Agent
user_pref("default-browser-agent.enabled", false); // [WINDOWS]
//
// STUDIES
//
// Disable Studies
user_pref("app.shield.optoutstudies.enabled", false);
// -------------------------------------
// Disable Normandy/Shield [FF60+]
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
//
// CRASH REPORTS
//
// Disable Crash Reports
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false); // [FF44+]
// user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // [FF51+] [DEFAULT: false]
// -------------------------------------
// Enforce no submission of backlogged Crash Reports [FF58+]
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [DEFAULT: false]
//
// OTHER
//
// Disable Captive Portal detection
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false); // [FF52+]
// -------------------------------------
// Disable Network Connectivity checks [FF65+]
user_pref("network.connectivity-service.enabled", false);
// -------------------------------------
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
// -------------------------------------
// Block unwanted connections
user_pref("app.feedback.baseURL", "");
user_pref("app.support.baseURL", "");
user_pref("app.releaseNotesURL", "");
user_pref("app.update.url.details", "");
user_pref("app.update.url.manual", "");
user_pref("app.update.staging.enabled", false);
// -------------------------------------
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
// -------------------------------------
// Disable connections to Mozilla servers
user_pref("services.settings.server", "");
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// SAFE BROWSING (SB)
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable SB (Safe Browsing)
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);
user_pref("browser.safebrowsing.passwords.enabled", false);
user_pref("browser.safebrowsing.allowOverride", false);
// -------------------------------------
// Disable SB checks for downloads (both local lookups + remote)
user_pref("browser.safebrowsing.downloads.enabled", false);
// -------------------------------------
// Disable SB checks for downloads (remote)
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.url", "");
// -------------------------------------
// Disable SB checks for unwanted software
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
// -------------------------------------
// Disable "ignore this warning" on SB warnings [FF45+]
// user_pref("browser.safebrowsing.allowOverride", false);
// -------------------------------------
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
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// BLOCK IMPLICIT OUTBOUND
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable link prefetching
user_pref("network.prefetch-next", true);
// -------------------------------------
// Disable DNS prefetching
user_pref("network.dns.disablePrefetch", false);
// user_pref("network.dns.disablePrefetchFromHTTPS", true); // [DEFAULT: true]
// -------------------------------------
// Disable predictor / prefetching
user_pref("network.predictor.enabled", true);
user_pref("network.predictor.enable-prefetch", true); // [FF48+] [DEFAULT: false]
// -------------------------------------
// Disable link-mouseover opening connection to linked server
user_pref("network.http.speculative-parallel-limit", 6);
// -------------------------------------
// Disable mousedown speculative connections on bookmarks and history [FF98+]
user_pref("browser.places.speculativeConnect.enabled", true);
// -------------------------------------
// Enforce no "Hyperlink Auditing" (click tracking)
// user_pref("browser.send_pings", false); // [DEFAULT: false]
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// DNS / DoH / PROXY / SOCKS
// >>>>>>>>>>>>>>>>>>>>>
//
// Set the proxy server to do any DNS lookups when using SOCKS
user_pref("network.proxy.socks_remote_dns", true);
// -------------------------------------
// Disable using UNC (Uniform Naming Convention) paths [FF61+]
user_pref("network.file.disable_unc_paths", true); // [HIDDEN PREF]
// -------------------------------------
// Disable GIO as a potential proxy bypass vector
user_pref("network.gio.supported-protocols", ""); // [HIDDEN PREF] [DEFAULT: "" FF118+]
// -------------------------------------
// Disable proxy direct failover for system requests [FF91+]
// user_pref("network.proxy.failover_direct", false);
// -------------------------------------
// Disable proxy bypass for system request failures [FF95+]
// user_pref("network.proxy.allow_bypass", false);
// -------------------------------------
// Disable DNS-over-HTTPS (DoH)[FF60+]
user_pref("network.trr.mode", 5);
user_pref("network.trr.confirmationNS", "");
// -------------------------------------
// Disable skipping DoH when parental controls are enabled
user_pref("network.trr.uri", "");
user_pref("network.trr.custom_uri", "");
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable location bar making speculative connections [FF56+]
user_pref("browser.urlbar.speculativeConnect.enabled", true);
// -------------------------------------
// Disable location bar contextual suggestions
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", true); // [FF95+]
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false); // [FF92+]
// -------------------------------------
// Disable live search suggestions
user_pref("browser.search.suggest.enabled", true);
user_pref("browser.urlbar.suggest.searches", true);
// -------------------------------------
// Disable urlbar trending search suggestions [FF118+]
user_pref("browser.urlbar.trending.featureGate", false);
// -------------------------------------
// Disable urlbar suggestions
user_pref("browser.urlbar.addons.featureGate", false); // [FF115+]
user_pref("browser.urlbar.mdn.featureGate", false); // [FF117+] [HIDDEN PREF]
user_pref("browser.urlbar.pocket.featureGate", false); // [FF116+] [DEFAULT: false]
user_pref("browser.urlbar.weather.featureGate", false); // [FF108+] [DEFAULT: false]
// -------------------------------------
// Disable urlbar clipboard suggestions [FF118+]
user_pref("browser.urlbar.clipboard.featureGate", true); // [DEFAULT: false]
// -------------------------------------
// Disable search and form history
user_pref("browser.formfill.enable", true);
// -------------------------------------
// Disable tab-to-search [FF85+]
user_pref("browser.urlbar.suggest.engines", true);
// -------------------------------------
// Disable coloring of visited links
user_pref("layout.css.visited_links_enabled", true);
// -------------------------------------
// Enable separate default search engine in Private Windows and its UI setting
user_pref("browser.search.separatePrivateDefault", false); // [FF70+]
user_pref("browser.search.separatePrivateDefault.ui.enabled", false); // [FF71+]
// -------------------------------------
// Disable merino
user_pref("browser.urlbar.merino.enabled", true);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// PASSWORDS
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable saving passwords and password alerts.
user_pref("signon.rememberSignons", true);
user_pref("signon.generation.enabled", true);
user_pref("signon.management.page.breach-alerts.enabled", false);
user_pref("signon.management.page.breachAlertUrl", "");
// -------------------------------------
// Set when Firefox should prompt for the primary password
// 0=once per session (default), 1=every time it's needed, 2=after n minutes
user_pref("security.ask_for_password", 2);
// -------------------------------------
// Set how long in minutes Firefox should remember the primary password (0901)
user_pref("security.password_lifetime", 5); // [DEFAULT: 30]
// -------------------------------------
// Disable auto-filling username & password form fields
user_pref("signon.autofillForms", true);
// -------------------------------------
// Disable formless login capture for Password Manager [FF51+]
user_pref("signon.formlessCapture.enabled", false);
// -------------------------------------
// Limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources [FF41+]
// 0 = don't allow sub-resources to open HTTP authentication credentials dialogs
// 1 = don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
// 2 = allow sub-resources to open HTTP authentication credentials dialogs (default)
user_pref("network.auth.subresource-http-auth-allow", 1);
// -------------------------------------
// Enforce no automatic authentication on Microsoft sites [FF91+] [WINDOWS 10+]
// user_pref("network.http.windows-sso.enabled", false); // [DEFAULT: false]
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// DISK AVOIDANCE
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable disk cache
user_pref("browser.cache.disk.enable", true);
// -------------------------------------
// Disable media cache from writing to disk in Private Browsing
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true); // [FF75+]
user_pref("media.memory_cache_max_size", 65536);
// -------------------------------------
// Disable storing extra session data [SETUP-CHROME]
// 0=everywhere, 1=unencrypted sites, 2=nowhere
user_pref("browser.sessionstore.privacy_level", 2);
// -------------------------------------
// Disable automatic Firefox start and session restore after reboot [FF62+] [WINDOWS]
user_pref("toolkit.winRegisterApplicationRestart", false);
// -------------------------------------
// Disable favicons in shortcuts [WINDOWS]
user_pref("browser.shell.shortcutFavicons", true);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
// >>>>>>>>>>>>>>>>>>>>>
//
// Require safe negotiation
user_pref("security.ssl.require_safe_negotiation", true);
// -------------------------------------
// Disable TLS1.3 0-RTT (round-trip time) [FF51+]
user_pref("security.tls.enable_0rtt_data", false);
//
// OCSP (Online Certificate Status Protocol)
//
// Enforce OCSP fetching to confirm current validity of certificates
// 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
user_pref("security.OCSP.enabled", 0); // [DEFAULT: 1]
// -------------------------------------
// Set OCSP fetch failures (non-stapled) to hard-fail [SETUP-WEB]
user_pref("security.OCSP.require", false);
//
// CERTS / HPKP (HTTP Public Key Pinning)
//
// Enable strict PKP (Public Key Pinning)
// 0=disabled, 1=allow user MiTM (default; such as your antivirus), 2=strict
user_pref("security.cert_pinning.enforcement_level", 1);
// -------------------------------------
// Disable CRLite [FF73+]
// 0 = disabled
// 1 = consult CRLite but only collect telemetry (default)
// 2 = consult CRLite and enforce both "Revoked" and "Not Revoked" results
// 3 = consult CRLite and enforce "Not Revoked" results, but defer to OCSP for "Revoked" (default)
user_pref("security.remote_settings.intermediates.enabled", false);
user_pref("security.remote_settings.intermediates.bucket", "");
user_pref("security.remote_settings.intermediates.collection", "");
user_pref("security.remote_settings.intermediates.signer", "");
user_pref("security.remote_settings.crlite_filters.enabled", false);
user_pref("security.remote_settings.crlite_filters.bucket", "");
user_pref("security.remote_settings.crlite_filters.collection", "");
user_pref("security.remote_settings.crlite_filters.signer", "");
user_pref("security.pki.crlite_mode", 0);
//
// MIXED CONTENT
//
// Disable insecure passive content (such as images) on https pages [SETUP-WEB]
// user_pref("security.mixed_content.block_display_content", true); // Defense-in-depth
// -------------------------------------
// Enable HTTPS-Only mode in all windows
user_pref("dom.security.https_only_mode", true); // [FF76+]
// user_pref("dom.security.https_only_mode_pbm", true); // [FF80+]
// -------------------------------------
// Enable HTTPS-Only mode for local resources [FF77+]
// user_pref("dom.security.https_only_mode.upgrade_local", true);
// -------------------------------------
// Disable HTTP background requests [FF82+]
user_pref("dom.security.https_only_mode_send_http_background_request", false);
// -------------------------------------
// Disable ping to Mozilla for Man-in-the-Middle detection
user_pref("security.certerrors.mitm.priming.enabled", false);
user_pref("security.certerrors.mitm.priming.endpoint", "");
user_pref("security.pki.mitm_canary_issuer", "");
user_pref("security.pki.mitm_canary_issuer.enabled", false);
user_pref("security.pki.mitm_detected", false);
//
// UI (User Interface)
//
// Display warning on the padlock for "broken security"
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
// -------------------------------------
// Display advanced information on Insecure Connection warning pages
user_pref("browser.xul.error_pages.expert_bad_cert", true);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// REFERERS
// >>>>>>>>>>>>>>>>>>>>>
//
// Control the amount of cross-origin information to send [FF52+]
// 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// CONTAINERS
// >>>>>>>>>>>>>>>>>>>>>
//
// Enable Container Tabs and its UI setting [FF50+]
user_pref("privacy.userContext.enabled", true);
user_pref("privacy.userContext.ui.enabled", true);
// -------------------------------------
// Set behavior on "+ Tab" button to display container menu on left click [FF74+]
// user_pref("privacy.userContext.newTabContainerOnLeftClick.enabled", true);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// PLUGINS / MEDIA / WEBRTC
// >>>>>>>>>>>>>>>>>>>>>
//
// Force WebRTC inside the proxy [FF70+]
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);
// -------------------------------------
// Force a single network interface for ICE candidates generation [FF42+]
user_pref("media.peerconnection.ice.default_address_only", true);
// -------------------------------------
// Force exclusion of private IPs from ICE candidates [FF51+]
// user_pref("media.peerconnection.ice.no_host", true);
// -------------------------------------
// Disable GMP (Gecko Media Plugins)
// user_pref("media.gmp-provider.enabled", false);
// user_pref("media.gmp-manager.url", "");
// user_pref("media.gmp-gmpopenh264.enabled", false);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// DOM (DOCUMENT OBJECT MODEL)
// >>>>>>>>>>>>>>>>>>>>>
//
// Prevent scripts from moving and resizing open windows
user_pref("dom.disable_window_move_resize", true);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// MISCELLANEOUS
// >>>>>>>>>>>>>>>>>>>>>
//
// Remove temp files opened from non-PB windows with an external application
user_pref("browser.download.start_downloads_in_tmp_dir", false); // [FF102+]
// -------------------------------------
// Disable sending additional analytics to web servers
user_pref("beacon.enabled", false);
// -------------------------------------
// Remove temp files opened with an external application
user_pref("browser.helperApps.deleteTempFileOnExit", true);
// -------------------------------------
// Disable UITour backend so there is no chance that a remote page can use it
user_pref("browser.uitour.enabled", false);
user_pref("browser.uitour.url", ""); // Defense-in-depth
// -------------------------------------
// Reset remote debugging to disabled
user_pref("devtools.debugger.remote-enabled", false); // [DEFAULT: false]
// -------------------------------------
// Disable websites overriding Firefox's keyboard shortcuts [FF58+]
// 0 (default) or 1=allow, 2=block
// user_pref("permissions.default.shortcuts", 2);
// -------------------------------------
// Remove special permissions for certain mozilla domains [FF35+]
user_pref("permissions.manager.defaultsUrl", "");
// -------------------------------------
// Remove webchannel whitelist
user_pref("webchannel.allowObject.urlWhitelist", "");
// -------------------------------------
// Use Punycode in Internationalized Domain Names to eliminate possible spoofing
user_pref("network.IDN_show_punycode", true);
// -------------------------------------
// Enforce PDFJS, disable PDFJS scripting
user_pref("pdfjs.disabled", false); // [DEFAULT: false]
user_pref("pdfjs.enableScripting", false); // [FF86+]
// -------------------------------------
// Disable middle click on new tab button opening URLs or searches using clipboard [FF115+]
user_pref("browser.tabs.searchclipboardfor.middleclick", true); // [DEFAULT: false NON-LINUX]
// -------------------------------------
// Disable the default checkedness for "Save card and address to Firefox" checkboxes
user_pref("dom.payments.defaults.saveAddress", false);
user_pref("dom.payments.defaults.saveCreditCard", false);
// -------------------------------------
// Disable Displaying Javascript in History URLs
user_pref("browser.urlbar.filter.javascript", true);
//
// DOWNLOADS
//
// Enable user interaction for security by always asking where to download
user_pref("browser.download.useDownloadDir", true);
// -------------------------------------
// Disable downloads panel opening on every download [FF96+]
user_pref("browser.download.alwaysOpenPanel", true);
// -------------------------------------
// Disable adding downloads to the system's "recent documents" list
user_pref("browser.download.manager.addToRecentDocs", false);
// -------------------------------------
// Enable user interaction for security by always asking how to handle new mimetypes [FF101+]
user_pref("browser.download.always_ask_before_handling_new_types", false);
//
// EXTENSIONS
//
// Limit allowed extension directories
user_pref("extensions.enabledScopes", 5); // [HIDDEN PREF]
// user_pref("extensions.autoDisableScopes", 15); // [DEFAULT: 15]
// -------------------------------------
// Disable bypassing 3rd party extension install prompts [FF82+]
user_pref("extensions.postDownloadThirdPartyPrompt", false);
// -------------------------------------
// Disable webextension restrictions on certain mozilla domains [FF60+]
user_pref("extensions.webextensions.restrictedDomains", "");
// -------------------------------------
// Disable extensions suggestions
user_pref("extensions.webservice.discoverURL", "");
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ETP (ENHANCED TRACKING PROTECTION)
// >>>>>>>>>>>>>>>>>>>>>
//
// Enable ETP Strict Mode [FF86+]
user_pref("browser.contentblocking.category", "strict"); // [HIDDEN PREF]
// -------------------------------------
// Disable ETP web compat features [FF93+]
// user_pref("privacy.antitracking.enableWebcompat", false);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// SHUTDOWN & SANITIZING
// >>>>>>>>>>>>>>>>>>>>>
//
// Enable Firefox to clear items on shutdown
user_pref("privacy.sanitize.sanitizeOnShutdown", false);
//
// SANITIZE ON SHUTDOWN: IGNORES "ALLOW" SITE EXCEPTIONS
//
// Set/enforce what items to clear on shutdown [SETUP-CHROME]
user_pref("privacy.clearOnShutdown.cache", true);
user_pref("privacy.clearOnShutdown.downloads", true); // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.formdata", true); // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.history", true); // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.sessions", true); // [DEFAULT: true]
// user_pref("privacy.clearOnShutdown.siteSettings", false); // [DEFAULT: false]
// -------------------------------------
// Set Session Restore to clear on shutdown [FF34+]
// user_pref("privacy.clearOnShutdown.openWindows", true);
//
// SANITIZE ON SHUTDOWN: RESPECTS "ALLOW" SITE EXCEPTIONS FF103+
//
// Set "Cookies" and "Site Data" to clear on shutdown
user_pref("privacy.clearOnShutdown.cookies", true); // Cookies
user_pref("privacy.clearOnShutdown.offlineApps", true); // Site Data
//
// SANITIZE MANUAL: IGNORES "ALLOW" SITE EXCEPTIONS
//
// Reset default items to clear with Ctrl-Shift-Del
user_pref("privacy.cpd.cache", true); // [DEFAULT: true]
user_pref("privacy.cpd.formdata", true); // Form & Search History
user_pref("privacy.cpd.history", true); // Browsing & Download History
user_pref("privacy.cpd.offlineApps", true); // Offline Website Data
user_pref("privacy.cpd.sessions", true); // [DEFAULT: true]
user_pref("privacy.cpd.offlineApps", true); // [DEFAULT: false]
user_pref("privacy.cpd.cookies", true);
// user_pref("privacy.cpd.downloads", true); // not used
// user_pref("privacy.cpd.openWindows", false); // Session Restore
// user_pref("privacy.cpd.passwords", false);
// user_pref("privacy.cpd.siteSettings", false);
// -------------------------------------
// Clear Session Restore data when sanitizing on shutdown or manually [FF34+]
// user_pref("privacy.clearOnShutdown.openWindows", true);
// user_pref("privacy.cpd.openWindows", true);
// -------------------------------------
// Reset default "Time range to clear" for "Clear Recent History"
// 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
user_pref("privacy.sanitize.timeSpan", 0);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// FPP (fingerprintingProtection)
// >>>>>>>>>>>>>>>>>>>>>
// Enable FPP in PB mode [FF114+]
// user_pref("privacy.fingerprintingProtection.pbmode", true); // [DEFAULT: true FF118+]
// -------------------------------------
// Set global FPP overrides [FF114+]
// user_pref("privacy.fingerprintingProtection.overrides", "");
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// RFP (resistFingerprinting)
// >>>>>>>>>>>>>>>>>>>>>
//
// Enable RFP
user_pref("privacy.resistFingerprinting", true); // [FF41+]
// user_pref("privacy.resistFingerprinting.pbmode", true); // [FF114+]
// -------------------------------------
// Set new window size rounding max values [FF55+]
// user_pref("privacy.window.maxInnerWidth", 1400);
// user_pref("privacy.window.maxInnerHeight", 900);
// -------------------------------------
// Disable mozAddonManager Web API [FF57+]
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);
// -------------------------------------
// Enable RFP letterboxing [FF67+]
// user_pref("privacy.resistFingerprinting.letterboxing", true); // [HIDDEN PREF]
// user_pref("privacy.resistFingerprinting.letterboxing.dimensions", ""); // [HIDDEN PREF]
// -------------------------------------
// Experimental RFP [FF91+]
// user_pref("privacy.resistFingerprinting.exemptedDomains", "*.example.invalid");
// -------------------------------------
// Disable using system colors
// user_pref("browser.display.use_system_colors", false); // [DEFAULT: false NON-WINDOWS]
// -------------------------------------
// Enforce non-native widget theme
// user_pref("widget.non-native-theme.enabled", true); // [DEFAULT: true]
// -------------------------------------
// Enforce links targeting new windows to open in a new tab instead
// 1=most recent window or tab, 2=new window, 3=new tab
user_pref("browser.link.open_newwindow", 3); // [DEFAULT: 3]
// -------------------------------------
// Set all open window methods to abide by "browser.link.open_newwindow"
user_pref("browser.link.open_newwindow.restriction", 0);
// -------------------------------------
// Disable WebGL (Web Graphics Library)
// user_pref("webgl.disabled", true);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// OPTIONAL OPSEC
// >>>>>>>>>>>>>>>>>>>>>
//
// Start Firefox in PB (Private Browsing) mode
// user_pref("browser.privatebrowsing.autostart", true);
// -------------------------------------
// Disable memory cache
// capacity: -1=determine dynamically (default), 0=none, n=memory capacity in kibibytes
// user_pref("browser.cache.memory.enable", false);
// user_pref("browser.cache.memory.capacity", 0);
// -------------------------------------
// Disable saving passwords
// user_pref("signon.rememberSignons", false);
// -------------------------------------
// Disable permissions manager from writing to disk [FF41+] [RESTART]
// user_pref("permissions.memory_only", true); // [HIDDEN PREF]
// -------------------------------------
// Disable intermediate certificate caching [FF41+] [RESTART]
// user_pref("security.nocertdb", true); //
// -------------------------------------
// Disable favicons in history and bookmarks
user_pref("browser.chrome.site_icons", true);
// -------------------------------------
// Exclude "Undo Closed Tabs" in Session Restore
// user_pref("browser.sessionstore.max_tabs_undo", 0);
// -------------------------------------
// Disable resuming session from crash
// user_pref("browser.sessionstore.resume_from_crash", false);
// -------------------------------------
// Disable "open with" in download dialog [FF50+]
user_pref("browser.download.forbid_open_with", true);
// -------------------------------------
// Disable location bar suggestion types
// user_pref("browser.urlbar.suggest.history", false);
// user_pref("browser.urlbar.suggest.bookmark", false);
user_pref("browser.urlbar.suggest.openpage", false);
// user_pref("browser.urlbar.suggest.topsites", false); // [FF78+]
user_pref("browser.urlbar.suggest.weather", false);
// -------------------------------------
// Disable location bar dropdown
// user_pref("browser.urlbar.maxRichResults", 0);
// -------------------------------------
// Disable location bar autofill
// user_pref("browser.urlbar.autoFill", false);
// -------------------------------------
// Disable browsing and download history
// user_pref("places.history.enabled", false);
// -------------------------------------
// Disable Windows jumplist [WINDOWS]
// user_pref("browser.taskbar.lists.enabled", false);
// user_pref("browser.taskbar.lists.frequent.enabled", false);
// user_pref("browser.taskbar.lists.recent.enabled", false);
// user_pref("browser.taskbar.lists.tasks.enabled", false);
// -------------------------------------
// Discourage downloading to desktop
// 0=desktop, 1=downloads (default), 2=custom
user_pref("browser.download.folderList", 1);
// -------------------------------------
// Disable Form Autofill
user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
user_pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
// -------------------------------------
// Limit events that can cause a pop-up
// user_pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");
// -------------------------------------
// Disable page thumbnail collection
// user_pref("browser.pagethumbnails.capturing_disabled", true); // [HIDDEN PREF]
// -------------------------------------
// Disable Windows native notifications and use app notications instead [FF111+] [WINDOWS]
// user_pref("alerts.useSystemBackend.windows.notificationserver.enabled", false);
// -------------------------------------
// Disable location bar using search
// user_pref("keyword.enabled", false);
// -------------------------------------
// Force GPU sandboxing (Linux, default on Windows)
// user_pref("security.sandbox.gpu.level", 1);
// -------------------------------------
// Enable Site Isolation
// user_pref("fission.autostart", true);
// user_pref("gfx.webrender.all", true);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// OPTIONAL HARDENING
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable MathML (Mathematical Markup Language) [FF51+]
// user_pref("mathml.disabled", true);
// -------------------------------------
// Disable in-content SVG (Scalable Vector Graphics) [FF53+]
// user_pref("svg.disabled", true);
// -------------------------------------
// Disable graphite
// user_pref("gfx.font_rendering.graphite.enabled", false);
// -------------------------------------
// Disable asm.js [FF22+]
// user_pref("javascript.options.asmjs", false);
// -------------------------------------
// Disable Ion and baseline JIT to harden against JS exploits
// user_pref("javascript.options.ion", false);
// user_pref("javascript.options.baselinejit", false);
// user_pref("javascript.options.jit_trustedprincipals", true); // [FF75+] [HIDDEN PREF]
// -------------------------------------
// Disable WebAssembly [FF52+]
// user_pref("javascript.options.wasm", false);
// -------------------------------------
// Disable rendering of SVG OpenType fonts
// user_pref("gfx.font_rendering.opentype_svg.enabled", false);
// -------------------------------------
// Disable widevine CDM (Content Decryption Module)
// user_pref("media.gmp-widevinecdm.enabled", false);
// -------------------------------------
// Disable all DRM content (EME: Encryption Media Extension)
// user_pref("media.eme.enabled", false);
// user_pref("browser.eme.ui.enabled", false);
// -------------------------------------
// Disable IPv6 if using a VPN
// user_pref("network.dns.disableIPv6", true);
// -------------------------------------
// Control when to send a cross-origin referer
// * 0=always (default), 1=only if base domains match, 2=only if hosts match
// user_pref("network.http.referer.XOriginPolicy", 2);
// -------------------------------------
// Set DoH bootstrap address [FF89+]
// user_pref("network.trr.bootstrapAddr", "10.0.0.1"); // [HIDDEN PREF]
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// DON'T TOUCH
// >>>>>>>>>>>>>>>>>>>>>
//
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
// -------------------------------------
// Enforce no referer spoofing
user_pref("network.http.referer.spoofSource", true); // [DEFAULT: false]
// -------------------------------------
// Enforce a security delay on some confirmation dialogs such as install, open/save
user_pref("security.dialog_enable_delay", 1000); // [DEFAULT: 1000]
// -------------------------------------
// Enforce no First Party Isolation [FF51+]
user_pref("privacy.firstparty.isolate", false); // [DEFAULT: false]
// -------------------------------------
// Enforce SmartBlock shims (about:compat) [FF81+]
user_pref("extensions.webcompat.enable_shims", true); // [HIDDEN PREF] [DEFAULT: true]
// -------------------------------------
// Enforce no TLS 1.0/1.1 downgrades
user_pref("security.tls.version.enable-deprecated", false); // [DEFAULT: false]
// -------------------------------------
// Enforce disabling of Web Compatibility Reporter [FF56+]
user_pref("extensions.webcompat-reporter.enabled", false); // [DEFAULT: false]
// -------------------------------------
// Disable Quarantined Domains [FF115+]
user_pref("extensions.quarantinedDomains.enabled", false); // [DEFAULT: true]
// -------------------------------------
// prefsCleaner: previously active items removed from arkenfox 115-117
// user_pref("accessibility.force_disabled", "");
// user_pref("browser.urlbar.dnsResolveSingleWordsAfterSearch", "");
// user_pref("network.protocol-handler.external.ms-windows-store", "");
// user_pref("privacy.partition.always_partition_third_party_non_cookie_storage", "");
// user_pref("privacy.partition.always_partition_third_party_non_cookie_storage.exempt_sessionstorage", "");
// user_pref("privacy.partition.serviceWorkers", "");
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// DON'T BOTHER
// >>>>>>>>>>>>>>>>>>>>>
//
// Disable APIs
user_pref("geo.enabled", false);
// user_pref("full-screen-api.enabled", false);
// -------------------------------------
// Set default permissions
// 0=always ask (default), 1=allow, 2=block
user_pref("permissions.default.geo", 2);
user_pref("permissions.default.camera", 2);
user_pref("permissions.default.microphone", 2);
user_pref("permissions.default.desktop-notification", 2);
user_pref("permissions.default.xr", 2); // Virtual Reality
// -------------------------------------
// Disable canvas capture stream
// user_pref("canvas.capturestream.enabled", false);
// -------------------------------------
// Disable offscreen canvas
// user_pref("gfx.offscreencanvas.enabled", false);
// -------------------------------------
// Disable non-modern cipher suites
// user_pref("security.ssl3.ecdhe_ecdsa_aes_128_sha", false);
// user_pref("security.ssl3.ecdhe_ecdsa_aes_256_sha", false);
// user_pref("security.ssl3.ecdhe_rsa_aes_128_sha", false);
// user_pref("security.ssl3.ecdhe_rsa_aes_256_sha", false);
// user_pref("security.ssl3.rsa_aes_128_gcm_sha256", false); // no PFS
// user_pref("security.ssl3.rsa_aes_256_gcm_sha384", false); // no PFS
// user_pref("security.ssl3.rsa_aes_128_sha", false); // no PFS
// user_pref("security.ssl3.rsa_aes_256_sha", false); // no PFS
// -------------------------------------
// Control TLS versions
// user_pref("security.tls.version.min", 3); // [DEFAULT: 3]
// user_pref("security.tls.version.max", 4);
// -------------------------------------
// Disable SSL session IDs [FF36+]
// user_pref("security.ssl.disable_session_identifiers", true);
// -------------------------------------
// Onions
// user_pref("dom.securecontext.allowlist_onions", true);
// user_pref("network.http.referer.hideOnionSource", true);
// -------------------------------------
// Referers
// user_pref("network.http.sendRefererHeader", 2);
// user_pref("network.http.referer.trimmingPolicy", 0);
// -------------------------------------
// Set the default Referrer Policy [FF59+]
// 0=no-referer, 1=same-origin, 2=strict-origin-when-cross-origin, 3=no-referrer-when-downgrade
// user_pref("network.http.referer.defaultPolicy", 2); // [DEFAULT: 2]
// user_pref("network.http.referer.defaultPolicy.pbmode", 2); // [DEFAULT: 2]
// -------------------------------------
// Disable HTTP Alternative Services [FF37+]
// user_pref("network.http.altsvc.enabled", false);
// -------------------------------------
// Disable website control over browser right-click context menu
// user_pref("dom.event.contextmenu.enabled", false);
// -------------------------------------
// Disable icon fonts (glyphs) and local fallback rendering
// user_pref("gfx.downloadable_fonts.enabled", false); // [FF41+]
// user_pref("gfx.downloadable_fonts.fallback_delay", -1);
// -------------------------------------
// Disable Clipboard API
// user_pref("dom.event.clipboardevents.enabled", false);
// -------------------------------------
// Disable System Add-on updates
user_pref("extensions.systemAddon.update.enabled", false); // [FF62+]
// user_pref("extensions.systemAddon.update.url", ""); // [FF44+]
// -------------------------------------
// Enable the DNT (Do Not Track) HTTP header
user_pref("privacy.donottrackheader.enabled", false);
// -------------------------------------
// Customize ETP settings
// user_pref("network.cookie.cookieBehavior", 5); // [DEFAULT: 5]
// user_pref("privacy.fingerprintingProtection", true); // [FF114+] [ETP FF119+]
// user_pref("privacy.partition.network_state.ocsp_cache", true); // [DEFAULT: true FF123+]
// user_pref("privacy.query_stripping.enabled", true); // [FF101+]
user_pref("privacy.query_stripping.strip_list", "__hsfp __hssc __hstc __s _hsenc _openstat dclid fbclid gbraid gclid hsCtaTracking igshid mc_eid ml_subscriber ml_subscriber_hash msclkid oft_c oft_ck oft_d oft_id oft_ids oft_k oft_lk oft_sk oly_anon_id oly_enc_id rb_clickid s_cid twclid vero_conv vero_id wbraid wickedid yclid");
// user_pref("network.http.referer.disallowCrossSiteRelaxingDefault", true);
// user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.top_navigation", true); // [FF100+]
// user_pref("privacy.trackingprotection.enabled", true);
// user_pref("privacy.trackingprotection.socialtracking.enabled", true);
// user_pref("privacy.trackingprotection.cryptomining.enabled", true); // [DEFAULT: true]
// user_pref("privacy.trackingprotection.fingerprinting.enabled", true); // [DEFAULT: true]
// -------------------------------------
// Allow embedded tweets and Reddit posts. Don't do it!
// user_pref("urlclassifier.trackingSkipURLs", "*.reddit.com, *.twitter.com, *.twimg.com"); // [HIDDEN PREF]
// user_pref("urlclassifier.features.socialtracking.skipURLs", "*.instagram.com, *.twitter.com, *.twimg.com"); // [HIDDEN PREF]
// -------------------------------------
// Disable service workers
// user_pref("dom.serviceWorkers.enabled", false);
// -------------------------------------
// Disable Web Notifications [FF22+]
// user_pref("dom.webnotifications.enabled", false);
// -------------------------------------
// Disable Push Notifications [FF44+]
user_pref("dom.push.enabled", false);
user_pref("dom.push.connection.enabled", false);
user_pref("dom.push.serverURL", "");
user_pref("dom.push.userAgentID", "");
// -------------------------------------
// Disable WebRTC (Web Real-Time Communication)
// user_pref("media.peerconnection.enabled", false);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// DON'T BOTHER: FINGERPRINTING
// >>>>>>>>>>>>>>>>>>>>>
//
// prefsCleaner: reset items useless for anti-fingerprinting
// user_pref("browser.zoom.siteSpecific", false);
// user_pref("dom.enable_performance", false);
// user_pref("dom.enable_resource_timing", false);
// user_pref("dom.maxHardwareConcurrency", 2);
// user_pref("font.system.whitelist", ""); // [HIDDEN PREF]
// user_pref("general.appname.override", ""); // [HIDDEN PREF]
// user_pref("general.appversion.override", ""); // [HIDDEN PREF]
// user_pref("general.buildID.override", "20181001000000"); // [HIDDEN PREF]
// user_pref("general.oscpu.override", ""); // [HIDDEN PREF]
// user_pref("general.platform.override", ""); // [HIDDEN PREF]
// user_pref("general.useragent.override", "Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0"); // [HIDDEN PREF]
// user_pref("media.ondevicechange.enabled", false);
// user_pref("media.video_stats.enabled", false);
// user_pref("webgl.enable-debug-renderer-info", false);
user_pref("ui.use_standins_for_native_colors", true);
user_pref("browser.display.use_document_fonts", 0);
user_pref("device.sensors.enabled", false);
user_pref("dom.gamepad.enabled", false);
user_pref("dom.netinfo.enabled", false);
user_pref("dom.vibrator.enabled", false);
user_pref("dom.w3c_touch_events.enabled", 0);
user_pref("dom.webaudio.enabled", false);
user_pref("media.navigator.enabled", false);
user_pref("media.webspeech.synth.enabled", false);
// -------------------------------------
// Disable API for measuring text width and height.
user_pref("dom.textMetrics.actualBoundingBox.enabled", false);
user_pref("dom.textMetrics.baselines.enabled", false);
user_pref("dom.textMetrics.emHeight.enabled", false);
user_pref("dom.textMetrics.fontBoundingBox.enabled", false);
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// NON-PROJECT RELATED
// >>>>>>>>>>>>>>>>>>>>>
//
// WELCOME & WHAT'S NEW NOTICES
//
user_pref("browser.startup.homepage_override.mstone", "ignore"); // [HIDDEN PREF]
user_pref("startup.homepage_welcome_url", "");
user_pref("startup.homepage_welcome_url.additional", "");
user_pref("startup.homepage_override_url", ""); // What's New page after updates
//
// WARNINGS
//
user_pref("browser.tabs.warnOnClose", false); // [DEFAULT: false FF94+]
user_pref("browser.tabs.warnOnCloseOtherTabs", false);
user_pref("browser.tabs.warnOnOpen", false);
user_pref("browser.warnOnQuitShortcut", false); // [FF94+]
user_pref("full-screen-api.warning.delay", 0);
user_pref("full-screen-api.warning.timeout", 0);
user_pref("browser.warnOnQuit", false);
//
// UPDATES
//
// Disable auto-INSTALLING Firefox updates [NON-WINDOWS]
user_pref("app.update.auto", false);
// -------------------------------------
// Disable auto-CHECKING for extension and theme updates
user_pref("extensions.update.enabled", false);
// -------------------------------------
// Disable auto-INSTALLING extension and theme updates
user_pref("extensions.update.autoUpdateDefault", false);
// -------------------------------------
// Disable extension metadata
user_pref("extensions.getAddons.cache.enabled", false);
// -------------------------------------
// Disable search engine updates (e.g. OpenSearch)
user_pref("browser.search.update", false);
//
// CONTENT BEHAVIOR
//
user_pref("accessibility.typeaheadfind", false); // enable "Find As You Type"
// user_pref("clipboard.autocopy", false); // disable autocopy default [LINUX]
user_pref("layout.spellcheckDefault", 1); // 0=none, 1-multi-line, 2=multi-line & single-line
//
// FIREFOX HOME CONTENT
//
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false); // Recommended by Pocket
user_pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);
// user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
// user_pref("browser.newtabpage.activity-stream.showSearch", false);
// user_pref("browser.newtabpage.activity-stream.section.highlights.includeBookmarks", false);
// user_pref("browser.newtabpage.activity-stream.section.highlights.includeDownloads", false);
// user_pref("browser.newtabpage.activity-stream.section.highlights.includeVisited", false);
//
// UX FEATURES
//
user_pref("extensions.pocket.enabled", false); // Pocket Account [FF46+]
user_pref("extensions.screenshots.disabled", true); // [FF55+]
user_pref("identity.fxaccounts.enabled", false); // Firefox Accounts & Sync [FF60+] [RESTART]
user_pref("reader.parse-on-load.enabled", false); // Reader View
user_pref("browser.tabs.firefox-view", false); // Firefox-view
//
// OTHER
//
// user_pref("browser.bookmarks.max_backups", 2);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false); // disable CFR [FF67+]
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false); // disable CFR [FF67+]
user_pref("browser.messaging-system.whatsNewPanel.enabled", false); // What's New toolbar icon [FF69+]
user_pref("browser.urlbar.showSearchTerms.enabled", false);
user_pref("browser.sessionstore.interval", 30000); // minimum interval between session save operations
user_pref("network.manage-offline-status", false);
user_pref("browser.preferences.moreFromMozilla", false);
user_pref("browser.disableResetPrompt", true); // [HIDDEN PREF]
// user_pref("xpinstall.signatures.required", false); // enforced extension signing (Nightly/ESR)
//
// MORE
//
// user_pref("security.insecure_connection_icon.enabled", ""); // [DEFAULT: true FF70+]
// user_pref("security.mixed_content.block_active_content", ""); // [DEFAULT: true since at least FF60]
user_pref("security.ssl.enable_ocsp_stapling", false); // [DEFAULT: true FF26+]
// user_pref("webgl.disable-fail-if-major-performance-caveat", ""); // [DEFAULT: true FF86+]
// user_pref("webgl.enable-webgl2", false);
// user_pref("webgl.min_capability_mode", "");
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// DEPRECATED / RENAMED
// >>>>>>>>>>>>>>>>>>>>>
//
// ESR115.x still uses all the following prefs
//
// FF116
//
// Set RFP's font visibility level [FF94+]
// user_pref("layout.css.font-visibility.resistFingerprinting", 1); // [DEFAULT: 1]
//
// FF117
//
// Disable Windows Microsoft Family Safety cert [FF50+] [WINDOWS]
user_pref("security.family_safety.mode", 0);
// -------------------------------------
// Disable service worker Web Notifications [FF44+]
// user_pref("dom.webnotifications.serviceworker.enabled", false);
//
// FF118
//
// Limit font visibility (Windows, Mac, some Linux) [FF94+]
// user_pref("layout.css.font-visibility.private", 1);
// user_pref("layout.css.font-visibility.standard", 1);
// user_pref("layout.css.font-visibility.trackingprotection", 1);
// -------------------------------------
// Disable permissions delegation [FF73+]
// user_pref("permissions.delegation.enabled", false);
//
// FF119
//
// Use en-US locale regardless of the system or region locale
// user_pref("javascript.use_us_english_locale", true); // [HIDDEN PREF]
// -------------------------------------
// Disable skipping DoH when parental controls are enabled [FF70+]
user_pref("network.dns.skipTRR-when-parental-control-enabled", false);
//

/****************************************************************************
 * Betterfox                                                                *
 * "Ad meliora"                                                             *
 * version: 122.1                                                           *
 * url: https://github.com/yokoffing/Betterfox                              *
****************************************************************************/

/****************************************************************************
 * SECTION: FASTFOX                                                         *
****************************************************************************/
/** GENERAL ***/
user_pref("content.notify.interval", 100000);

/** GFX ***/
user_pref("gfx.canvas.accelerated.cache-items", 4096);
user_pref("gfx.canvas.accelerated.cache-size", 512);
user_pref("gfx.content.skia-font-cache-size", 20);

/** DISK CACHE ***/
user_pref("browser.cache.jsbc_compression_level", 3);

/** MEDIA CACHE ***/
user_pref("media.memory_cache_max_size", 65536);
user_pref("media.cache_readahead_limit", 7200);
user_pref("media.cache_resume_threshold", 3600);

/** IMAGE CACHE ***/
user_pref("image.mem.decode_bytes_at_a_time", 32768);

/** NETWORK ***/
user_pref("network.http.max-connections", 1800);
user_pref("network.http.max-persistent-connections-per-server", 10);
user_pref("network.http.max-urgent-start-excessive-connections-per-host", 5);
user_pref("network.http.pacing.requests.enabled", false);
user_pref("network.dnsCacheExpiration", 3600);
user_pref("network.dns.max_high_priority_threads", 8);
user_pref("network.ssl_tokens_cache_capacity", 10240);

/** SPECULATIVE LOADING ***/
// user_pref("network.dns.disablePrefetch", true);
// user_pref("network.prefetch-next", false);
//user_pref("network.predictor.enabled", false);

/** EXPERIMENTAL ***/
user_pref("layout.css.grid-template-masonry-value.enabled", true);
user_pref("dom.enable_web_task_scheduling", true);
user_pref("layout.css.has-selector.enabled", true);
user_pref("dom.security.sanitizer.enabled", true);

/****************************************************************************
 * SECTION: SECUREFOX                                                       *
****************************************************************************/
/** TRACKING PROTECTION ***/
user_pref("browser.contentblocking.category", "strict");
// user_pref("urlclassifier.trackingSkipURLs", "*.reddit.com, *.twitter.com, *.twimg.com, *.tiktok.com");
// user_pref("urlclassifier.features.socialtracking.skipURLs", "*.instagram.com, *.twitter.com, *.twimg.com");
user_pref("network.cookie.sameSite.noneRequiresSecure", true);
// user_pref("browser.download.start_downloads_in_tmp_dir", true);
user_pref("browser.helperApps.deleteTempFileOnExit", true);
user_pref("browser.uitour.enabled", false);
user_pref("privacy.globalprivacycontrol.enabled", true);

/** OCSP & CERTS / HPKP ***/
user_pref("security.OCSP.enabled", 0);
// user_pref("security.remote_settings.crlite_filters.enabled", true);
// user_pref("security.pki.crlite_mode", 2);

/** SSL / TLS ***/
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
user_pref("browser.xul.error_pages.expert_bad_cert", true);
user_pref("security.tls.enable_0rtt_data", false);

/** DISK AVOIDANCE ***/
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true);
// user_pref("browser.sessionstore.interval", 60000);

/** SHUTDOWN & SANITIZING ***/
// user_pref("privacy.history.custom", true);

/** SEARCH / URL BAR ***/
// user_pref("browser.search.separatePrivateDefault.ui.enabled", true);
user_pref("browser.urlbar.update2.engineAliasRefresh", true);
// user_pref("browser.search.suggest.enabled", false);
// user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
// user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
// user_pref("browser.formfill.enable", false);
user_pref("security.insecure_connection_text.enabled", true);
user_pref("security.insecure_connection_text.pbmode.enabled", true);
user_pref("network.IDN_show_punycode", true);

/** HTTPS-FIRST POLICY ***/
user_pref("dom.security.https_first", true);
user_pref("dom.security.https_first_schemeless", true);

/** PASSWORDS ***/
user_pref("signon.formlessCapture.enabled", false);
user_pref("signon.privateBrowsingCapture.enabled", true);
user_pref("network.auth.subresource-http-auth-allow", 1);
user_pref("editor.truncate_user_pastes", false);

/** MIXED CONTENT + CROSS-SITE ***/
user_pref("security.mixed_content.block_display_content", true);
user_pref("security.mixed_content.upgrade_display_content", true);
user_pref("security.mixed_content.upgrade_display_content.image", true);
user_pref("pdfjs.enableScripting", false);
user_pref("extensions.postDownloadThirdPartyPrompt", false);

/** HEADERS / REFERERS ***/
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);

/** CONTAINERS ***/
user_pref("privacy.userContext.ui.enabled", true);

/** WEBRTC ***/
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);
user_pref("media.peerconnection.ice.default_address_only", true);

/** SAFE BROWSING ***/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);

/** MOZILLA ***/
user_pref("permissions.default.desktop-notification", 2);
user_pref("permissions.default.geo", 2);
// user_pref("geo.provider.network.url", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");
user_pref("permissions.manager.defaultsUrl", "");
user_pref("webchannel.allowObject.urlWhitelist", "");

/** TELEMETRY ***/
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true);
user_pref("toolkit.coverage.opt-out", true);
user_pref("toolkit.coverage.endpoint.base", "");
user_pref("browser.ping-centre.telemetry", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);

/** EXPERIMENTS ***/
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

/** CRASH REPORTS ***/
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false);

/** DETECTION ***/
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false);
user_pref("network.connectivity-service.enabled", false);

/****************************************************************************
 * SECTION: PESKYFOX                                                        *
****************************************************************************/
/** MOZILLA UI ***/
user_pref("browser.privatebrowsing.vpnpromourl", "");
user_pref("extensions.getAddons.showPane", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
// user_pref("browser.discovery.enabled", false);
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.preferences.moreFromMozilla", false);
// user_pref("browser.tabs.tabmanager.enabled", false);
user_pref("browser.aboutConfig.showWarning", false);
user_pref("browser.aboutwelcome.enabled", false);

/** THEME ADJUSTMENTS ***/
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
// user_pref("browser.compactmode.show", true);
user_pref("browser.display.focus_ring_on_anything", true);
user_pref("browser.display.focus_ring_style", 0);
user_pref("browser.display.focus_ring_width", 0);
user_pref("layout.css.prefers-color-scheme.content-override", 2);
user_pref("browser.privateWindowSeparation.enabled", false); // WINDOWS

/** COOKIE BANNER HANDLING ***/
user_pref("cookiebanners.service.mode", 2);
user_pref("cookiebanners.service.mode.privateBrowsing", 2);

/** FULLSCREEN NOTICE ***/
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");
user_pref("full-screen-api.warning.delay", -1);
user_pref("full-screen-api.warning.timeout", 0);

/** URL BAR ***/
user_pref("browser.urlbar.suggest.calculator", true);
user_pref("browser.urlbar.unitConversion.enabled", true);
user_pref("browser.urlbar.trending.featureGate", false);

/** NEW TAB PAGE ***/
// user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);

/** POCKET ***/
user_pref("extensions.pocket.enabled", false);

/** DOWNLOADS ***/
user_pref("browser.download.always_ask_before_handling_new_types", false);
user_pref("browser.download.manager.addToRecentDocs", false);

/** PDF ***/
user_pref("browser.download.open_pdf_attachments_inline", true);

/** TAB BEHAVIOR ***/
user_pref("browser.bookmarks.openInTabClosesMenu", false);
user_pref("browser.menu.showViewImageInfo", true);
user_pref("findbar.highlightAll", true);
user_pref("layout.word_select.eat_space_to_next_word", false);

/****************************************************************************
 * SECTION: SMOOTHFOX                                                       *
****************************************************************************/
// only sharpen scrolling
user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("mousewheel.min_line_scroll_amount", 10); // 10-40; adjust this number to your liking; default=5
user_pref("general.smoothScroll.mouseWheel.durationMinMS", 80); // default=50
user_pref("general.smoothScroll.currentVelocityWeighting", "0.15"); // default=.25
user_pref("general.smoothScroll.stopDecelerationWeighting", "0.6"); // default=.4
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
/****************************************************************************
 * END: BETTERFOX                                                           *
****************************************************************************/

// ------------------------ Personal Config  ---------------------------------
// user_pref("browser.bookmarks.addedImportButton", true);
user_pref("browser.display.use_document_fonts", 1);
user_pref("browser.fullscreen.autohide", true);
user_pref("browser.newtabpage.activity-stream.feeds.section.highlights", true);
user_pref("browser.newtabpage.activity-stream.logowordmark.alwaysVisible", false);
user_pref("browser.search.suggest.enabled.private", true);
user_pref("browser.theme.dark-private-windows", false);
// user_pref("browser.toolbars.bookmarks.visibility", "newtab");
user_pref("browser.translations.panelShown", false);
user_pref("browser.urlbar.suggest.addons", false);
user_pref("browser.urlbar.suggest.mdn", false);
user_pref("browser.urlbar.suggest.pocket", false)
user_pref("browser.urlbar.suggest.treading", false);
user_pref("browser.urlbar.suggest.yelp", false);
user_pref("browser.urlbar.trimHttps", true);
user_pref("font.default.x-western", "sans-serif");
// user_pref("font.name-list.monospace.zh-CN, "PT Mono");
user_pref("font.name.monospace.x-western", "Monaco");
user_pref("font.name.monospace.zh-CN", "Monaco");
user_pref("font.name.monospace.zh-HK", "Monaco");
user_pref("font.name.monospace.zh-TW", "Monaco");
user_pref("font.name.sans-serif.x-western", "Lucida Grande");
user_pref("font.name.sans-serif.zh-CN", "Hiragino Sans GB");
user_pref("font.name.sans-serif.zh-HK", "Hiragino Sans");
user_pref("font.name.sans-serif.zh-TW", "Hiragino Sans");
user_pref("font.name.serif.x-western", "Georgia");
user_pref("font.name.serif.zh-CN", "PT Serif");
user_pref("font.name.serif.zh-HK", "PT Serif");
user_pref("font.name.serif.zh-TW", "PT Serif");
user_pref("general.autoScroll", false);
user_pref("media.autoplay.default", 5);
user_pref("signon.firefoxRelay.feature", "disabled");
user_pref("toolkit.telemetry.pioneer-new-studies-available", false);
user_pref("widget.macos.native-context-menus", true);
// ---------------------------------------------------------

// ** Theme Default Options ****************************************************
// userchrome.css usercontent.css activate
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Fill SVG Color
user_pref("svg.context-properties.content.enabled", true);

// Restore Compact Mode - 89 Above
user_pref("browser.compactmode.show", true);

// about:home Search Bar - 89 Above
user_pref("browser.newtabpage.activity-stream.improvesearch.handoffToAwesomebar", false);

// CSS's `:has()` selector #457 - 103 Above
user_pref("layout.css.has-selector.enabled", true);

// Browser Theme Based Scheme - Will be activate 95 Above
// user_pref("layout.css.prefers-color-scheme.content-override", 3);

// ** Theme Related Options ****************************************************
// == Theme Distribution Settings ==============================================
// The rows that are located continuously must be changed `true`/`false` explicitly because there is a collision.
// https://github.com/black7375/Firefox-UI-Fix/wiki/Options#important
user_pref("userChrome.tab.connect_to_window",         false); // Original, Photon
user_pref("userChrome.tab.color_like_toolbar",        false); // Original, Photon

user_pref("userChrome.tab.lepton_like_padding",       false); // Original
user_pref("userChrome.tab.photon_like_padding",       false); // Photon

user_pref("userChrome.tab.dynamic_separator",          true); // Original, Proton
user_pref("userChrome.tab.static_separator",          false); // Photon
user_pref("userChrome.tab.static_separator.selected_accent", false); // Just option
user_pref("userChrome.tab.bar_separator",             false); // Just option

user_pref("userChrome.tab.newtab_button_like_tab",    false); // Original
user_pref("userChrome.tab.newtab_button_smaller",     false); // Photon
user_pref("userChrome.tab.newtab_button_proton",       true); // Proton

user_pref("userChrome.icon.panel_full",                true); // Original, Proton
user_pref("userChrome.icon.panel_photon",             false); // Photon

// Original Only
user_pref("userChrome.tab.box_shadow",                false);
user_pref("userChrome.tab.bottom_rounded_corner",     false);

// Photon Only
user_pref("userChrome.tab.photon_like_contextline",   false);
user_pref("userChrome.rounding.square_tab",           false);

// == Theme Compatibility Settings =============================================
// user_pref("userChrome.compatibility.accent_color",         true); // Firefox v103 Below
// user_pref("userChrome.compatibility.covered_header_image", true);
// user_pref("userChrome.compatibility.panel_cutoff",         true);
// user_pref("userChrome.compatibility.navbar_top_border",    true);
// user_pref("userChrome.compatibility.dynamic_separator",    true); // Need dynamic_separator

// user_pref("userChrome.compatibility.os.linux_non_native_titlebar_button", true);
// user_pref("userChrome.compatibility.os.windows_maximized", true);
// user_pref("userChrome.compatibility.os.win11",             true);

// == Theme Custom Settings ====================================================
// -- User Chrome --------------------------------------------------------------
// user_pref("userChrome.theme.private",                       true);
// user_pref("userChrome.theme.proton_color.dark_blue_accent", true);
user_pref("userChrome.theme.monospace",                     true);
// user_pref("userChrome.theme.transparent.frame",             true);
// user_pref("userChrome.theme.transparent.menu",              true);
// user_pref("userChrome.theme.transparent.panel",             true);
// user_pref("userChrome.theme.non_native_menu",               true); // only for linux

// user_pref("userChrome.decoration.disable_panel_animate",    true);
// user_pref("userChrome.decoration.disable_sidebar_animate",  true);
// user_pref("userChrome.decoration.panel_button_separator",   true);
// user_pref("userChrome.decoration.panel_arrow",              true);

// user_pref("userChrome.autohide.tab",                        true);
// user_pref("userChrome.autohide.tab.opacity",                true);
// user_pref("userChrome.autohide.tab.blur",                   true);
// user_pref("userChrome.autohide.tabbar",                     true);
user_pref("userChrome.autohide.navbar",                     true);
user_pref("userChrome.autohide.bookmarkbar",                true);
// user_pref("userChrome.autohide.sidebar",                    true);
// user_pref("userChrome.autohide.fill_urlbar",                true);
// user_pref("userChrome.autohide.back_button",                true);
// user_pref("userChrome.autohide.forward_button",             true);
// user_pref("userChrome.autohide.page_action",                true);
// user_pref("userChrome.autohide.toolbar_overlap",            true);
// user_pref("userChrome.autohide.toolbar_overlap.allow_layout_shift", true);

// user_pref("userChrome.hidden.tab_icon",                     true);
// user_pref("userChrome.hidden.tab_icon.always",              true);
user_pref("userChrome.hidden.tabbar",                       true);
// user_pref("userChrome.hidden.navbar",                       true);
// user_pref("userChrome.hidden.private_indicator",            true);
user_pref("userChrome.hidden.titlebar_container",           true);
user_pref("userChrome.hidden.sidebar_header",               true);
// user_pref("userChrome.hidden.sidebar_header.vertical_tab_only", true);
// user_pref("userChrome.hidden.urlbar_iconbox",               true);
// user_pref("userChrome.hidden.urlbar_iconbox.label_only",    true);
// user_pref("userChrome.hidden.bookmarkbar_icon",             true);
// user_pref("userChrome.hidden.bookmarkbar_label",            true);
// user_pref("userChrome.hidden.disabled_menu",                true);

// user_pref("userChrome.centered.tab",                        true);
// user_pref("userChrome.centered.tab.label",                  true);
// user_pref("userChrome.centered.urlbar",                     true);
user_pref("userChrome.centered.bookmarkbar",                true);

// user_pref("userChrome.counter.tab",                         true);
// user_pref("userChrome.counter.bookmark_menu",               true);

// user_pref("userChrome.combined.nav_button",                 true);
// user_pref("userChrome.combined.nav_button.home_button",     true);
// user_pref("userChrome.combined.urlbar.nav_button",          true);
// user_pref("userChrome.combined.urlbar.home_button",         true);
// user_pref("userChrome.combined.urlbar.reload_button",       true);
// user_pref("userChrome.combined.sub_button.none_background", true);
// user_pref("userChrome.combined.sub_button.as_normal",       true);

// user_pref("userChrome.rounding.square_button",              true);
// user_pref("userChrome.rounding.square_dialog",              true);
// user_pref("userChrome.rounding.square_panel",               true);
// user_pref("userChrome.rounding.square_panelitem",           true);
// user_pref("userChrome.rounding.square_menupopup",           true);
// user_pref("userChrome.rounding.square_menuitem",            true);
// user_pref("userChrome.rounding.square_infobox",             true);
// user_pref("userChrome.rounding.square_toolbar",             true);
// user_pref("userChrome.rounding.square_field",               true);
// user_pref("userChrome.rounding.square_urlView_item",        true);
// user_pref("userChrome.rounding.square_checklabel",          true);

// user_pref("userChrome.padding.first_tab",                   true);
// user_pref("userChrome.padding.first_tab.always",            true);
// user_pref("userChrome.padding.drag_space",                  true);
// user_pref("userChrome.padding.drag_space.maximized",        true);

// user_pref("userChrome.padding.toolbar_button.compact",      true);
// user_pref("userChrome.padding.menu_compact",                true);
// user_pref("userChrome.padding.bookmark_menu.compact",       true);
// user_pref("userChrome.padding.urlView_expanding",           true);
// user_pref("userChrome.padding.urlView_result",              true);
// user_pref("userChrome.padding.panel_header",                true);

// user_pref("userChrome.urlbar.iconbox_with_separator",       true);

// user_pref("userChrome.urlView.as_commandbar",               true);
// user_pref("userChrome.urlView.full_width_padding",          true);
// user_pref("userChrome.urlView.always_show_page_actions",    true);
// user_pref("userChrome.urlView.move_icon_to_left",           true);
// user_pref("userChrome.urlView.go_button_when_typing",       true);
// user_pref("userChrome.urlView.focus_item_border",           true);

// user_pref("userChrome.tabbar.as_titlebar",                  true);
// user_pref("userChrome.tabbar.fill_width",                   true);
// user_pref("userChrome.tabbar.multi_row",                    true);
// user_pref("userChrome.tabbar.unscroll",                     true);
// user_pref("userChrome.tabbar.on_bottom",                    true);
// user_pref("userChrome.tabbar.on_bottom.above_bookmark",     true); // Need on_bottom
// user_pref("userChrome.tabbar.on_bottom.menubar_on_top",     true); // Need on_bottom
// user_pref("userChrome.tabbar.on_bottom.hidden_single_tab",  true); // Need on_bottom
// user_pref("userChrome.tabbar.one_liner",                    true);
// user_pref("userChrome.tabbar.one_liner.combine_navbar",     true); // Need one_liner
// user_pref("userChrome.tabbar.one_liner.tabbar_first",       true); // Need one_liner
// user_pref("userChrome.tabbar.one_liner.responsive",         true); // Need one_liner

// user_pref("userChrome.tab.bottom_rounded_corner.all",       true);
// user_pref("userChrome.tab.bottom_rounded_corner.australis", true);
// user_pref("userChrome.tab.bottom_rounded_corner.edge",      true);
// user_pref("userChrome.tab.bottom_rounded_corner.chrome",    true);
// user_pref("userChrome.tab.bottom_rounded_corner.chrome_legacy", true);
// user_pref("userChrome.tab.bottom_rounded_corner.wave",      true);
// user_pref("userChrome.tab.always_show_tab_icon",            true);
// user_pref("userChrome.tab.close_button_at_pinned",          true);
// user_pref("userChrome.tab.close_button_at_pinned.always",   true);
// user_pref("userChrome.tab.close_button_at_pinned.background", true);
// user_pref("userChrome.tab.close_button_at_hover.always",    true); // Need close_button_at_hover
// user_pref("userChrome.tab.close_button_at_hover.with_selected", true);  // Need close_button_at_hover
// user_pref("userChrome.tab.sound_show_label",                true); // Need remove sound_hide_label
// user_pref("userChrome.tab.container.on_top",                true);
// user_pref("userChrome.tab.sound_with_favicons.on_center",   true);
// user_pref("userChrome.tab.selected_bold",                   true);

// user_pref("userChrome.navbar.as_sidebar",                   true);

// user_pref("userChrome.bookmarkbar.multi_row",               true);

// user_pref("userChrome.findbar.floating_on_top",             true);

// user_pref("userChrome.panel.remove_strip",                  true);
// user_pref("userChrome.panel.full_width_separator",          true);
// user_pref("userChrome.panel.full_width_padding",            true);

// user_pref("userChrome.sidebar.overlap",                     true);

// user_pref("userChrome.icon.disabled",                       true);
// user_pref("userChrome.icon.account_image_to_right",         true);
// user_pref("userChrome.icon.account_label_to_right",         true);
// user_pref("userChrome.icon.menu.full",                      true);
// user_pref("userChrome.icon.global_menu.mac",                true);

// -- User Content -------------------------------------------------------------
// user_pref("userContent.player.ui.twoline",                  true);

// user_pref("userContent.newTab.hidden_logo",                 true);
// user_pref("userContent.newTab.background_image",            true); // Need wallpaper image to `userContent.css`. :root { --uc-newTab-wallpaper: url("../icons/background_image.png"); }

// user_pref("userContent.page.proton_color.dark_blue_accent", true);
// user_pref("userContent.page.proton_color.system_accent",    true);
// user_pref("userContent.page.dark_mode.pdf",                 true);
// user_pref("userContent.page.monospace",                     true);

// == Theme Default Settings ===================================================
// -- User Chrome --------------------------------------------------------------
user_pref("userChrome.compatibility.theme",       true);
user_pref("userChrome.compatibility.os",          true);

user_pref("userChrome.theme.built_in_contrast",   true);
user_pref("userChrome.theme.system_default",      true);
user_pref("userChrome.theme.proton_color",        true);
user_pref("userChrome.theme.proton_chrome",       true); // Need proton_color
user_pref("userChrome.theme.fully_color",         true); // Need proton_color
user_pref("userChrome.theme.fully_dark",          true); // Need proton_color

user_pref("userChrome.decoration.cursor",         true);
user_pref("userChrome.decoration.field_border",   true);
user_pref("userChrome.decoration.download_panel", true);
user_pref("userChrome.decoration.animate",        true);

user_pref("userChrome.padding.tabbar_width",      true);
user_pref("userChrome.padding.tabbar_height",     true);
user_pref("userChrome.padding.toolbar_button",    true);
user_pref("userChrome.padding.navbar_width",      true);
user_pref("userChrome.padding.urlbar",            true);
user_pref("userChrome.padding.bookmarkbar",       true);
user_pref("userChrome.padding.infobar",           true);
user_pref("userChrome.padding.menu",              true);
user_pref("userChrome.padding.bookmark_menu",     true);
user_pref("userChrome.padding.global_menubar",    true);
user_pref("userChrome.padding.panel",             true);
user_pref("userChrome.padding.popup_panel",       true);

user_pref("userChrome.tab.multi_selected",        true);
user_pref("userChrome.tab.unloaded",              true);
user_pref("userChrome.tab.letters_cleary",        true);
user_pref("userChrome.tab.close_button_at_hover", true);
user_pref("userChrome.tab.sound_hide_label",      true);
user_pref("userChrome.tab.sound_with_favicons",   true);
user_pref("userChrome.tab.pip",                   true);
user_pref("userChrome.tab.container",             true);
user_pref("userChrome.tab.crashed",               true);

user_pref("userChrome.fullscreen.overlap",        true);
user_pref("userChrome.fullscreen.show_bookmarkbar", true);

user_pref("userChrome.icon.library",              true);
user_pref("userChrome.icon.panel",                true);
user_pref("userChrome.icon.menu",                 true);
user_pref("userChrome.icon.context_menu",         true);
user_pref("userChrome.icon.global_menu",          true);
user_pref("userChrome.icon.global_menubar",       true);
user_pref("userChrome.icon.1-25px_stroke",        true);

// -- User Content -------------------------------------------------------------
user_pref("userContent.player.ui",             true);
user_pref("userContent.player.icon",           true);
user_pref("userContent.player.noaudio",        true);
user_pref("userContent.player.size",           true);
user_pref("userContent.player.click_to_play",  true);
user_pref("userContent.player.animate",        true);

user_pref("userContent.newTab.full_icon",      true);
user_pref("userContent.newTab.animate",        true);
user_pref("userContent.newTab.pocket_to_last", true);
user_pref("userContent.newTab.searchbar",      true);

user_pref("userContent.page.field_border",     true);
user_pref("userContent.page.illustration",     true);
user_pref("userContent.page.proton_color",     true);
user_pref("userContent.page.dark_mode",        true); // Need proton_color
user_pref("userContent.page.proton",           true); // Need proton_color

// ** Useful Options ***********************************************************
// Tab preview
// https://blog.nightly.mozilla.org/2024/02/06/a-preview-of-tab-previews-these-weeks-in-firefox-issue-153/
// user_pref("browser.tabs.cardPreview.enabled",   true);

// Paste suggestion at urlbar
// https://blog.nightly.mozilla.org/2023/12/04/url-gonna-want-to-check-this-out-these-weeks-in-firefox-issue-150/
user_pref("browser.urlbar.clipboard.featureGate", true);

// Integrated calculator at urlbar
user_pref("browser.urlbar.suggest.calculator", true);

// Integrated unit convertor at urlbar
// user_pref("browser.urlbar.unitConversion.enabled", true);

// Draw in Titlebar
// user_pref("browser.tabs.drawInTitlebar", true);
// user_pref("browser.tabs.inTitlebar",        1); // Nightly, 96 Above

// Searchbar, Removed from settings starting with FF v122
// user_pref("browser.search.widget.inNavBar",    true);

// Firefox view search
// https://blog.nightly.mozilla.org/2023/12/14/better-searching-in-firefox-to-close-out-2023-these-weeks-in-firefox-issue-151/
// user_pref("browser.firefox-view.search.enabled",       true);
// user_pref("browser.firefox-view.virtual-list.enabled", true);

// Firefox screenshot
// https://blog.nightly.mozilla.org/2024/01/22/happy-new-year-these-weeks-in-firefox-issue-152/
// user_pref("screenshots.browser.component.enabled", true);
