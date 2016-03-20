'use strict';

angular.module('duprecsApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController',
      controllerAs: 'MainCtrl'
    })
    .when('/user/:username', {
      templateUrl: 'views/user.html',
      controller: 'UserController',
      controllerAs: 'UserCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);