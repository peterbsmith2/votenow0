angular.module('starter.services', [])

.factory('Location', function($http) {

  // Might use a resource here that returns a JSON array

  // Some fake testing data


  return {
    fromGeo: function(position) {
      return $http.get('http://www.votenow.win/api/v1/voter/geo_raw/'+position.coords.latitude+'/'+position.coords.longitude);
    },
    fromAddress: function(address) {
      return $http.get();
    }
  };
});
