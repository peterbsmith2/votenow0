angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HomeCtrl', function($scope, $cordovaGeolocation, $q, Location) {
  $scope.info = {
    poll: {},
    address: {}
  };

  if(!Location.hasGeo()) {
    Location.getPosition().then(function(response) {

      return $q.all([Location.pollFromGeo(response),Location.addressFromGeo(response)]).then(function(response) {
        var poll = response[0].data.data;
        var a = response[1].data;
        console.log(a);
        var full = [a.number,a.street,a.city,a.state,a.zip];
        full = full.join(' ');

        $scope.info = {
          poll: {
            name: poll.name,
            address: poll.address
          },
          address: {
            number: a.number,
            street: a.street,
            state: a.state,
            zip: a.zip,
            city: a.city,
            full: full
          },
        }

      });
    });
  } else {
    $scope.info.address = Location.getAddress();
    $scope.info.poll = Location.getPoll();
  }


})

.controller('WrongCtrl', function($scope, $stateParams, $location, Location) {
  $scope.f = {};
  $scope.polling = function() {
    console.log('action');
    var info = [$scope.f.street,$scope.f.city,$scope.f.state,$scope.f.zip];

    var full = info.join(' ');
    var request = info.join('+');
    Location.setAddress({
      full: full
    });
    Location.pollFromAddress(request)
    .then(function(response) {
      console.log(response);
      Location.setPoll(response.data.data);
      $location.url('/home');
    });
  }
});
