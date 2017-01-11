'use strict';

angular.
  module('service.rate').
  factory('Rate', rateService);

  rateService.$inject = ['$http', '$sce'];

  var rateUrl = 'http://api.fixer.io/latest?callback';

  function rateService($http, $sce) {
    return {
      getRates: getRates
    };

    function getRates(params) {
      return $http.get(rateUrl, {
        params: params
      })
      .then(function(response) {
        return response.data.rates;
      })
      .catch(function(error) {
        console.log('Get rates call failed:', error);
      });
    };
 
  };
