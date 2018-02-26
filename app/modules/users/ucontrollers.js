'use strict';

angular.module('Users', [
    'MainComponents',
    'ui.bootstrap',
    'ApiModules',
    'Authentication',
    'GlobalVarsSrvs'
])
    .controller('UsersController', ['$scope', 'MakeModal', '$http', 'api', 'orderByFilter', 'AuthenticationService', 'globalVarsSrv', 'makeController', function ($scope, MakeModal, $http, api, orderBy, AuthenticationService, globalVarsSrv, makeController) {
        $scope.ctrl = makeController.mainController('/users', 'usersTableConf');
        $scope.ctrl.init();
    }])

    .controller('UserProfileController', ['$scope', '$routeParams', 'api', 'MakeModal', 'AuthenticationService', 'makeController', 'globalVarsSrv', function ($scope, $routeParams, api, MakeModal, AuthenticationService, makeController, globalVarsSrv) {
        $scope.ctrl = makeController.profileController('/users', 'usersTableConf');
        $scope.ctrl.init();
    }])

    .component('usersProfile', {
        restrict: 'EA',
        templateUrl: 'modules/users/uviews/profile.html',
        scope: {
            //itemId: '=itemId',
            method: '=method'
        },
        controller: 'UserProfileController'
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
