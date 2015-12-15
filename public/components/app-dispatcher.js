var AppDispatcher = {
  listeners : {},
  register : function (eventName, callback) {
    var eventFound = 'false';
    for(var key in AppDispatcher.listeners) {
      if(eventName === key) {
        eventFound = 'true';
      };
    };
    if(eventFound === 'true') {
      AppDispatcher.listeners[eventName].push(callback);
    } else {
      AppDispatcher.listeners[eventName] = [callback];
    }
  },
  dispatch : function (eventName, args) {
    debugger;
    var that = this, eventFound = 'false';
    for(var key in AppDispatcher.listeners) {
      if(eventName === key) {
        eventFound = 'true';
      };
    };
    if(eventFound === 'true'){
      AppDispatcher.listeners[eventName].forEach(function (currentValue) {
        currentValue(args);
      }, that)
    } else {
      console.error('event undefined');
    }
  }
}

//list of expected events
//*****COMPLETE*****
//dom-load : searchView.render(), deckView.render()
  //on dom-load render the search and deck views
//*****COMPLETE*****
//need-data : searchAPI.doSearch()
  //on change of search input, run the API call
//*****COMPLETE*****
//have-data : searchResultsView.destroy(), searchResultsView.render()
  //

//render-card : cardView.render()
  //render card template into element

//add-card : deckView.addCard()
  //add deck to card, also contains rule logic (2 max copies)

//view-card : cardView.enlarge()
  //lightbox effect of CARD
