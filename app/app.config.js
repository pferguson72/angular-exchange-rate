angular.
  module('exchangeRate').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/rates', {
          template: '<rate-list></rate-list>'
        }).
        otherwise('/rates');
    }
  ])