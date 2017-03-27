$.addTemplateFormatter({
    ForecastTemp: function (value, template) {
        return value.low.fahrenheit + "/" + value.high.fahrenheit + " °F";
    },
    ForecastDate: function (value, template) {
        return value.weekday + ",</br>" + value.monthname + " " + value.day + nth(value.day);
    },
    IconCode: function (value, template) {
        return '<i class="wi wi-wu-' + value + '"></i>';
    },
    OWMIconCode: function (value, template) {
        return '<i class="wi wi-owm-' + value + '"></i>';
    },
    WindIconCode: function (value, template) {
        return '<i class="wi wi-wind from-' + value + '-deg"></i>';
    },
    WindString: function (value, template) {
        return 'Wind from the ' + value.wind_dir + ' at ' + value.wind_mph + ' MPH, Gusting to ' + value.wind_gust_mph + ' MPH';
    }
});


function fetchWeather(settings) {
    chrome.storage.sync.get("settings", function (obj) {
        var getFreshWeather = true;
        var d = new Date();
        var storedTime = new Date(obj.settings['weatherLastCall']);
        var diff = Math.abs(d - storedTime);
        var minutes = Math.floor((diff / 1000) / 60);

        console.log("Number of minutes since last call: " + minutes);

        if (minutes <= 5) {
            getFreshWeather = false;
        }

        if (settings.weatherservice === 'wunderground') {
            wunderground.buildWeather(getFreshWeather);
        } else if (settings.weatherservice === 'openweathermap') {
            fetchOpenWeatherMapWeather(getFreshWeather);
        }
    });
}

var wunderground = {
    conditions: null,
    forecast: null,
    weather: [],
    getSettings: function () {

        //return JSON.parse(localStorage['settings']);
    },
    getUrl: function (type) {
        // var settings = this.getSettings();
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
        // check if it has been 5 miniutes / 300 seconds since last callback
        var curTime = new Date().getTime() / 1000;
        var storedTime = localStorage.getItem('weatherlastcall');
        var lastCall = storedTime === null ? curTime : parseInt(JSON.parse(storedTime));

        console.log("Current time: " + curTime);
        console.log("Stored time: " + storedTime);
        console.log("Last call: " + lastCall);

        var timeDiff = (curTime - lastCall) / 1000;

        console.log("Time difference: " + timeDiff);

        // localStorage.setItem('weatherlastcall', lastCall);

        return $.getJSON(url).then(function (data) {
            return data;
        });
    },
    buildWeather: function () {
        wunderground.getConditions();
        wunderground.getForecast();
        //wunderground.getAstronomy();
        // wunderground.getAlmanac();

        $(document).ajaxStop(function () {
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
            wunderground.conditions = conditions;
        }).fail(function () {
            console.error("Error getting conditions");
        });
    },
    getForecast: function () {
        this.getData(this.getUrl("forecast")).done(function (data) {
            wunderground.forecast = data.forecast.simpleforecast.forecastday;
        }).fail(function () {
            console.error("Error getting forecast");
        });
    },
    getAlmanac: function () {
        this.getData(this.getUrl("almanac")).done(function (data) {
            wunderground.almanac = data;
        }).fail(function () {
            console.error("Error getting forecast");
        });
    },
    getAstronomy: function () {
        this.getData(this.getUrl("astronomy")).done(function (data) {
            wunderground.astronomy = data.moon_phase;
        }).fail(function () {
            console.error("Error getting forecast");
        });
    },
    loadWeather: function () {
        // console.log(wunderground.conditions);
        // console.log(wunderground.forecast);
        // console.log(wunderground.astronomy);

        $("#weatherBar").loadTemplate("../templates/wunderground.html",
            wunderground.conditions, {
                error: function (e) {
                    console.error(e);
                },
                complete: function (e) {
                    $("#forecast-display").loadTemplate("../templates/forecast.html",
                        wunderground.forecast, {
                            error: function (e) {
                                console.error(e);
                            }
                        });

                    $("#weatherBar i").on("click", function (e) {
                        $('#weatherDetailModal').modal('show');
                    });
                }
            });

        wunderground.storeWeather("conditions", wunderground.conditions);
        wunderground.storeWeather("forecast", wunderground.forecast);
    },
    storeWeather: function (type, weather) {
        updateLocalSettings(type, weather);
    }
};









function fetchOpenWeatherMapWeather(getFreshWeather) {
    var query = "03766";
    var apikey = "fc7d9e6c78ebd960c34d345938ea3da1";

    //var settings = JSON.parse(localStorage['settings']),
    var ajax = new XMLHttpRequest(),
        url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&APPID=' + apikey;

    ajax.open('GET', url);
    ajax.onreadystatechange = function () {
        if (ajax.readyState > 3 && ajax.status == 200) {
            var data = JSON.parse(ajax.responseText);
            console.log(data);
            var weather = new Object();
            weather.service = "openweathermap";
            weather.city = data.name + ", " + data.sys.country;
            weather.curcondition = data.weather[0].description;
            weather.curtemp = Math.round(data.main.temp) + "°F";
            weather.curLowHigh = Math.round(data.main.temp_min) + "°F / " + Math.round(data.main.temp_max) + "°F";
            weather.icon = data.weather[0].id;

            //localStorage.weather = JSON.stringify(weather);

            $("#weatherBar").loadTemplate("../templates/openweathermap.html", weather, {
                error: function (e) {
                    console.log(e);
                }
            });
        }
    };
    ajax.send();
}




function fetchForcastIoWeather() {

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