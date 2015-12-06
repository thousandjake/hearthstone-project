var DeckView = function(deck, tagName) {
  this.deck = deck;
  this.tagName = tagName;
  this.deckTemplate = '';
};

DeckView.prototype.render = function() {
  var that = this;

  var templateReady = new Promise(
    function (resolve, reject) {
      if (that.deckTemplate.length === 0) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function (response) {
          resolve(response.currentTarget.response);
          that.deckTemplate = response.currentTarget.response;
        });
        xhr.addEventListener('error', function () {reject()});
        xhr.open('GET','/components/deck/deck.html');
        xhr.send();
      } else {
        resolve(that.deckTemplate);
      }
    }).catch(function () {
      console.log('failed to get deck template from server');
    }).then(function (deckTemplate) {
      [].slice.call(document.getElementsByTagName(that.tagName))
      //cast HTML collection returned by response to an array
        .forEach(function (currentDeckElement) {
          currentDeckElement.innerHTML = Mustache.render(deckTemplate,{});
        });
    });
};

DeckView.prototype.removeFromDeck = function() {

};
