var CardView = {
  render : (function (cardData) {
    AppTemplateCache.getTemplate('/components/card/card.html')
      .then(function (cardTemplate) {
        var newCard = document.createElement('Card');
        document.getElementsByTagName('Results')[0].appendChild(newCard);
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
  }).bind(CardView),
  enlarge : (function (cardData) {
    AppTemplateCache.getTemplate('/components/card/enlarged-card.html')
      .then(function (enlargedCardTemplate) {
        var overlay = document.createElement('Overlay');
        document.getElementById('main-container').appendChild(overlay);
        overlay.innerHTML = Mustache.render(enlargedCardTemplate, {
          cardImage : cardData.img,
          cardName : cardData.name,
          cardSet : cardData.cardSet,
          cardFlavor : cardData.flavor,
          cardArtist : cardData.artist
        });
        overlay.addEventListener('click', function () {
          document.getElementById('main-container').removeChild(overlay);
        });
      });
  }).bind(CardView)
};

AppDispatcher.register('render-card', CardView.render);
AppDispatcher.register('view-card', CardView.enlarge);
