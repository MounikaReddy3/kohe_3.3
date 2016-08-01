(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: "login/login.html",
                controllerAs: 'vm'
            })
            .when('/main', {
                controller: 'MainController',
                templateUrl: "main/main.html",
                controllerAs: 'vm'
            })
            .when('/user_creation', {
                controller: 'RegisterController',
                templateUrl: 'user_creation/register.html',
                controllerAs: 'vm'
            })

            .when('/reset_password', {
                controller: 'ResetController',
                templateUrl: 'reset_password/resetpassword.html',
                controllerAs: 'vm'
            })
            .when('/change_password', {
                controller: 'ChangeController',
                templateUrl: 'change_password/changepassword.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/user_creation']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage;
            restrictedPage = $.inArray($location.path(), ['/login', '/reset_password']) === -2;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();