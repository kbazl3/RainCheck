angular.module('app')
    .controller('locationCtrl', function($scope, $location, $state, weatherService) {

            //TOGGLE NAV VIEWS
        $scope.current = true;
        $scope.showAlerts = function() {
            $scope.alertz = true;
            $scope.forecast = false;
            $scope.current = false;
        };

        $scope.showForecast = function() {
            $scope.alertz = false;
            $scope.forecast = true;
            $scope.current = false;
        };

        $scope.showCurrent = function() {
            $scope.alertz = false;
            $scope.forecast = false;
            $scope.current = true;
        };

      $scope.weather = weatherService.sendToLocationCtrl();
      console.log("scope.weather", $scope.weather);
      if (!$scope.weather.forecast) {
        $state.go("home")
      }

      // CHART DATA
      Chart.defaults.global.colours =  [  '#46BFBD', '#ff0000' ];
      Chart.defaults.global.scaleFontColor = "#fff";
      Chart.defaults.global.scaleLineColor = "#fff";
      Chart.defaults.global.scaleFontSize = 13;

       $scope.labels = $scope.weather.chartLabels;
       $scope.series = ['Low', 'High'];
       $scope.data = [
         [
              $scope.weather.forecast[0].apparentTemperatureMin,
              $scope.weather.forecast[1].apparentTemperatureMin,
              $scope.weather.forecast[2].apparentTemperatureMin,
              $scope.weather.forecast[3].apparentTemperatureMin,
              $scope.weather.forecast[4].apparentTemperatureMin,
              $scope.weather.forecast[5].apparentTemperatureMin,
              $scope.weather.forecast[6].apparentTemperatureMin,
          ],
         [
             $scope.weather.forecast[0].apparentTemperatureMax,
             $scope.weather.forecast[1].apparentTemperatureMax,
             $scope.weather.forecast[2].apparentTemperatureMax,
             $scope.weather.forecast[3].apparentTemperatureMax,
             $scope.weather.forecast[4].apparentTemperatureMax,
             $scope.weather.forecast[5].apparentTemperatureMax,
             $scope.weather.forecast[6].apparentTemperatureMax
         ]
       ];

});
