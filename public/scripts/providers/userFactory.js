'use strict';
angular.module('duprecsApp')
  .factory('UserFactory', ['$http', function($http) {
    var urlBase = '/api/v1/users/';
    var factory = {};

    factory.getUser = function(userName) {
      return $http.get(urlBase + userName);
    };

    factory.getUserCollection = function(userName) {
      return $http.get(urlBase + userName + '/collection/folders/0/releases?per_page=50&page=1');
    };

    return factory;
  }]);