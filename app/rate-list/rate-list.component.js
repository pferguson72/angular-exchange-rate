'use strict';

// Register `rate-list` component, along with its associated controller and template
angular.
  module('rateList').
  component('rateList', {
    templateUrl: 'rate-list/rate-list.template.html',
    controller: ['Rate', 'CurrencySymbol', '$sce',
      function RateListController(Rate, CurrencySymbol, $sce) {

        var $ctrl = this;

        this.baseCurrency = 'USD';
        this.baseAmount = 0.00;
        this.quoteAmount = 0.00;

        this.currencyChange = function() {
          if ($ctrl.haveBothCurrencies()) {
            if ($ctrl.baseCurrency !== $ctrl.quoteCurrency) {
              Rate.getRates({base: $ctrl.baseCurrency, symbols: $ctrl.quoteCurrency}).
              then(function(result) {
                $ctrl.exchangeRate = result[$ctrl.quoteCurrency];
                $ctrl.baseAmountChange();
              });
            } else {
              $ctrl.exchangeRate = 1.0;
              $ctrl.baseAmountChange();
            }
          }
        };

        this.baseAmountChange = function() {
          if ($ctrl.exchangeRate > 0) {
            $ctrl.quoteAmount = $ctrl.baseAmount * $ctrl.exchangeRate;
          }
        };

        this.quoteAmountChange = function() {
          if ($ctrl.exchangeRate > 0) {
            $ctrl.baseAmount = $ctrl.quoteAmount / $ctrl.exchangeRate;
          }
        };

        this.baseCurrencySymbol = function() {
          return $sce.trustAsHtml(CurrencySymbol.getCurrencySymbol($ctrl.baseCurrency));
        };

        this.quoteCurrencySymbol = function() {
          return $sce.trustAsHtml(CurrencySymbol.getCurrencySymbol($ctrl.quoteCurrency));
        };

        this.haveBothCurrencies = function() {
          return $ctrl.baseCurrency && $ctrl.quoteCurrency;
        };
        
        this.getInitialState = function() {
          Rate.getRates({base: $ctrl.baseCurrency}).
          then(function(result) {
            $ctrl.allCurrencies = [ $ctrl.baseCurrency ].concat(Object.keys(result));
          });
        };

        this.getInitialState();

      }
    ]
  });
