/* global angular */
(function () {
    'use strict';
    angular.module('ito-dataviewer.welcome', [])
        .controller('Site.Welcome', ['$scope', function ($scope) {
                $scope.assets = {
                    asset : {
                        title: "thing",
                        description: "more and more stuff",
                        category: {
                            thing2: "wow",
                            thing4: "wowow"
                        },
                        visible: true,
                        privacy: false,
                        editable: true
                    }
                };
            $scope.$apply();
        }])
        .controller('Site.About', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }])
        .controller('Site.Software', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }]);
}());