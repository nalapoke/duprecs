'use strict';

angular.module('duprecsApp')
  .directive('drNavbar', function () {
    return {
      controller: 'NavbarController as NavbarCtrl',
      restrict: 'E',
      replace: true,
      templateUrl: '../../views/navbar.html'
    };
  });
