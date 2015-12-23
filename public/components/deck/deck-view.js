var DeckView = {
  deckArray : [],
  render : function () {
    AppTemplateCache.getTemplate('/components/deck/deck.html')
    .catch(function () {
      console.error('failed to get template from server');
    }).then(function (deckTemplate) {
      [].slice.call(document.getElementsByTagName('Deck'))
      //cast HTML collection returned by response to an array
        .forEach(function (currentSearchElement) {
          currentSearchElement.innerHTML = Mustache.render(deckTemplate,{});
        });
    });
  },
  addCard : function (cardObj) {
    var that = this;
    var deckType = document.getElementsByClassName('hero-type')[0].value;
    var matchCount = that.deckArray.reduce(function(count, currentValue){
      return currentValue.cardId === cardObj.cardId ? count+1 : count;
    },0);
    if(cardObj.rarity.toLowerCase() === 'legendary' && matchCount >= 1) {
      alert('Only once instance of a legendary per deck');
    } else if(matchCount >= 2) {
      alert('Only two instances of non-legendary cards per deck');
    }
    else {
      if(that.deckArray.length < 30) {
        if(typeof(cardObj.playerClass) === 'undefined' ||
          deckType === cardObj.playerClass.toLowerCase()) {
            that.deckArray.push(cardObj);
            that.renderDeck();
        } else {
          alert('Card not for your hero bro');
        };
      }else{
        alert('Decks can only contain 30 cards!');
      };
    }
  },
  renderDeck : function () {
    var that = this;
    var deckUL = document.getElementsByClassName('deck-list')[0];
    deckUL.innerHTML = "";
    if(that.deckArray.length > 0){
      that._sortArray();
      that.deckArray.forEach(function(currentValue,index,array){
        var deckItem = document.createElement('li');
        deckItem.innerHTML = currentValue.cost + ' ' + currentValue.name;
        var removeItemButton = document.createElement('button');
        removeItemButton.className = 'remove';
        removeItemButton.innerHTML = 'Remove Item';
        deckItem.appendChild(removeItemButton);
        removeItemButton.addEventListener(
          'click',
          that.removeCard.bind(DeckView,index)
        );
        deckUL.appendChild(deckItem);
        }
        ,{});
    };
  },
  _sortArray : function () {
    var that = this;
    that.deckArray.sort(function(a, b){
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();
      if(a.cost < b.cost) {
        return -1;
      }
      else if(a.cost > b.cost) {
        return 1;
      }
      else if(nameA > nameB){
        return 1;
      }
      else if(nameA < nameB){
        return -1;
      }
      else if(nameA === nameB){
        return 1;
      }
      else {
        console.error('Sort Failed????');
      };
    });
  },
  removeCard : function (index) {
    that = this;
    that.deckArray.splice(index,1);
    that.renderDeck();
  }
};

AppDispatcher.register('dom-load', DeckView.render.bind(DeckView));
AppDispatcher.register('add-card', DeckView.addCard.bind(DeckView));
