angular.module("app")
    .service("weatherService", function($http, $q) {
        var cityObj = {};

        this.sendToLocationCtrl = function() {
            return cityObj;
        };

        //get weather obj from api and parse through it
        var getWeather = function(lat, long) {
            var dfd = $q.defer();
            $http({
                method:"JSONP",
                url:"https://api.forecast.io/forecast/c59a5daab4fa8b0faedb9318e9cb8e14/" + lat + "," + long + '?callback=JSON_CALLBACK'
            })
            .then(function(response) {
                // console.log('weather response: ', response.data);

                //SET PROPERTIES FOR CURRENT WEATHER
                cityObj.summary = response.data.hourly.summary;
                cityObj.cloudCover = response.data.currently.cloudCover;
                cityObj.windBearing = response.data.currently.windBearing;
                cityObj.temperature = response.data.currently.temperature;
                cityObj.humidity = response.data.currently.humidity  * 100;
                cityObj.windSpeed = response.data.currently.windSpeed;
                cityObj.icon = response.data.currently.icon;
                cityObj.forecast = response.data.daily.data;
                cityObj.forecastSummary = response.data.daily.summary;

                //DETERMINE IF THERE IS A WEATHER ADVISORY
                if (response.data.alerts) {
                    cityObj.alerts = {};
                    cityObj.alerts.title = response.data.alerts[0].title;
                    cityObj.alerts.description = response.data.alerts[0].description;
                } else {
                    cityObj.alerts = {title: "No Alerts at this time"};
                }

                //SET CURRENT WEATHER ICONS AND ROUTES
                if (cityObj.icon === "clear-day") {
                    cityObj.icon = "clear";
                    cityObj.img = "/style/icons/clear.png";
                } else if (cityObj.icon === "partly-cloudy-day") {
                    cityObj.icon = "clear";
                    cityObj.img = "/style/icons/cloudy.png";
                } else if (cityObj.icon === "rain" || cityObj.icon === "sleet" || cityObj.icon === "hail" || cityObj.icon === "thunderstorm" || cityObj.icon === "tornado") {
                    cityObj.icon = "rainy";
                    cityObj.img = "/style/icons/rain.png";
                } else if (cityObj.icon === "cloudy") {
                    cityObj.icon = "cloudy";
                    cityObj.img = "/style/icons/cloudy.png";
                } else if (cityObj.icon === "snow") {
                    cityObj.icon = "snowy";
                    cityObj.img = "/style/icons/snow.png";
                } else if (cityObj.icon === "clear-night" || cityObj.icon === "partly-cloudy-night") {
                    cityObj.icon = "clearNight";
                    cityObj.img = "/style/icons/night.png";
                } else if (cityObj.icon === "wind") {
                    cityObj.icon = "windy";
                    cityObj.img = "/style/icons/wind.png";
                } else if (cityObj.icon === "fog") {
                    cityObj.icon = "cloudy";
                    cityObj.img = "/style/icons/fog.png";
                }

                //DETERMINE DIRECTION OF WIND
                if (cityObj.windBearing > 337 && cityObj.windBearing < 22) {
                    cityObj.windSpeed = cityObj.windSpeed + "mph N";
                } else if (cityObj.windBearing > 23 && cityObj.windBearing < 67) {
                    cityObj.windSpeed = cityObj.windSpeed + "mph NE";
                } else if (cityObj.windBearing > 68 && cityObj.windBearing < 113) {
                    cityObj.windSpeed = cityObj.windSpeed + "mph E";
                } else if (cityObj.windBearing > 114 && cityObj.windBearing < 158) {
                    cityObj.windSpeed = cityObj.windSpeed + "mph SE";
                } else if (cityObj.windBearing > 159 && cityObj.windBearing < 203) {
                    cityObj.windSpeed = cityObj.windSpeed + "mph S";
                } else if (cityObj.windBearing > 204 && cityObj.windBearing < 248) {
                    cityObj.windSpeed = cityObj.windSpeed + "mph SW";
                } else if (cityObj.windBearing > 249 && cityObj.windBearing < 293) {
                    cityObj.windSpeed = cityObj.windSpeed + "mph W";
                } else if (cityObj.windBearing > 294 && cityObj.windBearing < 336) {
                    cityObj.windSpeed = cityObj.windSpeed + "mph NW";
                }

                // Get the next 7 days starting from today
                var getWeek = function() {
                    var d = new Date().getDay();
                    var days =[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var todayToEndOfWeek = days.slice(d, days.length);
                    var startOfWeektoToday = days.slice(0, d);
                    labels = todayToEndOfWeek.concat(startOfWeektoToday);
                    labels[0] = "Today";
                    return labels;
                };

                //CREATE 5 DAY FORECAST DETAILS
                cityObj.fiveDay = [];
                cityObj.chartLabels = getWeek();
                for (var i = 0; i < 5; i++) {
                    cityObj.fiveDay.push({
                        high: response.data.daily.data[i].temperatureMax,
                        low: response.data.daily.data[i].temperatureMin,
                        summary: response.data.daily.data[i].summary,
                        icon: response.data.daily.data[i].icon
                    });
                }

                //CREATE 5 DAY FORECAST ICON DETAIL
                for (var j = 0; j < cityObj.fiveDay.length; j++) {
                    if (cityObj.fiveDay[j].icon === "rain" || cityObj.fiveDay[j].icon === "sleet") {
                        cityObj.fiveDay[j].img = "/style/icons/rain.png";
                    } else if(cityObj.fiveDay[j].icon === "clear-day" || cityObj.fiveDay[j].icon === "clear-night") {
                        cityObj.fiveDay[j].img = "/style/icons/clear.png";
                    } else if(cityObj.fiveDay[j].icon === "cloudy" || cityObj.fiveDay[j].icon === "partly-cloudy-day" || cityObj.fiveDay[j].icon === "partly-cloudy-night") {
                        cityObj.fiveDay[j].img = "/style/icons/cloudy.png";
                    } else if(cityObj.fiveDay[j].icon === "fog" ) {
                        cityObj.fiveDay[j].img = "/style/icons/fog.png";
                    } else if(cityObj.fiveDay[j].icon === "snow" ) {
                        cityObj.fiveDay[j].img = "/style/icons/snow.png";
                    } else if(cityObj.fiveDay[j].icon === "wind") {
                        cityObj.fiveDay[j].img = "/style/icons/wind.png";
                    }
                    cityObj.fiveDay[j].day = cityObj.chartLabels[j];
                }
                dfd.resolve(cityObj);
            });
            return dfd.promise;
        };

        // GET THE LAT/LONG FROM GOOGLE MAPS, PASS TO GETWEATHER
        this.geoCode = function(city) {
            var dfd = $q.defer();
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': city},
                function (results, status) {
                    // console.log('map response: ', results);
                    cityObj.address = results[0].formatted_address;
                    getWeather(results[0].geometry.bounds.R.R, results[0].geometry.bounds.j.j)
                        .then(function(response) {
                            cityObj = response;
                            dfd.resolve(cityObj);
                        });
                });
                return dfd.promise;
        };
});
