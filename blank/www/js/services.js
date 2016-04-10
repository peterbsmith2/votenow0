angular.module('starter.services', [])

.factory('Location', function($http, $cordovaGeolocation) {
  var poll;
  var address;
  var hasAddress = false;
  return {
    getPosition: function() {
      return $cordovaGeolocation.getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: false
      }).then(function(response) {
        hasAddress = true;
        return response;
      });
    },
    addressFromGeo: function(position) {
      return $http.get('https://murmuring-coast-93214.herokuapp.com/api/v1/voter/geo_raw/'+position.coords.latitude+'/'+position.coords.longitude)
      .then(function(response) {
        address = response;
        return response;
      });
    },
    pollFromGeo: function(position) {
      return $http.get('https://murmuring-coast-93214.herokuapp.com/api/v1/voter/geo/'+position.coords.latitude+'/'+position.coords.longitude)
      .then(function(response) {
        poll = response;
        return response;
      });
    },
    pollFromAddress: function(a) {
      return $http.get('https://murmuring-coast-93214.herokuapp.com/api/v1/voter/' + a)
      .then(function(response) {
        poll = response;
        return response;
      });
    },
    hasGeo: function() {
      return hasAddress;
    },
    setAddress: function(full) {
      address = full;
      return;
    },
    getAddress: function() {
      return address;
    },
    setPoll: function(request) {
      poll = request;
      return;
    },
    getPoll: function() {
      return poll;
    }
  };
});
