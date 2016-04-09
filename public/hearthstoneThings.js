angular.module('hearthstone.things', [])
  .directive('search', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/search.html',
      scope: { },
      controller: [ 'AppData', 'SearchAPI', 'Debouncer', '$scope',
        function (AppData, SearchAPI, Debouncer, $scope) {
          $scope.doSearch = Debouncer.debounce(
            function() {
              SearchAPI.getCardData($scope.searchType, $scope.searchTerm);
            },400);
      }]
    }
  }])
  .directive('statusBar', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/statusbar.html',
      scope: { },
      controller: [ function () {

      }]
    }
  }])
  .directive('results', [ function () {
    return {
      restrict: 'E',
      template: '<card ng-repeat="result in data.searchResultCards" result="result"></card>',
      scope: { },
      controller: [ 'AppData', '$scope', function (AppData, $scope) {
        $scope.data = AppData.getData();
      }]
    }
  }])
  .directive('card', [ function () {
    return {
      restrict: 'E',
      templateUrl:  '/templates/card.html',
      scope: {
        result: '='
      },
      controller: [ 'AppData', '$scope', function (AppData, $scope) {
        $scope.data = AppData.getData();
      }]
    }
  }])
  .directive('deck', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/deck.html',
      scope: { },
      controller: [ function () {

      }]
    }
  }])
  .service('SearchAPI', [ 'AppData', '$http', function (AppData, $http) {

    this.getCardData = function (searchType, searchTerm) {
      AppData.clearResults();
      if(searchTerm && searchType) {
        $http({
        method: 'GET',
        url: '/api/search?searchType='
          +encodeURIComponent(searchType)
          +'&searchTerm='
          +encodeURIComponent(searchTerm)
      }).then(function (response) {
          if(response.status === 200) {
            AppData.createResults(response.data);
          };
        }, function (response) {
            console.error('ERROR with GET request :'+response);
        });
    }
    };
  }])
  .service('AppData', [ function () {
    var data = {
      searchResultCards : [],
      decklistCards : []
    };
    this.getData = function () {
      return data;
    };
    this.createResults = function (cardsArray) {
      data.searchResultCards = cardsArray;
    };
    this.clearResults = function () {
      data.searchResultCards = [];
    };
  }])
  .service('Debouncer', [ function () {
    this.debounce = function(func, wait) {
      var timeout;
      return function () {
        var that = this, args = arguments;
        var later = function () {
          timeout = null;
          func.apply(that, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }]);
