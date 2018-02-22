'use strict';

angular.module('Offers', [
    'MainComponents',
    'ui.bootstrap',
    'ApiModules',
    'Authentication',
    'GlobalVarsSrvs'
])
    .controller('OffersController', ['$scope', 'MakeModal', '$http', 'api', 'orderByFilter', 'AuthenticationService', 'makeController', 'globalVarsSrv', function ($scope, MakeModal, $http, api, orderBy, AuthenticationService, makeController, globalVarsSrv) {

        AuthenticationService.CheckCredentials();

        $scope.ctrl = makeController.mainController('/offers', 'offersTableConf');
        $scope.ctrl.init();
    }])

    .controller('OfferProfileController', ['$scope', '$routeParams', 'api', 'MakeModal', 'AuthenticationService', 'makeController', 'globalVarsSrv', function ($scope, $routeParams, api, MakeModal, AuthenticationService,  makeController, globalVarsSrv) {
        AuthenticationService.CheckCredentials();

        $scope.ctrl = makeController.profileController('/offers', 'offersTableConf');
        $scope.ctrl.init();

    }])

    .component('offersProfile', {
        restrict: 'EA',
        templateUrl: 'modules/offers/ofviews/profile.html',
        scope: {
            //itemId: '=itemId',
            method: '=method'
        },
        controller: 'OfferProfileController'
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
