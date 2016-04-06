'use strict';
angular.module('duprecsApp')
  .controller('UserController', [
    '$location', '$routeParams', 'UserFactory',
    function($location, $routeParams, UserFactory) {
      var vm = this;

      vm.user = null;
      vm.collection = [];
      vm.userError = null;
      vm.collectionError = null;
      vm.maxTitleAndArtistLength = 18;

      var username = $routeParams.username;
      var page = 1;

      getUser();

      function getUser() {
        UserFactory.getUser(username).then(onGetUserSuccess, onGetUserError);
      }

      function getUserCollection() {
        UserFactory.getUserCollection(username, page).then(onGetUserCollectionSuccess, onGetUserCollectionError);
      }

      function onGetUserSuccess(response) {
        vm.user = response.data;
        getUserCollection();
      }

      function onGetUserError() {
        vm.userError = 'Unable to find a Discogs user matching the username \'' + username + '\'.';
      }

      function onGetUserCollectionSuccess(response) {
        var formattedCollectionData = formatCollectionData(response.data.releases);
        vm.collection = vm.collection.concat(formattedCollectionData);
        if (page < response.data.pagination.pages) {
          page++;
          getUserCollection();
        }
      }

      function onGetUserCollectionError() {
        vm.collectionError = 'Unable to fetch a collection for Discogs user ' + username + '. Please try again.';
      }

      function formatCollectionData(collectionData) {
        return collectionData.map(formatReleaseData);
      }

      function formatReleaseData(release) {
        release.basic_information.artists = release.basic_information.artists.map(formatArtistData);
        return release;
      }

      function formatArtistData(artist) {
        artist.name = artist.name.replace(/^(.+)(\s\(\d+\))$/, '$1');
        return artist;
      }
    }
  ]);
