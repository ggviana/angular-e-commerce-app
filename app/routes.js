angular.module('store-app').config(['$locationProvider', '$routeProvider', 
function ($locationProvider, $routeProvider) {
  // $locationProvider.html5Mode(true)

  $routeProvider
    .when('/cart', {
      templateUrl: 'partials/cart.html',
      controller: 'Cart'
    })
    .when('/cart/:id', {
      templateUrl: 'partials/cart-item.html',
      controller: 'CartDetail'
    })
    .when('/addresses', {
      templateUrl: 'partials/addresses.html',
      controller: 'Addresses'
    })
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'Profile'
    })
    .otherwise({
      redirectTo: '/cart'
    })
}])