function fetchWeather(service) {
    if (service === 'wunderground') {
        wunderground.buildWeather();
    } else if (service === 'openweathermap') {
        fetchOpenWeatherMapWeather();
    }
}

var wunderground = {
    conditions: null,
    forecast:null,
    weather:[],
    getSettings: function () {
        return JSON.parse(localStorage['settings']);
    },
    getUrl: function (type) {
        var settings = this.getSettings();
        var apikey = "c06438628efb9a59";
        var pws = "KNHLEBAN16";
        var city = "Lebanon";
        var state = "NH";
        var historyDate = "19710428";
        var url;
        switch (type) {
            case "conditions":
                url = 'http://api.wunderground.com/api/' + apikey + '/conditions/pws:1/q/pws:' + pws + '.json';
                break;
            case "forecast":
                url = 'http://api.wunderground.com/api/' + apikey + '/forecast/bestfct:1/q/pws:' + pws + '.json';
                break;
            case "forecast10day":
                url = 'http://api.wunderground.com/api/' + apikey + '/forecast10day/bestfct:1/q/pws:' + pws + '.json';
                break;
            case "alerts":
                url = 'http://api.wunderground.com/api/' + apikey + '/alerts/bestfct:1/q/pws:' + pws + '.json';
                break;
            case "hourly":
                url = 'http://api.wunderground.com/api/' + apikey + '/hourly/bestfct:1/q/pws:' + pws + '.json';
                break;
            case "almanac":
                url = 'http://api.wunderground.com/api/' + apikey + '/almanac/bestfct:1/q/pws:' + pws + '.json';
                break;
            case "astronomy":
                url = 'http://api.wunderground.com/api/' + apikey + '/astronomy/bestfct:1/q/pws:' + pws + '.json';
                break;
            case "history":
                url = 'http://api.wunderground.com/api/' + apikey + '/history_' + historyDate + '/q/pws:' + pws + '.json';
                break;
            default:
                url = 'http://api.wunderground.com/api/' + apikey + '/conditions/q/' + state + '/' + city + '.json';
        }
        return url;
    },
    getData: function (url) {
        return $.getJSON(url).then(function (data) {
            return data;
        });
    },
    buildWeather: function () {
        wunderground.getConditions();
        wunderground.getForecast();
        
        $( document ).ajaxStop(function() {
            // wunderground.weather.conditions = wunderground.conditions;
            // wunderground.weather.forecast = wunderground.forecast;

            // if(jQuery.active === 0){
                wunderground.loadWeather();
            // }
        });
    },
    getConditions: function () {
        this.getData(this.getUrl("conditions")).done(function (data) {
            var conditions = data;
            conditions.service = "wunderground";
            conditions.icon_code_white = '<i class="wu wu-white wu-75 wu-' + conditions.current_observation.icon + '"></i>';
            conditions.icon_code_black = '<i class="wu wu-black wu-75 wu-' + conditions.current_observation.icon + '"></i>';
            conditions.curtemp = conditions.current_observation.temp_f + " °F";
            conditions.feelslike = "Feels like " + conditions.current_observation.feelslike_f + " °F";
            conditions.dewpoint = "Dew Point: " + conditions.current_observation.dewpoint_f + " °F";
            conditions.humidity = "Humidity: " + conditions.current_observation.relative_humidity;
            conditions.pressure = "Pressure: " + conditions.current_observation.pressure_in + " in";
            conditions.preciprate = "Precip rate: " + conditions.current_observation.precip_1hr_in + " in/hr";
            conditions.precipaccum = "Precip accum: " + conditions.current_observation.precip_today_in + " in";
            conditions.windchill = "Windchill: " + conditions.current_observation.windchill_f + " °F";
            conditions.visibility = "Visibility: " + conditions.current_observation.visibility_mi + " miles";
            conditions.uv = "UV: " + conditions.current_observation.UV;
            conditions.heatindex = (conditions.current_observation.heat_index_f == "NA") ? "Heat index: --" : "Heat index: " + conditions.current_observation.heat_index_f + " °F";
            conditions.solarradiation = (conditions.current_observation.solarradiation == "--") ? "Solar: --" : "Solar: " + conditions.current_observation.solarradiation + " w/m2";
            var wind = "Wind from the " + conditions.current_observation.wind_dir + " at " + conditions.current_observation.wind_mph + " MPH "
            wind += "Gusting to " + conditions.current_observation.wind_gust_mph + " MPH"
            conditions.wind = wind;
            wunderground.conditions = conditions;
        }).fail(function () {
            console.log("Error getting conditions")
        });
    },
    getForecast: function () {
        this.getData(this.getUrl("forecast")).done(function (data) {
            var forecast = data.forecast.simpleforecast.forecastday;
            $.each(forecast, function( key,value ) {
                forecast[key].icon_code_white = '<i class="wu wu-white wu-75 wu-' + value.icon + '"></i>';
                forecast[key].icon_code_black = '<i class="wu wu-black wu-75 wu-' + value.icon + '"></i>';
                forecast[key].temp = value.low.fahrenheit + "/" + value.high.fahrenheit + " °F";
                forecast[key].date = value.date.monthname + " " + value.date.day + wunderground.nth(value.date.day);
            });
            wunderground.forecast = forecast;
        }).fail(function () {
            console.log("Error getting forecast")
        });
    },
    loadWeather: function(){
        // console.log(wunderground.weather)

        $("#weatherBar").loadTemplate("../templates/wunderground.html",
            wunderground.conditions, {
                error: function (e) {
                    console.log(e);
                },
                complete: function (e) {
                    $("#weatherBar i").on("click", function (e) {
                        $('#weatherDetailModal').modal('show');
                    });
                }
            });
    },
    storeWeather: function(){
            // localStorage.weather = JSON.stringify(conditions);

    },
    nth: function(d){
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
};









function fetchOpenWeatherMapWeather() {
    var query = "03766";
    var apikey = "fc7d9e6c78ebd960c34d345938ea3da1";

    var settings = JSON.parse(localStorage['settings']),
        ajax = new XMLHttpRequest(),
        url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&APPID=' + apikey;

    ajax.open('GET', url);
    ajax.onreadystatechange = function () {
        if (ajax.readyState > 3 && ajax.status == 200) {
            var data = JSON.parse(ajax.responseText);

            var weather = new Object();
            weather.service = "openweathermap";
            weather.city = data.name + ", " + data.sys.country;
            weather.curcondition = data.weather[0].description;
            weather.curtemp = Math.round(data.main.temp) + "°F";
            weather.curLowHigh = Math.round(data.main.temp_min) + "°F / " + Math.round(data.main.temp_max) + "°F";
            weather.icon = "images/weathericons/" + data.weather[0].icon + ".svg";

            localStorage.weather = JSON.stringify(weather);

            $("#weatherBar").loadTemplate("../templates/openweathermap.html", weather, {
                error: function (e) {
                    console.log(e);
                }
            });
        }
    };
    ajax.send();
}




function fetchForcastIoWeather(){

}



// Yahoo weather
// updateWeather: function () {
//             function a() {
//                 var a = h.model.get("manualLocation");
//                 a ? (e(a), g(a)) : navigator.geolocation.getCurrentPosition(b, c)
//             }

//             function b(a) {
//                 d(a.coords.latitude + "," + a.coords.longitude), g(h.model.get("location"))
//             }

//             function c(a) {
//                 h.editLocation(), _gaq.push(["_trackEvent", "Error", "Error getting location: " + a.code])
//             }

//             function d(a) {
//                 var b = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + encodeURIComponent(a) + "&sensor=true";
//                 $.getJSON(b, function (a) {
//                     a && a.results && a.results[0] ? $.each(a.results[0].address_components, function (a, b) {
//                         _.contains(b.types, "locality") && e(b.long_name)
//                     }) : _gaq.push(["_trackEvent", "AppError", "getApiLocation:" + a])
//                 }).error(function (a) {
//                     _gaq.push(["_trackEvent", "AppError", "getApiLocation:" + a])
//                 })
//             }

//             function e(a) {
//                 var b = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places(1)%20where%20text%3D%22" + encodeURIComponent(a) + "%22&format=json&diagnostics=true&callback=";
//                 $.getJSON(b, function (a) {
//                     var b = a.query.count;
//                     if (b > 1) var c = a.query.results.place[0];
//                     else if (1 == b) var c = a.query.results.place;
//                     else {
//                         h.$location.append("<br>not found");
//                         var c = ""
//                     }
//                     h.model.get("location") || h.setUnit(c.country.code);
//                     var d = c.name,
//                         e = c.woeid;
//                     h.model.save("location", d), h.model.save("woeid", e), f(e)
//                 }).error(function () {})
//             }

//             function f(a) {
//                 var b = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from weather.forecast where woeid=" + a + ' and u="' + h.model.get("unit") + '"') + "&format=json&callback=?";
//                 $.getJSON(b, function (a) {
//                     if (1 == a.query.count) {
//                         var b = a.query.results.channel,
//                             c = b.item.condition;
//                         h.model.save("temperature", c.temp), h.model.save("code", c.code), h.model.save("condition", c.text), "China" == b.location.country ? h.model.save("hasAqi", !0) : h.model.save("hasAqi", !1), h.model.save("astronomy", b.astronomy), h.model.save("atmosphere", b.atmosphere), h.model.save("wind", b.wind), h.model.save("units", b.units);
//                         var d = a.query.results.channel.item.forecast;
//                         $.each(d, function (a, b) {
//                             b.code = h.getConditionFromCode(b.code), d[a] = b
//                         }), h.model.save("forecast", d), h.model.save("updated", new Date)
//                     }
//                 }).error(function (a) {})
//             }

//             function g(a) {
//                 var b = (new Date).getTime(),
//                     c = "http://aqicn.org/aqicn/json/android/" + a + "/json?" + b;
//                 chrome.permissions.contains({
//                     origins: ["http://aqicn.org/*"]
//                 }, function (a) {
//                     a && $.getJSON(c, function (a) {
//                         if (a) {
//                             var b = a.aqi;
//                             b && (h.model.save("aqi", a.aqi), b >= 0 && 50 >= b ? (h.model.save("aqiCategory", "Good"), h.model.save("aqiColor", "#009966")) : b >= 51 && 100 >= b ? (h.model.save("aqiCategory", "Moderate"), h.model.save("aqiColor", "#ffde33")) : b >= 101 && 150 >= b ? (h.model.save("aqiCategory", "Unhealthy for Sensitive Groups"), h.model.save("aqiColor", "#ff9933")) : b >= 151 && 200 >= b ? (h.model.save("aqiCategory", "Unhealthy"), h.model.save("aqiColor", "#cc0033")) : b >= 201 && 300 >= b ? (h.model.save("aqiCategory", "Very Unhealthy"), h.model.save("aqiColor", "#660099")) : b >= 301 && 500 >= b && (h.model.save("aqiCategory", "Hazardous"), h.model.save("aqiColor", "#7e0023")))
//                         }
//                     }).error(function (a) {})
//                 })
//             }
//             var h = this;
//             a()
//         },