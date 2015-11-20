var Search = function(){
  this.searchElement = document.getElementById('search');
  this.searchType = document.getElementById('searchType');
  this.outputElement = document.getElementById('searchResults');
  this.deckArray = [];
  this.cardsArray =[];
};

Search.prototype.setup = function(){
  this.searchElement.addEventListener(
    'change',
    this.doSearch.bind(
      this,
      this._getQueryType.bind(this),
      this._getQuery.bind(this),
      this._handleDoSearch.bind(this),
      this._failDoSearch.bind(this)
    )
  );
};

Search.prototype.doSearch = function(getQueryType, getQuery, loadCallBack, failCallBack){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', loadCallBack);
  xhr.addEventListener('error', failCallBack);
  xhr.open('GET',
    '/api/search?searchType='+encodeURIComponent(getQueryType())+
    '&searchTerm='+encodeURIComponent(getQuery())
    );
  xhr.send();
};

Search.prototype._handleDoSearch = function(xhrResponse){
  if(xhrResponse.currentTarget.status === 200){
    this._renderer(JSON.parse(arguments[0].currentTarget.response));
  }else {
    alert('You fucked up son');
  };
};

Search.prototype._failDoSearch =  function(){
  alert('IDK WHAT THE FUCK YOU DID');
};

Search.prototype._getQuery = function(){
  return this.searchElement.value;
};

Search.prototype._getQueryType = function(){
  return this.searchType.value;
};

Search.prototype._renderer = function(data){
  //clears past search results
  var outputElement = this.outputElement;
  while (outputElement.firstChild) {
    outputElement.removeChild(outputElement.firstChild);
  };

  if(data !== 'undefined' && data.length > 0) {
  //check to see if any results were returned
    data.forEach(
    //create table elements for each card matching search
      function(currentValue, index, array){
        var newCard = new Card(currentValue, this.deckArray);
        newCard.renderCard();
      },
      this
    );
  } else {
    alert('No Matching Results Found. Please Search Again');
  };

};

Search.prototype.getCardsArray = function() {

}
