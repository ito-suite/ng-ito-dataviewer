/* global angular */
(function () {
    'use strict';
    angular.module('ito-dataviewer.welcome', ['ngMaterial','ngSanitize','ngFileUpload','pascalprecht.translate'])
        .controller('Site.Welcome', ['$scope','$translate','Upload','$mdSidenav', function ($scope,$translate,upload,$mdSidenav) {
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
            $scope.openRightMenu = function() {
                $mdSidenav('right').toggle();
            };
            function DemoCtrl($mdDialog) {
                var vm = this;
                this.announceClick = function (index) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('You clicked!')
                            .content('You clicked the menu item at index ' + index)
                            .ok('Nice')
                    );
                };
            }
                $scope.assets = {
                    asset : {
                        _id : '00001',
                        title: "thing",
                        url: '/images/test.jpg',
                        description: "somethinganything",
                        category: "thing",
                        license: "copyright",
                        visibility: "public",
                        privacy: true,
                        disabled: true
                    }
                };
                $scope.site = {
                  title: "Leerstandsmelder 2.0",
                  copyrightnotice: "&copy; ITO-Suite",
                  breadcrumb: "Berlin",
                  logo: "/images/logo.png",
                  lang: "English"
                };
                $scope.user = {
                  me: {
                      name: "Daniel"
                  }
                };

                $scope._sys = {
                    cities: {
                        berlin:{title:"Berlin"},
                        munich:{title:"München"},
                        hamburg:{title:"Hamburg"}
                    },
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
            $scope.acl = function() {
                // we're going to look at the asset first,
                // then compare the user persona
                // and allow / disallow UI interaction
                // this function will be repeated server side
                // to prevent malicious clients from being evil

                // LOOK AT /api/version/me.json
                // waterfall:
                    // compare item ACL with user ACL
                    // if it is viewable > show it
                    // if it is editable > set edit flag

            }
        }])
        .controller('Site.', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }])
        .controller('Site.About', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }])
        .controller('Site.Software', ['$scope', function ($scope) {
            $scope.$parent.status = 'ready';
        }]);
}());