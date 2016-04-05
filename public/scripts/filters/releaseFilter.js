'use strict';
angular.module('duprecsApp')
  .filter('ReleaseFilter', ['$filter', function($filter) {

    function _titleContainsMatch(title, expression) {
      var result = $filter('filter')([title], expression, false);
      return result.length > 0;
    }

    function _artistsContainsMatch(artistArr, expression) {
      var result = $filter('filter')(artistArr, { name: expression }, false);
      return result.length > 0;
    }

    return function (releaseArr, expression) {
      if (!expression) {
        return releaseArr;
      }

      var result = releaseArr.filter(function(release) {
        return _titleContainsMatch(release.basic_information.title, expression) ||
          _artistsContainsMatch(release.basic_information.artists, expression);
      });

      return result;
    }
  }]);