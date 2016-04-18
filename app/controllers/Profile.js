angular.module('store-app').controller('Profile', ['$scope',
function ($scope) {
  $scope.notifications = true

  $scope.sendNewPassword = function () {
    Materialize.toast('A new password has been sent to your email', 4000)
  }

  $scope.logoff = function () {
    Materialize.toast('See you soon! :)', 4000)
  }

}])