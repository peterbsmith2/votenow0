angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HomeCtrl', function($scope, $cordovaGeolocation, Location) {
  $cordovaGeolocation.getCurrentPosition({
    timeout: 10000,
    enableHighAccuracy: false
  }).then(Location.fromGeo).then(function(response) {
    console.log(response);
  });


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
