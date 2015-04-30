/* global angular */
(function () {
    'use strict';
    angular.module('ito-dataviewer.welcome', ['ngMaterial','ngSanitize','ngFileUpload','pascalprecht.translate'])
        .controller('Site.Welcome', ['$scope','$translate','Upload', function ($scope,$translate,upload) {
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });

            $scope.upload = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        Upload.upload({
                            url: 'upload/url',
                            fields: {'username': $scope.username},
                            file: file
                        }).progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                        }).success(function (data, status, headers, config) {
                            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                        });
                    }
                }
            };

                $scope.assets = {
                    asset : {
                        _id : '00001',
                        title: "thing",
                        url: '/images/test.jpg',
                        description: "somethinganything",
                        category: ['wow'],
                        license: "copyright",
                        visibility: "public",
                        privacy: true,
                        disabled: true
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
        }])
        .controller('Site.About', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }])
        .controller('Site.Software', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }]);
}());