angular.module("app", ['ui.router', 'chart.js'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'weatherCtrl'
            })

            .state('clearDay', { //clear-day,partly-cloudy-day
                url:'/clear/:id',
                templateUrl: 'views/clearDay.html',
                controller: 'locationCtrl'
            })

            .state('rainy', { //rain, sleet hail, thunderstorm, or tornado
                url:'/rainy/:id',
                templateUrl: 'views/rainy.html',
                controller: 'locationCtrl'
            })

            .state('cloudy', {// fog,cloudy,
                url:'/cloudy/:id',
                templateUrl: 'views/cloudy.html',
                controller: 'locationCtrl'
            })

            .state('snowy', { //snow,
                url:'/snowy/:id',
                templateUrl: 'views/snowy.html',
                controller: 'locationCtrl'
            })

            .state('night', { //clear-night,  partly-cloudy-night.
                url:'/clearNight/:id',
                templateUrl: 'views/clearNight.html',
                controller: 'locationCtrl'
            })
            .state('windy', { //windy,
                url:'/windy/:id',
                templateUrl: 'views/windy.html',
                controller: 'locationCtrl'
            });
    });
