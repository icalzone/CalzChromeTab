# CalzChromeTab






{
  "manifest_version": 2,
  "name": "Calz Tab 2017",
  "description": "My custom new tab page.",
  "homepage_url": "https://www.ellzzoo.com/",
  "version": "0.1",
  "icons": {
    "48": "images/tiger48.png",
    "128": "images/tiger128.png"
  },
  "page_action": {
    "default_icon": "images/tiger19.png"
  },
  "background": {
    "persistent": false,
    "scripts": ["js/events.js"]
  },
  "chrome_url_overrides": {
    "newtab": "index.html"
  },
  "permissions": ["storage", "bookmarks", "history", "tabs"],
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["js/jquery-3.1.1.min.js", "js/init.js"]
  }]
}
// "permissions": ["storage", "<all_urls>", "topSites", "management", "unlimitedStorage", "bookmarks", "tabs", "sessions", "history", "activeTab"],
// "content_security_policy" : "script-src 'self' 'unsafe-inline'; object-src 'self'"