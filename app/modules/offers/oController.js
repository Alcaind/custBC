'use strict';

angular.module('Offers', [
    'MainComponents',
    'ui.bootstrap',
    'ApiModules',
    'Authentication',
    'GlobalVarsSrvs'
])
    .controller('OffersController', ['$scope', 'MakeModal', '$http', 'api', 'orderByFilter', 'AuthenticationService', 'GlobalVarsSrvs', 'makeController', function ($scope, MakeModal, $http, api, orderBy, AuthenticationService, GlobalVarsSrvs, makeController) {

        AuthenticationService.CheckCredentials();

        $scope.ctrl = makeController.mainController('/offers','offersTableConf')
        $scope.ctrl.init();
    }])

    .controller('OfferProfileController', ['$scope', '$routeParams', 'api', 'MakeModal', 'AuthenticationService', function ($scope, $routeParams, api, MakeModal, AuthenticationService) {
        AuthenticationService.CheckCredentials();
        $scope.tms = {};
        $scope.ucategories = {};
        $scope.baseURL = 'api/public/offers';

        /*api.apiCall('GET', 'api/public/tms', function (results) {
            $scope.tms = results.data;
        });*/

        /*api.apiCall('GET', 'api/public/userscategories', function (results) {
            $scope.ucategories = results.data;
        });*/

        if (!$routeParams.offerId) {
            $scope.item = {
                /*tm_id: "",
                fname: "",
                sname: "",
                phone: "",
                em_main: "",
                em_sec: "",
                em_pant: "",
                cat_id: "",
                comments: "",
                user: "",
                hash: ""*/
            };
        } else {
            api.apiCall('GET', $scope.baseURL + "/" + $routeParams.offerId, function (results) {
                $scope.item = results.data;
            });
        }

        $scope.updateOffer = function (item) {
            api.apiCall('PUT', $scope.baseURL + "/" + item.id, function (results) {
                MakeModal.generalInfoModal('sm', 'Info', 'Info', 'User Updated', 1);
                history.back();
            }, undefined, item)

        };

        $scope.saveOffer = function (item) {
            api.apiCall('POST', $scope.baseURL, function (results) {
                MakeModal.generalInfoModal('sm', 'Info', 'Info', 'User Created', 1);
                history.back();
            }, undefined, item)
        };
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
