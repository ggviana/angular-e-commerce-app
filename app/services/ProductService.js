angular.module('store-app').service('ProductService', ['$http', '$q', 
function ($http, $q) {
  var SERVICE_URL = 'static/products.json'
  var cached

  this.fetch = function () {
    if (cached) 
      return $q.resolve(cached)

    return $http
      .get(SERVICE_URL)
      .success(function (response) {
        cached = response
      })
      .then(function () {
        return $q.resolve(cached)
      })
  }

  this.find = function (productId) {
    return this.fetch().then(function (products) {
      for (var i = 0, size = products.length; i < size; i++) {
        if (products[i].name === productId) 
          return products[i]
      }
    })
  }
}])