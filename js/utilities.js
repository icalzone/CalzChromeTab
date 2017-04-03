/*eslint no-unused-vars: 0*/
/*global chrome*/

function updateSyncSettings(key, value) {
    chrome.storage.sync.get("settings", function (obj) {
        var syncSettings = obj.settings;
        syncSettings[key] = value;
        chrome.storage.sync.set({
            'settings': syncSettings
        }, function () {});
    });
}

function updateLocalSettings(key, value) {
    chrome.storage.local.get("settings", function (obj) {
        var localSettings;
        if (obj.settings === undefined) {
            localSettings = {};
        } else {
            localSettings = obj.settings;
        }

        localSettings[key] = value;
        chrome.storage.local.set({
            'settings': localSettings
        }, function () {});
    });
}

var capitalize = function (str) {
    str = str || '';
    str = str.toLowerCase();
    // string length must be more than 2
    // if(str.length<3){
    if (str.match(/^(mph|n|s|e|w|nw|sw|ne|se|ssw)$/)) {
        return str.toUpperCase();
    }
    return str;
    // return str[0].toUpperCase()+str.slice(1);
};
var splitWordsAndCap = function (str) {
    str = str || '';
    var words = str.match(/\S+/g);
    for (var i = 0; i < words.length; i++) {
        words[i] = capitalize(words[i]);
    }
    return words.join(' ');
};
// Cookie handlers
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

// Style methods
var innerHTML = function (id, string) {
    document.getElementById(id).innerHTML = string;
};
// Opacity style
var styleOpacity = function (delay, id, value) {
    setTimeout(function () {
        document.getElementById(id).style.opacity = value;
    }, delay);
};
// Grayscale style
var styleGrayscale = function (delay, id, value) {
    setTimeout(function () {
        if (value === "true") {
            document.getElementById(id).style.webkitFilter = "grayscale(1)";
        } else {
            document.getElementById(id).style.webkitFilter = "grayscale(0)";
        }
    }, delay);
};
// Visibility style
var styleVisibility = function (delay, id, value) {
    setTimeout(function () {
        document.getElementById(id).style.visibility = value;
    }, delay);
};
// Background color style
var styleBackgroundColor = function (delay, id, value) {
    setTimeout(function () {
        document.getElementById(id).style.backgroundColor = value;
    }, delay);
};

function nth(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

$.addTemplateFormatter({
    UpperCaseFormatter: function (value, template) {
        return value.toUpperCase();
    },
    LowerCaseFormatter: function (value, template) {
        return value.toLowerCase();
    },
    SameCaseFormatter: function (value, template) {
        if (template === "upper") {
            return value.toUpperCase();
        } else {
            return value.toLowerCase();
        }
    },
    currency: function (value, template) {
        switch (template) {
            case "en":
                return "&pound;" + value;
            default:
                return value;
        }
    },
    tags: function (value, template) {
        return value.join(", ");
    },
    coordinates: function (value) {
        return value.latitude + ", " + value.longitude;
    },
    productLink: function (value) {
        return "Products/" + value;
    }
});