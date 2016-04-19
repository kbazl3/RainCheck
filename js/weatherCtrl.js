angular.module("app")
    .controller("weatherCtrl", function($scope, weatherService, $location) {

    $scope.getWeather = function(city) {
        $scope.weather = weatherService.geoCode(city)
            .then(function(weather) {
                $location.path(weather.icon + "/" + city);
            });
    };
});
