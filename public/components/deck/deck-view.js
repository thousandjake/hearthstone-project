var DeckView = {
  render : function () {
    var that = this;
    AppTemplateCache.getTemplate('Deck', '/components/deck/deck.html')
    .catch(function () {
      console.error('failed to get template from server');
    }).then(function (deckTemplate) {
      [].slice.call(document.getElementsByTagName('Deck'))
      //cast HTML collection returned by response to an array
        .forEach(function (currentSearchElement) {
          currentSearchElement.innerHTML = Mustache.render(deckTemplate,{});
        });
    });
  }
};

AppDispatcher.register('dom-load', DeckView.render);
