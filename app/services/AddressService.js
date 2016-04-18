angular.module('store-app').service('AddressService', ['$http', '$q', 
function ($http, $q) {
  var SERVICE_URL = 'static/addresses.json'
  var cached

  this.fetch = function fetch () {
    if (cached) 
      return $q.resolve(cached)

    return $http
      .get(SERVICE_URL)
      .success(function (response) {
        cached = response.map(function (address, index) {
          address.selected = index === 0
          return address
        })
      })
      .then(function () {
        return $q.resolve(cached)
      })
  }
  
  this.add = function (address) {
    fetch().then(function (addresses) {
      addresses.push(address)

      return addresses
    })
  }
}])