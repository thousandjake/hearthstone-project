var Search = function(){

};

Search.prototype.doSearch = function(getQueryType, getQuery, loadCallBack, failCallBack){
  if(getQuery()!==''){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', loadCallBack);
    xhr.addEventListener('error', failCallBack);
    xhr.open('GET',
      '/api/search?searchType='+encodeURIComponent(getQueryType())+
      '&searchTerm='+encodeURIComponent(getQuery())
      );
    xhr.send();
  }
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
