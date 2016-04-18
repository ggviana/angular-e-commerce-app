angular.module('store-app').controller('Cart', ['$scope', '$location', 'ProductService', 
function ($scope, $location, ProductService) {
  $scope.products = []
  $scope.total = 0

  $scope.goTo = function (product) {
    $location.path('/cart/' + product.name)
  }

  function calculateTotal () {
    return $scope.products.reduce(function (sum, cur) {
      return sum += cur.price
    }, 0)
  }

  ProductService.fetch().then(function (products) {
    $scope.products = products
    $scope.total = calculateTotal()
  })

}])