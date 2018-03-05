'use strict';

angular.module('Home', []);
angular.module('Login', []);
angular.module('Admin', []);
angular.module('Authentication', []);
angular.module('DB', []);
angular.module('Roles', []);
angular.module('Users', []);
angular.module('Offers', []);
angular.module('Company', []);
angular.module('MainComponents', []);
angular.module('ApiModules', []);
angular.module('UsersCategories', []);

// Declare app level module which depends on views, and components
angular.module('crSystem', [
    'Authentication',
    'Admin',
    'Home',
    'ngRoute',
    'ngCookies',
    'Login',
    'DB',
    'angular-jwt',
    'angular-storage',
    'Roles',
    'Users',
    'Offers',
    'Company',
    'MainComponents',
    'ApiModules',
    'UsersCategories',
    'GlobalVarsSrvs'
])

    .config(['$locationProvider', '$routeProvider', '$httpProvider', 'jwtOptionsProvider', 'jwtInterceptorProvider',
        function($locationProvider, $routeProvider,  $httpProvider, jwtOptionsProvider, jwtInterceptorProvider) {

    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        .when('/admin', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        .when('/login', {
            title: "LogIn",
            controller: 'LoginController',
            templateUrl: 'modules/login/views/login.html'
        })
        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        .when('/roles', {
            title: 'roles',
            controller: 'RolesController',
            templateUrl: 'modules/roles/views/roles.html'
        })
        .when('/roles/create', {
            title: 'role create',
            template: '<roles-profile></roles-profile>'
        })
        .when('/roles/:roleId', {
            title: 'role',
            template: '<roles-profile></roles-profile>'
        })
        .when('/roles/:roleId/users', {
            title: 'role',
            template: '<roles-users></roles-users>'
        })
        .when('/users', {
            title: 'users',
            controller: 'UsersController',
            templateUrl: 'modules/users/uviews/users.html'
        })
        .when('/users/create', {
            title: 'user create',
            template: '<users-profile></users-profile>'
        })
        .when('/users/:id', {
            title: 'user',
            template: '<users-profile></users-profile>'
        })
        .when('/users/:id/requests', {
            title: 'user request',
            controller: 'URequestsController',
            templateUrl: 'modules/users/uviews/urequest.html'
        })
        .when('/users/:id/roles', {
            title: 'user role',
            controller: 'URolesController',
            templateUrl: 'modules/users/uviews/urole.html'
        })
        .when('/offers', {
            title: 'offers',
            controller: 'OffersController',
            templateUrl: 'modules/offers/ofviews/offers.html'
        })
        .when('/offers/create', {
            title: 'offers create',
            template: '<offers-profile></offers-profile>'
        })
        .when('/offers/:id', {
            title: 'offers',
            template: '<offers-profile></offers-profile>'
        })
        .when('/offers/:id/company', {
            title: 'user request',
            controller: 'OfCompController',
            templateUrl: 'modules/offers/ofviews/ofcomp.html'
        })
        .when('/offers/:id/hot_spots', {
            title: 'user request',
            controller: 'OhsController',
            templateUrl: 'modules/offers/ofviews/ohs.html'
        })
        /*.when('/offers/:id/usages', {
            title: 'user request',
            controller: 'OffersUsagesController',
            templateUrl: 'modules/offers/ofviews/UCoffer.html'
        })*/
        .when('/company', {
            title: 'company',
            controller: 'CompanyController',
            templateUrl: 'modules/company/coviews/company.html'
        })
        .when('/company/create', {
            title: 'company create',
            template: '<company-profile></company-profile>'
        })
        .when('/company/:id', {
            title: 'company',
            template: '<company-profile></company-profile>'
        })
        .when('/company/:id/usages', {
            title: 'user request',
            controller: 'CompanyUsagesController',
            templateUrl: 'modules/company/coviews/UCoffer.html'
        })
        .when('/company/:id/offers', {
            title: 'user request',
            controller: 'CompOfController',
            templateUrl: 'modules/company/coviews/compof.html'
        })
        .otherwise({ redirectTo: '/login' });

        $locationProvider.hashPrefix('');

        /*.when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })*/

        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });*/


            var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };

        /*jwtOptionsProvider.tokenGetter = function(store) {
            return store.get('jwt');
        }*/

        jwtOptionsProvider.config({
            tokenGetter: ['options', 'store', 'jwtHelper', '$http', '$rootScope', '$location',
                function(options, store, jwtHelper, $http, $rootScope, $location) {
                // Skip authentication for any requests ending in .html
                if (options.url.substr(options.url.length - 5) == '.html') {
                    return null;
                }
                if (options.url.indexOf("refresh-token") > -1) {
                    return null;
                }

                if (refreshPromise) {
                    return refreshPromise;
                }

                //var expToken = store.get('jwt').token;
                var idToken = store.get('jwt') && store.get('jwt').token != 'undefined'?store.get('jwt').token:null;
                var rfToken = store.get('rwt') && store.get('rwt').token != 'undefined'?store.get('rwt').token:null;

                /*
                if (!expToken) return null;
                var date = jwtHelper.getTokenExpirationDate(expToken);
                var tokenPayload = jwtHelper.decodeToken(expToken);
                var bool = jwtHelper.isTokenExpired(expToken);
                */

                if (idToken && jwtHelper.isTokenExpired(idToken)) {
                    if  (!rfToken || (rfToken && jwtHelper.isTokenExpired(rfToken))) {
                        if (rfToken) store.remove('rwt');
                        if (idToken) store.remove('jwt');
                        $rootScope.errorString ='Δεν υπάρχει ενεργό login στην Υπηρεσία! Προσπαθήστε ΞΑΝΑ!';
                        $rootScope.globals = {item: null};
                        $location.path('/login');
                        return null;
                    }
                    var refreshToken = store.get('rwt');
                    // This is a promise of a JWT id_token
                    var refreshPromise = $http({
                        url: 'http://app.livepraktoreio.gr/api/public/refresh-token',
                        // This makes it so that this request doesn't send the JWT
                        //skipAuthorization: true,
                        headers: {
                            'Authorization': 'Bearer '+rfToken
                        },
                        method: 'POST',
                        data: {
                            refreshToken: rfToken
                        }
                    }).then(function(response) {
                        var newToken = response.data;
                        store.set('jwt', newToken);
                        refreshPromise = null;
                        return newToken.token;
                    });
                    return refreshPromise;
                } else {
                    return idToken;
                }
                //return store.get('jwt').token;
            }]
        });

        $httpProvider.interceptors.push('jwtInterceptor');
        //$rootScope.app =  getUrlParameter('app');
}])
    .controller('Controller', ['jwtHelper','store',function Controller(jwtHelper, store) {

    }])
    .run(['$rootScope', '$location', '$cookieStore', '$http', 'globalVarsSrv', 'AuthenticationService',
        function ($rootScope, $location, $cookieStore, $http, globalVarsSrv, AuthenticationService) {
            AuthenticationService.CheckCredentials();
            globalVarsSrv.initFromFile('config/appConfig.json');

        }])
;