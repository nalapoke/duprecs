'use strict';
angular.module('duprecsApp')
  .controller('MainController', ['UserFactory', function(UserFactory) {
    var vm = this;

    vm.searchUsername = null;
    vm.user = null;
    vm.error = false;

    vm.getCollectionForUser = function() {
      if (!vm.searchUsername || vm.searchUsername.length === 0) {
        return;
      }
      UserFactory.getUser(vm.searchUsername).then(onGetUserSuccess, onGetUserError)
    };

    vm.startOver = function() {
      vm.searchUsername = null;
      vm.user = null;
    };

    function onGetUserSuccess(response) {
      if (response.data) {
        vm.user = response.data;
      }
    };

    function onGetUserError(error) {
      vm.error = true;
    };
  }]);