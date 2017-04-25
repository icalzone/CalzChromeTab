/*eslint no-unused-vars: 0*/
/*global chrome fetchBackground*/

// chrome.storage.sync.clear();
// chrome.storage.local.clear();

chrome.storage.sync.get("settings", function (obj) {
    if (obj.settings === undefined) {
        var defaultSettings = {
            "weatherService": "wunderground",
            "photoService": "pixabay",
            "pixabaySearchTerm": "landscape",
            "pixabaySafeSearch": true,
            "currentPhoto": "../images/initial_bg.jpg",
            "weatherLastCall": "",
            "photoLastCall": ""
        };
        chrome.storage.sync.set({
            'settings': defaultSettings
        }, function () {
            initialize(defaultSettings);
        });
    } else {
        initialize(obj.settings);
    }
});

$(function () {
    $("#go-to-options").click(function () {
        chrome.runtime.openOptionsPage();
    });

    $("#topActionBar a").click(function (e) {
        e.preventDefault();
        var cmd = $(this).attr("href");
        chrome.runtime.sendMessage({
            type: cmd
        });
    });
});

function initialize(settings) {
    // console.dir(settings);

    startTime();
    randomQuote();

    randomBackground(settings);
    fetchWeather(settings);

    $("#srchImgBx i").hide();

    if (getCookie("opSrchBx") === "") {
        setCookie("opSrchBx", "google", 365);
    }
    makeSearchBox(getCookie("opSrchBx"));

    styleOpacity(500, "bottomLinksCntnr", 0.6);

    // var settings_dialog = document.getElementById('settings_dialog');
    // var confirm_settings = document.getElementById('confirm_settings');
    // var blur_overlay = document.getElementById('blur_overlay');
    // var dim_overlay = document.getElementById('dim_overlay');
    // var search_term = document.getElementById('search_term');
    // var safe_search = document.getElementById('safe_search');
    // var weather_service = document.getElementById('weather_service');

    // document.getElementById('settings_link').onclick = function () {
    //     blur_overlay.style.backgroundImage = 'url("' + settings.currentPhoto + '")';
    //     dim_overlay.style.display = 'block';
    //     blur_overlay.style.display = 'block';
    //     settings_dialog.style.display = 'block';
    //     safe_search.checked = settings.safeSearch;
    //     search_term.value = settings.searchTerm;
    //     $("#weather_service").val(settings.weatherservice);
    //     search_term.focus();
    //     return false;
    // };
    // document.getElementById('cancel_settings').onclick = document.getElementById('dim_overlay').onclick = function () {
    //     dim_overlay.style.display = 'none';
    //     blur_overlay.style.display = 'none';
    //     settings_dialog.style.display = 'none';
    // };
    // search_term.onkeypress = function (e) {
    //     if (e.keyCode == 13) confirm_settings.click();
    // };
    // confirm_settings.onclick = function () {
    //     dim_overlay.style.display = 'none';
    //     blur_overlay.style.display = 'none';
    //     settings_dialog.style.display = 'none';
    //     // localStorage['settings'] = JSON.stringify({
    //     //     'searchTerm': search_term.value,
    //     //     'safeSearch': safe_search.checked,
    //     //     'weatherservice': $("#weather_service").val()
    //     // });
    //     fetchWeather(true);
    //     fetchBackground(true);
    // };
}