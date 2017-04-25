/*eslint no-unused-vars: 0*/
/*global chrome */

function save_options() {
    var weatherService = document.getElementById('weatherservice').value;
    var photoService = document.getElementById('photoservice').value;
    var pixabaySearchTerm = document.getElementById('pixabay_search_term').value;
    var pixabaySafeSearch = document.getElementById('pixabay_safe_search').checked;

    chrome.storage.sync.set({
        "settings": {
            "weatherService": weatherService,
            "photoService": photoService,
            "pixabaySearchTerm": pixabaySearchTerm,
            "pixabaySafeSearch": pixabaySafeSearch,
            "currentPhoto": "",
            "weatherLastCall": "",
            "photoLastCall": ""
        }
    }, function () {
        var status = document.getElementById('status');
        status.textContent = 'Settings saved!';
        setTimeout(function () {
            status.textContent = '';
        }, 1500);
    });
}

function restore_options() {
    chrome.storage.sync.get('settings',function (items) {
        document.getElementById('weatherservice').value = items.settings['weatherService'];
        document.getElementById('photoservice').value = items.settings['photoService'];
        document.getElementById('pixabay_search_term').value = items.settings['pixabaySearchTerm'];
        document.getElementById('pixabay_safe_search').checked = items.settings['pixabaySafeSearch'];
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);