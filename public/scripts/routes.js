'use strict';

angular.module('duprecsApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController',
      controllerAs: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);