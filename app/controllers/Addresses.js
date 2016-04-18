angular.module('store-app').controller('Addresses', ['$scope', 'AddressService', 
function ($scope, AddressService) {
  $scope.addresses = []

  AddressService.fetch().then(function (addresses) {
    $scope.addresses = addresses
  })

  $scope.switchTo = function (target) {
    $scope.addresses = $scope.addresses.map(function (address, index) {
      address.selected = address.id === target.id
      return address
    })
  }

  $scope.finish = function () {
    Materialize.toast('Thanks for shopping with us!', 4000)
  }

}])