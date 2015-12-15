var CardView = {
  render : function (cardData) {
    var newCard = document.createElement('Card');
    Object.keys(cardData).forEach(function(currentValue) {
      newCard.setAttribute(currentValue, cardData[currentValue]);
    })
    document.getElementsByTagName('Results')[0].appendChild(newCard);

    AppTemplateCache.getTemplate('Card', '/components/card/card.html')
    .catch(function () {
      console.error('failed to get template from server');
    }).then(function (cardTemplate) {
      newCard.innerHTML = Mustache.render(cardTemplate,{
        CardImage : cardData.img,
        CardName : cardData.name
      });
    });
  }
}

AppDispatcher.register('render-card', CardView.render)
