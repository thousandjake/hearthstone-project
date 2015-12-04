var Card = function(data, deckArray) {
  this.outputElement = document.getElementById('searchResults');
  this.cardObj = data;

  this.deckName = document.getElementById('deckNameInput');
  this.deckView = document.getElementById('deck-list');
  this.deckArray = deckArray;
}

Card.prototype.renderCard = function() {
  var cardDiv = document.createElement('div');
  this.outputElement.appendChild(cardDiv);

  //create an image element and set the src to Card.img
  var newImg = document.createElement('img');
  newImg.src = this.cardObj.img;
  newImg.alt = this.cardObj.name;
  cardDiv.appendChild(newImg);

  //create an add to deck button element
  var addCardButton = document.createElement('button');
  addCardButton.innerHTML = 'Add Card to Deck';
  cardDiv.appendChild(addCardButton);
  addCardButton.addEventListener(
    'click',
    this._addCard.bind(this)
  );

  //create a view in detail button element
  var viewCardButton = document.createElement('button');
  viewCardButton.innerHTML = 'View Card in Detail';
  cardDiv.appendChild(viewCardButton);
  viewCardButton.addEventListener(
    'click',
    this.detailedView.bind(this)
  );
};

Card.prototype._addCard = function() {
  var cardId = this.cardObj.cardId;
  var rarity = this.cardObj.rarity.toLowerCase();
  var deckType = document.getElementById('heroClass').value;

  var matchCount = this.deckArray.reduce(function(count, currentValue){
    return currentValue.cardId === cardId ? count+1 : count;
  },0);

  if(rarity === 'legendary' && matchCount >= 1) {
    alert('Only once instance of a legendary per deck');
  } else if(matchCount >= 2) {
    alert('Only two instances of non-legendary cards per deck');
  }
  else {

    if(this.deckArray.length < 30){
      if(typeof(this.cardObj.playerClass) === 'undefined' ||
      deckType === this.cardObj.playerClass.toLowerCase()) {
        this.deckArray.push(this.cardObj);
        this.renderDeck();
      } else {
        alert('Card not for your hero bro');
      }
    }else{
      alert('Decks can only contain 30 cards!');
    };
  }
};

Card.prototype._removeCard = function(index){
  this.deckArray.splice(index,1);
  this.renderDeck();
};

Card.prototype.detailedView = function() {
  //Lightbox / Detailed View of Card
};

Card.prototype.renderDeck = function(){
  this._sortArray.bind(this);
  this.deckView.innerHTML = "";

  if(this.deckArray.length > 0){
    this.deckArray.forEach(function(currentValue,index,array){
      var deckItem = document.createElement('li');
      deckItem.innerHTML = currentValue.cost + ' ' + currentValue.name;

      var removeItemButton = document.createElement('button');
      removeItemButton.innerHTML = 'Remove Item';
      deckItem.appendChild(removeItemButton);

      removeItemButton.addEventListener(
        'click',
        this._removeCard.bind(this, index)
      );

      this.deckView.appendChild(deckItem);
      }
      ,this
    );
  };
};

Card.prototype._sortArray = function(){
  this.deckArray.sort(function(a, b){
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if(a.cost < b.cost) {
      return -1;
    }
    else if(a.cost > b.cost) {
      return 1;
    }
    else if(nameA < nameB){
      return -1;
    }
    else {
      document.alert('Sort Failed????');
    }
  });
};