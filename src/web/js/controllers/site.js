/* global angular */
(function () {
    'use strict';
    angular.module('ito-dataviewer.welcome', ['ngMaterial'])
        .controller('Site.Welcome', ['$scope', function ($scope) {
                $scope.assets = {
                    asset : {
                        _id : '00001',
                        title: "thing",
                        description: null,
                        category: {
                            thing2: "wow"
                        },
                        license: true,
                        visible: true,
                        privacy: true,
                        editable: true
                    }
                };
                $scope._sys = {
                    visibility : {
                        one:{
                            title: 'public'
                        },
                        two:{
                            title: 'private'
                        },
                        three:{
                            title: 'trashed'
                        },
                        four:{
                            title: 'banned'
                        }
                    },
                    licenses : {
                        copyright : {
                            title : 'copyright',
                            text : 'Copyright is a thing'
                        },
                        copyleft : {
                            title : 'copyleft',
                            text : 'Copyleft is a thing'
                        }
                    },
                    categories : {
                        one : {
                            title: 'wow'
                        },
                        two : {
                            title: 'wowo'
                        },
                        three : {
                            title: 'wowow'
                        }
                    }
                };
            $scope.$apply();
            /*
            $scope.clearValue = function(model) {
                $scope.model = undefined;
            };
            $scope.save = function() {
                alert('Form was valid!');
            };
            $scope.i18n = function (string,language) {

            }
            */
        }])

        .controller('Site.About', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }])
        .controller('Site.Software', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }]);
}());