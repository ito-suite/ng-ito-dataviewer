/* global angular */
(function () {
    'use strict';
    angular.module('ito-dataviewer.welcome', ['ngMaterial','ngSanitize','pascalprecht.translate'])
        .controller('Site.Welcome', ['$scope','$translate', function ($scope,$translate) {
                $scope.assets = {
                    asset : {
                        _id : '00001',
                        title: "thing",
                        description: "somethinganything",
                        category: {
                            thing2: "wow"
                        },
                        license: "copyright",
                        visible: "public",
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
                    },
                    i18nSrc : {
                        cancel : {
                            en : 'Cancel',
                            de : 'Abrechen'
                        },
                        delete : {
                            en : 'Delete',
                            de : 'Löschen'
                        },
                        asset : {
                            title : {
                                en : "Title",
                                de : "Titel"
                            },
                            description : {
                                en : "Description",
                                de : "Beschreibung"
                            }

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

            */
        }])
        .controller('Site.About', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }])
        .controller('Site.Software', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }]);
}());