angular.module('store-app').directive('parallax', 
function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $(element).parallax()
    }
  }
})