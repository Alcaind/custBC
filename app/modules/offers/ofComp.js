'use strict';

angular.module('Offers')

    .controller('OfCompController', ['$scope', 'makeController', function ($scope, makeController) {
        $scope.ctrl = makeController.n2nController('/offers','company',{});
        $scope.ctrl.init();

        $scope.sayHello = function ()`` {
            console.log("hello !!");
        }

        $sacope.sayHello();
    }])

    .directive('leftTable', function () {
        return {
            restrict: 'EA',
            templateUrl: 'modules/offers/ofviews/leftTable.html'
        }
    })
    .directive('rightTable', function () {
        return {
            restrict: 'EA',
            templateUrl: 'modules/offers/ofviews/rightTable.html'
        }
    })
    .directive('pivotForm', function () {
        return {
            restrict: 'EA',
            templateUrl: 'modules/offers/ofviews/pivotForm.html'
        }
    })
;