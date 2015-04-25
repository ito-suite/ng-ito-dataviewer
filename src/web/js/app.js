(function () {
    'use strict';
    angular.module('ito-dataviewer', [
        'ngAria',
        'ngMaterial',
        'ngRoute',
        'ngAnimate',
        'ngTouch',
        'angular-locker',
        'cgBusy',
        'ito-dataviewer.welcome'
    ])
        .config(['$routeProvider', '$locationProvider', '$animateProvider','lockerProvider', function($routeProvider, $locationProvider, $animateProvider, lockerProvider) {

            $animateProvider.classNameFilter(/animate-/);
            $locationProvider.html5Mode(true);

            // these are from simulacrum
            /*
            $routeProvider.when('/display', {templateUrl: '/pages/mainpage', controller: 'MainPage'});
            $routeProvider.when('/display/:team_id', {templateUrl: '/pages/mainpageteam', controller: 'MainpageTeam'});

            $routeProvider.when('/team', {templateUrl: '/pages/team', controller: 'Team'});
            $routeProvider.when('/team/:team_id', {templateUrl: '/pages/teamview', controller: 'TeamView'});
            $routeProvider.when('/about', {templateUrl: '/pages/about', controller: 'About'});
            $routeProvider.when('/eviladmin', {templateUrl: '/pages/evil', controller: 'Evil'});
            $routeProvider.when('/mapview', {templateUrl: '/pages/mapview', controller: 'Mapview'});
            $routeProvider.when('/mapview/:_id', {templateUrl: '/pages/mapview', controller: 'Mapview'});
            $routeProvider.otherwise({redirectTo: '/'});
            */
            //$routeProvider.otherwise({redirectTo: '/'});
            $routeProvider.when('/test', {controller: 'Site.Welcome'});
            lockerProvider.setDefaultDriver('local')
                .setDefaultNamespace('ito-dataviewer')
                .setSeparator('.');
        }])
}());

