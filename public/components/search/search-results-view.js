var SearchResultsView = {
  destroy : function () {

  },
  render : function (args) {
    document.getElementsByTagName('Results')[0].innerHTML = "";
    args.dataArray.forEach(function (currentValue) {
      AppDispatcher.dispatch('render-card', currentValue);
    })
  }
}

AppDispatcher.register('have-data',SearchResultsView.destroy);
AppDispatcher.register('have-data',SearchResultsView.render);
