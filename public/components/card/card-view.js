var CardView = {
  render : function (cardData) {
    var newCard = document.createElement('Card');
    document.getElementsByTagName('Results')[0].appendChild(newCard);
    AppTemplateCache.getTemplate('/components/card/card.html')
      .catch(function () {
        console.error('failed to get template from server');
      })
      .then(function (cardTemplate) {
        newCard.innerHTML = Mustache.render(cardTemplate,{
          cardImage : cardData.img,
          cardName : cardData.name
        });
        newCard.getElementsByClassName('add')[0]
          .addEventListener('click', function () {
            AppDispatcher.dispatch('add-card', cardData);
          });
        newCard.getElementsByClassName('view')[0]
          .addEventListener('click', function () {
            AppDispatcher.dispatch('view-card', cardData);
          });
      });
  },
  enlarge : function (cardData) {
    var overlay = document.createElement('Overlay');
    document.getElementById('main-container').appendChild(overlay);
    AppTemplateCache.getTemplate('/components/card/enlarged-card.html')
    .catch(function () {
      console.error('failed to get template from server');
    }).then(function (enlargedCardTemplate) {
      overlay.innerHTML = Mustache.render(enlargedCardTemplate, {
        CardImage : cardData.img,
        CardName : cardData.name,
        CardSet : cardData.cardSet,
        CardFlavor : cardData.flavor,
        CardArtist : cardData.artist
      });
      overlay.addEventListener('click', function () {
        document.getElementById('main-container').removeChild(overlay);
      });
    });
  }
};

AppDispatcher.register('render-card', CardView.render.bind(CardView));
AppDispatcher.register('view-card', CardView.enlarge.bind(CardView));
