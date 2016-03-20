'use strict';
angular.module('duprecsApp')
  .controller('NavbarController', ['$location', function($location) {
    var vm = this;

    vm.goHome = function(){
      $location.path('/');
    };

  }]);