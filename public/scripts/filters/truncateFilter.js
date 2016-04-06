'use strict';
angular.module('duprecsApp')
  .filter('TruncateFilter', [function() {

    return function (val, maxLength) {
      if (!maxLength || typeof maxLength !== 'number') {
        return val;
      }

      return (val.length > maxLength) ? val.substring(0,maxLength - 3) + '...' : val;
    }
  }]);
