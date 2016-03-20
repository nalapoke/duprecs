'use strict';
angular.module('duprecsApp')
  .controller('MainController', ['$location', function($location) {
    var vm = this;

    vm.goToUserPage = function(searchUsername) {
      if (!searchUsername || searchUsername.length === 0) {
        return;
      }
      $location.path('/user/' + searchUsername);
    };

  }]);