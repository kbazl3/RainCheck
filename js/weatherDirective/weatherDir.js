angular.module( "app" )
    .directive( "weatherbox", function () {
        return {
            restrict: 'E',
            templateUrl: "js/weatherDirective/weatherDir.html"
        };
  });
