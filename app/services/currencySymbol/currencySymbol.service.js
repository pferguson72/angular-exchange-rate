'use strict';

angular.
  module('service.currencySymbol').
  factory('CurrencySymbol', currencySymbolService);

  var currencyToHex = {
    USD: ['24'],
    AUD: ['24'],
    BGN: ['43b', '432'],
    BRL: ['52', '24'],
    CAD: ['24'],
    CHF: ['43', '48', '46'],
    CNY: ['a5'],
    CZK: ['4b', '10d'],
    DKK: ['6b', '72'],
    GBP: ['a3'],
    HKD: ['24'],
    HRK: ['6b', '6e'],
    HUF: ['46', '74'],
    IDR: ['52', '70'],
    ILS: ['20aa'],
    INR: ['20B9'],
    JPY: ['a5'],
    KRW: ['20a9'],
    MXN: ['24'],
    MYR: ['52', '4d'],
    NOK: ['6b', '72'],
    NZD: ['24'],
    PHP: ['20b1'],
    PLN: ['7a', '142'],
    RON: ['6c', '65', '69'],
    RUB: ['20bd'],
    SEK: ['6b', '72'],
    SGD: ['24'],
    THB: ['e3f'],
    TRY: ['24'],
    ZAR: ['52'],
    EUR: ['20ac'],
  };

  function currencySymbolService() {
    return {
      getCurrencySymbol: getCurrencySymbol
    };

    function getCodeValue(codeValue) {
      return '&#x' + codeValue + ';';
    };

    function getCurrencySymbol(currency) {
      var codes = currencyToHex[currency] || ['24'];
      return codes.reduce(function(accum, code) {
        return accum + getCodeValue(code);
      }, '');
    };
 
  };
