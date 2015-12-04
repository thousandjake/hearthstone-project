var App = function() {
  this.search = new Search();
  this.deck = new Deck();
  this.searchView = new SearchView(this.search);
  this.deckView = new DeckView(this.deck);

  document.addEventListener('DOMContentLoaded',function(){
    //create a new search object and call the setup method with no inputs
    this.searchView.render();
    this.deckView.render();
  }.bind(this));
};
