// chrome.storage.sync.clear();

chrome.storage.sync.get("settings", function (obj) {
    var d = new Date();
    var time = d.getTime();

    if (obj.settings === undefined) {
        var defaultSettings = {
            "weatherservice": "openweathermap",
            "searchTerm": "landscape",
            "safeSearch": "true",
            "currentPhoto": "../images/initial_bg.jpg",
            "weatherLastCall": time
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

function initialize(settings) {
    console.dir(settings);

    $("#srchImgBx i").hide();

    fetchBackground(settings, 'pixabay', window.innerWidth);

    var settings_dialog = document.getElementById('settings_dialog');
    var confirm_settings = document.getElementById('confirm_settings');
    var blur_overlay = document.getElementById('blur_overlay');
    var dim_overlay = document.getElementById('dim_overlay');
    var search_term = document.getElementById('search_term');
    var safe_search = document.getElementById('safe_search');
    var weather_service = document.getElementById('weather_service');

    document.getElementById('settings_link').onclick = function () {
        blur_overlay.style.backgroundImage = 'url("' + settings.currentPhoto + '")';
        dim_overlay.style.display = 'block';
        blur_overlay.style.display = 'block';
        settings_dialog.style.display = 'block';
        safe_search.checked = settings.safeSearch;
        search_term.value = settings.searchTerm;
        $("#weather_service").val(settings.weatherservice);
        search_term.focus();
        return false;
    };
    document.getElementById('cancel_settings').onclick = document.getElementById('dim_overlay').onclick = function () {
        dim_overlay.style.display = 'none';
        blur_overlay.style.display = 'none';
        settings_dialog.style.display = 'none';
    };

    if (getCookie("opSrchBx") === "") {
        setCookie("opSrchBx", "google", 365);
    }
    makeSearchBox(getCookie("opSrchBx"));

    styleOpacity(500, "clockBox", 0.8);
    styleOpacity(500, "dateBox", 0.8);
    styleOpacity(500, "bottomLinksCntnr", 0.6);

    fetchWeather(settings);
}

//     search_term.onkeypress = function(e) {
//         if (e.keyCode == 13) confirm_settings.click(); };

//     confirm_settings.onclick = function() {
//         dim_overlay.style.display = 'none';
//         blur_overlay.style.display = 'none';
//         settings_dialog.style.display = 'none';
//         localStorage['settings'] = JSON.stringify({ 'searchTerm': search_term.value, 'safeSearch': safe_search.checked, 'weatherservice': $("#weather_service").val() });
//         fetchPixabayPhoto(window.innerWidth, true);
//     };
//     // Run when page finished loading
//     document.addEventListener('DOMContentLoaded', function() {
//       $("#topActionBar a").click(function(e){
//         e.preventDefault();
//         var cmd = $(this).attr("href");
//         chrome.extension.sendMessage({type: cmd});
//       });
//     });
// }