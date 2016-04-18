angular.module('store-app').controller('CartDetail', ['$scope', '$routeParams', 'ProductService', 
function ($scope, $routeParams, ProductService) {
  $scope.product = {}

  ProductService.find($routeParams.id).then(function (product) {
    $scope.product = product
  })
  
}])