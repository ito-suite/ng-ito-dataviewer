(function () {
    'use strict';
    angular.module('ito-dataviewer', [
        'ngAria',
        'ngMaterial',
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'ngTouch',
        'ngFileUpload',
        'angular-locker',
        'cgBusy',
        'pascalprecht.translate',
        'ito-dataviewer.welcome'
    ])
        .config(['$routeProvider', '$locationProvider', '$animateProvider','lockerProvider', '$translateProvider', function($routeProvider, $locationProvider, $animateProvider, lockerProvider, $translateProvider) {



            $translateProvider.translations('en', {
                asset: {
                    title: 'Title',
                    description: 'Description'
                },
                actions: {
                    cancel: 'Cancel',
                    delete: 'Delete'

                },
                FOO: 'This is a paragraph.',
                BUTTON_LANG_EN: 'english',
                BUTTON_LANG_DE: 'german'
            });
            $translateProvider.translations('de', {
                asset : {
                    title: 'Titel',
                    description: 'Beschreibung'
                },
                cancel: 'Abbrechen',
                delete: 'Löschen',
                banned: 'Verboten',
                FOO: 'Dies ist ein Paragraph.',
                BUTTON_LANG_EN: 'englisch',
                BUTTON_LANG_DE: 'deutsch'
            });
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escaped');


            $animateProvider.classNameFilter(/animate-/);
            $locationProvider.html5Mode({
                enabled: true
                //requireBase: false
            });

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
            $routeProvider.when('/', {
                templateUrl: '/index.html',
                controller: 'Site.Welcome'
            });
            lockerProvider.setDefaultDriver('local')
                .setDefaultNamespace('ito-dataviewer')
                .setSeparator('.');
        }])
}());

