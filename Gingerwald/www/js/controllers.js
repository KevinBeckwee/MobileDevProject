    angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function () {
     LoginService.loginUser ($scope.data.username, $scope.data.password).success (function (data) {
      $state.go ('menu');
    }).error (function (data) {
      var alertPopup = $ionicPopup.alert ({
        title: 'Login failed',
        template: 'Please check your credentials!'
      });
    });
  }
})

.controller('MenuCtrl', function($scope) {
  //MENUCONTROLLER HIER
});