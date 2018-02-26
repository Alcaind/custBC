'use strict';

angular.module('Company', [
    'MainComponents',
    'ui.bootstrap',
    'ApiModules',
    'Authentication',
    'GlobalVarsSrvs'
])
    .controller('CompanyController', ['$scope', 'MakeModal', '$http', 'api', 'orderByFilter', 'AuthenticationService', 'makeController', 'globalVarsSrv', function ($scope, MakeModal, $http, api, orderBy, AuthenticationService, makeController, globalVarsSrv) {
        $scope.ctrl = makeController.mainController('/company', 'companyTableConf');
        $scope.ctrl.init();
    }])

    .controller('CompanyProfileController', ['$scope', '$routeParams', 'api', 'MakeModal', 'AuthenticationService','makeController', 'globalVarsSrv', function ($scope, $routeParams, api, MakeModal, AuthenticationService, makeController, globalVarsSrv) {
        $scope.ctrl = makeController.profileController('/company', 'companyTableConf');
        $scope.ctrl.init();
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
