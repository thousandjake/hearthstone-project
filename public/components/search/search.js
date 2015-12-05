var Search = function(){

};
Search.prototype.doSearch = function (queryTermElement, queryTypeElement) {
  //method to perform an AJAX call to Hearthstone API to get card data for
  //cards matching search query term (queryTerm) and query type (queryType)
  
  //Get values of the search term and type from elements passed in as args
  queryTerm = queryTermElement.value;
  queryType = queryTypeElement.value;

  var dataReady = new Promise(
    function (resolve, reject) {
      if(queryTerm!=='') {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function (xhrResponse) {resolve(xhrResponse)});
        xhr.addEventListener('fail', function () {reject()});
        xhr.open('GET',
          '/api/search?searchType='+encodeURIComponent(queryType)+
          '&searchTerm='+encodeURIComponent(queryTerm)
          );
        xhr.send();
      }
    }).catch(function () {
      console.log('AJAX call to API failed');
    }).then(function (xhrResponse) {
        if(xhrResponse.currentTarget.status === 200){
          console.log(JSON.parse(arguments[0].currentTarget.response));
        }else {
          console.log('API Response status !== 200')
        }
    });
  }

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
