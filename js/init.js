var bgdivExists = !!document.getElementById("bg_div");
if(bgdivExists){
    $("#srchImgBx i").hide();

    var settings = JSON.parse(localStorage['settings']),
    settings_dialog = document.getElementById('settings_dialog'),
    confirm_settings = document.getElementById('confirm_settings'),
    blur_overlay = document.getElementById('blur_overlay'),
    dim_overlay = document.getElementById('dim_overlay'),
    search_term = document.getElementById('search_term'),
    safe_search = document.getElementById('safe_search'),
    weather_service = document.getElementById('weather_service');

    document.getElementById('bg_div').style.backgroundImage = 'url("' + localStorage.currentPhoto + '")';    

    document.getElementById('settings_link').onclick = function() {
        blur_overlay.style.backgroundImage = 'url("' + localStorage.currentPhoto + '")';
        dim_overlay.style.display = 'block';
        blur_overlay.style.display = 'block';
        settings_dialog.style.display = 'block';
        settings = JSON.parse(localStorage['settings']);
        safe_search.checked = settings.safeSearch;
        search_term.value = settings.searchTerm;
        $("#weather_service").val(settings.weatherservice);
        search_term.focus();
        return false;
    };    

    search_term.onkeypress = function(e) {
        if (e.keyCode == 13) confirm_settings.click(); };

    confirm_settings.onclick = function() {
        dim_overlay.style.display = 'none';
        blur_overlay.style.display = 'none';
        settings_dialog.style.display = 'none';
        localStorage['settings'] = JSON.stringify({ 'searchTerm': search_term.value, 'safeSearch': safe_search.checked, 'weatherservice': $("#weather_service").val() });
        fetchPixabayPhoto(window.innerWidth, true);
    };

    document.getElementById('cancel_settings').onclick = document.getElementById('dim_overlay').onclick = function() {
        dim_overlay.style.display = 'none';
        blur_overlay.style.display = 'none';
        settings_dialog.style.display = 'none';
    };

    // Run when page finished loading
    window.onload = function() {
        settings = JSON.parse(localStorage['settings']);

        if (getCookie("opSrchBx") === "") {
            setCookie("opSrchBx", "google", 365);
        };
        makeSearchBox(getCookie("opSrchBx"));

        styleOpacity(500, "clockBox", 0.8);
        styleOpacity(500, "dateBox", 0.8);
        styleOpacity(500, "bottomLinksCntnr", 0.6);

        fetchWeather(settings.weatherservice);
    };

    document.addEventListener('DOMContentLoaded', function() {
      $("#topActionBar a").click(function(e){
        e.preventDefault();
        var cmd = $(this).attr("href");
        chrome.extension.sendMessage({type: cmd});
      });
    });
}