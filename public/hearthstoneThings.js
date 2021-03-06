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
      controller: [ 'AppData', '$scope', function (AppData, $scope) {
        $scope.data = AppData.getData();
      }]
    }
  }])
  .directive('results', [ function () {
    return {
      restrict: 'E',
      template: '<card ng-repeat="result in data.searchResultCards" card-obj="result"></card>',
      scope: { },
      controller: [ 'AppData', '$scope', function (AppData, $scope) {
        $scope.data = AppData.getData();
      }]
    }
  }])
  .directive('card', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/card.html',
      scope: {
        cardObj: '='
      },
      controller: [ 'AppData', '$scope', function (AppData, $scope) {
        $scope.passToDeck = function () {
          $scope.data = AppData.getData();
          if(AppData.useCheck($scope.data.decklistType, $scope.cardObj)) {
            AppData.addCard($scope.cardObj);
          } else {

          }
        };
      }]
    }
  }])
  .directive('largeCardOpener', [ 'LargeCardService','$compile', function (LargeCardService, $compile) {
    return {
      restrict: 'A',
      scope : {
        card: '=largeCardOpener'
      },
      link: function ($scope, elements, attrs) {
        var isOpen = false;
        var el;
        $scope.close = function () {
          el.remove();
          LargeCardService.closeCard();
        };
        elements.on('click', function () {
          if(!LargeCardService.getStatus()){
           el = $compile( '<modal card-obj="card" on-close="close()" ng-click="close()"></modal>' )( $scope );
           angular.element(document.body).append( el );
           LargeCardService.openCard();
         }
        });
      }
    }
  }])
  .directive('modal', [ function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/largeCard.html',
      scope: {
        cardObj: '=',
        onClose: '&'
      }
    }
  }])
  .service('LargeCardService', [ function () {
    var isOpen = false;
    this.getStatus = function () {
      return isOpen;
    }
    this.closeCard = function () {
      isOpen = false;
    }
    this.openCard = function () {
      isOpen = true;
    }
  }])
  .directive('deck', [ function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/deck.html',
      scope: { },
      controller: [ 'AppData', '$scope', function (AppData, $scope) {
        $scope.data = AppData.getData();
        $scope.updateDeckType = function () {AppData.setDeck($scope.deckType)};
        $scope.removeFromDeck = function (index) {AppData.removeCard(index)};
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
            if(response.data.error) {
              AppData.newStatus('error', 'No Matches Found For Search');
            } else {
              AppData.createResults(response.data);
            }
          };
        }, function (response) {
          AppData.setStatus('error', 'GET Request Error, Try Again Later');
          console.error('ERROR with GET request :'+response);
        });
    }
    };
  }])
  .service('AppData', [ function () {
    var data = {
      searchResultCards : [],
      statusType: '',
      statusText: '',
      decklistType : '',
      decklistCards : []
    };
    this.getData = function () {
      return data;
    };
    this.createResults = function (cardsArray) {
      if(cardsArray) {
        data.searchResultCards = cardsArray;
        this.newStatus('success', 'Matches Found For Search!');
      }
    };
    this.clearResults = function () {
      data.searchResultCards = [];
    };
    this.newStatus = function (statusType, statusText) {
      data.statusType = statusType;
      data.statusText = statusText;
    };
    this.setDeck = function (deckType) {
      data.decklistType = deckType;
      var newDeckList = data.decklistCards.filter( function (currentCard) {
        if(currentCard.hasOwnProperty('playerClass') &&
          deckType !== currentCard.playerClass.toLowerCase()) {
          return false;
        };
        return true;
      });
      data.decklistCards = newDeckList;
      this.sortDeck();
    }
    this.sortDeck = function () {
      data.decklistCards.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if(a.cost < b.cost) {
          return -1;
        } else if(a.cost > b.cost) {
          return 1;
        } else if(a.cost === b.cost){
          if(nameA < nameB) {
            return -1;
          } else {
            return 1;
          }
        } else {
            console.error('Sort Failed????');
          }
      });
    };
    this.useCheck = function (deckType, cardObj) {
      var matchCount = data.decklistCards.reduce(function (count, currentValue) {
        return currentValue.cardId === cardObj.cardId ? count+1 : count;
      },0);
      if(cardObj.rarity.toLowerCase() === 'legendary' && matchCount >= 1) {
        this.newStatus('error', 'Cannot Have More Than One Copy of Legendary');
        return false;
      } else if(matchCount >= 2) {
        this.newStatus('error', 'Cannot Have More Than Two Copies of a Card');
        return false;
      } else if(data.decklistCards.length >= 30) {
        this.newStatus('error', 'Decks Cannot Contain More Than 30 Cards');
        return false;
      } else if(cardObj.hasOwnProperty('playerClass') &&
          deckType !== cardObj.playerClass.toLowerCase()) {
        this.newStatus('error', 'Card Does Not Match Deck Class');
        return false;
      } else {
        this.newStatus('success', 'Card Added to the Deck');
        return true;
      }
    };
    this.addCard = function (cardObj) {
      data.decklistCards.push(cardObj);
      this.sortDeck();
    };
    this.removeCard = function (index) {
      data.decklistCards.splice(index,1);
      this.sortDeck();
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
