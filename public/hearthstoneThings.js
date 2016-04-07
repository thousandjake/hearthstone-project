angular.module('hearthstone.things', [])
  .directive('search', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/search.html',
      scope: { },
      controller: [ 'SearchAPI', 'Debouncer', '$scope',
        function (SearchAPI, Debouncer, $scope) {
          $scope.doSearch = Debouncer.debounce(
            function() {
              SearchAPI.getCardData($scope.searchType, $scope.searchTerm);
            },400);
      }]
    }
  }])
  .directive('statusbar', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/statusbar.html',
      scope: { },
      controller: [ function () {

      }]
    }
  }])
  .directive('card', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/card.html',
      scope: { },
      controller: [ function () {

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
  .service('SearchAPI', [ '$http', function ($http) {
    var cardsArray = [];

    this.getCardData = function (searchType, searchTerm) {
      if(searchTerm && searchType) {
        $http({
        method: 'GET',
        url: '/api/search?searchType='
          +encodeURIComponent(searchType)
          +'&searchTerm='
          +encodeURIComponent(searchTerm)
      }).then(function (response) {
          if(response.currentTarget.status === 200) {
            cardsArray = JSON.parse(arguements[0].currentTarget.response);
          };
        }, function (response) {
            console.error('ERROR with GET request :'+response);
        });
    }
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
