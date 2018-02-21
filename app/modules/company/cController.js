'use strict';

angular.module('Company', [
    'MainComponents',
    'ui.bootstrap',
    'ApiModules',
    'Authentication',
    'GlobalVarsSrvs'
])
    .controller('CompanyController', ['$scope', 'MakeModal', '$http', 'api', 'orderByFilter', 'AuthenticationService', 'makeController', 'globalVarsSrv', function ($scope, MakeModal, $http, api, orderBy, AuthenticationService, makeController, globalVarsSrv) {

        AuthenticationService.CheckCredentials();

        $scope.ctrl = makeController.mainController('/company', '');
        $scope.ctrl.init();

    }])

    .controller('CompanyProfileController', ['$scope', '$routeParams', 'api', 'MakeModal', 'AuthenticationService', function ($scope, $routeParams, api, MakeModal, AuthenticationService) {
        AuthenticationService.CheckCredentials();
        $scope.tms = {};
        $scope.ucategories = {};
        $scope.baseURL = 'api/public/company';

        /*api.apiCall('GET', 'api/public/tms', function (results) {
            $scope.tms = results.data;
        });*/

        /*api.apiCall('GET', 'api/public/userscategories', function (results) {
            $scope.ucategories = results.data;
        });*/

        if (!$routeParams.companyId) {
            $scope.item = {
                id: "",
                name: "",
                descr: ""
            };
        } else {
            api.apiCall('GET', $scope.baseURL + "/" + $routeParams.companyId, function (results) {
                $scope.item = results.data;
            });
        }

        $scope.updateCompany = function (item) {
            api.apiCall('PUT', $scope.baseURL + "/" + item.id, function (results) {
                MakeModal.generalInfoModal('sm', 'Info', 'Info', 'User Updated', 1);
                history.back();
            }, undefined, item)

        };

        $scope.saveCompany = function (item) {
            api.apiCall('POST', $scope.baseURL, function (results) {
                MakeModal.generalInfoModal('sm', 'Info', 'Info', 'User Created', 1);
                history.back();
            }, undefined, item)
        };
    }])

    .component('companyProfile', {
        restrict: 'EA',
        templateUrl: 'modules/company/coviews/profile.html',
        scope: {
            //itemId: '=itemId',
            method: '=method'
        },
        controller: 'CompanyProfileController'
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
