angular.module('hearthstone.things', [])
  .directive('search', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/search.html',
      scope: { },
      controller: [ 'SearchAPI', 'Debouncer', '$scope',
        function (SearchAPI, Debouncer, $scope) {
          $scope.searchType = document.getElementsByClassName('search-type')[0].value;
          $scope.searchTerm = document.getElementsByClassName('search-term')[0].value;

          document.getElementsByClassName('search-term')[0].addEventListener( 'keyup', SearchAPI.getCardData($scope.searchType, $scope.searchTerm));
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
      if(searchTerm !== '') {
        $http({
        method: 'GET',
        url: '/api/search?searchType='
          +encodeURIComponent(args.searchType)
          +'&searchTerm='
          +encodeURIComponent(args.searchTerm)
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
