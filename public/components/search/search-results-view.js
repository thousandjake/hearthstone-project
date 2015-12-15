var SearchResultsView = {
  destroy : function () {
    
  },
  render : function (args) {
    args.dataArray.forEach(function (currentValue) {
      AppDispatcher.dispatch('render-card', currentValue);
    })
  }
}

AppDispatcher.register('have-data',SearchResultsView.destroy);
AppDispatcher.register('have-data',SearchResultsView.render);
