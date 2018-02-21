'use strict';

angular.module('Users', [
    'MainComponents',
    'ui.bootstrap',
    'ApiModules',
    'Authentication',
    'GlobalVarsSrvs'
])
    .controller('UsersController', ['$scope', 'MakeModal', '$http', 'api', 'orderByFilter', 'AuthenticationService', 'globalVarsSrv', 'makeController', function ($scope, MakeModal, $http, api, orderBy, AuthenticationService, globalVarsSrv, makeController) {

        AuthenticationService.CheckCredentials();

        $scope.ctrl = makeController.mainController('/users', 'usersTableConf');
        $scope.ctrl.init();
    }])

    .controller('ProfileController', ['$scope', '$routeParams', 'api', 'MakeModal', 'AuthenticationService', function ($scope, $routeParams, api, MakeModal, AuthenticationService) {
        AuthenticationService.CheckCredentials();
        $scope.tms = {};
        $scope.ucategories = {};
        $scope.baseURL = 'api/public/users';


        if (!$routeParams.userId) {
            $scope.item = {
                fname: "",
                sname: "",
                phone: "",
                email: "",
                comments: "",
                user: "",
                hash: ""
            };
        } else {
            api.apiCall('GET', $scope.baseURL + "/" + $routeParams.userId, function (results) {
                $scope.item = results.data;
            });
        }

        $scope.updateUser = function (item) {
            api.apiCall('PUT', $scope.baseURL + "/" + item.id, function (results) {
                MakeModal.generalInfoModal('sm', 'Info', 'Info', 'User Updated', 1);
                history.back();
            }, undefined, item)

        };

        $scope.saveUser = function (item) {
            api.apiCall('POST', $scope.baseURL, function (results) {
                MakeModal.generalInfoModal('sm', 'Info', 'Info', 'User Created', 1);
                history.back();
            }, undefined, item)
        };
    }])

    .component('usersProfile', {
        restrict: 'EA',
        templateUrl: 'modules/users/uviews/profile.html',
        scope: {
            //itemId: '=itemId',
            method: '=method'
        },
        controller: 'ProfileController'
    })

    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                    });
                });
            }
        }
    }])
;
