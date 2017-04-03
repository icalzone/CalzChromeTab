/*global chrome*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "openHistory":
          showHistory();
        break;
        case "openBookmarks":
          showBookmarks();
        break;
        case "openDownloads":
          showDownloads();
        break;
        case "openSettings":
          showSettings();
        break;
      }
    return true;
});
var showHistory = function() {
    chrome.tabs.create({'url': 'chrome://history'});
}
var showBookmarks = function() {
    chrome.tabs.create({'url': 'chrome://bookmarks'});
}
var showDownloads = function() {
    chrome.tabs.create({'url': 'chrome://downloads'});
}
var showSettings = function() {
    chrome.tabs.create({'url': 'chrome://settings'});
}