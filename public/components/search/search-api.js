var SearchAPI = {
  doSearch : function (args) {
    debugger;
    var dataReady = new Promise(
      function (resolve, reject) {
        if(args.term !== '') {
          var xhr = new XMLHttpRequest();
          xhr.addEventListener('load', function (xhrResponse) {resolve(xhrResponse)});
          xhr.addEventListener('fail', function () {reject()});
          xhr.open('GET',
            '/api/search?searchType='+encodeURIComponent(args.searchType)+
            '&searchTerm='+encodeURIComponent(args.searchTerm)
            );
          xhr.send();
        }
      }).catch(function () {
        console.error('AJAX call to API failed');
      }).then(function (xhrResponse) {
          if(xhrResponse.currentTarget.status === 200){
             var cardDataArray = JSON.parse(arguments[0].currentTarget.response);
             AppDispatcher.dispatch('have-data', {dataArray : cardDataArray});
          }else {
            console.error('API Response status !== 200')
          }
      });
  }
}

AppDispatcher.register('need-data',SearchAPI.doSearch);
